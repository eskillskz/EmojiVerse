
import { createClient, Entry } from 'contentful';
import { BlogPost, Locale } from '../types';
import { BLOG_POSTS as FALLBACK_POSTS } from '../data/blogPosts';

// Initialize Contentful Client
// Note: These environment variables must be set in your Netlify dashboard
const spaceId = process.env.CONTENTFUL_SPACE_ID;
const accessToken = process.env.CONTENTFUL_DELIVERY_TOKEN;
const environment = process.env.CONTENTFUL_ENVIRONMENT || 'master';

const client = (spaceId && accessToken) 
  ? createClient({
      space: spaceId,
      accessToken: accessToken,
      environment: environment,
    })
  : null;

// Helper to resolve image URLs from Contentful assets
const getImageUrl = (asset: any): string | undefined => {
  if (asset?.fields?.file?.url) {
    return `https:${asset.fields.file.url}`;
  }
  return undefined;
};

// Helper to map Contentful Entry to our BlogPost interface
const mapEntryToPost = (entry: Entry<any>, locale: Locale): BlogPost => {
  const fields = entry.fields;
  
  return {
    id: entry.sys.id,
    slug: fields.slug || entry.sys.id, // Assuming there is a slug field, else use ID
    locale: locale,
    title: fields.title || 'Untitled',
    excerpt: fields.excerpt || '', // Assuming an excerpt field exists
    content: [], // Legacy field, left empty for Contentful posts
    richText: fields.body, // The Rich Text Document
    imageUrl: getImageUrl(fields.image),
    imageGradient: 'from-indigo-500 to-purple-500', // Fallback
    recommendedPosts: fields.recommendedPosts 
      ? fields.recommendedPosts.map((ref: any) => mapEntryToPost(ref, locale))
      : []
  };
};

export const fetchContentfulPosts = async (locale: Locale): Promise<BlogPost[]> => {
  if (!client) {
    console.warn("Contentful credentials missing. Using local fallback data.");
    // Filter local data by locale as before
    return FALLBACK_POSTS.filter(p => p.locale === locale || p.locale === 'en');
  }

  try {
    const response = await client.getEntries({
      content_type: 'blogPost', // Ensure this ID matches your Contentful Content Type ID
      include: 2, // Depth to resolve linked recommendedPosts
      // Note: Contentful localization usually works by fetching the specific locale
      // We map our app locale codes to Contentful locale codes if they differ
      locale: locale === 'en' ? 'en-US' : locale, 
    });

    const posts = response.items.map(item => mapEntryToPost(item, locale));
    
    if (posts.length === 0) {
        return FALLBACK_POSTS.filter(p => p.locale === locale);
    }

    return posts;
  } catch (error) {
    console.error("Error fetching from Contentful:", error);
    return FALLBACK_POSTS.filter(p => p.locale === locale);
  }
};
