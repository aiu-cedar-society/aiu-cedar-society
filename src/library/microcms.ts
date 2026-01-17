/**
 * MicroCMS クライアント設定ファイル
 * 
 * このファイルはMicroCMSとの連携に必要な型定義と
 * データ取得関数を提供します。
 * 
 * @description
 * MicroCMSは、コンテンツ管理システム（CMS）です。
 * このウェブサイトの講演会情報やメンバー情報などを管理しています。
 * 
 * @example
 * // 講演会一覧を取得
 * const lectures = await getLectures();
 * 
 * // 特定の講演会を取得
 * const lecture = await getLectureDetail("lecture-id");
 */

import { createClient, type MicroCMSQueries, type MicroCMSImage } from "microcms-js-sdk";

// =============================================================================
// 共通型定義
// =============================================================================

/**
 * MicroCMSの全コンテンツに共通するフィールド
 * 
 * @property id - コンテンツの一意識別子
 * @property createdAt - 作成日時
 * @property updatedAt - 更新日時
 * @property publishedAt - 公開日時
 * @property revisedAt - 改訂日時
 */
interface MicroCMSBaseFields {
  id: string;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
  revisedAt: string;
}

/**
 * MicroCMSのリスト形式レスポンスの共通構造
 * 
 * @template T - コンテンツの型
 * @property totalCount - 総件数
 * @property offset - 開始位置
 * @property limit - 取得件数
 * @property contents - コンテンツの配列
 */
interface MicroCMSListResponse<T> {
  totalCount: number;
  offset: number;
  limit: number;
  contents: T[];
}

// =============================================================================
// 講演会（Lectures）関連の型定義
// =============================================================================

/**
 * 講演会データの型
 * 
 * MicroCMSの「lectures」エンドポイントから取得されるデータの構造です。
 * 
 * @property title - 講演会タイトル
 * @property guest_name - 講演者名
 * @property belonging - 講演者の所属（任意）
 * @property event_date - 開催日時
 * @property eyecatch - アイキャッチ画像（任意）
 * @property content - 講演会の詳細内容（任意）
 */
export type Lecture = MicroCMSBaseFields & {
  title: string;
  guest_name: string;
  /** 講演者の所属・肩書き */
  belonging?: string;
  /** 開催日時（ISO 8601形式） */
  event_date: string;
  /** アイキャッチ画像 */
  eyecatch?: MicroCMSImage;
  /** 講演会の詳細内容（HTML形式） */
  content?: string;
};

/** 講演会一覧のレスポンス型 */
export type LectureResponse = MicroCMSListResponse<Lecture>;

// =============================================================================
// FAQ関連の型定義
// =============================================================================

/**
 * FAQアイテムの型（ページ内リピーターフィールド用）
 * 
 * @property question - 質問文
 * @property answer - 回答文
 */
export type FAQItem = {
  question: string;
  answer: string;
};

/**
 * FAQ単体データの型
 * 
 * MicroCMSの「faqs」エンドポイントから取得されるデータの構造です。
 */
export type FAQ = MicroCMSBaseFields & {
  question: string;
  answer: string;
  /** カテゴリ（任意） */
  category?: string;
  /** 表示順序（任意） */
  order?: number;
};

/** FAQ一覧のレスポンス型 */
export type FAQResponse = MicroCMSListResponse<FAQ>;

// =============================================================================
// スポンサー関連の型定義
// =============================================================================

/**
 * スポンサーアイテムの型（ページ内リピーターフィールド用）
 * 
 * @property name - スポンサー名
 * @property logo - ロゴ画像（任意）
 * @property url - ウェブサイトURL（任意）
 * @property description - 説明文（任意）
 */
export type SponsorItem = {
  name: string;
  logo?: MicroCMSImage;
  url?: string;
  description?: string;
};

/**
 * スポンサー単体データの型
 * 
 * MicroCMSの「sponsors」エンドポイントから取得されるデータの構造です。
 */
export type Sponsor = MicroCMSBaseFields & SponsorItem;

/** スポンサー一覧のレスポンス型 */
export type SponsorResponse = MicroCMSListResponse<Sponsor>;

