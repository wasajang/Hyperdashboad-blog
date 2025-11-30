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
    const [lines, setLines] = React.useState<{ id: string; path: string; opacity: number }[]>([]);
    const nodeRefs = React.useRef<Map<string, HTMLAnchorElement>>(new Map());
    const containerRef = React.useRef<HTMLDivElement>(null);

    const getColumnNodes = (type: ExchangeNode['type']) => nodes.filter(n => n.type === type);

    const updateLines = React.useCallback(() => {
        if (!containerRef.current) return;

        const newLines: { id: string; path: string; opacity: number }[] = [];
        const containerRect = containerRef.current.getBoundingClientRect();

        // Helper to get coordinates relative to the container
        const getCoords = (id: string, side: 'left' | 'right') => {
            const el = nodeRefs.current.get(id);
            if (!el) return null;
            const rect = el.getBoundingClientRect();
            return {
                x: (side === 'left' ? rect.left : rect.right) - containerRect.left,
                y: rect.top + rect.height / 2 - containerRect.top
            };
        };

        // 1. Bank -> Domestic (1:1)
        connections.forEach(conn => {
            const start = getCoords(conn.from, 'right');
            const end = getCoords(conn.to, 'left');

            if (start && end) {
                const controlX = (start.x + end.x) / 2;
                newLines.push({
                    id: `${conn.from}-${conn.to}`,
                    path: `M ${start.x} ${start.y} C ${controlX} ${start.y}, ${controlX} ${end.y}, ${end.x} ${end.y}`,
                    opacity: 1
                });
            }
        });



        setLines(newLines);
    }, []);

    // Update lines on mount and resize
    React.useLayoutEffect(() => {
        // Initial update
        updateLines();

        // ResizeObserver for container
        const resizeObserver = new ResizeObserver(() => {
            updateLines();
        });

        if (containerRef.current) {
            resizeObserver.observe(containerRef.current);
        }

        // Fallback window resize
        window.addEventListener('resize', updateLines);

        // Retry a few times to ensure refs are ready (handling hydration/animation delays)
        const timers = [
            setTimeout(updateLines, 100),
            setTimeout(updateLines, 500),
            setTimeout(updateLines, 1000)
        ];

        return () => {
            resizeObserver.disconnect();
            window.removeEventListener('resize', updateLines);
            timers.forEach(t => clearTimeout(t));
        };
    }, [updateLines]);

    const NodeCard = ({ node }: { node: ExchangeNode }) => (
        <motion.a
            ref={(el) => {
                if (el) {
                    nodeRefs.current.set(node.id, el);
                    // Trigger update when a new ref is set (important for initial render)
                    // We debounce this slightly to avoid excessive updates
                    requestAnimationFrame(updateLines);
                } else {
                    nodeRefs.current.delete(node.id);
                }
            }}
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
                z-10
            `}
            style={{
                borderColor: node.color,
                boxShadow: `0 0 10px ${node.color}40`
            }}
            // initial={{ opacity: 0, scale: 0.8 }} // Disabled for visibility debugging
            // animate={{ opacity: 1, scale: 1 }}   // Disabled for visibility debugging
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
        <div
            ref={containerRef}
            className="exchange-flow-container relative w-full overflow-x-auto py-12 px-4 bg-cover rounded-xl border border-white/10"
            style={{ backgroundImage: `url('${ASSETS.TOKENOMICS.BACKGROUND}')` }}
        >
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

                {lines.map(line => (
                    <path
                        key={line.id}
                        d={line.path}
                        stroke="url(#gold-gradient)"
                        strokeWidth={line.opacity === 1 ? 2 : 1}
                        fill="none"
                        filter={line.opacity === 1 ? "url(#glow)" : undefined}
                        opacity={line.opacity}
                        className="transition-all duration-500"
                    />
                ))}
            </svg>
        </div>
    );
}
