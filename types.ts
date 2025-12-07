
export type Locale = 
  | 'en' | 'es' | 'ru' | 'zh' | 'ko' | 'ja' 
  | 'fr' | 'it' | 'kk' | 'ar' | 'hi' | 'pt' | 'de';

export interface EmojiRaw {
  hexcode: string;      // Unique identifier in emojibase
  emoji: string;        // The actual char
  label: string;        // Name in selected language
  baseLabel?: string;   // Original English name (for reference/search)
  tags?: string[];      // Keywords for search
  searchTags?: string;  // COMBINED keywords from ALL languages for universal search
  group: number;        // ID for category
  subgroup?: number;
  skins?: EmojiRaw[];   // Skin tone variants
  version?: number;     // Unicode version
}

export interface EmojiGroup {
  groupName: string;
  emojis: EmojiRaw[];
}

export interface KaomojiItem {
  text: string;       // The kaomoji string
  meaning: string;    // Specific meaning (e.g., "Blushing Smile")
  tags: string[];     // Search tags (e.g., "shy", "happy")
  keywords: string;   // Multilingual search string
}

export interface KaomojiGroup {
  name: string;
  items: KaomojiItem[];
}

export type CategoryId = 
  | 'Smileys & Emotion'
  | 'People & Body'
  | 'Animals & Nature'
  | 'Food & Drink'
  | 'Travel & Places'
  | 'Activities'
  | 'Objects'
  | 'Symbols'
  | 'Flags';

export const GROUP_NAMES: Record<number, string> = {
  0: 'Smileys & Emotion',
  1: 'People & Body',
  2: 'Component',
  3: 'Animals & Nature',
  4: 'Food & Drink',
  5: 'Travel & Places',
  6: 'Activities',
  7: 'Objects',
  8: 'Symbols',
  9: 'Flags',
};

export const LOCALE_DATA: { code: Locale; label: string; flag: string }[] = [
  { code: 'en', label: 'English', flag: '🇺🇸' },
  { code: 'es', label: 'Español', flag: '🇪🇸' },
  { code: 'ru', label: 'Русский', flag: '🇷🇺' },
  { code: 'fr', label: 'Français', flag: '🇫🇷' },
  { code: 'it', label: 'Italiano', flag: '🇮🇹' },
  { code: 'de', label: 'Deutsch', flag: '🇩🇪' },
  { code: 'pt', label: 'Português', flag: '🇧🇷' },
  { code: 'zh', label: '中文', flag: '🇨🇳' },
  { code: 'ja', label: '日本語', flag: '🇯🇵' },
  { code: 'ko', label: '한국어', flag: '🇰🇷' },
  { code: 'hi', label: 'हिन्दी', flag: '🇮🇳' },
  { code: 'ar', label: 'العربية', flag: '🇸🇦' },
  { code: 'kk', label: 'Қазақ', flag: '🇰🇿' },
];

// The flattened structure used by the Application UI
export interface BlogPost {
  id: string;
  slug: string; 
  locale: Locale;
  title: string;
  seoTitle?: string;
  category: string;
  excerpt: string;
  seoDescription?: string;
  content: string[]; 
  date?: string;     
  readTime?: string; 
  imageGradient: string; 
  image?: string;    
  imageAlt?: string; 
  richText?: any;
  _raw?: any;
}

// =====================================================================
// SINGLE FILE STRUCTURE (Use this for new articles)
// =====================================================================

export interface ArticleContent {
  title: string;
  seoTitle?: string;        // <title> tag
  excerpt: string;
  seoDescription?: string;  // <meta name="description">
  content: string[];        // Array of paragraphs. Use '## ' for H2 headers.
}

export interface ArticleMaster {
  slug: string;             // URL part (e.g. 'my-post')
  image: string;            // Cover image URL
  category: string;         // Updated to string to allow dynamic new categories
  gradient?: string;        // Fallback CSS gradient
  locales: Partial<Record<Locale, ArticleContent>>; // Translations
}
