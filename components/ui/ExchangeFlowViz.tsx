"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { ExternalLink } from 'lucide-react';

import { EXCHANGES, ExchangeNode } from '@/data/exchanges';
import { ASSETS } from '@/data/constants';

const nodes = EXCHANGES;

const connections = [
    { from: 'kbank', to: 'upbit' },
    { from: 'kb', to: 'bithumb' },
    { from: 'kakaobank', to: 'coinone' },

    { from: 'upbit', to: 'binance' },
    { from: 'upbit', to: 'bybit' },
    { from: 'upbit', to: 'okx' },
    { from: 'upbit', to: 'coinbase' },

    { from: 'bithumb', to: 'binance' },
    { from: 'bithumb', to: 'bybit' },
    { from: 'bithumb', to: 'okx' },
    { from: 'bithumb', to: 'coinbase' },

    { from: 'coinone', to: 'binance' },
    { from: 'coinone', to: 'bybit' },
    { from: 'coinone', to: 'okx' },
    { from: 'coinone', to: 'coinbase' },
];

export function ExchangeFlowViz() {
    const getColumnNodes = (type: ExchangeNode['type']) => nodes.filter(n => n.type === type);

    const NodeCard = ({ node }: { node: ExchangeNode }) => (
        <motion.a
            href={node.url}
            target={node.url ? "_blank" : undefined}
            rel="noopener noreferrer"
            className={`
                relative flex items-center gap-3 p-3 rounded-lg border-2 
                bg-black/80 backdrop-blur-sm transition-all cursor-pointer group
                ${!node.url ? 'cursor-default' : ''}
                shadow-[0_0_15px_rgba(0,0,0,0.5)]
                hover:shadow-[0_0_25px_rgba(255,255,255,0.2)]
                hover:scale-105
            `}
            style={{
                borderColor: node.color,
                boxShadow: `0 0 10px ${node.color}40`
            }}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            whileHover={{
                borderColor: '#ffffff',
                boxShadow: `0 0 20px ${node.color}80`
            }}
        >
            <div
                className="w-12 h-12 rounded-md flex items-center justify-center overflow-hidden bg-black shrink-0 border border-white/10 p-1"
            >
                {node.logo ? (
                    <img src={node.logo} alt={node.name} className="w-full h-full object-contain" />
                ) : (
                    <span className="text-xs font-bold" style={{ color: node.color }}>{node.name.substring(0, 2)}</span>
                )}
            </div>
            <div className="flex flex-col">
                <span className="text-sm font-bold text-white group-hover:text-primary transition-colors font-serif tracking-wider">
                    {node.name}
                </span>
                <span className="text-[10px] text-gray-400 font-mono">
                    {node.description || node.type.toUpperCase()}
                </span>
            </div>

            {/* Connection Points */}
            <div className="absolute right-[-6px] top-1/2 -translate-y-1/2 w-3 h-3 rounded-full bg-black border border-gray-600 z-20" />
            <div className="absolute left-[-6px] top-1/2 -translate-y-1/2 w-3 h-3 rounded-full bg-black border border-gray-600 z-20" />
        </motion.a>
    );

    return (
        <div className="relative w-full overflow-x-auto py-12 px-4 bg-cover rounded-xl border border-white/10" style={{ backgroundImage: `url('${ASSETS.TOKENOMICS.BACKGROUND}')` }}>
            {/* Background Effects */}
            <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-transparent to-black/80 pointer-events-none" />

            <div className="min-w-[800px] flex justify-between items-stretch gap-16 relative z-10">
                {/* Banks Column */}
                <div className="flex flex-col justify-center gap-12 w-1/3">
                    <h4 className="text-center text-amber-500/80 text-lg mb-4 font-serif tracking-widest border-b border-amber-500/30 pb-2">
                        I. FIAT GATEWAY
                    </h4>
                    <div className="flex flex-col gap-6">
                        {getColumnNodes('bank').map(node => (
                            <NodeCard key={node.id} node={node} />
                        ))}
                    </div>
                </div>

                {/* Domestic Exchanges Column */}
                <div className="flex flex-col justify-center gap-12 w-1/3">
                    <h4 className="text-center text-red-500/80 text-lg mb-4 font-serif tracking-widest border-b border-red-500/30 pb-2">
                        II. DOMESTIC EXCHANGES
                    </h4>
                    <div className="flex flex-col gap-6">
                        {getColumnNodes('domestic').map(node => (
                            <NodeCard key={node.id} node={node} />
                        ))}
                    </div>
                </div>

                {/* Global Exchanges Column */}
                <div className="flex flex-col justify-center gap-12 w-1/3">
                    <h4 className="text-center text-purple-500/80 text-lg mb-4 font-serif tracking-widest border-b border-purple-500/30 pb-2">
                        III. GLOBAL EXCHANGES
                    </h4>
                    <div className="flex flex-col gap-6">
                        {getColumnNodes('global').map(node => (
                            <NodeCard key={node.id} node={node} />
                        ))}
                    </div>
                </div>
            </div>

            {/* SVG Connections Layer */}
            <svg className="absolute inset-0 w-full h-full pointer-events-none z-0" style={{ minWidth: '800px' }}>
                <defs>
                    <filter id="glow">
                        <feGaussianBlur stdDeviation="2.5" result="coloredBlur" />
                        <feMerge>
                            <feMergeNode in="coloredBlur" />
                            <feMergeNode in="SourceGraphic" />
                        </feMerge>
                    </filter>
                    <linearGradient id="gold-gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                        <stop offset="0%" stopColor="#fbbf24" stopOpacity="0.1" />
                        <stop offset="50%" stopColor="#fbbf24" stopOpacity="0.5" />
                        <stop offset="100%" stopColor="#fbbf24" stopOpacity="0.1" />
                    </linearGradient>
                </defs>

                {/* 
                    Simplified connections for MVP. 
                    In a real app, we'd calculate positions dynamically.
                    Here we use approximate relative paths.
                */}
                <path d="M 280 150 C 350 150, 350 150, 420 150" stroke="url(#gold-gradient)" strokeWidth="2" fill="none" filter="url(#glow)" />
                <path d="M 280 250 C 350 250, 350 250, 420 250" stroke="url(#gold-gradient)" strokeWidth="2" fill="none" filter="url(#glow)" />
                <path d="M 280 350 C 350 350, 350 350, 420 350" stroke="url(#gold-gradient)" strokeWidth="2" fill="none" filter="url(#glow)" />

                <path d="M 550 150 C 620 150, 620 100, 690 100" stroke="url(#gold-gradient)" strokeWidth="1" fill="none" opacity="0.3" />
                <path d="M 550 150 C 620 150, 620 200, 690 200" stroke="url(#gold-gradient)" strokeWidth="1" fill="none" opacity="0.3" />

                <path d="M 550 250 C 620 250, 620 200, 690 200" stroke="url(#gold-gradient)" strokeWidth="1" fill="none" opacity="0.3" />
                <path d="M 550 250 C 620 250, 620 300, 690 300" stroke="url(#gold-gradient)" strokeWidth="1" fill="none" opacity="0.3" />

                <path d="M 550 350 C 620 350, 620 300, 690 300" stroke="url(#gold-gradient)" strokeWidth="1" fill="none" opacity="0.3" />
                <path d="M 550 350 C 620 350, 620 400, 690 400" stroke="url(#gold-gradient)" strokeWidth="1" fill="none" opacity="0.3" />
            </svg>
        </div>
    );
}
