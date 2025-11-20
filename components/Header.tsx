import React, { useState } from 'react';
import { Search, Smile, User, Dog, Pizza, Plane, Activity, Lightbulb, Heart, Flag, Grid3X3, Moon, Sun, Menu, X } from 'lucide-react';
import { EmojiGroup, Locale, LOCALE_DATA } from '../types';
import { UI_LABELS } from '../data/uiTranslations';

interface HeaderProps {
  groups: EmojiGroup[];
  searchQuery: string;
  setSearchQuery: (q: string) => void;
  onCategorySelect: (id: string) => void;
  activeCategory: string;
  currentLocale: Locale;
  onLocaleChange: (l: Locale) => void;
  isDarkMode: boolean;
  toggleTheme: () => void;
}

const ICON_MAP: Record<string, React.ElementType> = {
  'Smileys & Emotion': Smile,
  'People & Body': User,
  'Animals & Nature': Dog,
  'Food & Drink': Pizza,
  'Travel & Places': Plane,
  'Activities': Activity,
  'Objects': Lightbulb,
  'Symbols': Heart,
  'Flags': Flag,
};

const Header: React.FC<HeaderProps> = ({ 
  groups, 
  searchQuery, 
  setSearchQuery, 
  onCategorySelect, 
  activeCategory,
  currentLocale,
  onLocaleChange,
  isDarkMode,
  toggleTheme
}) => {
  
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const currentFlag = LOCALE_DATA.find(l => l.code === currentLocale)?.flag || '🌐';
  const currentLangLabel = LOCALE_DATA.find(l => l.code === currentLocale)?.label || 'English';
  
  const labels = UI_LABELS[currentLocale];

  const handleMobileCategoryClick = (groupName: string) => {
    onCategorySelect(groupName);
    setIsMobileMenuOpen(false);
  };

  return (
    <header className="sticky top-0 z-50 bg-white/90 dark:bg-slate-950/90 backdrop-blur-xl border-b border-slate-200 dark:border-white/10 shadow-lg dark:shadow-black/20 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        
        {/* ================= MOBILE LAYOUT (< md) ================= */}
        <div className="flex flex-col gap-4 md:hidden">
          
          {/* Row 1: Logo & Name (Left) + Burger (Right) */}
          <div className="flex items-center justify-between">
             <div className="flex items-center gap-2" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth'})}>
                <div className="bg-gradient-to-br from-indigo-500 to-violet-600 p-2 rounded-xl text-white shadow-lg shadow-indigo-500/30">
                  <Smile size={24} strokeWidth={2.5} />
                </div>
                <h1 className="text-xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 to-violet-600 dark:from-white dark:to-slate-400 tracking-tight">
                  EmojiVerse
                </h1>
            </div>
            <button 
              className="p-2 text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-xl transition-colors"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>

          {/* Row 2: Theme (Compact) & Language (Full Name) */}
          <div className="flex items-center gap-2">
             {/* Theme Toggle: Reduced size (Icon + Text "Mode") */}
             <button 
              onClick={toggleTheme}
              className="flex items-center gap-1.5 px-3 py-2.5 rounded-xl bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-200 font-semibold text-xs shadow-sm active:scale-95 transition-all shrink-0"
             >
                {isDarkMode ? <Sun size={16} className="text-amber-400" /> : <Moon size={16} className="text-indigo-600" />}
                <span>{isDarkMode ? labels.lightMode : labels.darkMode}</span>
             </button>

             {/* Language: Full Name (Expanded) */}
             <div className="relative group flex-1">
                <div className="flex items-center justify-between bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 px-3 py-2.5 rounded-xl cursor-pointer shadow-sm">
                    <div className="flex items-center gap-2 overflow-hidden">
                      <span className="text-lg leading-none">{currentFlag}</span>
                      <span className="text-sm font-bold text-slate-700 dark:text-slate-300 truncate">
                        {currentLangLabel}
                      </span>
                    </div>
                </div>
                 {/* Dropdown */}
                 <div className="absolute right-0 mt-2 w-full min-w-[200px] bg-white dark:bg-slate-900/95 backdrop-blur-2xl rounded-2xl shadow-2xl border border-slate-200 dark:border-white/10 py-2 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all z-[60] max-h-[300px] overflow-y-auto">
                    {LOCALE_DATA.map(loc => (
                        <button
                          key={loc.code}
                          onClick={() => onLocaleChange(loc.code)}
                          className={`w-full text-left px-4 py-3 text-sm flex items-center gap-3 hover:bg-slate-50 dark:hover:bg-slate-800 ${currentLocale === loc.code ? 'text-indigo-600 font-bold' : 'text-slate-600 dark:text-slate-400'}`}
                        >
                          <span>{loc.flag}</span> {loc.label}
                        </button>
                      ))}
                 </div>
             </div>
          </div>

          {/* Row 3: Search Bar */}
          <div className="relative w-full">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search className="h-5 w-5 text-slate-400" />
            </div>
            <input
              type="text"
              placeholder={labels.searchPlaceholder}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="block w-full pl-10 pr-4 py-3 border border-slate-200 dark:border-slate-700 rounded-2xl text-base bg-slate-100/50 dark:bg-slate-900/50 text-slate-900 dark:text-white focus:outline-none focus:bg-white dark:focus:bg-slate-900 focus:ring-2 focus:ring-indigo-500/50 transition-all shadow-inner"
            />
          </div>
        </div>

        {/* ================= DESKTOP LAYOUT (>= md) ================= */}
        <div className="hidden md:flex flex-col gap-4">
          
          {/* Row 1: Logo Only */}
          <div className="flex items-center py-2" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth'})}>
            <div className="bg-gradient-to-br from-indigo-500 to-violet-600 p-2.5 rounded-2xl text-white shadow-lg shadow-indigo-500/30 mr-3 hover:scale-105 transition-transform cursor-pointer">
              <Smile size={28} strokeWidth={2.5} />
            </div>
            <h1 className="text-3xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 to-violet-600 dark:from-white dark:to-slate-400 tracking-tight cursor-pointer">
              EmojiVerse
            </h1>
          </div>

          {/* Row 2: Search | Mode | Language */}
          <div className="flex items-center gap-4">
            {/* Search Bar */}
            <div className="flex-1 relative">
               <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search className="h-5 w-5 text-slate-400" />
              </div>
              <input
                type="text"
                placeholder={labels.searchPlaceholder}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="block w-full pl-10 pr-4 py-2.5 border border-slate-200 dark:border-slate-700 rounded-2xl text-base bg-slate-100/50 dark:bg-slate-900/50 text-slate-900 dark:text-white focus:outline-none focus:bg-white dark:focus:bg-slate-900 focus:ring-2 focus:ring-indigo-500/50 transition-all shadow-inner"
              />
            </div>

            {/* Theme Toggle Text */}
            <button 
              onClick={toggleTheme}
              className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 hover:bg-white dark:hover:bg-slate-800 transition-all shadow-sm min-w-[140px] justify-center"
             >
                {isDarkMode ? <Sun size={18} className="text-amber-400" /> : <Moon size={18} className="text-indigo-600" />}
                <span className="font-medium">{isDarkMode ? labels.lightMode : labels.darkMode}</span>
             </button>

             {/* Language Full - UPDATED TO GRID LAYOUT */}
             <div className="relative group">
                <div className="flex items-center gap-2 bg-slate-100 dark:bg-slate-900 hover:bg-white dark:hover:bg-slate-800 border border-slate-200 dark:border-slate-700 px-4 py-2.5 rounded-xl cursor-pointer transition-all shadow-sm min-w-[160px]">
                    <span className="text-xl leading-none">{currentFlag}</span>
                    <span className="text-sm font-bold text-slate-600 dark:text-slate-300">
                      {currentLangLabel}
                    </span>
                </div>
                {/* Wide Dropdown Container with Grid */}
                <div className="absolute right-0 mt-2 w-[600px] bg-white dark:bg-slate-900/95 backdrop-blur-2xl rounded-2xl shadow-2xl border border-slate-200 dark:border-white/10 p-3 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all z-[60] transform origin-top-right scale-95 group-hover:scale-100">
                    <div className="grid grid-cols-3 gap-2">
                      {LOCALE_DATA.map(loc => (
                          <button
                            key={loc.code}
                            onClick={() => onLocaleChange(loc.code)}
                            className={`text-left px-3 py-2 rounded-xl text-sm flex items-center gap-3 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors ${currentLocale === loc.code ? 'text-indigo-600 dark:text-indigo-400 font-bold bg-indigo-50 dark:bg-slate-800/50' : 'text-slate-600 dark:text-slate-400 font-medium'}`}
                          >
                            <span className="text-xl">{loc.flag}</span>
                            {loc.label}
                          </button>
                        ))}
                    </div>
                </div>
             </div>
          </div>

          {/* Row 3: Navigation Categories */}
          <nav className="border-t border-slate-200 dark:border-white/5 pt-2">
            <div className="flex flex-wrap justify-between gap-2">
              {groups.map((group) => {
                const Icon = ICON_MAP[group.groupName] || Grid3X3;
                const isActive = activeCategory === group.groupName;
                return (
                  <button
                    key={group.groupName}
                    onClick={() => onCategorySelect(group.groupName)}
                    className={`
                      flex items-center gap-1.5 px-3 py-2 rounded-xl text-sm font-semibold transition-all duration-300 border
                      ${isActive 
                        ? 'bg-white dark:bg-slate-800 text-indigo-600 dark:text-indigo-300 border-indigo-200 dark:border-indigo-500/50 shadow-lg dark:shadow-[0_0_15px_rgba(99,102,241,0.3)]' 
                        : 'bg-transparent border-transparent text-slate-500 dark:text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-900 hover:text-slate-700 dark:hover:text-slate-300'
                      }
                    `}
                  >
                    <Icon size={14} className={isActive ? 'text-indigo-600 dark:text-indigo-400' : 'text-slate-400 dark:text-slate-600'} />
                    {group.groupName}
                  </button>
                );
              })}
            </div>
          </nav>
        </div>

        {/* Mobile Nav Menu Dropdown (Hamburger Content) */}
        <div className={`md:hidden overflow-hidden transition-all duration-300 ease-in-out ${isMobileMenuOpen ? 'max-h-[500px] opacity-100 pb-4 border-t border-slate-200 dark:border-white/10 mt-2' : 'max-h-0 opacity-0'}`}>
          <div className="grid grid-cols-2 gap-2 pt-4">
            {groups.map((group) => {
              const Icon = ICON_MAP[group.groupName] || Grid3X3;
              const isActive = activeCategory === group.groupName;
              return (
                <button
                  key={group.groupName}
                  onClick={() => handleMobileCategoryClick(group.groupName)}
                  className={`
                    flex items-center gap-2 px-4 py-3 rounded-xl text-sm font-semibold transition-all border text-left
                    ${isActive 
                      ? 'bg-indigo-50 dark:bg-slate-800 text-indigo-600 dark:text-indigo-300 border-indigo-200 dark:border-indigo-500/50' 
                      : 'bg-slate-50 dark:bg-slate-900/50 border-transparent text-slate-600 dark:text-slate-400'
                    }
                  `}
                >
                  <Icon size={16} />
                  {group.groupName}
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;