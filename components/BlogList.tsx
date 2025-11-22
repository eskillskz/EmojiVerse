// components/BlogList.tsx
import React, { useEffect, useState } from 'react';
import { BlogPost as LocalBlogPost, Locale } from '../types';
import { ArrowRight, BookOpen, Home } from 'lucide-react';
import { UI_LABELS } from '../data/uiTranslations';
import { fetchEntries } from '../services/contentfulService';

interface BlogListProps {
  locale: Locale;
  onReadPost: (post: LocalBlogPost) => void;
  onBackToHome: () => void;
}

const BlogList: React.FC<BlogListProps> = ({ locale, onReadPost, onBackToHome }) => {
  const [postsRaw, setPostsRaw] = useState<any[] | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let mounted = true;
    setLoading(true);
    (async () => {
      try {
        // fetchEntries возвращает [{id, title, body, imageUrl, recommended, ...}]
        const data = await fetchEntries();
        if (!mounted) return;
        setPostsRaw(data);
        setLoading(false);
      } catch (e: any) {
        if (!mounted) return;
        console.error('Contentful fetch error', e);
        setError(e.message || 'Fetch error');
        setLoading(false);
      }
    })();
    return () => { mounted = false; };
  }, []);

  if (loading) return <div className="py-8">Loading posts…</div>;
  if (error) return <div className="py-8 text-red-600">Error: {error}</div>;
  if (!postsRaw || postsRaw.length === 0) return <div className="py-8">No posts found.</div>;

  // Мапим данные из Contentful в формат LocalBlogPost, который ждёт BlogPost.tsx
  const mapToLocal = (p: any): LocalBlogPost => {
    // content: стараемся получить массив параграфов
    let contentArr: string[] = [''];
    if (p.body) {
      if (typeof p.body === 'string') {
        contentArr = [p.body];
      } else {
        // простая рекурсивная выборка текста из rich text
        const gather = (node: any): string => {
          if (!node) return '';
          if (typeof node === 'string') return node;
          if (Array.isArray(node)) return node.map(gather).join('');
          if (node.value) return node.value;
          if (node.content) return gather(node.content);
          return '';
        };
        const text = gather(p.body);
        contentArr = [text || ''];
      }
    }

    // excerpt: короткий текст для карточки
    const excerpt = (p.body && typeof p.body === 'string')
      ? (p.body.length > 220 ? p.body.slice(0, 220) + '…' : p.body)
      : (p.body ? (JSON.stringify(p.body).slice(0, 220) + (JSON.stringify(p.body).length > 220 ? '…' : '')) : '');

    const uiPost: LocalBlogPost = {
      id: p.id,
      slug: p.id,
      locale: p.sys?.locale || 'en',
      title: p.title || 'Untitled',
      excerpt: excerpt || '',
      imageGradient: p.imageGradient || 'from-indigo-400 to-purple-500',
      content: contentArr,
      // если BlogPost ожидает дополнительные поля — они остаются в _raw
      _raw: p
    } as unknown as LocalBlogPost;

    // добавим поле imageUrl, если твой BlogPost использует именно его
    (uiPost as any).imageUrl = p.imageUrl || null;

    return uiPost;
  };

  // уникальные слаги (повторяя логику оригинала)
  const mappedAll = postsRaw.map(mapToLocal);
  const uniqueSlugs = Array.from(new Set(mappedAll.map(p => p.slug)));
  const displayPosts = uniqueSlugs.map(slug => {
    const exact = mappedAll.find(p => p.slug === slug && p.locale === locale);
    const fallback = mappedAll.find(p => p.slug === slug && p.locale === 'en');
    return exact || fallback;
  }).filter(Boolean);

  const labels = UI_LABELS[locale];

  return (
    <div className="py-8 animate-in fade-in duration-500">
      {/* Header Navigation */}
      <div className="flex items-center mb-8">
        <button
          onClick={onBackToHome}
          className="group flex items-center gap-2 bg-white dark:bg-slate-900 text-slate-600 dark:text-slate-300 hover:text-indigo-600 dark:hover:text-indigo-400 px-4 py-2 rounded-xl border border-slate-200 dark:border-slate-800 hover:border-indigo-200 dark:hover:border-indigo-500/50 transition-all shadow-sm"
        >
          <Home size={18} />
          <span className="font-bold">{labels.mainMenu}</span>
        </button>
      </div>

      <div className="text-center max-w-3xl mx-auto mb-12 space-y-4">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-indigo-50 dark:bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 text-sm font-bold uppercase tracking-wide">
          <BookOpen size={16} />
          Blog & Stories
        </div>
        <h2 className="text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight">
          Discover the World of Emojis
        </h2>
        <p className="text-lg text-slate-500 dark:text-slate-400">
          Tips, history, and tricks to level up your social media game.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {displayPosts.map((post: any) => (
          <article
            key={post.id}
            onClick={() => onReadPost(post)}
            className="group bg-white dark:bg-slate-900/50 rounded-3xl overflow-hidden border border-slate-200 dark:border-slate-800 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 cursor-pointer flex flex-col h-full"
          >
            <div className={`h-48 w-full bg-gradient-to-br ${post.imageGradient || 'from-indigo-400 to-purple-500'} opacity-80 group-hover:opacity-100 transition-opacity relative`}>
              {post.imageUrl && (
                <img
                  src={post.imageUrl}
                  alt={post.title}
                  style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', opacity: 0.18 }}
                />
              )}
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="text-6xl drop-shadow-lg filter group-hover:scale-110 transition-transform duration-300">📝</span>
              </div>
              {post.locale !== locale && (
                <div className="absolute top-2 right-2 bg-black/50 text-white text-xs px-2 py-1 rounded backdrop-blur-sm">
                  EN
                </div>
              )}
            </div>

            <div className="p-6 flex-1 flex flex-col">
              <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-3 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
                {post.title}
              </h3>

              <p className="text-slate-500 dark:text-slate-400 mb-6 line-clamp-3 flex-1">
                {post.excerpt}
              </p>

              <div className="flex items-center font-bold text-indigo-600 dark:text-indigo-400 group-hover:translate-x-2 transition-transform">
                Read Article <ArrowRight size={16} className="ml-2" />
              </div>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
};

export default BlogList;