// =============================================================================
// ページ設定（シングルトン）の型定義
// =============================================================================

/**
 * ページ設定の型（オブジェクト形式 - シングルトン）
 * 
 * MicroCMSの「pages」エンドポイントから取得されるサイト全体の設定です。
 * ヒーローセクションのテキストやFAQ一覧などを管理しています。
 * 
 * @property hero_title - ヒーローセクションのタイトル
 * @property hero_subtitle - ヒーローセクションのサブタイトル
 * @property about_content - 「私たちについて」ページの内容
 * @property history_content - 「沿革」ページの内容
 * @property faqs - FAQ一覧（リピーターフィールド）
 * @property sponsors - スポンサー一覧（リピーターフィールド）
 */
export type Pages = {
  hero_title: string;
  hero_subtitle: string;
  about_content: string;
  history_content: string;
  faqs?: FAQItem[];
  sponsors?: SponsorItem[];
};

// =============================================================================
// メンバー関連の型定義
// =============================================================================

/**
 * メンバーステータスの型
 * 
 * @description
 * MicroCMSの設定によっては配列として返される場合があります。
 * - 'current': 在校生
 * - 'graduate': 卒業生
 */
export type MemberStatus = 'current' | 'graduate' | ('current' | 'graduate')[];

/**
 * メンバーデータの型
 * 
 * MicroCMSの「members」エンドポイントから取得されるデータの構造です。
 * 
 * @property name - メンバー名
 * @property position - 役職
 * @property year - 学年または卒業年度
 * @property description - 自己紹介文
 * @property status - 在校生/卒業生ステータス（任意）
 * @property image - プロフィール画像（任意）
 */
export type Member = MicroCMSBaseFields & {
  name: string;
  position: string;
  year: string;
  description: string;
  /** 在校生/卒業生のステータス */
  status?: MemberStatus;
  /** プロフィール画像 */
  image?: MicroCMSImage;
};

/** メンバー一覧のレスポンス型 */
export type MemberResponse = MicroCMSListResponse<Member>;

// =============================================================================
// 今後のイベント関連の型定義
// =============================================================================

/**
 * 今後のイベントデータの型
 * 
 * MicroCMSの「upcoming_events」エンドポイントから取得されるデータの構造です。
 * 
 * @property title - イベントタイトル
 * @property event_date - 開催日時
 * @property description - イベントの説明
 * @property location - 開催場所（任意）
 */
export type UpcomingEvent = MicroCMSBaseFields & {
  title: string;
  /** 開催日時（ISO 8601形式） */
  event_date: string;
  /** イベントの説明（HTML形式可） */
  description: string;
  /** 開催場所 */
  location?: string;
};

/** 今後のイベント一覧のレスポンス型 */
export type UpcomingEventResponse = MicroCMSListResponse<UpcomingEvent>;

// =============================================================================
// メディア掲載関連の型定義
// =============================================================================

/**
 * メディア掲載データの型
 * 
 * MicroCMSの「media_coverage」エンドポイントから取得されるデータの構造です。
 * 
 * @property title - 記事タイトル
 * @property media_name - 掲載メディア名
 * @property publish_date - 掲載日
 * @property url - 記事URL（任意）
 * @property description - 記事の概要
 */
export type MediaCoverage = MicroCMSBaseFields & {
  title: string;
  /** 掲載メディア名（例: 秋田魁新報）*/
  media_name: string;
  /** 掲載日（ISO 8601形式） */
  publish_date: string;
  /** 記事URL（外部リンク） */
  url?: string;
  /** 記事の概要 */
  description: string;
};

/** メディア掲載一覧のレスポンス型 */
export type MediaCoverageResponse = MicroCMSListResponse<MediaCoverage>;

// =============================================================================
// MicroCMS クライアント初期化
// =============================================================================

/**
 * MicroCMS クライアント
 * 
 * @description
 * 環境変数が設定されていない場合はダミー値を使用します。
 * これはビルド時のエラーを防ぐための措置です。
 * 
 * 必要な環境変数:
 * - MICROCMS_SERVICE_DOMAIN: MicroCMSのサービスドメイン
 * - MICROCMS_API_KEY: MicroCMSのAPIキー
 * 
 * @example
 * // .envファイルに以下を設定
 * MICROCMS_SERVICE_DOMAIN=your-service-domain
 * MICROCMS_API_KEY=your-api-key
 */
