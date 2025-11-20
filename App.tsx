import React, { useState, useEffect, useMemo, useCallback } from 'react';
import { fetchEmojis } from './services/emojiService';
import { EmojiGroup, EmojiRaw, Locale } from './types';
import Header from './components/Header';
import Loader from './components/Loader';
import Toast from './components/Toast';
import TextEditor from './components/TextEditor';
import EmojiCategory from './components/EmojiCategory';
import EmojiButton from './components/EmojiButton';
import FloatingControls from './components/FloatingControls';
import SEOSection from './components/SEOSection'; // Imported SEO Section
import { getSEOData } from './data/seoContent'; // Helper for title updates
import { Clock, Heart } from 'lucide-react';

// Helper to clean group names for IDs
const getGroupId = (name: string) => name.replace(/\s+/g, '-').toLowerCase();

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

  // Initialize Theme
  useEffect(() => {
    const html = document.documentElement;
    if (isDarkMode) {
      html.classList.add('dark');
    } else {
      html.classList.remove('dark');
    }
  }, [isDarkMode]);

  // Dynamic SEO: Update Page Title and Meta Description based on Language
  useEffect(() => {
    const seoData = getSEOData(locale);
    document.title = seoData.appTitle;
    
    // Update meta description if it exists
    const metaDesc = document.querySelector('meta[name="description"]');
    if (metaDesc) {
      metaDesc.setAttribute('content', seoData.metaDescription);
    }
  }, [locale]);

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

  // Filter Data based on Search
  const filteredGroups = useMemo(() => {
    if (!searchQuery.trim()) return allGroups;

    const query = searchQuery.toLowerCase();
    return allGroups.map(group => ({
      ...group,
      emojis: group.emojis.filter(emoji => {
        // Universal Search using the 'searchTags' string which contains 
        // merged keywords from ALL supported languages.
        if (emoji.searchTags && emoji.searchTags.includes(query)) return true;

        // Also check variants/skins just in case
        if (emoji.skins && emoji.skins.some(skin => skin.label && skin.label.toLowerCase().includes(query))) return true;
        
        return false;
      })
    })).filter(group => group.emojis.length > 0);
  }, [allGroups, searchQuery]);

  const handleCategorySelect = (groupName: string) => {
    setActiveCategory(groupName);
    
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
  };

  // --- Logic for Favorites & Recent ---

  const updateRecent = useCallback((emoji: EmojiRaw) => {
    setRecent(prev => {
      // Remove if exists (to move to top)
      const filtered = prev.filter(e => e.hexcode !== emoji.hexcode);
      // Add to front
      const updated = [emoji, ...filtered].slice(1, 16); // Keep 15
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

  // Handle Emoji Selection (Copy + Append + Recent)
  const handleEmojiSelect = useCallback((emoji: EmojiRaw) => {
    // 1. Copy to clipboard
    navigator.clipboard.writeText(emoji.emoji).then(() => {
      setToast({ message: `Copied ${emoji.emoji} to clipboard!`, visible: true });
    }).catch(err => {
      console.error('Failed to copy: ', err);
    });

    // 2. Append to text editor
    setEditorText(prev => prev + emoji.emoji);

    // 3. Add to Recent
    updateRecent(emoji);
  }, [updateRecent]);

  // Handle Copy Entire Text
  const handleCopyText = useCallback(() => {
    navigator.clipboard.writeText(editorText).then(() => {
      setToast({ message: 'Text copied to clipboard!', visible: true });
    });
  }, [editorText]);

  const closeToast = useCallback(() => {
    setToast(prev => ({ ...prev, visible: false }));
  }, []);

  const favIds = useMemo(() => favorites.map(f => f.hexcode), [favorites]);

  // --- Special Sections Components (Inline for simplicity) ---
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

  return (
    <div className="min-h-screen pb-32 bg-slate-50 dark:bg-slate-950 font-sans transition-colors duration-300 relative overflow-x-hidden">
      
      {/* BACKGROUND DESIGNER SHAPES */}
      <div className="fixed inset-0 -z-10 overflow-hidden pointer-events-none">
          {/* Gradient Orb 1 */}
          <div className="absolute top-0 left-0 w-[500px] h-[500px] bg-purple-500/20 dark:bg-indigo-500/10 rounded-full blur-[100px] -translate-x-1/3 -translate-y-1/3 animate-pulse"></div>
          {/* Gradient Orb 2 */}
          <div className="absolute top-1/3 right-0 w-[400px] h-[400px] bg-pink-500/20 dark:bg-purple-500/10 rounded-full blur-[80px] translate-x-1/3 translate-y-1/3 opacity-70"></div>
          {/* Gradient Orb 3 */}
          <div className="absolute bottom-0 left-1/4 w-[600px] h-[600px] bg-blue-500/10 dark:bg-blue-900/10 rounded-full blur-[120px] translate-y-1/2"></div>
          
          {/* Subtle Grid Overlay */}
          <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 mix-blend-overlay"></div>
      </div>

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
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6 relative z-10">
        
        {/* Text Editor Section */}
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
              <p className="text-2xl text-slate-600 dark:text-slate-400 font-medium">No emojis found</p>
              <p className="text-slate-500 mt-2">Try searching for something else.</p>
            </div>
          ) : (
            <>
              {/* Special Standalone Windows (Not Accordions) */}
              {!searchQuery && (
                <>
                  <SpecialSection title="Favorites" icon={Heart} list={favorites} />
                  <SpecialSection title="Recently Used" icon={Clock} list={recent} />
                </>
              )}

              {/* Main Categories */}
              {filteredGroups.map((group) => (
                <EmojiCategory 
                  key={group.groupName}
                  group={group}
                  id={getGroupId(group.groupName)}
                  onCopy={handleEmojiSelect}
                  forceOpen={forceOpenState}
                  favoriteIds={favIds}
                  onToggleFavorite={toggleFavorite}
                />
              ))}
            </>
          )}
        </main>

        {/* SEO Section */}
        {!loading && <SEOSection locale={locale} />}

      </div>

      <Toast 
        message={toast.message} 
        isVisible={toast.visible} 
        onClose={closeToast} 
      />

      <FloatingControls 
        onScrollTop={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        onCollapseAll={() => setForceOpenState(false)}
        onExpandAll={() => setForceOpenState(true)}
      />
      
      <footer className="text-center py-10 text-slate-400 dark:text-slate-600 text-sm mb-8 md:mb-0 border-t border-slate-200 dark:border-white/5 mt-8 relative z-10">
        <p>© {new Date().getFullYear()} EmojiVerse. Designed for the World 🌍</p>
      </footer>
    </div>
  );
};

export default App;