
import React from 'react';
import { BlogPost, Locale } from '../types';
import { ArrowRight, BookOpen, Home } from 'lucide-react';
import { UI_LABELS } from '../data/uiTranslations';

interface BlogListProps {
  posts: BlogPost[]; // Changed: Accepts posts prop
  locale: Locale;
  onReadPost: (post: BlogPost) => void;
  onBackToHome: () => void;
}

const BlogList: React.FC<BlogListProps> = ({ posts, locale, onReadPost, onBackToHome }) => {
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
        {posts.map((post) => (
          <article 
            key={post.id}
            onClick={() => onReadPost(post)}
            className="group bg-white dark:bg-slate-900/50 rounded-3xl overflow-hidden border border-slate-200 dark:border-slate-800 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 cursor-pointer flex flex-col h-full"
          >
            <div className="h-48 w-full relative overflow-hidden bg-slate-100 dark:bg-slate-800">
               {post.imageUrl ? (
                 <img 
                   src={post.imageUrl} 
                   alt={post.title} 
                   className="w-full h-full object-cover opacity-90 group-hover:opacity-100 transition-opacity duration-300 group-hover:scale-105 transform"
                 />
               ) : (
                 <div className={`w-full h-full bg-gradient-to-br ${post.imageGradient || 'from-gray-400 to-gray-600'} opacity-80 group-hover:opacity-100 transition-opacity flex items-center justify-center`}>
                    <span className="text-6xl drop-shadow-lg filter group-hover:scale-110 transition-transform duration-300">📝</span>
                 </div>
               )}
               
               {post.locale !== locale && (
                 <div className="absolute top-2 right-2 bg-black/50 text-white text-xs px-2 py-1 rounded backdrop-blur-sm">
                   {post.locale.toUpperCase()}
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
