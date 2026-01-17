/**
 * スクロール連動表示ユーティリティ
 * 
 * Intersection Observer APIを使用して、要素がビューポートに入った時に
 * アニメーションやスタイルを適用する機能を提供します。
 * 
 * @description
 * 使用方法:
 * 1. アニメーション対象の要素にclass="scroll-reveal"を追加
 * 2. 要素がビューポートに入ると、自動的にclass="revealed"が追加される
 * 3. CSSで.revealed時のスタイルを定義する
 * 
 * @example
 * ```html
 * <!-- HTML -->
 * <div class="scroll-reveal">
 *   スクロールすると表示されるコンテンツ
 * </div>
 * ```
 * 
 * ```css
 * /* CSS */
 * .scroll - reveal {
 * opacity: 0;
 * transform: translateY(20px);
 * transition: all 0.6s ease;
 * }
 * 
 * .scroll - reveal.revealed {
 * opacity: 1;
 * transform: translateY(0);
 * }
 * ```
 */

// =============================================================================
// メイン関数
// =============================================================================

/**
 * スクロール連動表示の初期化
 * 
 * ページ内のすべての.scroll-reveal要素に対して、
 * Intersection Observerによる監視を設定します。
 * 
 * @description
 * パフォーマンス最適化:
 * - 既にアニメーション済みの要素がある場合は初期化をスキップ
 * - 一度表示された要素は監視を解除
 */
export function initScrollReveal() {
  // -------------------------------------------------------------------------
  // 重複初期化の防止
  // 
  // ページ遷移後の再初期化時に、既にアニメーション済みの要素がある場合は
  // 再初期化をスキップ（View Transitions対応）
  // -------------------------------------------------------------------------
  if (document.querySelector('.scroll-reveal.revealed')) {
    return;
  }

  // -------------------------------------------------------------------------
  // Intersection Observerの設定
  // -------------------------------------------------------------------------
  const observerOptions: IntersectionObserverInit = {
    // ルート要素（null = ビューポート）
    root: null,
    // 要素が下から50px見えたらアニメーション開始
    // ネガティブ値を使用することで、完全に見える前に開始
    rootMargin: '0px 0px -50px 0px',
    // 要素の10%が見えたらコールバック実行
    threshold: 0.1,
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        // 要素がビューポートに入った → アニメーション適用
        entry.target.classList.add('revealed');
        // 一度表示したら監視を停止（パフォーマンス向上）
        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);

  // -------------------------------------------------------------------------
  // すべての.scroll-reveal要素を監視開始
  // -------------------------------------------------------------------------
  document.querySelectorAll('.scroll-reveal').forEach((el) => {
    observer.observe(el);
  });
}

// =============================================================================
// 自動初期化
// =============================================================================

/**
 * ページ読み込み時とAstroのページ遷移時に自動的に初期化
 * 
 * @description
 * - DOMContentLoaded: 初回ページ読み込み時
 * - astro:page-load: AstroのView Transitions後のページ遷移時
 */
if (typeof window !== 'undefined') {
  // 初回読み込み
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initScrollReveal);
  } else {
    // DOMが既に読み込み済みの場合は即座に初期化
    initScrollReveal();
  }

  // AstroのView Transitions対応
  document.addEventListener('astro:page-load', initScrollReveal);
}
