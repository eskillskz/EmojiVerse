
import React from 'react';
import { KaomojiGroup } from '../types';

interface KaomojiCategoryProps {
  group: KaomojiGroup;
  onCopy: (kaomoji: string) => void;
}

const KaomojiCategory: React.FC<KaomojiCategoryProps> = ({ group, onCopy }) => {
  return (
    <section className="mb-6 bg-white dark:bg-slate-900/40 backdrop-blur-sm border border-slate-200 dark:border-white/5 rounded-3xl shadow-sm p-6">
      <h2 className="text-lg font-bold text-slate-800 dark:text-slate-200 mb-4 flex items-center gap-2">
        {group.name}
        <span className="text-xs font-bold text-slate-500 dark:text-slate-400 bg-slate-100 dark:bg-slate-800 px-2 py-0.5 rounded-full border border-slate-200 dark:border-slate-700">
          {group.items.length}
        </span>
      </h2>
      
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3">
        {group.items.map((item, index) => (
          <button
            key={`${group.name}-${index}`}
            onClick={() => onCopy(item)}
            className="
              flex items-center justify-center py-3 px-2 rounded-xl border border-slate-100 dark:border-slate-800
              bg-slate-50/50 dark:bg-slate-800/30 text-slate-700 dark:text-slate-300
              font-mono text-sm sm:text-base whitespace-nowrap overflow-hidden text-ellipsis
              hover:bg-white dark:hover:bg-slate-700 hover:border-indigo-200 dark:hover:border-indigo-500/50 hover:text-indigo-600 dark:hover:text-indigo-300
              hover:scale-105 hover:shadow-md transition-all active:scale-95
            "
            title="Click to Copy"
          >
            {item}
          </button>
        ))}
      </div>
    </section>
  );
};

export default KaomojiCategory;
