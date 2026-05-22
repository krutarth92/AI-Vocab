/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useMemo } from 'react';
import { motion } from 'motion/react';
import { GitCommit, Focus, Info, Zap, AlertCircle } from 'lucide-react';
import { VOCAB_TERMS } from '../data';
import { VocabTerm } from '../types';

interface InteractiveGraphProps {
  selectedTermId: string | null;
  onSelectTerm: (termId: string) => void;
  activeCategory: string | null;
}

const CATEGORY_CENTERS: Record<string, { x: number; y: number; color: string }> = {
  Product: { x: 180, y: 110, color: 'from-pink-500/10 to-pink-500/20' },
  AI: { x: 500, y: 90, color: 'from-purple-500/10 to-purple-500/20' },
  Backend: { x: 820, y: 110, color: 'from-blue-500/10 to-blue-500/20' },
  Strategy: { x: 180, y: 390, color: 'from-amber-500/10 to-amber-500/20' },
  Architecture: { x: 500, y: 390, color: 'from-indigo-500/10 to-indigo-500/20' },
  Frontend: { x: 820, y: 390, color: 'from-teal-500/10 to-teal-500/20' },
  Data: { x: 500, y: 240, color: 'from-emerald-500/10 to-emerald-500/20' }
};

export default function InteractiveGraph({
  selectedTermId,
  onSelectTerm,
  activeCategory
}: InteractiveGraphProps) {
  const [hoveredNodeId, setHoveredNodeId] = useState<string | null>(null);

  // Programmatically position each node relative to its category center
  const graphNodes = useMemo(() => {
    return VOCAB_TERMS.map((term) => {
      const center = CATEGORY_CENTERS[term.category] || { x: 500, y: 250 };
      
      const termsInCategory = VOCAB_TERMS.filter(t => t.category === term.category);
      const catIdx = termsInCategory.findIndex(t => t.id === term.id);
      const total = termsInCategory.length;
      
      // Compute radial layout relative to the category center
      const angle = (catIdx * (2 * Math.PI) / total) - (Math.PI / 2);
      const radius = total > 1 ? 75 : 0;
      
      return {
        ...term,
        x: center.x + Math.cos(angle) * radius,
        y: center.y + Math.sin(angle) * (radius * 0.8)
      };
    });
  }, []);

  // Set up lookup dictionary for coordinates
  const nodesLookup = useMemo(() => {
    const lookup: Record<string, typeof graphNodes[0]> = {};
    graphNodes.forEach(node => {
      lookup[node.id] = node;
    });
    return lookup;
  }, [graphNodes]);

  // Compute unique edges
  const graphEdges = useMemo(() => {
    const edgesList: { id: string; from: typeof graphNodes[0]; to: typeof graphNodes[0] }[] = [];
    const paired = new Set<string>();

    graphNodes.forEach(node => {
      node.related.forEach(relatedId => {
        const targetNode = nodesLookup[relatedId];
        if (targetNode) {
          const pairId = [node.id, targetNode.id].sort().join('-');
          if (!paired.has(pairId)) {
            paired.add(pairId);
            edgesList.push({
              id: pairId,
              from: node,
              to: targetNode
            });
          }
        }
      });
    });

    return edgesList;
  }, [graphNodes, nodesLookup]);

  // Handle term selection
  const handleNodeClick = (nodeId: string) => {
    onSelectTerm(nodeId);
    // Auto-scroll logic happens in Parent
  };

  return (
    <div className="relative w-full overflow-hidden rounded-2xl p-6 glass-card shadow-2xl">
      {/* Background ambient lighting */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-teal-500/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-64 h-64 bg-indigo-500/5 rounded-full blur-3xl pointer-events-none" />

      {/* Header Info */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800/80 pb-4 mb-6">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-teal-950/40 text-teal-400 border border-teal-800/50 rounded-lg animate-pulse">
            <GitCommit id="graph-title-icon" className="w-5 h-5 animate-pulse" />
          </div>
          <div>
            <h3 className="font-heading font-semibold text-slate-100 text-base">Interactive Relationship Web</h3>
            <p className="text-xs text-slate-400">Discover semantic connections crossing Product, Tech, and Strategy</p>
          </div>
        </div>

        {/* Legend */}
        <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-xs">
          <div className="flex items-center gap-1.5 text-slate-400">
            <span className="w-2 h-2 rounded-full bg-teal-400" />
            <span>Active Term</span>
          </div>
          <div className="flex items-center gap-1.5 text-slate-400">
            <span className="w-2 h-2 rounded-full bg-slate-600" />
            <span>Indirect Connection</span>
          </div>
          <div className="flex items-center gap-1.5 text-slate-400">
            <span className="w-6 h-0.5 bg-dashed border-t border-dashed border-teal-500/40" />
            <span>Related Path</span>
          </div>
        </div>
      </div>

      {/* Interactive SVG Sandbox */}
      <div className="relative w-full overflow-x-auto scrollbar-thin">
        <div className="min-w-[980px] w-full aspect-[1000/550] select-none mx-auto">
          <svg
            viewBox="0 0 1000 550"
            className="w-full h-full"
            style={{ WebkitTapHighlightColor: 'transparent' }}
          >
            {/* SVG Filters for glowing effect */}
            <defs>
              <filter id="glow-teal" x="-20%" y="-20%" width="140%" height="140%">
                <feGaussianBlur stdDeviation="4" result="blur" />
                <feComposite in="SourceGraphic" in2="blur" operator="over" />
              </filter>
              <filter id="glow-weak" x="-10%" y="-10%" width="120%" height="120%">
                <feGaussianBlur stdDeviation="2" result="blur" />
                <feComposite in="SourceGraphic" in2="blur" operator="over" />
              </filter>
            </defs>

            {/* Category Labels as dim circular sectors or clean floating text */}
            {Object.entries(CATEGORY_CENTERS).map(([category, pos]) => {
              const isActiveCategory = activeCategory === category;
              return (
                <g key={category}>
                  {/* Outer category bounds indicator */}
                  <circle
                    cx={pos.x}
                    cy={pos.y}
                    r={95}
                    fill={isActiveCategory ? 'rgba(20, 184, 166, 0.04)' : 'rgba(15, 23, 42, 0.1)'}
                    stroke={isActiveCategory ? '#14B8A6' : 'rgba(148, 163, 184, 0.06)'}
                    strokeWidth={isActiveCategory ? '2' : '1.5'}
                    strokeDasharray={isActiveCategory ? undefined : '5 5'}
                    className="transition-all duration-300"
                  />
                  {/* Category Name */}
                  <text
                    x={pos.x}
                    y={pos.y + 3}
                    textAnchor="middle"
                    className={`font-heading text-[10px] uppercase tracking-widest font-semibold transition-colors duration-300 pointer-events-none ${
                      isActiveCategory ? 'fill-teal-400' : 'fill-slate-600/70'
                    }`}
                  >
                    {category}
                  </text>
                </g>
              );
            })}

            {/* CONNECTION EDGES */}
            {graphEdges.map((edge) => {
              // Determine if this line should be highlighted
              const isFromHovered = hoveredNodeId === edge.from.id;
              const isToHovered = hoveredNodeId === edge.to.id;
              const isHoveredRelationship = isFromHovered || isToHovered;

              const isFromSelected = selectedTermId === edge.from.id;
              const isToSelected = selectedTermId === edge.to.id;
              const isSelectedRelationship = isFromSelected || isToSelected;

              // Visual styling priorities
              let strokeColor = 'rgba(71, 85, 105, 0.18)'; // Standard dim line
              let strokeWidth = 1.5;
              let isFlowing = false;

              if (isSelectedRelationship) {
                strokeColor = 'rgba(20, 184, 166, 0.8)'; // Active primary teal
                strokeWidth = 2.5;
                isFlowing = true;
              } else if (isHoveredRelationship) {
                strokeColor = 'rgba(94, 234, 212, 0.6)'; // Accent teal
                strokeWidth = 2;
                isFlowing = true;
              }

              return (
                <g key={edge.id}>
                  {/* The connection line */}
                  <line
                    x1={edge.from.x}
                    y1={edge.from.y}
                    x2={edge.to.x}
                    y2={edge.to.y}
                    stroke={strokeColor}
                    strokeWidth={strokeWidth}
                    className="transition-all duration-300"
                    strokeDasharray={isFlowing ? '6 6' : undefined}
                    style={{
                      strokeDashoffset: isFlowing ? 0 : undefined,
                    }}
                  />
                  {/* Interactive overlay line for easier hover targets */}
                  <line
                    x1={edge.from.x}
                    y1={edge.from.y}
                    x2={edge.to.x}
                    y2={edge.to.y}
                    stroke="transparent"
                    strokeWidth={8}
                    className="cursor-pointer"
                  />
                </g>
              );
            })}

            {/* NODES */}
            {graphNodes.map((node) => {
              const isSelected = selectedTermId === node.id;
              const isHovered = hoveredNodeId === node.id;
              const isCategoryMatch = activeCategory === node.category;

              // Check if node is connected to the hovered or selected node
              const isConnectedToHovered = hoveredNodeId ? node.related.includes(hoveredNodeId) || nodesLookup[hoveredNodeId]?.related.includes(node.id) : false;
              const isConnectedToSelected = selectedTermId ? node.related.includes(selectedTermId) || nodesLookup[selectedTermId]?.related.includes(node.id) : false;

              // Node layout sizes
              let radius = 7;
              let fillStr = '#334155'; // default dark gray
              let strokeStr = '#1e293b';
              let strokeW = 1.5;
              let textColor = 'fill-slate-400';
              let textWeight = 'font-normal';

              if (isSelected) {
                radius = 11;
                fillStr = '#14B8A6'; // teal primary
                strokeStr = '#5EEAD4'; // accent glowing outline
                strokeW = 3;
                textColor = 'fill-teal-300 font-semibold';
                textWeight = 'font-semibold';
              } else if (isHovered) {
                radius = 10;
                fillStr = '#5EEAD4';
                strokeStr = '#14B8A6';
                strokeW = 2;
                textColor = 'fill-slate-100';
                textWeight = 'font-medium';
              } else if (isConnectedToSelected) {
                radius = 8.5;
                fillStr = '#0F766E'; // dark teal fill
                strokeStr = '#14B8A6';
                strokeW = 2;
                textColor = 'fill-slate-200';
              } else if (isConnectedToHovered) {
                radius = 8.5;
                fillStr = '#115E59';
                strokeStr = '#5EEAD4';
                strokeW = 1.5;
                textColor = 'fill-slate-200';
              } else if (isCategoryMatch) {
                fillStr = '#475569';
                textColor = 'fill-slate-300';
              }

              return (
                <g
                  key={node.id}
                  className="cursor-pointer"
                  onMouseEnter={() => setHoveredNodeId(node.id)}
                  onMouseLeave={() => setHoveredNodeId(null)}
                  onClick={() => handleNodeClick(node.id)}
                >
                  {/* Glow circle layer for selected or hovered nodes */}
                  {(isSelected || isHovered) && (
                    <circle
                      cx={node.x}
                      cy={node.y}
                      r={radius + 8}
                      fill="rgba(20, 184, 166, 0.15)"
                      filter="url(#glow-teal)"
                      className="pointer-events-none"
                    />
                  )}

                  {/* Base Circle Node */}
                  <circle
                    cx={node.x}
                    cy={node.y}
                    r={radius}
                    fill={fillStr}
                    stroke={strokeStr}
                    strokeWidth={strokeW}
                    className="transition-all duration-300 ease-out"
                  />

                  {/* Node Title Text */}
                  <text
                    x={node.x}
                    y={node.y - (radius + 6)}
                    textAnchor="middle"
                    className={`font-sans text-[10px] select-none transition-all duration-200 pointer-events-none ${textColor} ${textWeight}`}
                  >
                    {node.term.split(' (')[0]}
                  </text>
                </g>
              );
            })}
          </svg>
        </div>
      </div>

      {/* Brief guide instruction bar */}
      <div className="mt-4 flex items-start gap-2 bg-slate-900/60 border border-slate-800/80 p-3 rounded-lg text-xs text-slate-300">
        <Info id="graph-tip-icon" className="w-4 h-4 text-teal-400 shrink-0 mt-0.5" />
        <p>
          <span className="text-teal-400 font-medium">Concept Browser Mode:</span> Clicking any node highlights its related structure and instantly selects/expands its vocabulary card in the side directory below.
        </p>
      </div>
    </div>
  );
}
