/**
 * サイト共通設定ファイル
 * 
 * このファイルはサイト全体で使用する共通の設定値を一元管理します。
 * サイト名やURLなどを変更する場合は、このファイルを編集するだけで
 * 全体に反映されます。
 * 
 * @example
 * import { siteConfig } from '../site.config';
 * console.log(siteConfig.name); // "AIU Cedar Society"
 */

// =============================================================================
// サイト基本情報
// =============================================================================

/**
 * サイトの基本設定
 * 
 * @property name - サイト名（ロゴやタイトルで使用）
 * @property url - サイトのURL（本番環境のURL）
 * @property defaultLang - デフォルトの言語コード
 */
export const siteConfig = {
  /** サイト名 */
  name: "AIU Cedar Society",
  
  /** サイトのURL（末尾スラッシュなし） */
  url: "https://aiu-cedar-society.com",
  
  /** デフォルトの言語 */
  defaultLang: "ja" as const,
  
  /** 対応言語一覧 */
  languages: ["ja", "en"] as const,
} as const;

// =============================================================================
// SEO設定
// =============================================================================

/**
 * SEO関連の設定
 * 
 * @property defaultTitle - ページタイトルが指定されない場合のデフォルト
 * @property titleTemplate - ページタイトルのテンプレート（%sにタイトルが入る）
 * @property defaultDescription - デフォルトのメタディスクリプション
 * @property defaultKeywords - デフォルトのキーワード
 */
export const seoConfig = {
  /** デフォルトタイトル（日本語） */
  defaultTitle: {
    ja: "AIU Cedar Society - 秋田とAIU生の可能性をつなぐ",
    en: "AIU Cedar Society - Connecting Akita with AIU Students",
  },
  
  /** ページタイトルのテンプレート */
  titleTemplate: "%s | AIU Cedar Society",
  
  /** デフォルトのメタディスクリプション */
  defaultDescription: {
    ja: "AIU Cedar Societyは秋田国際教養大学の学生主導の公認団体です。著名なゲストを招いた講演会などを通じて、学生と秋田社会をつなぎ、「出会い・学び・実践」のサイクルを創り出します。",
    en: "AIU Cedar Society is a student-led organization at Akita International University. Through lectures with distinguished guests, we connect students with Akita society, creating a cycle of 'encounter, learning, and practice'.",
  },
  
  /** デフォルトのキーワード */
  defaultKeywords: {
    ja: "AIU Cedar Society,秋田国際教養大学,AIU,学生団体,講演会,秋田,イベント,キャリア支援,起業家,地域活性化",
    en: "AIU Cedar Society,Akita International University,AIU,student organization,lectures,Akita,events,career support,entrepreneurs,regional revitalization",
  },
  
  /** OGP画像のデフォルトパス */
  defaultOgImage: "/ogp-default.jpg",
} as const;

// =============================================================================
// 組織情報（構造化データ用）
// =============================================================================

/**
 * 組織情報の設定
 * Google検索などで表示される構造化データに使用されます。
 * 
 * @property foundingDate - 設立日（YYYY-MM形式）
 * @property address - 所在地情報
 * @property socialLinks - SNSリンク
 */
export const organizationConfig = {
  /** 設立日 */
  foundingDate: "2024-06",
  
  /** 所在地 */
  address: {
    locality: "秋田市",
    region: "秋田県",
    country: "JP",
    /** ISO 3166-2コード（秋田県） */
    geoRegion: "JP-05",
  },
  
  /** ロゴ画像のパス */
  logo: {
    path: "/android-chrome-512x512.png",
    width: 512,
    height: 512,
  },
  
  /** SNSリンク */
  socialLinks: [
    "https://www.instagram.com/aiucedarsociety",
  ],
} as const;

// =============================================================================
// 型定義のエクスポート
// =============================================================================

/** サイト設定の型 */
export type SiteConfig = typeof siteConfig;

/** SEO設定の型 */
export type SeoConfig = typeof seoConfig;

/** 組織設定の型 */
export type OrganizationConfig = typeof organizationConfig;

/** 言語コードの型 */
export type Lang = typeof siteConfig.languages[number];
