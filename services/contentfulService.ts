
export async function fetchEntries({ 
  contentType = process.env.CONTENTFUL_CONTENT_TYPE || 'blogPage',
  locale = 'en' 
} = {}) {
  const SPACE = process.env.CONTENTFUL_SPACE_ID;
  const ENV = process.env.CONTENTFUL_ENVIRONMENT || 'master';
  const TOKEN = process.env.CONTENTFUL_DELIVERY_TOKEN;
  
  // Safety Check: If env vars are missing (like in preview), return null to trigger fallback
  if (!SPACE || !TOKEN) {
    console.warn("Contentful credentials missing. Using static fallback.");
    return null; // BlogList handles this null by loading static data
  }

  // Map app locales to Contentful locales
  // 'en' usually needs to correspond to 'en-US' in default Contentful setups.
  const contentfulLocale = locale === 'en' ? 'en-US' : locale;

  const typeQuery = contentType ? `&content_type=${encodeURIComponent(contentType)}` : '';
  
  // Crucial fix: added &locale= parameter
  const url = `https://cdn.contentful.com/spaces/${SPACE}/environments/${ENV}/entries?access_token=${TOKEN}${typeQuery}&include=2&locale=${contentfulLocale}`;
  
  const res = await fetch(url);
  if (!res.ok) throw new Error(`Contentful fetch error ${res.status}`);
  return res.json();
}
