/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Check, XSquare, Zap, Layers, Cpu, Database, Smartphone } from 'lucide-react';
import { TECH_STACK_REASONS } from '../data';

const TECH_ICONS: Record<string, React.ReactNode> = {
  sveltekit: <Cpu className="w-5 h-5 text-amber-400" />,
  fastapi: <Zap className="w-5 h-5 text-emerald-400" />,
  postgresql: <Database className="w-5 h-5 text-blue-400" />,
  capacitor: <Smartphone className="w-5 h-5 text-teal-400" />
};

export default function StackSection() {
  const [activeTechId, setActiveTechId] = useState(TECH_STACK_REASONS[0].id);

  const activeTech = TECH_STACK_REASONS.find(t => t.id === activeTechId) || TECH_STACK_REASONS[0];

  return (
    <div className="w-full rounded-2xl p-6 glass-card shadow-2xl relative overflow-hidden">
      {/* Background radial highlight */}
      <div className="absolute top-0 right-0 w-80 h-80 bg-teal-500/5 rounded-full blur-3xl pointer-events-none" />

      <div className="flex flex-col gap-2 mb-6 border-b border-slate-800/80 pb-4">
        <h3 className="font-heading font-semibold text-slate-100 text-lg flex items-center gap-2">
          <Layers className="w-5 h-5 text-teal-400" />
          Why This Tech Stack?
        </h3>
        <p className="text-sm text-slate-400 max-w-2xl">
          An architectural evaluation explaining our microservice-client engineering choices. Direct reasoning paired with structural trade-offs.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Tech Selector Panel */}
        <div className="lg:col-span-4 flex flex-row lg:flex-col gap-2 overflow-x-auto lg:overflow-x-visible pb-3 lg:pb-0 scrollbar-none">
          {TECH_STACK_REASONS.map((stack) => {
            const isSelected = stack.id === activeTechId;
            return (
              <button
                key={stack.id}
                onClick={() => setActiveTechId(stack.id)}
                className={`flex items-center gap-3 w-full min-w-[140px] px-4 py-3.5 rounded-xl border text-left transition-all duration-200 shrink-0 ${
                  isSelected
                    ? 'bg-slate-900 border-teal-500/40 text-slate-50 shadow-lg shadow-teal-500/5'
                    : 'bg-transparent border-slate-800/40 text-slate-400 hover:text-slate-200 hover:bg-slate-900/40 hover:border-slate-800'
                }`}
              >
                <div className={`p-1.5 rounded-lg ${isSelected ? 'bg-slate-950 border border-slate-700/50' : 'bg-slate-900/60'}`}>
                  {TECH_ICONS[stack.id] || <Cpu className="w-4 h-4" />}
                </div>
                <div className="flex flex-col">
                  <span className="font-medium text-xs sm:text-sm tracking-tight">{stack.tech}</span>
                  <span className="text-[10px] text-slate-500 hidden lg:block">Architecture Pillar</span>
                </div>
              </button>
            );
          })}
        </div>

        {/* Detailed Explanation Display */}
        <div className="lg:col-span-8">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTech.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
              className="space-y-6"
            >
              {/* Tech Header */}
              <div className="flex items-center gap-3">
                <span className="p-2.5 bg-slate-900 border border-slate-800 rounded-xl">
                  {TECH_ICONS[activeTech.id]}
                </span>
                <h4 className="font-heading font-semibold text-slate-100 text-base sm:text-lg">
                  {activeTech.title}
                </h4>
              </div>

              {/* Reasoning Blocks */}
              <div className="space-y-3">
                <h5 className="text-[11px] font-heading font-semibold tracking-wider text-teal-400 uppercase">
                  Technical Strengths & Advantages
                </h5>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {activeTech.reasoning.map((item, idx) => {
                    const [heading, body] = item.split(': ');
                    return (
                      <div
                        key={idx}
                        className="bg-slate-900/40 border border-slate-800/70 p-4 rounded-xl flex items-start gap-3 hover:border-slate-800 transition-colors"
                      >
                        <span className="mt-0.5 p-1 bg-emerald-950/40 border border-emerald-800/50 rounded text-emerald-400">
                          <Check className="w-3.5 h-3.5" />
                        </span>
                        <div className="space-y-1">
                          <p className="font-medium text-xs sm:text-sm text-slate-100 leading-tight">{heading}</p>
                          {body && <p className="text-xs text-slate-400 leading-relaxed">{body}</p>}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Alternatives Rejected section */}
              <div className="space-y-3 pt-2">
                <h5 className="text-[11px] font-heading font-semibold tracking-wider text-rose-400/80 uppercase">
                  Alternatives Rejected
                </h5>
                <div className="space-y-2.5">
                  {activeTech.alternativesRejected.map((alt, idx) => (
                    <div
                      key={idx}
                      className="bg-slate-900/20 border border-rose-950/20 px-4 py-3 rounded-xl flex flex-col sm:flex-row sm:items-center justify-between gap-2 hover:border-rose-950/40 transition-colors"
                    >
                      <div className="flex items-center gap-2.5">
                        <span className="p-1 bg-rose-950/40 border border-rose-900/50 rounded text-rose-400 shrink-0">
                          <XSquare className="w-3.5 h-3.5" />
                        </span>
                        <span className="font-heading font-medium text-xs sm:text-sm text-slate-200">
                          {alt.name}
                        </span>
                      </div>
                      <span className="text-xs text-slate-400 sm:text-right sm:max-w-md">
                        {alt.reason}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
