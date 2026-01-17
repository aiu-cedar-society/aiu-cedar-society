/**
 * UI翻訳ファイル - ウェブサイトの静的テキスト翻訳
 * 
 * このファイルはサイト全体で使用する静的なテキストの翻訳を管理します。
 * MicroCMSから取得する動的コンテンツ（講演会タイトルなど）は、
 * CMS側で「_en」フィールドを追加して対応してください。
 * 
 * @description
 * 新しい翻訳を追加する方法:
 * 1. 'ja' オブジェクトに日本語テキストを追加
 * 2. 'en' オブジェクトに同じキーで英語テキストを追加
 * 3. キーは「カテゴリ.項目」の形式で命名（例: 'nav.about'）
 * 
 * @example
 * // コンポーネントでの使用方法
 * import { useTranslations } from '../i18n/utils';
 * const t = useTranslations('ja');
 * console.log(t('nav.about')); // 'About'
 */

// =============================================================================
// 言語設定
// =============================================================================

/**
 * 対応言語の定義
 * 
 * 新しい言語を追加する場合は、ここにエントリを追加し、
 * 下のuiオブジェクトにも対応する翻訳を追加してください。
 */
export const languages = {
    /** 日本語（デフォルト言語） */
    ja: '日本語',
    /** 英語 */
    en: 'English',
} as const;

/**
 * デフォルト言語
 * 
 * URLに言語パスが含まれない場合に使用される言語です。
 * 例: /about → 日本語、/en/about → 英語
 */
export const defaultLang = 'ja' as const;

/**
 * 言語コードの型
 * 'ja' | 'en' のいずれか
 */
export type Lang = keyof typeof languages;

// =============================================================================
// 翻訳定義
// =============================================================================

/**
 * UI翻訳オブジェクト
 * 
 * 翻訳キーは以下のカテゴリに分類されています:
 * - nav: ナビゲーション関連
 * - menu: モバイルメニュー関連
 * - header: ヘッダー関連
 * - footer: フッター関連
 * - common: 共通のUI要素
 * - home: ホームページ固有
 * - about: Aboutページ固有
 * - history: 沿革ページ固有
 * - members: メンバーページ固有
 * - events: イベントページ固有
 * - faq: FAQページ固有
 * - sponsors: スポンサーページ固有
 * - media: メディア掲載ページ固有
 * - contact: お問い合わせページ固有
 * - speakerRequest: 講演者リクエストページ固有
 */
