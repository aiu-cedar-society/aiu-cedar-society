/**
 * Astro Content Collections 設定ファイル
 * 
 * このファイルはAstroのContent Collections機能を使用して、
 * MicroCMSからデータを取得するための設定を定義します。
 * 
 * @description
 * Content Collectionsとは:
 * Astroが提供するデータ管理機能で、外部CMSやローカルファイルから
 * 型安全にデータを取得できます。
 * 
 * このファイルで定義されているコレクション:
 * - lectures: 講演会情報
 * - members: メンバー情報
 * - upcoming_events: 今後のイベント
 * - media_coverage: メディア掲載情報
 * 
 * @example
 * // ページやコンポーネントでの使用方法
 * import { getCollection } from 'astro:content';
 * 
 * // 全ての講演会を取得
 * const lectures = await getCollection('lectures');
 * 
 * // データにアクセス
 * lectures.forEach(lecture => {
 *   console.log(lecture.data.title);
 * });
 */

import { defineCollection, z } from "astro:content";
import { microCMSContentLoader } from "microcms-astro-loader";

// =============================================================================
// 環境変数の取得
// =============================================================================

/**
 * MicroCMSのサービスドメインを取得
 * 
 * @description
 * 環境変数が設定されていない場合はダミー値を返します。
 * これはビルド時のエラーを防ぐための措置です。
 * 
 * 必要な環境変数: MICROCMS_SERVICE_DOMAIN
 */
const getServiceDomain = () => import.meta.env.MICROCMS_SERVICE_DOMAIN || "dummy";

/**
 * MicroCMSのAPIキーを取得
 * 
 * 必要な環境変数: MICROCMS_API_KEY
 */
const getApiKey = () => import.meta.env.MICROCMS_API_KEY || "dummy";

// =============================================================================
// 講演会コレクション (Lectures)
// =============================================================================

/**
 * 講演会コレクション
 * 
 * MicroCMSの「lectures」エンドポイントからデータを取得します。
 * 
 * @description
 * 講演会情報を管理するコレクションです。
 * 各講演会は以下の情報を持ちます:
 * - タイトル（日本語/英語）
 * - 講演者名（日本語/英語）
 * - 所属（日本語/英語）
 * - 開催日時
 * - アイキャッチ画像
 * - 詳細内容
 */
const lectureCollection = defineCollection({
  // MicroCMSからデータを取得するローダー設定
  loader: microCMSContentLoader({
    serviceDomain: getServiceDomain(),
    apiKey: getApiKey(),
    endpoint: "lectures",
    queries: {
      // 取得するフィールドを指定（不要なフィールドを除外してパフォーマンス向上）
      fields: [
        "id",           // コンテンツID
        "title",        // タイトル（日本語）
        "title_en",     // タイトル（英語）
        "guest_name",   // 講演者名（日本語）
        "guest_name_en",// 講演者名（英語）
        "belonging",    // 所属（日本語）
        "belonging_en", // 所属（英語）
        "event_date",   // 開催日時
        "eyecatch",     // アイキャッチ画像
        "content",      // 詳細内容（日本語）
        "content_en",   // 詳細内容（英語）
        "createdAt",    // 作成日時
        "updatedAt",    // 更新日時
        "publishedAt",  // 公開日時
        "revisedAt",    // 改訂日時
      ],
      // 最大100件まで取得
      limit: 100,
    },
  }),
  // データのスキーマ定義（型チェックと検証）
  schema: z.object({
    id: z.string(),
    title: z.string().optional(),         // 空の場合は「無題の講演会」を表示
    title_en: z.string().optional(),
    guest_name: z.string().optional(),    // 空の場合は「講演者未定」を表示
    guest_name_en: z.string().optional(),
    belonging: z.string().optional(),
    belonging_en: z.string().optional(),
    event_date: z.string().optional(),    // ISO 8601形式（空の場合は非表示）
    eyecatch: z
      .object({
        url: z.string().url(),
        height: z.number(),
        width: z.number(),
      })
      .optional(),
    content: z.string().optional(),
    content_en: z.string().optional(),
    createdAt: z.string().optional(),
    updatedAt: z.string().optional(),
    publishedAt: z.string().optional(),
    revisedAt: z.string().optional(),
  }),
});

// =============================================================================
// メンバーコレクション (Members)
// =============================================================================

/**
 * メンバーコレクション
 * 
 * MicroCMSの「members」エンドポイントからデータを取得します。
 * 
 * @description
 * 団体メンバーの情報を管理するコレクションです。
 * 在校生と卒業生を区別するためのステータスフィールドがあります。
 */
