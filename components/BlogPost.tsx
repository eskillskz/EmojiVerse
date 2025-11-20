import React, { useEffect } from 'react';
import { BlogPost, Locale } from '../types';
import { ArrowLeft, Calendar, Clock, Share2, Home, BookOpen } from 'lucide-react';
import { UI_LABELS } from '../data/uiTranslations';

interface BlogPostProps {
  post: BlogPost;
  onBack: () => void;
  onHome: () => void;
  locale: Locale;
}

const BlogPostView: React.FC<BlogPostProps> = ({ post, onBack, onHome, locale }) => {
  
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const labels = UI_LABELS[locale];

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: post.title,
        text: post.excerpt,
        url: window.location.href,
      }).catch(console.error);
    } else {
      navigator.clipboard.writeText(window.location.href);
      alert('Link copied to clipboard!');
    }
  };

  return (
    <div className="max-w-4xl mx-auto py-8 animate-in slide-in-from-bottom-4 duration-500">
      
      {/* Navigation Buttons */}
      <div className="flex flex-wrap items-center gap-3 mb-8">
        <button 
          onClick={onHome}
          className="flex items-center gap-2 bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700 hover:text-indigo-600 dark:hover:text-indigo-400 px-5 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 transition-all shadow-sm font-bold text-sm"
        >
          <Home size={16} />
          {labels.mainMenu}
        </button>

        <button 
          onClick={onBack}
          className="flex items-center gap-2 bg-indigo-50 dark:bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 hover:bg-indigo-100 dark:hover:bg-indigo-500/20 px-5 py-2.5 rounded-xl border border-indigo-100 dark:border-indigo-500/30 transition-all shadow-sm font-bold text-sm"
        >
          <ArrowLeft size={16} />
          {labels.backToArticles}
        </button>
      </div>

      <article>
        {/* Header */}
        <header className="mb-10 text-center">
          <div className={`inline-block p-3 rounded-2xl bg-gradient-to-br ${post.imageGradient} shadow-lg mb-6`}>
            <span className="text-4xl">✍️</span>
          </div>
          
          <h1 className="text-3xl md:text-5xl font-extrabold text-slate-900 dark:text-white mb-6 leading-tight">
            {post.title}
          </h1>

          <div className="flex items-center justify-center gap-6 text-slate-500 dark:text-slate-400 text-sm font-medium">
            <div className="flex items-center gap-2">
              <Calendar size={16} />
              {post.date}
            </div>
            <div className="flex items-center gap-2">
              <Clock size={16} />
              {post.readTime}
            </div>
          </div>
        </header>

        {/* Content */}
        <div className="bg-white dark:bg-slate-900/50 p-8 md:p-12 rounded-[2rem] border border-slate-200 dark:border-slate-800 shadow-sm">
           <div className="prose dark:prose-invert prose-lg max-w-none prose-indigo">
             {post.content.map((paragraph, index) => (
               <p key={index} className="mb-6 leading-relaxed text-slate-700 dark:text-slate-300">
                  {/* Render simple bolding */}
                  {paragraph.split('**').map((part, i) => 
                    i % 2 === 1 ? <span key={i} className="font-bold text-slate-900 dark:text-white bg-indigo-50 dark:bg-indigo-500/20 px-1 rounded">{part}</span> : part
                  )}
               </p>
             ))}
           </div>

           {/* Footer Share */}
           <div className="mt-12 pt-8 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between">
              <span className="font-bold text-slate-900 dark:text-white">Share this article:</span>
              <button 
                onClick={handleShare}
                className="flex items-center gap-2 px-5 py-2.5 bg-slate-900 dark:bg-indigo-600 text-white rounded-xl font-semibold hover:opacity-90 transition-opacity shadow-lg"
              >
                <Share2 size={18} />
                Share
              </button>
           </div>
        </div>
      </article>
    </div>
  );
};

export default BlogPostView;