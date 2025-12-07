
import React, { useEffect, useState, useMemo } from 'react';
import { BlogPost, Locale } from '../types';
import { BLOG_POSTS } from '../data/blogPosts';
import { ArrowLeft, Share2, Home, ArrowRight, Sparkles } from 'lucide-react';
import { UI_LABELS } from '../data/uiTranslations';
import ShareModal from './ShareModal';

interface BlogPostProps {
  post: BlogPost;
  onBack: () => void;
  onHome: () => void;
  locale: Locale;
  onOpenPost?: (post: BlogPost) => void; 
}

// Helper for category style
const getCategoryStyle = (cat: string) => {
  const c = cat?.toLowerCase() || '';
  if (c === 'instagram') return 'bg-rose-500 text-white';
  if (c === 'history') return 'bg-amber-500 text-white';
  if (c === 'education' || c === 'science') return 'bg-blue-500 text-white';
  if (c === 'design') return 'bg-purple-500 text-white';
  if (c === 'trends') return 'bg-emerald-500 text-white';
  return 'bg-slate-700 text-white';
};

const BlogPostView: React.FC<BlogPostProps & { onOpenPost?: (post: BlogPost) => void }> = ({ post, onBack, onHome, locale, onOpenPost }) => {
  
  const [isShareModalOpen, setIsShareModalOpen] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [post.id]);

  const labels = UI_LABELS[locale];

  // Logic to find Recommended Posts
  const recommendedPosts = useMemo(() => {
    // 1. Get all posts in current locale (excluding current one)
    let pool = BLOG_POSTS.filter(p => p.locale === locale && p.id !== post.id);
    
    // 2. If not enough, fill with English posts (excluding current one)
    if (pool.length < 3) {
        const englishPosts = BLOG_POSTS.filter(p => p.locale === 'en' && p.id !== post.id && !pool.find(existing => existing.slug === p.slug));
        pool = [...pool, ...englishPosts];
    }

    // 3. Shuffle and pick 3
    return pool.sort(() => 0.5 - Math.random()).slice(0, 3);
  }, [post.id, locale]);

  // Generate Schema.org JSON-LD for the Article
  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    "headline": post.seoTitle || post.title,
    "description": post.seoDescription || post.excerpt,
    "image": post.image ? [post.image] : [],
    "author": {
      "@type": "Organization",
      "name": "EmojiVerse Team"
    },
    "publisher": {
      "@type": "Organization",
      "name": "EmojiVerse",
      "logo": {
        "@type": "ImageObject",
        "url": "https://emojiverse.netlify.app/logo.png" // Placeholder or actual logo URL
      }
    },
    "datePublished": post.date || "2024-01-01",
    "mainEntityOfPage": {
      "@type": "WebPage",
      "@id": `https://emojiverse.netlify.app/?post=${post.slug}`
    }
  };

  // Safety check: if post is null (shouldn't happen due to parent logic, but good practice)
  if (!post) return null;

  const contentArray = post.content || [];

  return (
    <div className="max-w-5xl mx-auto py-8 animate-in fade-in duration-500">
      
      {/* Inject Schema for Search Engines */}
      <script type="application/ld+json">
        {JSON.stringify(articleSchema)}
      </script>

      {/* Top Navigation */}
      <div className="flex flex-wrap items-center justify-between gap-3 mb-8 px-4 sm:px-0">
        <div className="flex gap-3">
            <button 
            onClick={onHome}
            className="flex items-center gap-2 bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700 hover:text-indigo-600 dark:hover:text-indigo-400 px-4 py-2 rounded-xl border border-slate-200 dark:border-slate-700 transition-all shadow-sm font-bold text-sm"
            >
            <Home size={16} />
            <span className="hidden sm:inline">{labels.mainMenu}</span>
            </button>

            <button 
            onClick={onBack}
            className="flex items-center gap-2 bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700 hover:text-indigo-600 dark:hover:text-indigo-400 px-4 py-2 rounded-xl border border-slate-200 dark:border-slate-700 transition-all shadow-sm font-bold text-sm"
            >
            <ArrowLeft size={16} />
            <span className="hidden sm:inline">{labels.backToArticles}</span>
            <span className="sm:hidden">Back</span>
            </button>
        </div>

        <button 
            onClick={() => setIsShareModalOpen(true)}
            className="flex items-center gap-2 px-4 py-2 bg-indigo-50 dark:bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 rounded-xl font-semibold hover:bg-indigo-100 dark:hover:bg-indigo-500/20 transition-all border border-indigo-100 dark:border-indigo-500/30"
        >
            <Share2 size={18} />
            <span className="hidden sm:inline">{labels.share}</span>
        </button>
      </div>

      <article className="bg-white dark:bg-slate-900/50 rounded-[2.5rem] shadow-xl shadow-slate-200/50 dark:shadow-none border border-slate-200 dark:border-slate-800 overflow-hidden">
        
        {/* 1. Hero Image (Cover) */}
        <div className="w-full h-64 md:h-96 relative overflow-hidden bg-slate-100 dark:bg-slate-800">
            {post.image ? (
                <img 
                  src={post.image} 
                  alt={post.imageAlt || post.title} 
                  className="w-full h-full object-cover transition-transform duration-700 hover:scale-105"
                />
            ) : (
                <div className={`w-full h-full bg-gradient-to-br ${post.imageGradient} relative`}>
                    <div className="absolute inset-0 bg-black/10"></div>
                    <div className="absolute bottom-8 right-8 md:bottom-12 md:right-12 p-4 bg-white/20 backdrop-blur-md rounded-3xl border border-white/30 shadow-lg hidden sm:block">
                        <span className="text-5xl">✍️</span>
                    </div>
                </div>
            )}
            <div className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t from-white dark:from-slate-900/90 to-transparent"></div>
        </div>

        <div className="px-6 md:px-16 pb-16 -mt-12 relative z-10">
            {/* 2. Title & Meta */}
            <div className="mb-12">
                <div className="flex flex-wrap items-center gap-3 mb-6">
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-100 dark:bg-indigo-500/20 text-indigo-600 dark:text-indigo-300 text-xs font-bold uppercase tracking-wider">
                        <Sparkles size={12} />
                        Blog
                    </div>
                    {/* Category Badge */}
                    {post.category && (
                        <div className={`inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider ${getCategoryStyle(post.category)}`}>
                            {post.category}
                        </div>
                    )}
                </div>
                
                <h1 className="text-3xl md:text-5xl lg:text-6xl font-extrabold text-slate-900 dark:text-white mb-6 leading-tight tracking-tight border-b border-slate-100 dark:border-slate-800 pb-8">
                    {post.title}
                </h1>
            </div>

            {/* 3. Content */}
            <div className="prose dark:prose-invert prose-lg max-w-none prose-headings:font-bold prose-headings:text-slate-900 dark:prose-headings:text-white prose-p:text-slate-600 dark:prose-p:text-slate-300 prose-a:text-indigo-600 dark:prose-a:text-indigo-400 hover:prose-a:text-indigo-500 leading-relaxed">
                {contentArray.length > 0 ? contentArray.map((paragraph, index) => {
                  if (!paragraph) return null; // Skip empty strings
                  
                  // Handle Headers (## and ###)
                  if (paragraph.startsWith('## ')) {
                    return <h2 key={index} className="text-2xl md:text-3xl font-extrabold mt-10 mb-6 text-slate-900 dark:text-white">{paragraph.replace('## ', '')}</h2>;
                  }
                  if (paragraph.startsWith('### ')) {
                    return <h3 key={index} className="text-xl md:text-2xl font-bold mt-8 mb-4 text-slate-800 dark:text-slate-100">{paragraph.replace('### ', '')}</h3>;
                  }
                  
                  // Render standard paragraph with bolding support
                  return (
                    <p key={index} className="mb-6">
                        {paragraph.split('**').map((part, i) => 
                            i % 2 === 1 ? <span key={i} className="font-bold text-slate-900 dark:text-white bg-indigo-50 dark:bg-indigo-500/10 px-1 rounded mx-0.5">{part}</span> : part
                        )}
                    </p>
                  );
                }) : (
                  <p className="text-slate-500 italic">No content available for this post.</p>
                )}
            </div>
        </div>
      </article>

      {/* 4. Recommended Articles */}
      {recommendedPosts.length > 0 && (
          <div className="mt-20 px-4">
              <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-8 flex items-center gap-2">
                  <Sparkles className="text-indigo-500" />
                  {locale === 'ru' ? 'Рекомендуем почитать' : locale === 'es' ? 'Artículos recomendados' : 'Recommended Reading'}
              </h3>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {recommendedPosts.map((recPost) => (
                      <div 
                        key={recPost.id}
                        onClick={() => onOpenPost && onOpenPost(recPost)}
                        className="group bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 overflow-hidden cursor-pointer hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col"
                      >
                          {/* Small Category Badge for recommended items */}
                          <div className="relative h-32 w-full bg-slate-100 dark:bg-slate-800 overflow-hidden">
                              {recPost.category && (
                                <div className="absolute top-2 left-2 z-20">
                                   <span className={`px-2 py-0.5 rounded-md text-[10px] font-bold uppercase tracking-wider shadow-sm ${getCategoryStyle(recPost.category)}`}>
                                     {recPost.category}
                                   </span>
                                </div>
                              )}
                              {recPost.image ? (
                                <img 
                                  src={recPost.image} 
                                  alt={recPost.imageAlt || recPost.title}
                                  className="w-full h-full object-cover opacity-90 group-hover:opacity-100 transition-opacity duration-300 group-hover:scale-105"
                                />
                              ) : (
                                <div className={`w-full h-full bg-gradient-to-br ${recPost.imageGradient}`}></div>
                              )}
                          </div>
                          <div className="p-6 flex-1 flex flex-col">
                              <h4 className="font-bold text-lg text-slate-800 dark:text-slate-200 mb-2 line-clamp-2 group-hover:text-indigo-500 transition-colors">
                                  {recPost.title}
                              </h4>
                              <div className="mt-auto pt-4 flex items-center text-sm font-bold text-indigo-600 dark:text-indigo-400 opacity-0 group-hover:opacity-100 transition-opacity -translate-x-2 group-hover:translate-x-0 duration-300">
                                  Read <ArrowRight size={14} className="ml-1" />
                              </div>
                          </div>
                      </div>
                  ))}
              </div>
          </div>
      )}

      {/* Share Modal Instance */}
      <ShareModal 
        isOpen={isShareModalOpen} 
        onClose={() => setIsShareModalOpen(false)}
        url={window.location.href}
        title={post.title}
        modalTitle={labels.shareTitle}
      />
    </div>
  );
};

export default BlogPostView;
