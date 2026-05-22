/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ChevronDown, Sparkles, AlertCircle, MapPin, Compass, Shuffle, HelpCircle } from 'lucide-react';
import { VocabTerm } from '../types';

interface VocabCardProps {
  term: VocabTerm;
  isExpanded: boolean;
  onToggleExpand: () => void;
  onSelectRelated: (relatedId: string) => void;
  highlighted: boolean;
}

const CATEGORY_STYLES: Record<string, { bg: string; text: string; border: string; glow: string }> = {
  Product: { bg: 'bg-pink-950/40', text: 'text-pink-400', border: 'border-pink-800/40', glow: 'shadow-pink-500/5' },
  AI: { bg: 'bg-purple-950/40', text: 'text-purple-400', border: 'border-purple-800/40', glow: 'shadow-purple-500/5' },
  Backend: { bg: 'bg-blue-950/40', text: 'text-blue-400', border: 'border-blue-800/40', glow: 'shadow-blue-500/5' },
  Frontend: { bg: 'bg-teal-950/40', text: 'text-teal-400', border: 'border-teal-800/40', glow: 'shadow-teal-500/5' },
  Data: { bg: 'bg-emerald-950/40', text: 'text-emerald-400', border: 'border-emerald-800/40', glow: 'shadow-emerald-500/5' },
  Architecture: { bg: 'bg-indigo-950/40', text: 'text-indigo-400', border: 'border-indigo-800/40', glow: 'shadow-indigo-500/5' },
  Strategy: { bg: 'bg-amber-950/40', text: 'text-amber-400', border: 'border-amber-800/40', glow: 'shadow-amber-500/5' }
};

