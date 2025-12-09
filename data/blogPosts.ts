
import { BlogPost, ArticleMaster, LOCALE_DATA } from '../types';

// ==============================================================================
// 1. IMPORT YOUR ARTICLES HERE
// ==============================================================================
import { INSTAGRAM_BIO_HACKS } from './articles/instagramBioHacks';
import { EMOJI_CREATION_SECRETS } from './articles/emojiCreationSecrets';
import { EMOJI_MARKETING_GUIDE } from './articles/emojiMarketingGuide';
import { SOCIAL_MEDIA_EMOJI_ENGAGEMENT } from './articles/socialMediaEmojiEngagement';
import { EMOJIS_AND_SEO } from './articles/emojisAndSeo';
import { INSTAGRAM_MARKETING_2026 } from './articles/instagramMarketing2026';
import { INSTAGRAM_MARKETING_MISTAKES_2026 } from './articles/instagramMarketingMistakes2026';
import { KAOMOJI_ENGAGEMENT_SEO } from './articles/kaomojiEngagementSEO';
import { KAOMOJI_MARKETING_GUIDE } from './articles/kaomojiMarketingGuide';
import { INSTAGRAM_SEO_2026 } from './articles/instagramSEO2026';
import { NEW_YEAR_POEMS_2026 } from './articles/newYearPoems2026';
import { NEW_YEAR_COLLEAGUES_2026 } from './articles/newYearColleagues2026';
import { NEW_YEAR_WORKPLACE_SONGS_2026 } from './articles/newYearWorkplaceSongs2026';
import { NEW_YEAR_LYRICS_2026 } from './articles/newYearLyrics2026';
import { YEAR_OF_THE_FIRE_HORSE_2026 } from './articles/yearOfTheFireHorse2026/index'; // Updated path


// ==============================================================================
// 2. REGISTER THEM IN THIS LIST
// ==============================================================================
const ARTICLES_LIST: ArticleMaster[] = [
  YEAR_OF_THE_FIRE_HORSE_2026,
  INSTAGRAM_BIO_HACKS,
  EMOJI_CREATION_SECRETS,
  EMOJI_MARKETING_GUIDE,
  SOCIAL_MEDIA_EMOJI_ENGAGEMENT,
  EMOJIS_AND_SEO,
  INSTAGRAM_MARKETING_2026,
  INSTAGRAM_MARKETING_MISTAKES_2026,
  KAOMOJI_ENGAGEMENT_SEO,
  KAOMOJI_MARKETING_GUIDE,
  INSTAGRAM_SEO_2026,
  NEW_YEAR_POEMS_2026,
  NEW_YEAR_COLLEAGUES_2026,
  NEW_YEAR_WORKPLACE_SONGS_2026,
  NEW_YEAR_LYRICS_2026
];


// ==============================================================================
// SYSTEM LOGIC (DO NOT TOUCH BELOW)
// This converts your single-file articles into the format the app needs.
// ==============================================================================
export const BLOG_POSTS: BlogPost[] = [];

ARTICLES_LIST.forEach((article, index) => {
  // 1. Safety Check: Ensure the article object exists and has essential data
  if (!article || !article.slug || !article.locales) {
    console.warn(`⚠️ Article at index ${index} is missing a slug or locales. Skipped.`);
    return;
  }

  // 2. Iterate through all supported languages in the app
  LOCALE_DATA.forEach(localeInfo => {
    const loc = localeInfo.code;
    
    // 3. Fallback Logic:
    // If translation exists for 'loc', use it.
    // If not, try 'en' (English).
    // If neither exists, skip this language for this article.
    const content = article.locales[loc] || article.locales['en'];
    
    if (content) {
      BLOG_POSTS.push({
        id: `${article.slug}-${loc}`,
        slug: article.slug,
        locale: loc,
        
        // Content Data
        title: content.title || 'Untitled Post',
        seoTitle: content.seoTitle || content.title || 'Untitled Post', // Fallback to title if SEO title missing
        excerpt: content.excerpt || '',
        seoDescription: content.seoDescription || content.excerpt || '', // Fallback to excerpt
        content: Array.isArray(content.content) ? content.content : [], // Ensure content is array

        // Metadata
        category: article.category || 'General',
        date: "2024", 
        readTime: "5 min", 
        
        // Visuals
        image: article.image,
        imageAlt: content.title,
        imageGradient: article.gradient || 'from-gray-500 to-slate-500',
      });
    }
  });
});
    