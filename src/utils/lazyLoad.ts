/**
 * 遅延読み込みユーティリティ
 * 
 * Intersection Observer APIを使用して、画像の遅延読み込み（Lazy Loading）を実装します。
 * ページの初期表示を高速化し、必要な時だけ画像を読み込むことで通信量を削減します。
 * 
 * @description
 * 使用方法:
 * 1. 画像要素にclass="lazy"を追加
 * 2. src属性の代わりにdata-src属性を使用
 * 3. srcset属性の代わりにdata-srcset属性を使用
 * 
 * @example
 * ```html
 * <!-- 遅延読み込み対象の画像 -->
 * <img
 *   class="lazy"
 *   data-src="/images/photo.jpg"
 *   data-srcset="/images/photo-320.jpg 320w, /images/photo-640.jpg 640w"
 *   alt="説明文"
 * />
 * ```
 */

// =============================================================================
// 型定義
// =============================================================================

/**
 * 遅延読み込みのオプション設定
 * 
 * @property rootMargin - ビューポートからの余白。画像が見える前に読み込み開始する距離
 * @property threshold - 画像が何%見えたら読み込みを開始するか（0.01 = 1%）
 */
interface LazyLoadOptions {
    /** ビューポートの拡張範囲（例: '50px' = 50px前から読み込み開始） */
    rootMargin?: string;
    /** 読み込み開始の閾値（0.0〜1.0、0.01 = 1%見えたら開始） */
    threshold?: number;
}

// =============================================================================
// メイン関数
// =============================================================================

/**
 * 遅延読み込みを初期化
 * 
 * ページ内のすべてのlazy指定された画像に対して、
 * Intersection Observerによる遅延読み込みを設定します。
 * 
 * @param options - 遅延読み込みのオプション設定
 * 
 * @example
 * // デフォルト設定で初期化
 * setupLazyLoading();
 * 
 * // カスタム設定で初期化
 * setupLazyLoading({ rootMargin: '100px', threshold: 0.05 });
 */
export function setupLazyLoading(options: LazyLoadOptions = {}) {
    const {
        // 画像がビューポートに入る50px前から読み込みを開始
        rootMargin = '50px',
        // 画像が1%でも見えたら読み込みを開始
        threshold = 0.01
    } = options;

    // -------------------------------------------------------------------------
    // ブラウザ互換性チェック
    // 
    // Intersection Observerがサポートされていない古いブラウザ（IE11など）では、
    // フォールバックとして全画像を即座に読み込みます。
    // -------------------------------------------------------------------------
    if (!('IntersectionObserver' in window)) {
        loadAllImages();
        return;
    }

    // -------------------------------------------------------------------------
    // Intersection Observerの設定
    // 
    // 画像がビューポートに入ったタイミングで読み込みを実行
    // -------------------------------------------------------------------------
    const imageObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // 画像がビューポートに入った
                const img = entry.target as HTMLImageElement;
                loadImage(img);
                // 一度読み込んだ画像は監視を解除（パフォーマンス向上）
                imageObserver.unobserve(img);
            }
        });
    }, {
        rootMargin,
        threshold
    });

    // -------------------------------------------------------------------------
    // 遅延読み込み対象の画像を監視開始
    // -------------------------------------------------------------------------
    const lazyImages = document.querySelectorAll('img.lazy');
    lazyImages.forEach(img => {
        imageObserver.observe(img);
    });

    // 開発時のデバッグ用ログ（本番環境では削除可能）
    console.log(`Lazy loading initialized for ${lazyImages.length} images`);
}

// =============================================================================
// ヘルパー関数
// =============================================================================

/**
 * 単一の画像を読み込み
 * 
 * data-src/data-srcset属性から実際のsrc/srcset属性に値をコピーし、
 * フェードインアニメーションを適用します。
 * 
 * @param img - 読み込み対象の画像要素
 */
function loadImage(img: HTMLImageElement) {
    // data-src属性があれば、src属性にコピー
    if (img.dataset.src) {
        img.src = img.dataset.src;
    }
    // data-srcset属性があれば、srcset属性にコピー
    if (img.dataset.srcset) {
        img.srcset = img.dataset.srcset;
    }

    // CSSクラスを更新
    img.classList.remove('lazy', 'loading');
    img.classList.add('loaded');

    // フェードインアニメーションを適用
    img.style.opacity = '0';
    img.style.transition = 'opacity 0.3s ease-in-out';

    // 画像の読み込み完了後にフェードイン
    img.onload = () => {
        img.style.opacity = '1';
    };
}

/**
 * すべての画像を即座に読み込み（フォールバック）
 * 
 * Intersection Observerがサポートされていないブラウザ向けの
 * フォールバック処理です。
 */
function loadAllImages() {
    const lazyImages = document.querySelectorAll('img.lazy');
    lazyImages.forEach(img => {
        loadImage(img as HTMLImageElement);
    });
    console.log('Lazy loading fallback: Loaded all images immediately');
}

// =============================================================================
// 自動初期化
// =============================================================================

/**
 * Astro View Transitions対応の自動初期化
 * 
 * AstroのView Transitions機能を使用している場合、
 * ページ遷移後に再初期化が必要です。
 */
if (typeof window !== 'undefined') {
    document.addEventListener('astro:page-load', () => {
        setupLazyLoading();
    });
}