export default function VocabCard({
  term,
  isExpanded,
  onToggleExpand,
  onSelectRelated,
  highlighted
}: VocabCardProps) {
  const catStyle = CATEGORY_STYLES[term.category] || CATEGORY_STYLES.Product;

  return (
    <motion.div
      layout="position"
      id={`vocab-card-${term.id}`}
      className={`relative w-full rounded-2xl transition-all duration-300 shadow-xl glass-card ${
        isExpanded
          ? 'bg-slate-900/90 border-teal-500/30 ring-1 ring-teal-500/20 shadow-teal-500/5'
          : highlighted
            ? 'border-teal-500/40 shadow-md ring-1 ring-teal-500/10 bg-[rgba(30,41,59,0.6)]'
            : 'hover:border-teal-500/50 hover:bg-[rgba(30,41,59,0.55)]'
      }`}
    >
      {/* Decorative top-border line for expanded state */}
      {isExpanded && (
        <div className="absolute top-0 left-0 right-0 h-[1.5px] bg-gradient-to-r from-transparent via-teal-500/30 to-transparent rounded-t-2xl pointer-events-none" />
      )}

      {/* CARD COMPACT HEADER & CORE DETAILS TAPPING GATES */}
      <div
        onClick={onToggleExpand}
        className="p-5 sm:p-6 cursor-pointer select-none flex items-start justify-between gap-4"
      >
        <div className="flex-1 space-y-2">
          {/* Tag & Related counts bar */}
          <div className="flex flex-wrap items-center gap-2">
            <span className={`text-[10px] font-heading font-semibold uppercase tracking-wider px-2 py-0.5 rounded-full border ${catStyle.bg} ${catStyle.text} ${catStyle.border}`}>
              {term.category}
            </span>
            {term.related.length > 0 && (
              <span className="text-[9px] font-mono text-slate-500 bg-slate-900/80 px-2 py-0.5 rounded-full border border-slate-800/60">
                {term.related.length} relations
              </span>
            )}
          </div>

          {/* Title */}
          <h4 className="font-heading font-semibold text-base sm:text-lg text-slate-100 tracking-tight leading-snug">
            {term.term}
          </h4>

          {/* Quick Explainer always visible */}
          <p className="text-xs sm:text-sm text-slate-300 font-normal leading-relaxed">
            {term.what}
          </p>
        </div>

        {/* Chevron Expand Controls */}
        <div className="pt-1.5">
          <span className={`flex items-center justify-center p-1.5 rounded-lg border transition-all duration-300 ${
            isExpanded
              ? 'bg-teal-950/40 border-teal-800/60 text-teal-400 rotate-180'
              : 'bg-slate-900/80 border-slate-800 text-slate-400 hover:text-slate-200'
          }`}>
            <ChevronDown className="w-4 h-4" />
          </span>
        </div>
      </div>

      {/* FULLY EXPANDED INFORMATION SLIDE */}
      <AnimatePresence initial={false}>
        {isExpanded && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25, ease: 'easeInOut' }}
            className="overflow-hidden border-t border-slate-800/80 bg-slate-950/30 rounded-b-2xl"
          >
            <div className="p-5 sm:p-6 space-y-6 text-sm">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                {/* Section Column: Why & Where */}
                <div className="space-y-4">
                  <div className="space-y-1.5">
                    <h5 className="text-[10px] uppercase font-heading font-semibold tracking-widest text-teal-400 flex items-center gap-1.5">
                      <Sparkles className="w-3 h-3" />
                      Why We Use It
                    </h5>
                    <p className="text-xs sm:text-sm text-slate-300 leading-relaxed font-normal">
                      {term.why}
                    </p>
                  </div>

                  <div className="space-y-1.5">
                    <h5 className="text-[10px] uppercase font-heading font-semibold tracking-widest text-slate-400 flex items-center gap-1.5">
                      <MapPin className="w-3 h-3" />
                      Where It's Applied (Use Case)
                    </h5>
                    <p className="text-xs sm:text-sm text-slate-300 leading-relaxed font-normal">
                      {term.where}
                    </p>
                  </div>
                </div>

                {/* Section Column: Alternatives Rejected / Considered */}
                <div className="space-y-4 bg-slate-900/30 border border-slate-800/40 p-4 rounded-xl">
                  <div className="space-y-1.5">
                    <h5 className="text-[10px] uppercase font-heading font-semibold tracking-widest text-[#5EEAD4] flex items-center gap-1.5">
                      <Shuffle className="w-3 h-3 text-[#14B8A6]" />
                      Alternatives Considered & Trade-offs
                    </h5>
                    <p className="text-xs sm:text-sm text-slate-300 leading-relaxed font-normal">
                      {term.alternatives}
                    </p>
                  </div>
                </div>
              </div>

              {/* Mental Model Analogy block */}
              <div className="border border-slate-800 bg-slate-950/60 p-4 rounded-xl space-y-2">
                <h5 className="text-[10px] uppercase font-heading font-semibold tracking-widest text-slate-400 flex items-center gap-1.5">
                  <Compass className="w-3 h-3 text-teal-400" />
                  Mental Model Analogy
                </h5>
                <p className="text-xs sm:text-sm text-slate-200 leading-relaxed font-medium italic border-l-2 border-teal-500/50 pl-3">
                  "{term.mental_model}"
                </p>
              </div>

              {/* Dynamic Related nodes buttons */}
              {term.related.length > 0 && (
                <div className="space-y-2 pt-2">
                  <h5 className="text-[10px] uppercase font-heading font-semibold tracking-widest text-slate-500">
                    See Linked Brain Nodes:
                  </h5>
                  <div className="flex flex-wrap gap-2">
                    {term.related.map((relatedId) => {
                      // Get human label from ID
                      const formattedLabel = relatedId
                        .split('-')
                        .map(word => word.charAt(0).toUpperCase() + word.slice(1))
                        .join(' ');

                      return (
                        <button
                          key={relatedId}
                          onClick={() => onSelectRelated(relatedId)}
                          className="text-[11px] font-sans font-medium text-teal-400/90 bg-teal-950/20 border border-teal-900/60 hover:bg-teal-950/40 hover:border-teal-700 hover:text-teal-300 px-2.5 py-1 rounded-lg transition-all duration-200"
                        >
                          {formattedLabel}
                        </button>
                      );
                    })}
                  </div>
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
