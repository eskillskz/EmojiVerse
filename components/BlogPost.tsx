
import React, { useEffect, useState, useMemo } from 'react';
import { BlogPost, Locale } from '../types';
import { ArrowLeft, Share2, Home, ArrowRight, Sparkles } from 'lucide-react';
import { UI_LABELS } from '../data/uiTranslations';
import ShareModal from './ShareModal';
import { documentToReactComponents } from '@contentful/rich-text-react-renderer';
import { BLOCKS, INLINES } from '@contentful/rich-text-types';

interface BlogPostProps {
  post: BlogPost;
  onBack: () => void;
  onHome: () => void;
  locale: Locale;
  onOpenPost?: (post: BlogPost) => void; 
}

// Rich Text Render Options
const renderOptions = {
  renderNode: {
    [BLOCKS.PARAGRAPH]: (node: any, children: any) => (
      <p className="mb-6 text-lg leading-relaxed text-slate-600 dark:text-slate-300">{children}</p>
    ),
    [BLOCKS.HEADING_1]: (node: any, children: any) => (
      <h1 className="text-3xl font-bold mb-4 text-slate-900 dark:text-white">{children}</h1>
    ),
    [BLOCKS.HEADING_2]: (node: any, children: any) => (
      <h2 className="text-2xl font-bold mb-4 mt-8 text-slate-900 dark:text-white">{children}</h2>
    ),
    [BLOCKS.UL_LIST]: (node: any, children: any) => (
      <ul className="list-disc list-outside ml-6 mb-6 text-slate-600 dark:text-slate-300">{children}</ul>
    ),
    [BLOCKS.OL_LIST]: (node: any, children: any) => (
      <ol className="list-decimal list-outside ml-6 mb-6 text-slate-600 dark:text-slate-300">{children}</ol>
    ),
    [BLOCKS.QUOTE]: (node: any, children: any) => (
      <blockquote className="border-l-4 border-indigo-500 pl-4 italic my-6 text-slate-700 dark:text-slate-400 bg-slate-50 dark:bg-slate-800/50 py-2 rounded-r-lg">
        {children}
      </blockquote>
    ),
    [INLINES.HYPERLINK]: (node: any, children: any) => (
      <a href={node.data.uri} target="_blank" rel="noopener noreferrer" className="text-indigo-600 dark:text-indigo-400 hover:underline font-medium">
        {children}
      </a>
    ),
  },
};

const BlogPostView: React.FC<BlogPostProps & { onOpenPost?: (post: BlogPost) => void }> = ({ post, onBack, onHome, locale, onOpenPost }) => {
  
  const [isShareModalOpen, setIsShareModalOpen] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [post.id]);

  const labels = UI_LABELS[locale];

  // Use recommendedPosts from Contentful if available, otherwise use the local random logic
  const displayRecommended = useMemo(() => {
    if (post.recommendedPosts && post.recommendedPosts.length > 0) {
      return post.recommendedPosts;
    }
    // Fallback logic if no manual recommendations
    return []; 
  }, [post]);

  return (
    <div className="max-w-5xl mx-auto py-8 animate-in fade-in duration-500">
      
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
        
        {/* 1. Hero Image (Cover) - Supports Real Image or Gradient */}
        <div className="w-full h-64 md:h-96 relative overflow-hidden">
            {post.imageUrl ? (
              <img 
                src={post.imageUrl} 
                alt={post.title} 
                className="w-full h-full object-cover transition-transform duration-700 hover:scale-105"
              />
            ) : (
              <div className={`w-full h-full bg-gradient-to-br ${post.imageGradient}`}></div>
            )}
            <div className="absolute inset-0 bg-black/10"></div>
            <div className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t from-white dark:from-slate-900/90 to-transparent"></div>
        </div>

        <div className="px-6 md:px-16 pb-16 -mt-12 relative z-10">
            {/* 2. Title & Meta */}
            <div className="mb-12">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-100 dark:bg-indigo-500/20 text-indigo-600 dark:text-indigo-300 text-xs font-bold uppercase tracking-wider mb-6">
                    <Sparkles size={12} />
                    Blog
                </div>
                
                <h1 className="text-3xl md:text-5xl lg:text-6xl font-extrabold text-slate-900 dark:text-white mb-6 leading-tight tracking-tight border-b border-slate-100 dark:border-slate-800 pb-8">
                    {post.title}
                </h1>
            </div>

            {/* 3. Content - Renders Rich Text if available, else legacy string array */}
            <div className="prose dark:prose-invert prose-lg max-w-none">
                {post.richText ? (
                  documentToReactComponents(post.richText, renderOptions)
                ) : (
                  // Fallback for legacy static data
                  post.content.map((paragraph, index) => (
                    <p key={index} className="mb-6 text-slate-600 dark:text-slate-300 leading-relaxed">
                        {paragraph.split('**').map((part, i) => 
                            i % 2 === 1 ? <span key={i} className="font-bold text-slate-900 dark:text-white bg-yellow-100 dark:bg-yellow-500/20 px-1 rounded mx-0.5">{part}</span> : part
                        )}
                    </p>
                  ))
                )}
            </div>
        </div>
      </article>

      {/* 4. Recommended Articles */}
      {displayRecommended.length > 0 && (
          <div className="mt-20 px-4">
              <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-8 flex items-center gap-2">
                  <Sparkles className="text-indigo-500" />
                  {locale === 'ru' ? 'Рекомендуем почитать' : locale === 'es' ? 'Artículos recomendados' : 'Recommended Reading'}
              </h3>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {displayRecommended.map((recPost) => (
                      <div 
                        key={recPost.id}
                        onClick={() => onOpenPost && onOpenPost(recPost)}
                        className="group bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 overflow-hidden cursor-pointer hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col"
                      >
                          <div className="h-32 w-full relative overflow-hidden bg-slate-100 dark:bg-slate-800">
                             {recPost.imageUrl ? (
                               <img src={recPost.imageUrl} alt={recPost.title} className="w-full h-full object-cover" />
                             ) : (
                               <div className={`w-full h-full bg-gradient-to-br ${recPost.imageGradient || 'from-gray-400 to-gray-600'}`}></div>
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
