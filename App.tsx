import React, { useState, useEffect, useMemo, useCallback } from 'react';
import { fetchEmojis } from './services/emojiService';
import { EmojiGroup, EmojiRaw, Locale, BlogPost } from './types';
import Header from './components/Header';
import Loader from './components/Loader';
import Toast from './components/Toast';
import TextEditor from './components/TextEditor';
import EmojiCategory from './components/EmojiCategory';
import EmojiButton from './components/EmojiButton';
import FloatingControls from './components/FloatingControls';
import SEOSection from './components/SEOSection';
import BlogList from './components/BlogList';
import BlogPostView from './components/BlogPost';
import ShareModal from './components/ShareModal';
import ReactionOverlay from './components/ReactionOverlay'; // Import Reaction Overlay
import { getSEOData } from './data/seoContent';
import { BLOG_POSTS } from './data/blogPosts';
import { UI_LABELS } from './data/uiTranslations';
import { Clock, Heart } from 'lucide-react';

// Helper to clean group names for IDs
const getGroupId = (name: string) => name.replace(/\s+/g, '-').toLowerCase();

// Define View State
type ViewState = 'home' | 'blog' | 'article';

const App: React.FC = () => {
  const [allGroups, setAllGroups] = useState<EmojiGroup[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState<string>('Smileys & Emotion');
  const [toast, setToast] = useState<{ message: string; visible: boolean }>({ message: '', visible: false });
  const [locale, setLocale] = useState<Locale>('en');
  
  // Theme State
  const [isDarkMode, setIsDarkMode] = useState(true);
  
  // Text Editor State
  const [editorText, setEditorText] = useState('');

  // Global Expand/Collapse State for Categories
  const [forceOpenState, setForceOpenState] = useState<boolean | null>(null);

  // Storage States
  const [favorites, setFavorites] = useState<EmojiRaw[]>([]);
  const [recent, setRecent] = useState<EmojiRaw[]>([]);

  // --- BLOG STATES ---
  const [viewState, setViewState] = useState<ViewState>('home');
  const [currentPost, setCurrentPost] = useState<BlogPost | null>(null);

  // --- SHARE STATE ---
  const [isShareModalOpen, setIsShareModalOpen] = useState(false);

  // --- REACTION STATE ---
  const [triggerEmoji, setTriggerEmoji] = useState<string | null>(null);

  // Initialize Theme
  useEffect(() => {
    const html = document.documentElement;
    if (isDarkMode) {
      html.classList.add('dark');
    } else {
      html.classList.remove('dark');
    }
  }, [isDarkMode]);

  // SEO: Dynamic HTML Language Attribute
  useEffect(() => {
    document.documentElement.lang = locale;
  }, [locale]);

  // Dynamic SEO Title & Meta
  useEffect(() => {
    const seoData = getSEOData(locale);
    
    if (viewState === 'article' && currentPost) {
      document.title = `${currentPost.title} - EmojiVerse`;
    } else if (viewState === 'blog') {
      document.title = `EmojiVerse Blog - Stories & History (${locale.toUpperCase()})`;
    } else {
      document.title = seoData.appTitle;
    }
    
    const metaDesc = document.querySelector('meta[name="description"]');
    if (metaDesc) {
      if (viewState === 'article' && currentPost) {
        metaDesc.setAttribute('content', currentPost.excerpt);
      } else {
        metaDesc.setAttribute('content', seoData.metaDescription);
      }
    }
  }, [locale, viewState, currentPost]);

  // Load Persistence
  useEffect(() => {
    const savedFavs = localStorage.getItem('emoji-favs');
    const savedRecent = localStorage.getItem('emoji-recent');
    if (savedFavs) setFavorites(JSON.parse(savedFavs));
    if (savedRecent) setRecent(JSON.parse(savedRecent));
  }, []);

  // Fetch Data when locale changes
  useEffect(() => {
    const init = async () => {
      setLoading(true);
      const groups = await fetchEmojis(locale);
      setAllGroups(groups);
      setLoading(false);
    };
    init();
  }, [locale]);

  // Language Switch Logic for Blog
  useEffect(() => {
    if (viewState === 'article' && currentPost) {
      const newPost = BLOG_POSTS.find(p => p.slug === currentPost.slug && p.locale === locale);
      if (newPost) {
        setCurrentPost(newPost);
      } else {
        const fallbackPost = BLOG_POSTS.find(p => p.slug === currentPost.slug && p.locale === 'en');
        if (fallbackPost) setCurrentPost(fallbackPost);
      }
    }
  }, [locale]); 


  // Filter Data based on Search
  const filteredGroups = useMemo(() => {
    if (!searchQuery.trim()) return allGroups;

    const query = searchQuery.toLowerCase();
    return allGroups.map(group => ({
      ...group,
      emojis: group.emojis.filter(emoji => {
        if (emoji.searchTags && emoji.searchTags.includes(query)) return true;
        if (emoji.skins && emoji.skins.some(skin => skin.label && skin.label.toLowerCase().includes(query))) return true;
        return false;
      })
    })).filter(group => group.emojis.length > 0);
  }, [allGroups, searchQuery]);

  const handleCategorySelect = (groupName: string) => {
    if (viewState !== 'home') setViewState('home'); 
    setActiveCategory(groupName);
    
    setTimeout(() => {
      const element = document.getElementById(getGroupId(groupName));
      if (element) {
        const headerOffset = 220; 
        const elementPosition = element.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

        window.scrollTo({
          top: offsetPosition,
          behavior: "smooth"
        });
      }
    }, 100);
  };

  // Favorites & Recent
  const updateRecent = useCallback((emoji: EmojiRaw) => {
    setRecent(prev => {
      const filtered = prev.filter(e => e.hexcode !== emoji.hexcode);
      const updated = [emoji, ...filtered].slice(1, 16); 
      localStorage.setItem('emoji-recent', JSON.stringify(updated));
      return updated;
    });
  }, []);

  const toggleFavorite = useCallback((emoji: EmojiRaw) => {
    setFavorites(prev => {
      const exists = prev.some(e => e.hexcode === emoji.hexcode);
      let updated;
      if (exists) {
        updated = prev.filter(e => e.hexcode !== emoji.hexcode);
      } else {
        updated = [...prev, emoji];
      }
      localStorage.setItem('emoji-favs', JSON.stringify(updated));
      return updated;
    });
  }, []);

  const handleEmojiSelect = useCallback((emoji: EmojiRaw) => {
    navigator.clipboard.writeText(emoji.emoji).then(() => {
      setToast({ message: `Copied ${emoji.emoji} to clipboard!`, visible: true });
    }).catch(err => {
      console.error('Failed to copy: ', err);
    });
    setEditorText(prev => prev + emoji.emoji);
    updateRecent(emoji);
    
    // Trigger Visual Reaction
    setTriggerEmoji(emoji.emoji);
  }, [updateRecent]);

  const handleCopyText = useCallback(() => {
    navigator.clipboard.writeText(editorText).then(() => {
      setToast({ message: 'Text copied to clipboard!', visible: true });
      setTriggerEmoji('🎉'); // Celebration trigger on copy text
    });
  }, [editorText]);

  const closeToast = useCallback(() => {
    setToast(prev => ({ ...prev, visible: false }));
  }, []);

  const favIds = useMemo(() => favorites.map(f => f.hexcode), [favorites]);

  // Navigation Handlers
  const toggleBlog = () => {
    if (viewState === 'home') {
      setViewState('blog');
      window.scrollTo(0, 0);
    } else {
      setViewState('home');
    }
  };

  const openArticle = (post: BlogPost) => {
    setCurrentPost(post);
    setViewState('article');
  };

  // Special Sections
  const SpecialSection = ({ title, icon: Icon, list }: { title: string, icon: any, list: EmojiRaw[] }) => {
    if (list.length === 0) return null;
    return (
      <div className="mb-6 bg-white dark:bg-slate-900/40 backdrop-blur-sm border border-slate-200 dark:border-white/5 rounded-3xl shadow-sm p-4 sm:p-6">
        <div className="flex items-center gap-2 mb-4 text-slate-800 dark:text-slate-200 font-bold">
          <Icon size={20} className="text-indigo-500" />
          <h3>{title}</h3>
        </div>
        <div className="grid grid-cols-5 sm:grid-cols-6 md:grid-cols-8 lg:grid-cols-10 gap-3 sm:gap-4">
          {list.map((emoji, index) => (
             <EmojiButton 
               key={`special-${title}-${emoji.hexcode}-${index}`} 
               emoji={emoji} 
               onCopy={handleEmojiSelect}
               isFavorite={favIds.includes(emoji.hexcode)}
               onToggleFavorite={toggleFavorite}
             />
          ))}
        </div>
      </div>
    );
  };

  const labels = UI_LABELS[locale];
  const seoData = getSEOData(locale);

  return (
    <div className="min-h-screen pb-32 bg-slate-50 dark:bg-slate-950 font-sans transition-colors duration-300 relative overflow-x-hidden">
      
      <div className="fixed inset-0 -z-10 overflow-hidden pointer-events-none">
          <div className="absolute top-0 left-0 w-[500px] h-[500px] bg-purple-500/20 dark:bg-indigo-500/10 rounded-full blur-[100px] -translate-x-1/3 -translate-y-1/3 animate-pulse"></div>
          <div className="absolute top-1/3 right-0 w-[400px] h-[400px] bg-pink-500/20 dark:bg-purple-500/10 rounded-full blur-[80px] translate-x-1/3 translate-y-1/3 opacity-70"></div>
          <div className="absolute bottom-0 left-1/4 w-[600px] h-[600px] bg-blue-500/10 dark:bg-blue-900/10 rounded-full blur-[120px] translate-y-1/2"></div>
          <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 mix-blend-overlay"></div>
      </div>

      {/* Visual Effects Overlay */}
      <ReactionOverlay triggerEmoji={triggerEmoji} onComplete={() => setTriggerEmoji(null)} />

      <Header 
        groups={allGroups} 
        searchQuery={searchQuery} 
        setSearchQuery={setSearchQuery}
        onCategorySelect={handleCategorySelect}
        activeCategory={activeCategory}
        currentLocale={locale}
        onLocaleChange={setLocale}
        isDarkMode={isDarkMode}
        toggleTheme={() => setIsDarkMode(!isDarkMode)}
        onOpenBlog={toggleBlog}
        isBlogActive={viewState !== 'home'}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6 relative z-10">
        
        {viewState === 'home' && (
          <>
            <TextEditor 
              text={editorText} 
              setText={setEditorText} 
              onCopy={handleCopyText}
              onClear={() => setEditorText('')}
              locale={locale}
            />

            <main className="min-w-0">
              {loading ? (
                <Loader />
              ) : filteredGroups.length === 0 ? (
                <div className="text-center py-20 animate-fade-in bg-white dark:bg-white/5 rounded-3xl border border-slate-200 dark:border-white/10 shadow-sm">
                  <p className="text-6xl mb-4 opacity-50">🧐</p>
                  <p className="text-2xl text-slate-600 dark:text-slate-400 font-medium">{labels.noEmojisFound}</p>
                  <p className="text-slate-500 mt-2">{labels.trySearching}</p>
                </div>
              ) : (
                <>
                  {!searchQuery && (
                    <>
                      <SpecialSection title={labels.favorites} icon={Heart} list={favorites} />
                      <SpecialSection title={labels.recent} icon={Clock} list={recent} />
                    </>
                  )}

                  {filteredGroups.map((group) => (
                    <EmojiCategory 
                      key={group.groupName}
                      group={group}
                      id={getGroupId(group.groupName)}
                      onCopy={handleEmojiSelect}
                      forceOpen={forceOpenState}
                      favoriteIds={favIds}
                      onToggleFavorite={toggleFavorite}
                      localizedName={(labels.categories as any)[group.groupName]}
                    />
                  ))}
                </>
              )}
            </main>

            {!loading && <SEOSection locale={locale} />}
          </>
        )}

        {viewState === 'blog' && (
          <BlogList 
            locale={locale} 
            onReadPost={openArticle} 
            onBackToHome={() => setViewState('home')} 
          />
        )}

        {viewState === 'article' && currentPost && (
          <BlogPostView 
            post={currentPost} 
            onBack={() => setViewState('blog')} 
            onHome={() => setViewState('home')}
            locale={locale}
          />
        )}

      </div>

      <Toast 
        message={toast.message} 
        isVisible={toast.visible} 
        onClose={closeToast} 
      />

      {/* Floating Controls with Share */}
      <FloatingControls 
        onScrollTop={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        onCollapseAll={() => setForceOpenState(false)}
        onExpandAll={() => setForceOpenState(true)}
        onShare={() => setIsShareModalOpen(true)}
      />

      {/* Global Share Modal */}
      <ShareModal 
        isOpen={isShareModalOpen} 
        onClose={() => setIsShareModalOpen(false)} 
        url={window.location.href}
        title={seoData.appTitle}
        modalTitle={labels.shareTitle}
      />
      
      <footer className="text-center py-10 text-slate-400 dark:text-slate-600 text-sm mb-8 md:mb-0 border-t border-slate-200 dark:border-white/5 mt-8 relative z-10">
        <p>© {new Date().getFullYear()} EmojiVerse. {labels.footer}</p>
      </footer>
    </div>
  );
};

export default App;