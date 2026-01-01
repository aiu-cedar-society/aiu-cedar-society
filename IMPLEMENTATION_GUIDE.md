# momo1105.com 実装ガイド

## 概要

本ドキュメントは、momo1105.comのリニューアルにおける2025年最新技術の実装ガイドです。報告書「革新的デザインとパフォーマンスの融合：Astro + microCMS 環境下での次世代ウェブ構築戦略」に基づいて実装されています。

## 実装済み機能

### 1. Broken Grid レイアウトシステム

**ファイル**: `src/styles/broken-grid.css`

意図的にグリッドを崩すレイアウトシステム。CSS GridとSubgridを使用して、雑誌のような動的なレイアウトを実現します。

**使用方法**:
```astro
<div class="broken-grid">
  <div class="broken-grid-item" data-col-span="3" data-offset-x="1" data-offset-y="1">
    <!-- コンテンツ -->
  </div>
</div>
```

**主な特徴**:
- CSS Subgridによる完璧な整列
- 意図的なオフセット（`data-offset-x`, `data-offset-y`）
- レスポンシブ対応（モバイルではオフセットをリセット）

### 2. Dark Mode 2.0

**ファイル**: `src/styles/dark-mode-2.css`

純黒（#000000）と純白（#FFFFFF）を避けた、リッチな色彩設計のダークモード。

**主な特徴**:
- ミッドナイトブルー、ディープフォレストグリーンなどの有機的な暗色
- デジタル・コンフォート（視覚的疲労の軽減）
- グラデーション背景とテクスチャオーバーレイ

**使用方法**:
```html
<html data-theme="dark">
```

### 3. キネティック・タイポグラフィ

**ファイル**: `src/components/KineticTypography.astro`

SplitTypeとMotion Oneを使用した軽量なテキストアニメーション。

**使用方法**:
```astro
<KineticTypography 
  text="アニメーションテキスト"
  tag="h1"
  animation="chars"
  splitType="chars"
/>
```

**アニメーションタイプ**:
- `chars`: 文字ごとにアニメーション
- `words`: 単語ごとにアニメーション
- `lines`: 行ごとにアニメーション
- `reveal`: クリップパスによる表示
- `fadeIn`: フェードイン
- `slideUp`: スライドアップ

### 4. Scroll-driven Animations

**ファイル**: `src/styles/scroll-driven-animations.css`, `src/utils/scrollTimeline.ts`

CSSのView Timeline APIを使用したスクロール連動アニメーション。ブラウザのコンポジタースレッドで実行されるため、メインスレッドをブロックしません。

**使用方法**:
```html
<div class="scroll-fade-in">フェードイン要素</div>
<div class="scroll-parallax">パララックス要素</div>
<div class="scroll-progress"></div> <!-- 読了率バー -->
```

**実装済みアニメーション**:
- `scroll-fade-in`: スクロール時にフェードイン
- `scroll-scale`: スケールアニメーション
- `scroll-slide-left/right`: スライドアニメーション
- `scroll-parallax`: パララックス効果
- `scroll-progress`: 読了率プログレスバー

### 5. View Transitions API

**ファイル**: `src/styles/view-transitions-enhanced.css`

Astro 5.0のClientRouterを使用したシームレスなページ遷移。

**実装済み機能**:
- ルート要素のクロスフェード
- 画像のモーフィング（サムネイル→詳細）
- 永続要素の状態保持（`data-transition-persist`）

### 6. Container Queries

**ファイル**: `src/styles/container-queries.css`

コンテナサイズに基づくレスポンシブデザイン。

**使用方法**:
```html
<div class="card-container">
  <div class="card-adaptive">
    <img class="card-adaptive-image" src="..." />
    <div class="card-adaptive-content">コンテンツ</div>
  </div>
</div>
```

### 7. OGL (軽量WebGL)

**ファイル**: `src/components/OGLBackground.astro`

約30KBの超軽量WebGLライブラリを使用したビジュアルエフェクト。

**使用方法**:
```astro
<OGLBackground 
  intensity={0.3}
  color="#006837"
  className="my-background"
/>
```

**特徴**:
- Three.jsの約1/20のサイズ
- プロシージャル生成による軽量なノイズテクスチャ
- 動的インポートによる初期バンドルサイズの削減

### 8. Rive アニメーション

**ファイル**: `src/components/RiveAnimation.astro`

軽量なベクターアニメーション（Lottieの代替）。

**使用方法**:
```astro
<RiveAnimation 
  src="/animations/animation.riv"
  artboard="Main"
  stateMachine="StateMachine"
  autoplay={true}
/>
```

**注意**: Riveパッケージは必要に応じてインストールしてください。

## パフォーマンス最適化

### バンドルサイズ削減

- **OGL**: Three.js（~600KB）の代わりにOGL（~30KB）を使用（約95%削減）
- **Motion One**: GSAP（~60KB）の代わりにMotion One（~15KB）を使用（約75%削減）
- **SplitType**: GSAP SplitText（有料）の代わりにSplitType（~3KB）を使用

### 動的インポート

重いライブラリ（OGL、Rive）は動的インポートを使用して、必要になったときにのみ読み込みます。

### アイランドアーキテクチャ

Astroのアイランドアーキテクチャを活用して、必要な部分のみJavaScriptをハイドレーションします。

## アクセシビリティ

すべての機能は `prefers-reduced-motion: reduce` メディアクエリに対応しています。

## ブラウザサポート

- **CSS Subgrid**: 最新のChrome、Firefox、Safari
- **Scroll-driven Animations**: 最新のChrome、Edge（フォールバックあり）
- **Container Queries**: 最新の全主要ブラウザ（フォールバックあり）
- **View Transitions**: 最新のChrome、Edge（Astroがフォールバックを提供）

## 次のステップ

1. 実際のコンテンツに適用
2. microCMSスキーマの拡張（Broken Grid対応）
3. パフォーマンステストと最適化
4. ユーザーテストとフィードバック収集
