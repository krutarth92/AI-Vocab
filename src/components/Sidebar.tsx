/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { motion } from 'motion/react';
import {
  Brain,
  Layers,
  Heart,
  Grid,
  TrendingUp,
  Cpu,
  Database,
  Terminal,
  Activity,
  CodeXml,
  Menu,
  Sparkles
} from 'lucide-react';
import { CATEGORIES, VOCAB_TERMS } from '../data';

interface SidebarProps {
  activeCategory: string | null;
  onCategoryChange: (category: string | null) => void;
  activeTab: 'directory' | 'stack';
  onTabChange: (tab: 'directory' | 'stack') => void;
  onResetFilters: () => void;
}

const CATEGORY_ICONS: Record<string, React.ReactNode> = {
  Product: <Heart className="w-4 h-4 text-pink-400" />,
  AI: <Sparkles className="w-4 h-4 text-purple-400" />,
  Backend: <CodeXml className="w-4 h-4 text-blue-400" />,
  Frontend: <Terminal className="w-4 h-4 text-teal-400" />,
  Data: <Database className="w-4 h-4 text-emerald-400" />,
  Architecture: <Layers className="w-4 h-4 text-indigo-400" />,
  Strategy: <TrendingUp className="w-4 h-4 text-amber-400" />
};

