/**
 * Astro設定ファイル
 * 
 * このファイルはAstroプロジェクトのビルド・開発サーバーの設定を定義します。
 * 設定を変更した場合は、開発サーバーの再起動が必要です。
 * 
 * @see https://astro.build/config
 */

// @ts-check
import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';
import sitemap from '@astrojs/sitemap';

export default defineConfig({
  // ===========================================================================
  // 基本設定
  // ===========================================================================

  /**
   * サイトURL
   * 
   * 本番環境のURLを指定します。
   * sitemap.xmlの生成やcanonical URLの生成に使用されます。
   */
  site: 'https://aiu-cedar-society.com',

  /**
   * インテグレーション（拡張機能）
   * 
   * - sitemap: サイトマップを自動生成（SEO向上）
   */
  integrations: [sitemap()],

  // ===========================================================================
  // 多言語対応 (i18n) 設定
  // ===========================================================================

  /**
   * 多言語対応の設定
   * 
   * @property defaultLocale - デフォルトの言語（日本語）
   * @property locales - サポートする言語一覧
   * @property routing - URL構造の設定
   *   - prefixDefaultLocale: false → 日本語は/about、英語は/en/about
   */
  i18n: {
    defaultLocale: 'ja',
    locales: ['ja', 'en'],
    routing: {
      // 日本語（デフォルト）はプレフィックスなし
      // 例: /about (日本語), /en/about (英語)
      prefixDefaultLocale: false,
    },
  },

  // ===========================================================================
  // ビルド設定
  // ===========================================================================

  /**
   * ビルド出力の設定
   * 
   * @property inlineStylesheets - CSSをHTMLにインライン化して初期表示を高速化
   * @property assets - 静的アセットの出力ディレクトリ
   */
  build: {
    // 小さなCSSはインライン化して追加リクエストを削減
    inlineStylesheets: 'always',
    // アセットファイルの出力先
    assets: 'assets',
  },

  // ===========================================================================
  // プリフェッチ設定
  // ===========================================================================

  /**
   * ページ遷移を高速化するためのプリフェッチ設定
   * 
   * @property prefetchAll - 全リンクをプリフェッチするか
   * @property defaultStrategy - プリフェッチのタイミング
   *   - 'tap': タップ/クリック開始時にプリフェッチ（最速）
   *   - 'hover': ホバー時にプリフェッチ
   *   - 'viewport': ビューポートに入ったらプリフェッチ
   */
  prefetch: {
    prefetchAll: false,
    // タップベースのプリフェッチで最速の応答を実現
    defaultStrategy: 'tap',
  },

  // ===========================================================================
  // 画像最適化設定
  // ===========================================================================

  /**
   * 画像処理の設定
   * 
   * MicroCMSの画像を最適化して配信するための設定です。
   * 
   * @property service - 画像処理エンジン（Sharp）
   * @property domains - 外部画像の許可ドメイン
   * @property remotePatterns - リモート画像のURLパターン
   */
  image: {
    service: {
      // Sharp: 高速な画像処理ライブラリ
      entrypoint: 'astro/assets/services/sharp',
    },
    // MicroCMSの画像ドメインを許可
    domains: ['images.microcms-assets.io'],
    remotePatterns: [{
      protocol: 'https',
      hostname: '**.microcms-assets.io',
    }],
  },

  // ===========================================================================
  // Vite設定（ビルドツール）
  // ===========================================================================

  /**
   * Viteの詳細設定
   * 
   * ViteはAstroが内部で使用しているビルドツールです。
   * CSS処理やJavaScriptのバンドルを最適化します。
   */
  vite: {
    // TailwindCSSプラグイン
    plugins: [tailwindcss()],

    build: {
      // CSSを分割して初期バンドルサイズを削減
      cssCodeSplit: true,
      // esbuildで高速圧縮
      minify: 'esbuild',
      rollupOptions: {
        output: {
          // チャンク分割の設定
          manualChunks: undefined,
          // ファイル名にハッシュを付与してキャッシュ最適化
          chunkFileNames: 'chunks/[name]-[hash].js',
          entryFileNames: 'entry-[hash].js',
          assetFileNames: 'assets/[name]-[hash][extname]',
        },
      },
    },

    // SSR（サーバーサイドレンダリング）の設定
    ssr: {
      // 外部モジュールとして扱わないパッケージ
      noExternal: [],
    },
  },
});