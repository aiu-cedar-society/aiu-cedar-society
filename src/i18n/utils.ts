/**
 * i18n Utility Functions
 * 
 * Helper functions for language detection, translation, and URL handling.
 */

import { ui, defaultLang, type Lang, languages } from './ui';

/**
 * Get the current language from a URL
 */
export function getLangFromUrl(url: URL): Lang {
    const [, lang] = url.pathname.split('/');
    if (lang in languages) {
        return lang as Lang;
    }
    return defaultLang;
}

/**
 * Get translation function for a specific language
 */
export function useTranslations(lang: Lang) {
    return function t(key: keyof typeof ui[typeof defaultLang]): string {
        return ui[lang][key] || ui[defaultLang][key];
    };
}

/**
 * Get the alternate language
 */
export function getAlternateLang(currentLang: Lang): Lang {
    return currentLang === 'ja' ? 'en' : 'ja';
}

/**
 * Get the URL for the alternate language version of the current page
 */
export function getAlternateUrl(url: URL, targetLang: Lang): string {
    const currentLang = getLangFromUrl(url);
    let pathname = url.pathname;

    // Remove current language prefix if present
    if (currentLang === 'en') {
        pathname = pathname.replace(/^\/en/, '') || '/';
    }

    // Add target language prefix if not default
    if (targetLang === 'en') {
        pathname = '/en' + (pathname === '/' ? '' : pathname);
    }

    return pathname;
}

/**
 * Get localized path
 */
export function getLocalizedPath(path: string, lang: Lang): string {
    // Ensure path starts with /
    const normalizedPath = path.startsWith('/') ? path : `/${path}`;

    if (lang === defaultLang) {
        return normalizedPath;
    }

    return `/${lang}${normalizedPath === '/' ? '' : normalizedPath}`;
}

/**
 * Check if current page is in English
 */
export function isEnglish(url: URL): boolean {
    return getLangFromUrl(url) === 'en';
}

/**
 * Get language display name
 */
export function getLanguageName(lang: Lang): string {
    return languages[lang];
}

/**
 * Format date based on language
 */
export function formatDate(date: Date | string, lang: Lang): string {
    const d = typeof date === 'string' ? new Date(date) : date;

    if (lang === 'en') {
        return d.toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
        });
    }

    return d.toLocaleDateString('ja-JP', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
    });
}

/**
 * Format date with time based on language
 */
export function formatDateTime(date: Date | string, lang: Lang): string {
    const d = typeof date === 'string' ? new Date(date) : date;

    if (lang === 'en') {
        return d.toLocaleString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit',
            timeZone: 'Asia/Tokyo',
        });
    }

    return d.toLocaleString('ja-JP', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
        timeZone: 'Asia/Tokyo',
    });
}
