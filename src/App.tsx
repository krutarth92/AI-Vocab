/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useMemo, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  Search,
  Menu,
  X,
  Command,
  RotateCcw,
  Sparkles,
  Layers,
  ChevronDown,
  MonitorCheck,
  Brain,
  HelpCircle,
  Clock
} from 'lucide-react';

import { VOCAB_TERMS, CATEGORIES } from './data';
import Sidebar from './components/Sidebar';
import VocabCard from './components/VocabCard';
import StackSection from './components/StackSection';
import InteractiveGraph from './components/InteractiveGraph';

export default function App() {
  // Navigation & Filtering state
  const [activeTab, setActiveTab] = useState<'directory' | 'stack'>('directory');
  const [activeCategory, setActiveCategory] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedTermId, setSelectedTermId] = useState<string | null>(null);
  
  // Mobile overlay sidebar toggle
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);

  // Sorting state (alphabetical vs original semantic layout)
  const [sortBy, setSortBy] = useState<'semantic' | 'alphabetical'>('semantic');

  // Ref container for focusing search input
  const searchInputRef = useRef<HTMLInputElement>(null);

  // Keyboard listener for Cmd/Ctrl+K or / to focus search
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        searchInputRef.current?.focus();
      } else if (e.key === '/' && document.activeElement !== searchInputRef.current) {
        // Prevent typing '/' inside input if we just clicked it to focus
        e.preventDefault();
        searchInputRef.current?.focus();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  // Filter and sort items dynamically
  const filteredTerms = useMemo(() => {
    return VOCAB_TERMS.filter((item) => {
      // 1. Category Filter
      if (activeCategory && item.category !== activeCategory) {
        return false;
      }
      // 2. Multi-field smart query searching
      if (searchQuery.trim() !== '') {
        const query = searchQuery.toLowerCase();
        return (
          item.term.toLowerCase().includes(query) ||
          item.what.toLowerCase().includes(query) ||
          item.why.toLowerCase().includes(query) ||
          item.where.toLowerCase().includes(query) ||
          item.mental_model.toLowerCase().includes(query) ||
          item.alternatives.toLowerCase().includes(query) ||
          item.category.toLowerCase().includes(query)
        );
      }
      return true;
    }).sort((a, b) => {
      if (sortBy === 'alphabetical') {
        return a.term.localeCompare(b.term);
      }
      return 0; // maintain original curated semantic ordering
    });
  }, [activeCategory, searchQuery, sortBy]);

  // Selection Callback linking Graph Nodes directly with the list expansion
  const handleSelectTermFromGraph = (termId: string) => {
    setSelectedTermId(termId);
    
    // Switch to category if it is filtered out
    const matchedTerm = VOCAB_TERMS.find(t => t.id === termId);
    if (matchedTerm && activeCategory && matchedTerm.category !== activeCategory) {
      setActiveCategory(matchedTerm.category);
    }
    
    // Delay scroll slightly to allow React layout updates
    setTimeout(() => {
      const cardElement = document.getElementById(`vocab-card-${termId}`);
      if (cardElement) {
        cardElement.scrollIntoView({
          behavior: 'smooth',
          block: 'center'
        });
      }
    }, 100);
  };

  // Helper counters
  const totalConceptsCount = VOCAB_TERMS.length;

  return (
    <div className="min-h-screen bg-[#0F172A] text-slate-150 flex flex-col antialiased selection:bg-teal-500/20 selection:text-teal-300 font-sans relative">
      {/* Dynamic atmospheric grid overlays for Linear look */}
      <div className="absolute inset-x-0 top-0 h-[600px] bg-gradient-to-b from-indigo-500/10 via-transparent to-transparent pointer-events-none" />
      <div 
        className="absolute inset-0 bg-[radial-gradient(#1e293b_1px,transparent_1px)] [background-size:24px_24px] opacity-25 pointer-events-none" 
        style={{ maskImage: 'radial-gradient(ellipse at top, black, transparent 75%)' }}
      />
      
      {/* MOBILE HEADER TOP NAV BAR */}
      <header className="lg:hidden w-full flex items-center justify-between border-b border-slate-900 bg-slate-950/80 p-4 sticky top-0 z-40 backdrop-blur-xl">
        <div className="flex items-center gap-2.5">
          <div className="p-1.5 bg-gradient-to-r from-teal-500 to-indigo-500 rounded-lg">
            <Brain className="w-4 h-4 text-white" />
          </div>
          <span className="font-heading font-bold text-sm tracking-tight text-white">Product Brain</span>
        </div>
        
        <button
          onClick={() => setIsMobileSidebarOpen(true)}
          className="p-1.5 rounded-lg bg-slate-900 border border-slate-800 text-slate-300 hover:text-white"
        >
          <Menu className="w-5 h-5" />
        </button>
      </header>

      <div className="flex-1 w-full max-w-7xl mx-auto flex items-stretch">
        
        {/* DESKTOP SIDEBAR PANEL (GRID SPACING COLLAPSES ON MOBILE) */}
        <aside className="hidden lg:block w-[260px] shrink-0 sticky top-0 h-screen max-h-screen overflow-y-auto">
          <Sidebar
            activeCategory={activeCategory}
            onCategoryChange={(val) => {
              setActiveCategory(val);
              setSelectedTermId(null);
            }}
            activeTab={activeTab}
            onTabChange={(tab) => {
              setActiveTab(tab);
              setSelectedTermId(null);
            }}
            onResetFilters={() => {
              setActiveCategory(null);
              setSearchQuery('');
              setSelectedTermId(null);
            }}
          />
        </aside>

        {/* MOBILE DRAWER SIDEBAR PANEL */}
        <AnimatePresence>
          {isMobileSidebarOpen && (
            <>
              {/* Overlay Backdrop */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => setIsMobileSidebarOpen(false)}
                className="lg:hidden fixed inset-0 bg-black/60 backdrop-blur-sm z-50"
              />
              {/* Drawer Container */}
              <motion.div
                initial={{ x: '-100%' }}
                animate={{ x: 0 }}
                exit={{ x: '-100%' }}
                transition={{ type: 'spring', damping: 25, stiffness: 220 }}
                className="lg:hidden fixed left-0 top-0 bottom-0 w-[280px] bg-slate-950 shadow-2xl border-r border-slate-900 z-50 h-full max-h-screen"
              >
                {/* Close handle inside Mobile Drawer */}
                <div className="absolute top-4 right-4 z-50">
                  <button
                    onClick={() => setIsMobileSidebarOpen(false)}
                    className="p-1.5 rounded-full bg-slate-900 text-slate-400 hover:text-white"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
                
                <Sidebar
                  activeCategory={activeCategory}
                  onCategoryChange={(val) => {
                    setActiveCategory(val);
                    setSelectedTermId(null);
                    setIsMobileSidebarOpen(false);
                  }}
                  activeTab={activeTab}
                  onTabChange={(tab) => {
                    setActiveTab(tab);
                    setSelectedTermId(null);
                    setIsMobileSidebarOpen(false);
                  }}
                  onResetFilters={() => {
                    setActiveCategory(null);
                    setSearchQuery('');
                    setSelectedTermId(null);
                    setIsMobileSidebarOpen(false);
                  }}
                />
              </motion.div>
            </>
          )}
        </AnimatePresence>

        {/* MAIN MULTI-MODULE WORKSPACE VIEWPORTS */}
        <main className="flex-1 flex flex-col p-4 sm:p-6 lg:p-8 overflow-y-auto gap-6">
          
          {/* TOP CORE CONTROLLER: SEARCH BAR AND METRICS */}
          <section className="w-full flex flex-col sm:flex-row sm:items-center justify-between gap-4 glass-card p-4 rounded-2xl">
            
            {/* Live Search bar */}
            <div className="relative flex-1 max-w-md">
              <span className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-450">
                <Search className="w-4 h-4" />
              </span>
              <input
                ref={searchInputRef}
                type="text"
                placeholder="Search concepts, usecases, models, alternatives..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-slate-950/40 border border-white/5 focus:border-teal-500 text-slate-100 text-sm pl-10 pr-16 py-2.5 rounded-xl outline-none transition-all duration-200 placeholder-slate-450 focus:ring-1 focus:ring-teal-500/20"
              />
              {/* Keyboard visual label */}
              <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none gap-0.5 text-slate-500 font-mono text-[9px] hidden sm:flex">
                <Command className="w-3 h-3" />
                <span>K</span>
              </div>
            </div>

            {/* Display filters & toggle options */}
            <div className="flex items-center gap-3 self-end sm:self-auto">
              {activeTab === 'directory' && (
                <div className="flex items-center gap-2">
                  <span className="text-xs text-slate-500 font-medium">Sort:</span>
                  <div className="bg-slate-900/60 p-1 rounded-xl border border-slate-800 flex items-center">
                    <button
                      onClick={() => setSortBy('semantic')}
                      className={`text-[10px] px-2.5 py-1 rounded-lg font-medium transition-all ${
                        sortBy === 'semantic'
                          ? 'bg-slate-950 text-teal-400 border border-slate-800 shadow-sm'
                          : 'text-slate-500 hover:text-slate-300'
                      }`}
                    >
                      Semantic
                    </button>
                    <button
                      onClick={() => setSortBy('alphabetical')}
                      className={`text-[10px] px-2.5 py-1 rounded-lg font-medium transition-all ${
                        sortBy === 'alphabetical'
                          ? 'bg-slate-950 text-teal-400 border border-slate-800 shadow-sm'
                          : 'text-slate-500 hover:text-slate-300'
                      }`}
                    >
                      A-Z
                    </button>
                  </div>
                </div>
              )}

              {/* Reset shortcut */}
              {(activeCategory || searchQuery) && (
                <button
                  onClick={() => {
                    setActiveCategory(null);
                    setSearchQuery('');
                    setSelectedTermId(null);
                  }}
                  className="flex items-center gap-1.5 text-xs text-teal-400 hover:text-teal-300 bg-teal-950/25 border border-teal-850 px-2.5 py-1.5 rounded-xl transition-all"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  <span className="font-medium">Reset</span>
                </button>
              )}
            </div>

          </section>

          {/* DYNAMIC TAB COMPONENT ROUTER */}
          {activeTab === 'directory' ? (
            <div className="space-y-6">
              
              {/* HERO METADATA WELCOME BLOCK */}
              <div className="relative overflow-hidden w-full bg-gradient-to-br from-slate-950/60 to-indigo-950/20 rounded-2xl p-6 glass-card">
                <div className="absolute top-0 right-0 w-44 h-44 bg-teal-500/10 rounded-full blur-3xl pointer-events-none" />
                <div className="absolute bottom-0 left-0 w-32 h-32 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none" />
                
                <h2 className="font-heading font-semibold text-lg sm:text-2xl text-slate-100 tracking-tight flex items-center gap-2">
                  <Sparkles className="w-5 h-5 text-teal-400 shrink-0" />
                  My Engineering Mind-Map
                </h2>
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mt-2">
                  <p className="text-xs sm:text-sm text-slate-300 leading-relaxed font-normal max-w-2xl">
                    This is a curated architecture database mapping strategic product paradigms, AI concepts, data safety schemes, and modular client-server integrations. This is the product brain blueprint.
                  </p>
                  
                  {/* Miniature UTC Widget showing absolute current dates */}
                  <div className="flex items-center gap-2 bg-slate-900/60 border border-slate-850 p-2.5 rounded-xl self-start sm:self-auto uppercase tracking-wider text-[10px] font-mono shrink-0">
                    <Clock className="w-3.5 h-3.5 text-slate-500" />
                    <div>
                      <p className="text-slate-500 leading-none">Sync Time (UTC)</p>
                      <p className="text-slate-350 leading-none mt-1">2026-05-22 19:05</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* PREFERRED OPTIONAL REQUIREMENT: RELATIONSHIP GRAPH MAP */}
              <InteractiveGraph
                selectedTermId={selectedTermId}
                onSelectTerm={handleSelectTermFromGraph}
                activeCategory={activeCategory}
              />

              {/* CARD-BASED EXPLANATION GRID */}
              <div className="space-y-4">
                <div className="flex items-center justify-between border-b border-slate-900 pb-3">
                  <span className="text-[11px] font-heading font-semibold tracking-wider text-slate-500 uppercase">
                    {activeCategory ? `Category: ${activeCategory}` : 'Core Concept Lexicon'} 
                    {searchQuery && ` (Searching: "${searchQuery}")`}
                  </span>
                  <span className="text-xs text-slate-500 font-medium">
                    Showing {filteredTerms.length} of {totalConceptsCount} terms
                  </span>
                </div>

                <AnimatePresence mode="popLayout">
                  {filteredTerms.length > 0 ? (
                    <div className="flex flex-col gap-4">
                      {filteredTerms.map((term, index) => {
                        const isExpanded = selectedTermId === term.id;
                        return (
                          <motion.div
                            key={term.id}
                            initial={{ opacity: 0, y: 15 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.98 }}
                            transition={{ duration: 0.2, delay: Math.min(index * 0.04, 0.3) }}
                          >
                            <VocabCard
                              term={term}
                              isExpanded={isExpanded}
                              onToggleExpand={() => {
                                setSelectedTermId(isExpanded ? null : term.id);
                              }}
                              onSelectRelated={(relatedId) => {
                                handleSelectTermFromGraph(relatedId);
                              }}
                              highlighted={selectedTermId === term.id}
                            />
                          </motion.div>
                        );
                      })}
                    </div>
                  ) : (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="border border-dashed border-slate-800 p-12 rounded-2xl text-center space-y-4 bg-slate-950/20"
                    >
                      <Layers className="w-10 h-10 text-slate-600 mx-auto" />
                      <div>
                        <h4 className="font-heading font-medium text-slate-200 text-sm">No conceptual matches found</h4>
                        <p className="text-xs text-slate-500 max-w-xs mx-auto mt-1">
                          No dictionary nodes matched your search pattern. Try widening category matrices.
                        </p>
                      </div>
                      <button
                        onClick={() => {
                          setActiveCategory(null);
                          setSearchQuery('');
                          setSelectedTermId(null);
                        }}
                        className="text-xs text-teal-400 bg-teal-950/40 border border-teal-900/60 hover:bg-teal-950/50 hover:border-teal-700 px-4 py-2 rounded-xl transition-all"
                      >
                        Reset Search Parameters
                      </button>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

            </div>
          ) : (
            // ADVANCED "WHY THIS STACK" SECTION VIEWPORT
            <StackSection />
          )}

        </main>
      </div>
    </div>
  );
}
