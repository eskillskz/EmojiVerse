import { EmojiRaw, EmojiGroup, Locale, GROUP_NAMES, LOCALE_DATA } from '../types';
import { FALLBACK_EMOJIS } from '../data/fallback';

// Using Emojibase CDN for localized data
const BASE_URL = 'https://cdn.jsdelivr.net/npm/emojibase-data@7';

// Canvas context for checking emoji support
let ctx: CanvasRenderingContext2D | null = null;

/**
 * Checks if an emoji is supported by the current browser/OS.
 */
const isEmojiSupported = (char: string): boolean => {
  if (typeof document === 'undefined') return true; // SSR safety

  if (!ctx) {
    const canvas = document.createElement('canvas');
    canvas.width = 1;
    canvas.height = 1;
    ctx = canvas.getContext('2d', { willReadFrequently: true });
  }

  if (!ctx) return true;

  const fontSize = 16;
  ctx.font = `${fontSize}px "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji", "Android Emoji", sans-serif`;
  
  const measure = ctx.measureText(char);
  
  if (measure.width === 0) return false;
  if (char.length > 2 && measure.width > fontSize * 2.5) {
    return false;
  }

  return true;
};

/**
 * Fetches emoji data.
 * STRATEGY:
 * 1. Fetch the requested 'locale' immediately to render the UI fast.
 * 2. Concurrently fetch ALL other supported locales.
 * 3. Merge ALL tags/labels from ALL languages into a single 'searchTags' string on the emoji object.
 *    This ensures universal search works regardless of selected language.
 */
export const fetchEmojis = async (locale: Locale = 'en'): Promise<EmojiGroup[]> => {
  try {
    let primaryLocale = locale;
    if (locale === 'kk') primaryLocale = 'ru'; // Fallback Kazakh to Russian for Emojibase

    // 1. Fetch Primary Locale (Display Language)
    const primaryResponse = await fetch(`${BASE_URL}/${primaryLocale}/data.json`);
    
    if (!primaryResponse.ok) {
      console.warn(`Locale ${locale} not found, falling back to English data.`);
      return fetchEmojis('en');
    }

    const primaryData: EmojiRaw[] = await primaryResponse.json();
    
    // Map hexcode -> EmojiRaw for easy access
    const emojiMap = new Map<string, EmojiRaw>();
    primaryData.forEach(e => {
      e.searchTags = (e.label || '').toLowerCase(); // Initialize with own label
      if (e.tags) e.searchTags += ' ' + e.tags.join(' ').toLowerCase();
      emojiMap.set(e.hexcode, e);
    });

    // 2. Fetch All Other Locales (Background / Concurrent)
    // We do this to populate 'searchTags' with keywords from every language
    const otherLocales = LOCALE_DATA
      .map(l => (l.code === 'kk' ? 'ru' : l.code)) // Handle mapping
      .filter(code => code !== primaryLocale); // Exclude current
    
    // Remove duplicates (e.g. if multiple map to 'ru')
    const uniqueLocales = [...new Set(otherLocales)];

    const fetchPromises = uniqueLocales.map(code => 
      fetch(`${BASE_URL}/${code}/data.json`)
        .then(res => res.ok ? res.json() : [])
        .catch(() => []) // Ignore errors for individual languages
    );

    // Wait for all to finish. 
    // NOTE: In a production app with 20+ langs, we might want to do this progressively,
    // but for 12 langs, it's manageable (~1MB total) and ensures "immediate" finding as requested.
    const allOtherData = await Promise.all(fetchPromises);

    // 3. Merge Data
    allOtherData.forEach((localeData: EmojiRaw[]) => {
      localeData.forEach(foreignEmoji => {
        const target = emojiMap.get(foreignEmoji.hexcode);
        if (target) {
          // Append Label
          if (foreignEmoji.label) {
            target.searchTags += ' ' + foreignEmoji.label.toLowerCase();
          }
          // Append Tags
          if (foreignEmoji.tags) {
            target.searchTags += ' ' + foreignEmoji.tags.join(' ').toLowerCase();
          }
        }
      });
    });

    return processEmojiData(primaryData);

  } catch (error) {
    console.warn(`Failed to fetch emojis for locale ${locale}, using fallback.`, error);
    return processEmojiData(FALLBACK_EMOJIS);
  }
};

const processEmojiData = (data: EmojiRaw[]): EmojiGroup[] => {
  const groups: Record<string, EmojiRaw[]> = {};
  
  // Initialize groups order
  Object.values(GROUP_NAMES).forEach(name => {
    if (name !== 'Component') groups[name] = [];
  });

  data.forEach(emoji => {
    if (!isEmojiSupported(emoji.emoji)) return;

    const groupName = GROUP_NAMES[emoji.group];
    if (!groupName || groupName === 'Component') return;

    // Process variants/skins
    if (emoji.skins) {
      emoji.skins = emoji.skins.filter(skin => isEmojiSupported(skin.emoji));
    }

    if (groups[groupName]) {
      groups[groupName].push(emoji);
    }
  });

  return Object.entries(groups)
    .filter(([_, list]) => list.length > 0)
    .map(([groupName, emojis]) => ({
      groupName,
      emojis
    }));
};