export const ui = {
    // ===========================================================================
    // 日本語翻訳
    // ===========================================================================
    ja: {
        // -------------------------------------------------------------------------
        // ナビゲーション
        // 
        // サイト上部のメニューやリンクで使用するテキスト
        // -------------------------------------------------------------------------
        'nav.about': 'About',
        'nav.about.us': '私たちについて',
        'nav.about.history': '設立の経緯',
        'nav.about.members': 'メンバー紹介',
        'nav.events': 'Events',
        'nav.events.upcoming': '今後の予定',
        'nav.events.past': '過去の講演会',
        'nav.media': 'Media',
        'nav.faq': 'FAQ',
        'nav.sponsors': 'Sponsors',
        'nav.contact': 'Contact',
        'nav.request': 'Request',

        // -------------------------------------------------------------------------
        // モバイルメニュー
        // 
        // スマートフォン表示時のハンバーガーメニュー内で使用
        // -------------------------------------------------------------------------
        'menu.title': 'Menu',
        'menu.about': 'About',
        'menu.events': 'Events',
        'menu.more': 'More',
        'menu.speakerRequest': '講演者リクエスト',
        'menu.speakerRequest.desc': '講演者をリクエスト',

        // -------------------------------------------------------------------------
        // ヘッダー
        // -------------------------------------------------------------------------
        'header.siteName': 'AIU Cedar Society',

        // -------------------------------------------------------------------------
        // フッター
        // -------------------------------------------------------------------------
        'footer.title': 'AIU Cedar Society',
        'footer.description': '秋田国際教養大学公認団体',
        'footer.copyright': '© 2024 AIU Cedar Society. All rights reserved.',
        'footer.instagram': 'Instagramをフォロー',

        // -------------------------------------------------------------------------
        // 共通UI要素
        // 
        // サイト全体で繰り返し使用されるボタンやラベル
        // -------------------------------------------------------------------------
        'common.backToTop': 'トップに戻る',
        'common.viewAll': 'すべて見る',
        'common.viewDetails': '詳しく見る',
        'common.readMore': '続きを読む',
        'common.contact': 'お問い合わせ',
        'common.submit': '送信する',
        'common.required': '必須',
        'common.optional': '任意',

        // -------------------------------------------------------------------------
        // ホームページ
        // -------------------------------------------------------------------------
        'home.hero.title1': '秋田とAIU生の可能性を',
        'home.hero.title2': 'つなぐ',
        'home.hero.description': 'AIU Cedar Societyは、学生の熱意と秋田社会の架け橋となります。「出会い・学び・実践」のサイクルを創り出し、秋田の地で新たな価値を生み出していきます。',
        'home.upcoming': '今後の予定',
        'home.recentLectures': '直近の講演会',
        'home.viewAllLectures': 'すべての講演会を見る',
        'home.viewAllEvents': 'すべての予定を見る',

        // -------------------------------------------------------------------------
        // Aboutページ
        // -------------------------------------------------------------------------
        'about.title': '私たちについて',
        'about.subtitle': 'AIU Cedar Societyの活動紹介',

        // -------------------------------------------------------------------------
        // 沿革ページ
        // -------------------------------------------------------------------------
        'history.title': '設立の経緯',
        'history.subtitle': 'AIU Cedar Societyがどのように始まったか',

        // -------------------------------------------------------------------------
        // メンバーページ
        // -------------------------------------------------------------------------
        'members.title': 'メンバー紹介',
        'members.subtitle': 'AIU Cedar Societyのメンバーを紹介します',
        'members.currentStudents': '在校生',
        'members.graduates': '卒業生',

        // -------------------------------------------------------------------------
        // イベントページ
        // -------------------------------------------------------------------------
        'events.upcoming.title': '今後の予定',
        'events.upcoming.subtitle': '開催予定のイベント情報',
        'events.past.title': '講演会アーカイブ',
        'events.past.subtitle': '過去に開催した講演会の記録',

        // -------------------------------------------------------------------------
        // FAQページ
        // -------------------------------------------------------------------------
        'faq.title': 'よくあるご質問',
        'faq.subtitle': 'AIU Cedar Societyに関するよくあるご質問をまとめました',
        'faq.notFound.title': 'お探しの質問が見つかりませんか？',
        'faq.notFound.description': 'その他のご質問やご不明な点がございましたら、お気軽にお問い合わせください。',

        // -------------------------------------------------------------------------
        // スポンサーページ
        // -------------------------------------------------------------------------
        'sponsors.title': '協賛企業',
        'sponsors.subtitle': 'AIU Cedar Societyの活動を支援してくださる企業・団体',

        // -------------------------------------------------------------------------
        // メディア掲載ページ
        // -------------------------------------------------------------------------
        'media.title': 'メディア掲載',
        'media.subtitle': 'AIU Cedar Societyのメディア掲載情報',

        // -------------------------------------------------------------------------
        // お問い合わせページ
        // -------------------------------------------------------------------------
        'contact.title': 'お問い合わせ',
        'contact.subtitle': 'ご質問やご意見がございましたら、お気軽にお問い合わせください',
        'contact.form.name': 'お名前',
        'contact.form.email': 'メールアドレス',
        'contact.form.subject': '件名',
        'contact.form.message': 'メッセージ',
        'contact.form.submit': '送信する',

        // -------------------------------------------------------------------------
        // 講演者リクエストページ
        // -------------------------------------------------------------------------
        'speakerRequest.title': '講演者リクエスト',
        'speakerRequest.subtitle': '講演会に呼んでほしい方をリクエストできます',
        'speakerRequest.form.speaker': '希望する講演者',
        'speakerRequest.form.reason': '理由・背景',
        'speakerRequest.form.topic': '講演テーマ',
        'speakerRequest.form.other': 'その他',
    },

    // ===========================================================================
    // 英語翻訳
    // ===========================================================================
    en: {
        // -------------------------------------------------------------------------
        // Navigation
        // -------------------------------------------------------------------------
        'nav.about': 'About',
        'nav.about.us': 'About Us',
        'nav.about.history': 'Our History',
        'nav.about.members': 'Members',
        'nav.events': 'Events',
        'nav.events.upcoming': 'Upcoming Events',
        'nav.events.past': 'Past Lectures',
        'nav.media': 'Media',
        'nav.faq': 'FAQ',
        'nav.sponsors': 'Sponsors',
        'nav.contact': 'Contact',
        'nav.request': 'Request',

        // -------------------------------------------------------------------------
        // Mobile Menu
        // -------------------------------------------------------------------------
        'menu.title': 'Menu',
        'menu.about': 'About',
        'menu.events': 'Events',
        'menu.more': 'More',
        'menu.speakerRequest': 'Speaker Request',
        'menu.speakerRequest.desc': 'Request a speaker',

        // -------------------------------------------------------------------------
        // Header
        // -------------------------------------------------------------------------
        'header.siteName': 'AIU Cedar Society',

        // -------------------------------------------------------------------------
        // Footer
        // -------------------------------------------------------------------------
        'footer.title': 'AIU Cedar Society',
        'footer.description': 'Official Student Organization at Akita International University',
        'footer.copyright': '© 2024 AIU Cedar Society. All rights reserved.',
        'footer.instagram': 'Follow us on Instagram',

        // -------------------------------------------------------------------------
        // Common UI Elements
        // -------------------------------------------------------------------------
        'common.backToTop': 'Back to Top',
        'common.viewAll': 'View All',
        'common.viewDetails': 'View Details',
        'common.readMore': 'Read More',
        'common.contact': 'Contact Us',
        'common.submit': 'Submit',
        'common.required': 'Required',
        'common.optional': 'Optional',

        // -------------------------------------------------------------------------
        // Home Page
        // -------------------------------------------------------------------------
        'home.hero.title1': 'Connecting Akita and AIU Students',
        'home.hero.title2': 'Possibilities',
        'home.hero.description': 'AIU Cedar Society bridges student enthusiasm with Akita society. We create a cycle of "encounter, learn, and practice," generating new value in Akita.',
        'home.upcoming': 'Upcoming Events',
        'home.recentLectures': 'Recent Lectures',
        'home.viewAllLectures': 'View All Lectures',
        'home.viewAllEvents': 'View All Events',

        // -------------------------------------------------------------------------
        // About Page
        // -------------------------------------------------------------------------
        'about.title': 'About Us',
        'about.subtitle': 'Learn about AIU Cedar Society activities',

        // -------------------------------------------------------------------------
        // History Page
        // -------------------------------------------------------------------------
        'history.title': 'Our History',
        'history.subtitle': 'How AIU Cedar Society began',

        // -------------------------------------------------------------------------
        // Members Page
        // -------------------------------------------------------------------------
        'members.title': 'Our Members',
        'members.subtitle': 'Meet the AIU Cedar Society team',
        'members.currentStudents': 'Current Students',
        'members.graduates': 'Alumni',

        // -------------------------------------------------------------------------
        // Events Pages
        // -------------------------------------------------------------------------
        'events.upcoming.title': 'Upcoming Events',
        'events.upcoming.subtitle': 'Information about upcoming events',
        'events.past.title': 'Lecture Archive',
        'events.past.subtitle': 'Records of past lectures',

        // -------------------------------------------------------------------------
        // FAQ Page
        // -------------------------------------------------------------------------
        'faq.title': 'Frequently Asked Questions',
        'faq.subtitle': 'Common questions about AIU Cedar Society',
        'faq.notFound.title': "Can't find what you're looking for?",
        'faq.notFound.description': 'If you have any other questions, please feel free to contact us.',

        // -------------------------------------------------------------------------
        // Sponsors Page
        // -------------------------------------------------------------------------
        'sponsors.title': 'Our Sponsors',
        'sponsors.subtitle': 'Organizations supporting AIU Cedar Society',

        // -------------------------------------------------------------------------
        // Media Page
        // -------------------------------------------------------------------------
        'media.title': 'Media Coverage',
        'media.subtitle': 'AIU Cedar Society in the news',

        // -------------------------------------------------------------------------
        // Contact Page
        // -------------------------------------------------------------------------
        'contact.title': 'Contact Us',
        'contact.subtitle': 'Feel free to reach out with any questions or feedback',
        'contact.form.name': 'Name',
        'contact.form.email': 'Email',
        'contact.form.subject': 'Subject',
        'contact.form.message': 'Message',
        'contact.form.submit': 'Submit',

        // -------------------------------------------------------------------------
        // Speaker Request Page
        // -------------------------------------------------------------------------
        'speakerRequest.title': 'Speaker Request',
        'speakerRequest.subtitle': 'Request a speaker for our lecture series',
        'speakerRequest.form.speaker': 'Requested Speaker',
        'speakerRequest.form.reason': 'Reason',
        'speakerRequest.form.topic': 'Suggested Topic',
        'speakerRequest.form.other': 'Other Comments',
    },
} as const;

// =============================================================================
// 型定義のエクスポート
// =============================================================================

/**
 * 翻訳キーの型
 * 
 * useTranslations関数で使用できるキーの一覧を型として定義
 */
export type TranslationKey = keyof typeof ui.ja;