export const client = createClient({
  serviceDomain: import.meta.env.MICROCMS_SERVICE_DOMAIN || "dummy",
  apiKey: import.meta.env.MICROCMS_API_KEY || "dummy",
});

// =============================================================================
// データ取得関数
// =============================================================================

/**
 * 講演会一覧を取得
 * 
 * @param queries - MicroCMSのクエリパラメータ（任意）
 * @returns 講演会一覧のレスポンス
 * 
 * @example
 * // 最新10件を取得
 * const lectures = await getLectures({ limit: 10 });
 * 
 * // 日付順でソート
 * const lectures = await getLectures({ orders: '-event_date' });
 */
export const getLectures = async (queries?: MicroCMSQueries) => {
  return await client.get<LectureResponse>({ endpoint: "lectures", queries });
};

/**
 * 講演会の詳細を取得
 * 
 * @param contentId - 講演会のID
 * @param queries - MicroCMSのクエリパラメータ（任意）
 * @returns 講演会の詳細データ
 * 
 * @example
 * const lecture = await getLectureDetail("abc123");
 */
export const getLectureDetail = async (
  contentId: string,
  queries?: MicroCMSQueries
) => {
  return await client.getListDetail<Lecture>({
    endpoint: "lectures",
    contentId,
    queries,
  });
};

/**
 * ページ設定（シングルトン）を取得
 * 
 * サイト全体の設定（ヒーローテキスト、FAQ一覧など）を取得します。
 * 
 * @returns ページ設定オブジェクト
 * 
 * @example
 * const pages = await getPages();
 * console.log(pages.hero_title);
 */
export const getPages = async () => {
  return await client.getObject<Pages>({ endpoint: "pages" });
};

/**
 * メンバー一覧を取得
 * 
 * @param queries - MicroCMSのクエリパラメータ（任意）
 * @returns メンバー一覧のレスポンス
 * 
 * @example
 * // 在校生のみを取得
 * const members = await getMembers({ filters: 'status[contains]current' });
 */
export const getMembers = async (queries?: MicroCMSQueries) => {
  return await client.get<MemberResponse>({ endpoint: "members", queries });
};

/**
 * 今後のイベント一覧を取得
 * 
 * @param queries - MicroCMSのクエリパラメータ（任意）
 * @returns 今後のイベント一覧のレスポンス
 * 
 * @example
 * const events = await getUpcomingEvents({ limit: 5 });
 */
export const getUpcomingEvents = async (queries?: MicroCMSQueries) => {
  return await client.get<UpcomingEventResponse>({ endpoint: "upcoming_events", queries });
};

/**
 * メディア掲載一覧を取得
 * 
 * @param queries - MicroCMSのクエリパラメータ（任意）
 * @returns メディア掲載一覧のレスポンス
 * 
 * @example
 * const media = await getMediaCoverage({ orders: '-publish_date' });
 */
export const getMediaCoverage = async (queries?: MicroCMSQueries) => {
  return await client.get<MediaCoverageResponse>({ endpoint: "media_coverage", queries });
};

/**
 * FAQ一覧を取得
 * 
 * @param queries - MicroCMSのクエリパラメータ（任意）
 * @returns FAQ一覧のレスポンス
 * 
 * @example
 * const faqs = await getFAQs({ orders: 'order' });
 */
export const getFAQs = async (queries?: MicroCMSQueries) => {
  return await client.get<FAQResponse>({ endpoint: "faqs", queries });
};

/**
 * スポンサー一覧を取得
 * 
 * @param queries - MicroCMSのクエリパラメータ（任意）
 * @returns スポンサー一覧のレスポンス
 * 
 * @example
 * const sponsors = await getSponsors();
 */
export const getSponsors = async (queries?: MicroCMSQueries) => {
  return await client.get<SponsorResponse>({ endpoint: "sponsors", queries });
};
