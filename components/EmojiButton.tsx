import React, { useState } from 'react';
import { Heart } from 'lucide-react';
import { EmojiRaw } from '../types';

interface EmojiButtonProps {
  emoji: EmojiRaw;
  onCopy: (emoji: EmojiRaw) => void;
  isFavorite?: boolean;
  onToggleFavorite?: (emoji: EmojiRaw) => void;
}

const EmojiButton: React.FC<EmojiButtonProps> = ({ emoji, onCopy, isFavorite = false, onToggleFavorite }) => {
  const [isHovered, setIsHovered] = useState(false);
  const hasVariants = emoji.skins && emoji.skins.length > 0;

  const handleFavoriteClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (onToggleFavorite) {
      onToggleFavorite(emoji);
    }
  };

  return (
    <div 
      className="relative group z-0 hover:z-30 p-0.5 sm:p-1"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      // Mobile support: Long press opens menu instead of right-click
      onContextMenu={(e) => {
        if (hasVariants) {
          e.preventDefault();
          setIsHovered(true);
        }
      }}
    >
      <button
        onClick={() => onCopy(emoji)}
        title={emoji.label}
        className="w-full aspect-square flex items-center justify-center text-2xl sm:text-3xl md:text-4xl rounded-xl sm:rounded-2xl cursor-pointer select-none relative transition-all duration-200 transform
          bg-slate-50/50 dark:bg-slate-800/20 border border-transparent
          hover:bg-white dark:hover:bg-slate-700 hover:border-slate-200 dark:hover:border-slate-600
          hover:scale-110 
          hover:shadow-lg dark:hover:ring-2 dark:hover:ring-indigo-500 dark:hover:shadow-[0_0_20px_rgba(99,102,241,0.4)]
          active:scale-95"
      >
        {emoji.emoji}
        
        {/* Tiny indicator dot if variants exist */}
        {hasVariants && (
          <div className="absolute bottom-1 right-1 w-1 h-1 sm:w-1.5 sm:h-1.5 bg-slate-300 dark:bg-slate-500 rounded-full opacity-50 group-hover:opacity-100 transition-opacity" />
        )}
      </button>

      {/* Favorite Heart Icon */}
      {onToggleFavorite && (
        <div 
          onClick={handleFavoriteClick}
          className={`absolute -top-1 -right-1 p-1.5 rounded-full cursor-pointer transition-all duration-200 transform z-20 ${isFavorite ? 'scale-100 opacity-100' : 'scale-0 opacity-0 group-hover:scale-100 group-hover:opacity-100'}`}
        >
          <Heart 
            size={14} 
            className={`${isFavorite ? 'fill-red-500 text-red-500 drop-shadow-sm' : 'text-slate-400 dark:text-slate-500 hover:text-red-400 fill-slate-100 dark:fill-slate-800'}`} 
          />
        </div>
      )}

      {/* Skin Tone Popup Menu */}
      {hasVariants && isHovered && (
        <div 
          className="absolute top-full left-1/2 -translate-x-1/2 mt-2 p-2 bg-white/95 dark:bg-slate-900/95 backdrop-blur-xl border border-slate-200 dark:border-white/10 shadow-2xl dark:shadow-[0_10px_40px_rgba(0,0,0,0.5)] rounded-xl flex gap-1 z-40 animate-in fade-in zoom-in-95 duration-200"
          style={{ minWidth: 'max-content' }}
        >
          {/* Render Original First */}
          <button
             onClick={(e) => { e.stopPropagation(); onCopy(emoji); }}
             className="w-8 h-8 sm:w-10 sm:h-10 flex items-center justify-center text-xl sm:text-2xl hover:bg-slate-100 dark:hover:bg-white/10 hover:scale-110 rounded-lg transition-all cursor-pointer"
             title="Default"
          >
            {emoji.emoji}
          </button>
          
          {/* Render Variants */}
          {emoji.skins?.map((variant, idx) => (
            <button
              key={`${variant.hexcode}-${idx}`}
              onClick={(e) => { e.stopPropagation(); onCopy(variant); }}
              className="w-8 h-8 sm:w-10 sm:h-10 flex items-center justify-center text-xl sm:text-2xl hover:bg-slate-100 dark:hover:bg-white/10 hover:scale-110 rounded-lg transition-all cursor-pointer"
              title={variant.label}
            >
              {variant.emoji}
            </button>
          ))}
          
          {/* Decorative triangle pointing up */}
          <div className="absolute -top-2 left-1/2 -translate-x-1/2 w-4 h-4 bg-white/95 dark:bg-slate-900/95 backdrop-blur-xl border-t border-l border-slate-200 dark:border-white/10 rotate-45" />
        </div>
      )}
    </div>
  );
};

export default EmojiButton;