const memberCollection = defineCollection({
  loader: microCMSContentLoader({
    serviceDomain: getServiceDomain(),
    apiKey: getApiKey(),
    endpoint: "members",
    queries: {
      fields: [
        "id",
        "name",           // 名前（日本語）
        "name_en",        // 名前（英語）
        "position",       // 役職（日本語）
        "position_en",    // 役職（英語）
        "year",           // 学年/卒業年度（日本語）
        "year_en",        // 学年/卒業年度（英語）
        "description",    // 自己紹介（日本語）
        "description_en", // 自己紹介（英語）
        "status",         // 在校生/卒業生ステータス
        "image",          // プロフィール画像
        "createdAt",
        "updatedAt",
        "publishedAt",
        "revisedAt",
      ],
      limit: 100,
    },
  }),
  schema: z.object({
    id: z.string(),
    name: z.string().optional(),          // 空の場合は「名前未設定」を表示
    name_en: z.string().optional(),
    position: z.string().optional(),      // 空の場合は非表示
    position_en: z.string().optional(),
    year: z.string().optional(),          // 空の場合は非表示
    year_en: z.string().optional(),
    description: z.string().optional(),   // 空の場合は非表示
    description_en: z.string().optional(),
    // ステータスは文字列または配列（MicroCMSの設定に依存）
    status: z
      .union([
        z.literal("current"),
        z.literal("graduate"),
        z.array(z.union([z.literal("current"), z.literal("graduate")])),
      ])
      .optional(),
    image: z
      .object({
        url: z.string().url(),
        height: z.number(),
        width: z.number(),
      })
      .optional(),
    createdAt: z.string().optional(),
    updatedAt: z.string().optional(),
    publishedAt: z.string().optional(),
    revisedAt: z.string().optional(),
  }),
});

// =============================================================================
// 今後のイベントコレクション (Upcoming Events)
// =============================================================================

/**
 * 今後のイベントコレクション
 * 
 * MicroCMSの「upcoming_events」エンドポイントからデータを取得します。
 * 
 * @description
 * 今後開催予定のイベント情報を管理するコレクションです。
 * ホームページや予定ページで表示されます。
 */
const upcomingEventCollection = defineCollection({
  loader: microCMSContentLoader({
    serviceDomain: getServiceDomain(),
    apiKey: getApiKey(),
    endpoint: "upcoming_events",
    queries: {
      fields: [
        "id",
        "title",          // イベントタイトル（日本語）
        "title_en",       // イベントタイトル（英語）
        "event_date",     // 開催日時
        "description",    // イベント説明（日本語）
        "description_en", // イベント説明（英語）
        "location",       // 開催場所（日本語）
        "location_en",    // 開催場所（英語）
        "createdAt",
        "updatedAt",
        "publishedAt",
        "revisedAt",
      ],
      limit: 100,
    },
  }),
  schema: z.object({
    id: z.string(),
    title: z.string().optional(),         // 空の場合は「イベント詳細未定」を表示
    title_en: z.string().optional(),
    event_date: z.string().optional(),    // 空の場合は非表示
    description: z.string().optional(),   // 空の場合は非表示
    description_en: z.string().optional(),
    location: z.string().optional(),
    location_en: z.string().optional(),
    createdAt: z.string().optional(),
    updatedAt: z.string().optional(),
    publishedAt: z.string().optional(),
    revisedAt: z.string().optional(),
  }),
});

// =============================================================================
// メディア掲載コレクション (Media Coverage)
// =============================================================================

/**
 * メディア掲載コレクション
 * 
 * MicroCMSの「media_coverage」エンドポイントからデータを取得します。
 * 
 * @description
 * 新聞やウェブメディアに掲載された記事情報を管理するコレクションです。
 */
const mediaCoverageCollection = defineCollection({
  loader: microCMSContentLoader({
    serviceDomain: getServiceDomain(),
    apiKey: getApiKey(),
    endpoint: "media_coverage",
    queries: {
      fields: [
        "id",
        "title",        // 記事タイトル
        "media_name",   // メディア名（例: 秋田魁新報）
        "publish_date", // 掲載日
        "url",          // 記事URL（外部リンク）
        "description",  // 記事概要
        "createdAt",
        "updatedAt",
        "publishedAt",
        "revisedAt",
      ],
      limit: 100,
    },
  }),
  schema: z.object({
    id: z.string(),
    title: z.string().optional(),         // 空の場合は「無題」を表示
    media_name: z.string().optional(),    // 空の場合は「メディア名未定」を表示
    publish_date: z.string().optional(),  // 空の場合は非表示
    url: z.string().url().optional(),
    description: z.string().optional(),   // 空の場合は非表示
    createdAt: z.string().optional(),
    updatedAt: z.string().optional(),
    publishedAt: z.string().optional(),
    revisedAt: z.string().optional(),
  }),
});

// =============================================================================
// コレクションのエクスポート
// =============================================================================

/**
 * 注意: FAQとスポンサーについて
 * 
 * FAQとスポンサーは「pages」シングルトンエンドポイント内の
 * リピーターフィールドとして定義されています。
 * これらは独立したリストエンドポイントではないため、
 * microcms.tsのgetPages()関数を使用してアクセスしてください。
 */

export const collections = {
  /** 講演会コレクション */
  lectures: lectureCollection,
  /** メンバーコレクション */
  members: memberCollection,
  /** 今後のイベントコレクション */
  upcoming_events: upcomingEventCollection,
  /** メディア掲載コレクション */
  media_coverage: mediaCoverageCollection,
};
