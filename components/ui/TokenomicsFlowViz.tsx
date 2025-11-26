"use client";

import { useEffect, useRef, useState } from "react";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { Play, Pause, RotateCcw } from "lucide-react";

// --- Types ---
interface TokenomicsData {
    timestamp: string;
    total_supply: number;
    circulating_supply_swpe: number;
    breakdown: {
        af_balance: number;
        hip3_stakes: number;
        total_staked: number;
        future_emissions: number;
        other_non_circulating: number;
        burned: number;
    };
}

interface MetricsData {
    date: string;
    swpe_ratio: number;
    daily_revenue: number;
    price: number;
}

interface SimulationState {
    currentDate: Date;
    progress: number; // 0 to 1
    dailyRevenue: number;
    swpe: number;
    afHoldings: number;
    hip3Count: number;
    burned: number;
    circulating: number;
    nonCirculating: number;
}

export function TokenomicsFlowViz() {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const containerRef = useRef<HTMLDivElement>(null);

    // Data State
    const [tokenomicsHistory, setTokenomicsHistory] = useState<TokenomicsData[]>([]);
    const [metricsHistory, setMetricsHistory] = useState<MetricsData[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    // UI State
    const [isPlaying, setIsPlaying] = useState(false);
    const [dimensions, setDimensions] = useState({ width: 0, height: 600 });

    // Simulation State
    const simState = useRef<SimulationState>({
        currentDate: new Date(),
        progress: 0,
        dailyRevenue: 0,
        swpe: 0,
        afHoldings: 0,
        hip3Count: 0,
        burned: 0,
        circulating: 0,
        nonCirculating: 0,
    });

    // Load Data
    useEffect(() => {
        async function loadData() {
            try {
                const [tRes, mRes] = await Promise.all([
                    fetch("/data/tokenomics_history.json"),
                    fetch("/data/metrics_history.json"),
                ]);

                const tData = await tRes.json();
                const mData = await mRes.json();

                if (tData.length > 0 && mData.length > 0) {
                    setTokenomicsHistory(tData);
                    setMetricsHistory(mData);

                    // Initialize with latest
                    const latestT = tData[tData.length - 1];
                    const latestM = mData[mData.length - 1];

                    const nonCirc = latestT.breakdown.future_emissions + latestT.breakdown.total_staked;

                    simState.current = {
                        currentDate: new Date(latestM.date),
                        progress: 1,
                        dailyRevenue: latestM.daily_revenue,
                        swpe: latestM.swpe_ratio,
                        afHoldings: latestT.breakdown.af_balance,
                        hip3Count: latestT.breakdown.hip3_stakes,
                        burned: latestT.breakdown.burned,
                        circulating: latestT.circulating_supply_swpe,
                        nonCirculating: nonCirc
                    };
                }
            } catch (e) {
                console.error("Failed to load data", e);
            } finally {
                setIsLoading(false);
            }
        }
        loadData();
    }, []);

    // Resize Handler
    useEffect(() => {
        const handleResize = () => {
            if (containerRef.current) {
                setDimensions({
                    width: containerRef.current.clientWidth,
                    height: 600,
                });
            }
        };
        window.addEventListener("resize", handleResize);
        handleResize();
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    // Animation Loop
    useEffect(() => {
        if (!canvasRef.current || dimensions.width === 0 || isLoading) return;
        const ctx = canvasRef.current.getContext("2d");
        if (!ctx) return;

        let animationFrameId: number;
        let time = 0;

        // Pump Animation State
        let pumpPhase = 0;

        // Wave Animation State
        let wavePhase = 0;

        const render = () => {
            const w = dimensions.width;
            const h = dimensions.height;
            const state = simState.current;
            time += 0.05;
            wavePhase += 0.1;

            // Clear
            ctx.fillStyle = "#020617"; // Very Dark Slate
            ctx.fillRect(0, 0, w, h);

            // --- Layout Constants ---
            const totalCapacity = 1_000_000_000;
            const tankBaseY = h - 100;
            const tankMaxH = h - 200;

            // 1. Non-Circulating Tank (Left)
            const ncCapacity = 850_000_000;
            const ncWidth = w * 0.3;
            const ncX = 50;
            const ncHeight = (ncCapacity / totalCapacity) * tankMaxH * 1.5;
            const ncLevel = (state.nonCirculating / ncCapacity) * ncHeight;

            // Draw Tank with Wave
            drawTankWithWave(ctx, ncX, tankBaseY, ncWidth, ncHeight, ncLevel, "#1e293b", "#334155", "Non-Circulating (Locked)", wavePhase);

            // 2. Circulating Tank (Center)
            const circCapacity = 200_000_000;
            const circWidth = w * 0.25;
            const circX = ncX + ncWidth + 100; // More space for pipe
            const circHeight = (circCapacity / totalCapacity) * tankMaxH * 4;
            const circLevel = (state.circulating / circCapacity) * circHeight;

            drawTankWithWave(ctx, circX, tankBaseY, circWidth, circHeight, circLevel, "#0369a1", "#0ea5e9", "Circulating Supply", wavePhase + 2);

            // --- Locked Connection Pipe ---
            const pipeY = tankBaseY - 50;
            ctx.strokeStyle = "#334155";
            ctx.lineWidth = 10;
            ctx.beginPath();
            ctx.moveTo(ncX + ncWidth, pipeY);
            ctx.lineTo(circX, pipeY);
            ctx.stroke();

            // Locked Valve Icon
            const valveX = ncX + ncWidth + (circX - (ncX + ncWidth)) / 2;
            drawLockedValve(ctx, valveX, pipeY);


            // HIP-3 Container (Attached to Circulating)
            const hipCapacity = 5_000_000;
            const hipWidth = 40;
            const hipHeight = 60;
            const hipX = circX - hipWidth;
            const hipY = tankBaseY - circHeight + 20;
            const hipLevel = (state.hip3Count / hipCapacity) * hipHeight;

            ctx.fillStyle = "rgba(255, 255, 255, 0.05)";
            ctx.strokeStyle = "#fff";
            ctx.lineWidth = 1;
            ctx.fillRect(hipX, hipY, hipWidth, hipHeight);
            ctx.strokeRect(hipX, hipY, hipWidth, hipHeight);

            // HIP-3 Liquid (Static for now, or slight wave)
            ctx.fillStyle = "#10b981";
            ctx.fillRect(hipX, hipY + hipHeight - hipLevel, hipWidth, hipLevel);
            ctx.fillStyle = "#fff";
            ctx.font = "10px sans-serif";
            ctx.fillText("HIP-3", hipX + 5, hipY - 5);


            // 3. AF Tank (Right)
            const afCapacity = 100_000_000;
            const afWidth = w * 0.2;
            const afX = circX + circWidth + 80;
            const afHeight = (afCapacity / totalCapacity) * tankMaxH * 6;
            const afLevel = (state.afHoldings / afCapacity) * afHeight;

            drawTankWithWave(ctx, afX, tankBaseY, afWidth, afHeight, afLevel, "#4338ca", "#6366f1", "AF Treasury", wavePhase + 4);

            // 4. Pump System
            const pumpX = circX + circWidth;
            const pumpY = tankBaseY - 50;
            const pipeLength = afX - pumpX;

            // Pipe
            ctx.strokeStyle = "#475569";
            ctx.lineWidth = 8;
            ctx.beginPath();
            ctx.moveTo(pumpX, pumpY);
            ctx.lineTo(afX, pumpY);
            ctx.stroke();

            // Pump Body
            ctx.fillStyle = "#fbbf24";
            ctx.beginPath();
            ctx.arc(pumpX + pipeLength / 2, pumpY, 20, 0, Math.PI * 2);
            ctx.fill();

            // Pump Animation
            let pumpSpeed = 0;
            if (state.dailyRevenue > 10_000_000) pumpSpeed = 0.8;
            else if (state.dailyRevenue > 5_000_000) pumpSpeed = 0.5;
            else if (state.dailyRevenue > 3_000_000) pumpSpeed = 0.3;
            else if (state.dailyRevenue > 1_000_000) pumpSpeed = 0.15;
            else if (state.dailyRevenue > 0) pumpSpeed = 0.05;

            pumpPhase += pumpSpeed;

            // Fan
            ctx.save();
            ctx.translate(pumpX + pipeLength / 2, pumpY);
            ctx.rotate(pumpPhase);
            ctx.strokeStyle = "#000";
            ctx.lineWidth = 2;
            ctx.beginPath();
            ctx.moveTo(-15, 0); ctx.lineTo(15, 0);
            ctx.moveTo(0, -15); ctx.lineTo(0, 15);
            ctx.stroke();
            ctx.restore();

            // Flowing Water
            if (pumpSpeed > 0) {
                ctx.strokeStyle = "#60a5fa";
                ctx.lineWidth = 4;
                ctx.setLineDash([10, 10]);
                ctx.lineDashOffset = -pumpPhase * 20;
                ctx.beginPath();
                ctx.moveTo(pumpX, pumpY);
                ctx.lineTo(afX, pumpY);
                ctx.stroke();
                ctx.setLineDash([]);
            }

            // Revenue Label
            ctx.fillStyle = "#fbbf24";
            ctx.font = "bold 14px monospace";
            ctx.textAlign = "center";
            ctx.fillText(`Revenue: $${(state.dailyRevenue / 1_000_000).toFixed(2)}M`, pumpX + pipeLength / 2, pumpY - 30);


            // --- Stats ---
            ctx.fillStyle = "#fff";
            ctx.textAlign = "left";
            ctx.font = "bold 24px sans-serif";
            ctx.fillText(`SWPE: ${state.swpe.toFixed(2)}x`, 50, 50);

            ctx.textAlign = "right";
            ctx.font = "16px monospace";
            ctx.fillText(state.currentDate.toLocaleDateString(), w - 50, 50);
        };

        const loop = () => {
            render();
            animationFrameId = requestAnimationFrame(loop);
        };
        loop();

        return () => cancelAnimationFrame(animationFrameId);
    }, [dimensions, isLoading]);

    return (
        <Section className="bg-slate-950 border-y border-white/5 relative">
            <Container>
                <div className="flex flex-col md:flex-row items-center justify-between mb-6">
                    <div>
                        <h2 className="text-3xl font-bold text-white mb-2">
                            HYPE <span className="text-blue-400">Liquidity Flow</span>
                        </h2>
                        <p className="text-gray-400 text-sm">
                            Visualizing the flow of HYPE from Circulation to AF Treasury via Revenue Buybacks.
                        </p>
                    </div>
                </div>

                <div ref={containerRef} className="relative w-full h-[600px] bg-slate-900 rounded-xl border border-white/10 overflow-hidden">
                    <canvas
                        ref={canvasRef}
                        width={dimensions.width}
                        height={dimensions.height}
                        className="w-full h-full"
                    />
                </div>
            </Container>
        </Section>
    );
}

// Helper Functions
function drawTankWithWave(ctx: CanvasRenderingContext2D, x: number, y: number, w: number, h: number, level: number, color: string, liquidColor: string, label: string, phase: number) {
    // Tank Walls
    ctx.strokeStyle = "rgba(255, 255, 255, 0.2)";
    ctx.lineWidth = 4;
    ctx.strokeRect(x, y - h, w, h);

    // Liquid with Wave
    ctx.fillStyle = liquidColor;
    ctx.beginPath();

    const liquidTop = y - level;
    ctx.moveTo(x + 2, y - 2); // Bottom Left
    ctx.lineTo(x + w - 2, y - 2); // Bottom Right
    ctx.lineTo(x + w - 2, liquidTop); // Top Right (Start of wave)

    // Wave Loop
    for (let i = 0; i <= w - 4; i += 5) {
        const dx = i;
        const dy = Math.sin((dx / 50) + phase) * 5; // Amplitude 5
        ctx.lineTo(x + w - 2 - dx, liquidTop + dy);
    }

    ctx.lineTo(x + 2, liquidTop); // Close loop
    ctx.fill();

    // Label
    ctx.fillStyle = "#fff";
    ctx.font = "bold 14px sans-serif";
    ctx.textAlign = "center";
    ctx.fillText(label, x + w / 2, y + 25);
}

function drawLockedValve(ctx: CanvasRenderingContext2D, x: number, y: number) {
    // Valve Body
    ctx.fillStyle = "#ef4444"; // Red
    ctx.beginPath();
    ctx.arc(x, y, 12, 0, Math.PI * 2);
    ctx.fill();

    // Lock Icon (X)
    ctx.strokeStyle = "#fff";
    ctx.lineWidth = 3;
    ctx.beginPath();
    ctx.moveTo(x - 5, y - 5);
    ctx.lineTo(x + 5, y + 5);
    ctx.moveTo(x + 5, y - 5);
    ctx.lineTo(x - 5, y + 5);
    ctx.stroke();

    // Label
    ctx.fillStyle = "#94a3b8";
    ctx.font = "10px sans-serif";
    ctx.fillText("LOCKED", x, y - 20);
}
