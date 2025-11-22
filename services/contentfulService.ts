// services/contentfulService.ts
export type CFEntry = {
  id: string;
  title: string;
  body: any;
  imageUrl?: string | null;
  recommended?: { id: string; title: string }[];
};

const SPACE = process.env.CONTENTFUL_SPACE_ID || process.env.REACT_APP_CONTENTFUL_SPACE_ID;
const ENV = process.env.CONTENTFUL_ENVIRONMENT || process.env.REACT_APP_CONTENTFUL_ENVIRONMENT || 'master';
const TOKEN = process.env.CONTENTFUL_DELIVERY_TOKEN || process.env.REACT_APP_CONTENTFUL_DELIVERY_TOKEN;
const CONTENT_TYPE = process.env.CONTENTFUL_CONTENT_TYPE || process.env.REACT_APP_CONTENTFUL_CONTENT_TYPE || '';

function buildUrl(contentType?: string) {
  const typeQuery = contentType ? `&content_type=${encodeURIComponent(contentType)}` : '';
  return `https://cdn.contentful.com/spaces/${SPACE}/environments/${ENV}/entries?access_token=${TOKEN}${typeQuery}&include=2`;
}

function resolveAssetUrl(asset: any): string | null {
  if (!asset || !asset.fields || !asset.fields.file) return null;
  const url: string = asset.fields.file.url || '';
  return url.startsWith('http') ? url : 'https:' + url;
}

export async function fetchEntries({ contentType = CONTENT_TYPE }: { contentType?: string } = {}): Promise<CFEntry[]> {
  const url = buildUrl(contentType);
  const res = await fetch(url);
  if (!res.ok) {
    const txt = await res.text().catch(() => '');
    throw new Error(`Contentful fetch error ${res.status}: ${txt}`);
  }
  const json = await res.json();
  const assets = (json.includes && json.includes.Asset) || [];
  const includesEntries = (json.includes && json.includes.Entry) || [];

  const items = (json.items || []).map((item: any) => {
    const f = item.fields || {};
    let imageUrl: string | null = null;
    if (f.image && f.image.sys && f.image.sys.id) {
      const asset = assets.find((a: any) => a.sys.id === f.image.sys.id);
      imageUrl = resolveAssetUrl(asset);
    }
    const recommended = (f.recommendedPosts || []).map((ref: any) => {
      const e = includesEntries.find((x: any) => x.sys.id === ref.sys.id);
      if (!e) return null;
      return { id: e.sys.id, title: e.fields?.title || '' };
    }).filter(Boolean);

    return {
      id: item.sys.id,
      title: f.title || '',
      body: f.body || null,
      imageUrl,
      recommended,
    } as CFEntry;
  });

  return items;
}