export default function Sidebar({
  activeCategory,
  onCategoryChange,
  activeTab,
  onTabChange,
  onResetFilters
}: SidebarProps) {
  // Compute counts per category for the metrics
  const categoryCounts = React.useMemo(() => {
    const counts: Record<string, number> = {};
    CATEGORIES.forEach(cat => {
      counts[cat] = VOCAB_TERMS.filter(t => t.category === cat).length;
    });
    return counts;
  }, []);

  return (
    <div className="w-full h-full flex flex-col bg-slate-950/40 border-r border-slate-900 p-5 gap-6">
      {/* Brand Launcher Block */}
      <div className="flex items-center gap-3 pb-4 border-b border-slate-900">
        <div className="p-2.5 bg-gradient-to-br from-teal-500 to-indigo-600 rounded-xl shadow-lg shadow-teal-500/10">
          <Brain id="sidebar-logo" className="w-5 h-5 text-slate-50" />
        </div>
        <div className="flex flex-col">
          <span className="font-heading font-bold text-slate-50 tracking-tight text-sm">Product Brain</span>
          <span className="text-[10px] text-slate-500 font-mono tracking-wider uppercase">SaaS Think Tank v1.0</span>
        </div>
      </div>

      {/* CORE NAVIGATION SECTIONS (Tabs) */}
      <div className="space-y-1.5">
        <span className="text-[10px] font-heading font-semibold tracking-widest text-slate-500 uppercase px-2">
          Engine Hub
        </span>
        
        <button
          onClick={() => {
            onTabChange('directory');
            onCategoryChange(null);
          }}
          className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl transition-all duration-200 text-left text-sm ${
            activeTab === 'directory'
              ? 'bg-slate-900 border border-slate-800 text-slate-50 font-medium'
              : 'border border-transparent text-slate-400 hover:text-slate-200 hover:bg-slate-900/30'
          }`}
        >
          <div className="flex items-center gap-2.5">
            <Grid className={`w-4.5 h-4.5 ${activeTab === 'directory' ? 'text-teal-400' : 'text-slate-500'}`} />
            <span>Concept Dictionary</span>
          </div>
          <span className="text-[10px] font-mono text-slate-500 bg-slate-950/60 px-1.5 py-0.5 rounded border border-slate-850">
            {VOCAB_TERMS.length}
          </span>
        </button>

        <button
          onClick={() => onTabChange('stack')}
          className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl transition-all duration-200 text-left text-sm ${
            activeTab === 'stack'
              ? 'bg-slate-900 border border-slate-800 text-slate-50 font-medium'
              : 'border border-transparent text-slate-400 hover:text-slate-200 hover:bg-slate-900/30'
          }`}
        >
          <div className="flex items-center gap-2.5">
            <Cpu className={`w-4.5 h-4.5 ${activeTab === 'stack' ? 'text-teal-400' : 'text-slate-500'}`} />
            <span>Why This Stack?</span>
          </div>
          <span className="text-[10px] font-mono text-slate-500 bg-slate-950/60 px-1.5 py-0.5 rounded border border-slate-850">
            4 Choice
          </span>
        </button>
      </div>

      {/* CATEGORY DIRECTORY TREE LAYOUTS */}
      {activeTab === 'directory' && (
        <div className="flex-1 flex flex-col gap-5 pt-2">
          <div className="flex items-center justify-between px-2">
            <span className="text-[10px] font-heading font-semibold tracking-widest text-slate-500 uppercase">
              Filter Categories
            </span>
            {activeCategory && (
              <button
                onClick={onResetFilters}
                className="text-[10px] text-teal-400 hover:text-teal-300 hover:underline transition-all"
              >
                Clear
              </button>
            )}
          </div>

          <div className="space-y-1 overflow-y-auto max-h-[380px] pr-1.5 scrollbar-thin">
            {/* "All" Category gate */}
            <button
              onClick={() => onCategoryChange(null)}
              className={`w-full flex items-center justify-between px-3 py-2 rounded-lg text-xs transition-all duration-150 text-left ${
                activeCategory === null
                  ? 'bg-slate-900/80 text-teal-400 font-medium border-l-2 border-teal-500pl-2.5'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900/20'
              }`}
            >
              <div className="flex items-center gap-2">
                <Menu className="w-3.5 h-3.5 text-slate-500" />
                <span>Show All Concepts</span>
              </div>
              <span className="text-[10px] font-mono text-slate-500">{VOCAB_TERMS.length}</span>
            </button>

            {CATEGORIES.map((cat) => {
              const isActive = activeCategory === cat;
              const count = categoryCounts[cat] || 0;
              return (
                <button
                  key={cat}
                  onClick={() => onCategoryChange(cat)}
                  className={`w-full flex items-center justify-between px-3 py-2 rounded-lg text-xs transition-all duration-150 text-left ${
                    isActive
                      ? 'bg-slate-900 text-slate-100 font-medium border-l-2 border-teal-500 pl-2.5 shadow-sm'
                      : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900/20'
                  }`}
                >
                  <div className="flex items-center gap-2">
                    <span className="shrink-0">{CATEGORY_ICONS[cat]}</span>
                    <span>{cat}</span>
                  </div>
                  <span className={`text-[10px] font-mono transition-colors ${isActive ? 'text-teal-400' : 'text-slate-600'}`}>
                    {count}
                  </span>
                </button>
              );
            })}
          </div>
        </div>
      )}

      {/* METRIC PILL STATS FOOTER */}
      <div className="mt-auto border-t border-slate-900 pt-4 space-y-3">
        <div className="bg-slate-950/80 rounded-xl p-3 border border-slate-900">
          <div className="flex items-center justify-between text-[11px] text-slate-500 font-medium mb-1">
            <span>Graph Health</span>
            <span className="text-emerald-400 text-[10px] flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
              Connected
            </span>
          </div>
          <div className="grid grid-cols-2 gap-2 text-center pt-1 border-t border-slate-900/60 mt-1">
            <div>
              <p className="text-[9px] text-slate-500 uppercase tracking-widest leading-none">Vertices</p>
              <p className="font-heading font-semibold text-sm text-slate-200 mt-1">{VOCAB_TERMS.length}</p>
            </div>
            <div>
              <p className="text-[9px] text-slate-500 uppercase tracking-widest leading-none">Sectors</p>
              <p className="font-heading font-semibold text-sm text-slate-200 mt-1">{CATEGORIES.length}</p>
            </div>
          </div>
        </div>

        {/* Short info */}
        <p className="text-[10px] text-slate-550 leading-relaxed px-1 text-slate-500">
          Designed off modern Swiss grid specifications & custom vector paths.
        </p>
      </div>
    </div>
  );
}
