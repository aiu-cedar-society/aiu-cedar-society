/**
 * Core Web Vitals 計測ユーティリティ
 * 
 * Googleが定義するウェブサイトのユーザー体験指標（Core Web Vitals）を
 * リアルタイムで計測し、ブラウザのコンソールに出力します。
 * 
 * @description
 * Core Web Vitalsとは:
 * Googleがウェブサイトの品質を評価するために使用する3つの主要指標です。
 * これらの指標は検索ランキングにも影響を与えます。
 * 
 * 計測される指標:
 * 1. LCP (Largest Contentful Paint) - 最大コンテンツの描画時間
 * 2. INP (Interaction to Next Paint) - インタラクション応答性
 * 3. CLS (Cumulative Layout Shift) - レイアウトのずれ
 * 
 * @example
 * // 手動で計測を開始
 * import { measureWebVitals } from './webVitals';
 * measureWebVitals();
 * 
 * // ブラウザのコンソールで結果を確認
 * // ✅ LCP: 1234 ms (Good)
 * // ⚡ INP: 45 ms (Good)
 * // 📊 CLS: 0.005 (Good)
 */

// =============================================================================
// メイン関数
// =============================================================================

/**
 * Core Web Vitalsの計測を開始
 * 
 * PerformanceObserver APIを使用して各指標を計測し、
 * 結果をブラウザのコンソールに出力します。
 * 
 * @description
 * 各指標の目標値（2025年基準）:
 * - LCP: 1.5秒未満が「良好」、2.5秒以上は「要改善」
 * - INP: 200ms未満が「良好」、500ms以上は「要改善」
 * - CLS: 0.05未満が「良好」、0.1以上は「要改善」
 */
export function measureWebVitals() {
    // PerformanceObserverのサポートチェック
    if (!('PerformanceObserver' in window)) {
        console.warn('PerformanceObserver not supported');
        return;
    }

    // -------------------------------------------------------------------------
    // LCP (Largest Contentful Paint) の計測
    // 
    // 最も大きなコンテンツ要素（画像やテキストブロック）が
    // 表示されるまでの時間を計測します。
    // 
    // 目標値: 1.5秒未満（2025年基準）
    // -------------------------------------------------------------------------
    try {
        const lcpObserver = new PerformanceObserver((list) => {
            const entries = list.getEntries();
            // 最後のエントリが最終的なLCP値
            const lastEntry = entries[entries.length - 1] as any;
            const lcp = lastEntry.renderTime || lastEntry.loadTime;

            // 結果を判定して出力
            const status = lcp < 1500 ? '(Good)' : lcp < 2500 ? '(Needs Improvement)' : '(Poor)';
            console.log('✅ LCP:', Math.round(lcp), 'ms', status);
        });
        lcpObserver.observe({ type: 'largest-contentful-paint', buffered: true });
    } catch (e) {
        console.warn('LCP measurement failed:', e);
    }

    // -------------------------------------------------------------------------
    // INP (Interaction to Next Paint) の計測
    // 
    // ユーザーの操作（クリック、タップ、キー入力）から
    // 画面が更新されるまでの時間を計測します。
    // 
    // 2024年3月からFID（First Input Delay）に代わる新しい指標です。
    // 目標値: 200ms未満
    // -------------------------------------------------------------------------
    try {
        const inpObserver = new PerformanceObserver((list) => {
            for (const entry of list.getEntries()) {
                const duration = (entry as any).duration;
                // 40ms以上の顕著なインタラクションのみ記録
                if (duration > 40) {
                    const status = duration < 200 ? '(Good)' : duration < 500 ? '(Needs Improvement)' : '(Poor)';
                    console.log('⚡ INP:', Math.round(duration), 'ms', status);
                }
            }
        });
        inpObserver.observe({ type: 'event', buffered: true } as any);
    } catch (e) {
        console.warn('INP measurement failed:', e);
    }

    // -------------------------------------------------------------------------
    // CLS (Cumulative Layout Shift) の計測
    // 
    // ページ読み込み中に発生するレイアウトのずれを計測します。
    // 広告や画像の遅延読み込みでコンテンツが移動すると、この値が高くなります。
    // 
    // 目標値: 0.05未満（2025年基準）
    // -------------------------------------------------------------------------
    try {
        let clsScore = 0;
        const clsObserver = new PerformanceObserver((list) => {
            for (const entry of list.getEntries()) {
                // ユーザーの操作による移動は除外
                if (!(entry as any).hadRecentInput) {
                    clsScore += (entry as any).value;
                }
            }
            const status = clsScore < 0.05 ? '(Good)' : clsScore < 0.1 ? '(Needs Improvement)' : '(Poor)';
            console.log('📊 CLS:', clsScore.toFixed(3), status);
        });
        clsObserver.observe({ type: 'layout-shift', buffered: true });
    } catch (e) {
        console.warn('CLS measurement failed:', e);
    }

    console.log('📈 Core Web Vitals monitoring active');
}

// =============================================================================
// 自動初期化
// =============================================================================

/**
 * Astro View Transitions対応の自動初期化
 * 
 * ページ遷移後に再計測を開始します。
 */
if (typeof window !== 'undefined') {
    document.addEventListener('astro:page-load', () => {
        measureWebVitals();
    });
}
