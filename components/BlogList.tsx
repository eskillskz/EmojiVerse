// components/BlogList.tsx
import React, { useEffect, useState } from 'react';
import { BlogPost as LocalBlogPost, Locale } from '../types';
// убираем импорт статического набора
// import { BLOG_POSTS } from '../data/blogPosts';
import { ArrowRight, BookOpen, Home } from 'lucide-react';
import { UI_LABELS } from '../data/uiTranslations';

// импортируем сервис
import { fetchMappedPosts } from '../services/contentfulService';

interface BlogListProps {
  locale: Locale;
  onReadPost: (post: LocalBlogPost) => void;
  onBackToHome: () => void;
}

const BlogList: React.FC<BlogListProps> = ({ locale, onReadPost, onBackToHome }) => {
  const [posts, setPosts] = useState<any[] | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let mounted = true;
    setLoading(true);
    fetchMappedPosts() // можно передать contentType если захотим
      .then(list => {
        if (!mounted) return;
        setPosts(list);
        setLoading(false);
      })
      .catch(err => {
        console.error('fetchMappedPosts error', err);
        if (!mounted) return;
        setError(err.message || 'Fetch error');
        setLoading(false);
      });
    return () => { mounted = false; }
  }, []);

  if (loading) return <div className="py-8">Loading posts…</div>;
  if (error) return <div className="py-8 text-red-600">Error: {error}</div>;
  if (!posts || posts.length === 0) return <div className="py-8">No posts found.</div>;

  // Filter strategy similar to original one:
  const uniqueSlugs = Array.from(new Set(posts.map(p => p.slug)));
  const displayPosts = uniqueSlugs.map(slug => {
    // try find by locale first
    const exact = posts.find((p:any) => p.slug === slug && p.locale === locale);
    const fallback = posts.find((p:any) => p.slug === slug && p.locale === 'en');
    return (exact || fallback) as any;
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
            onClick={() => {
              // приводим объект в форму, которой ожидает BlogPost.tsx
              const mappedPost: LocalBlogPost = {
                id: post.id,
                slug: post.slug,
                locale: post.locale,
                title: post.title,
                excerpt: post.excerpt || '',
                imageGradient: post.imageGradient || 'from-indigo-400 to-purple-500',
                // если BlogPost.tsx ожидает content массив - попытка распарсить
                content: post.content ? (typeof post.content === 'string' ? [post.content] : post.content) : [''],
                // добавить поля по необходимости
              } as unknown as LocalBlogPost;
              onReadPost(mappedPost);
            }}
            className="group bg-white dark:bg-slate-900/50 rounded-3xl overflow-hidden border border-slate-200 dark:border-slate-800 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 cursor-pointer flex flex-col h-full"
          >
            <div className={`h-48 w-full bg-gradient-to-br ${post.imageGradient || 'from-indigo-400 to-purple-500'} opacity-80 group-hover:opacity-100 transition-opacity relative`}>
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
