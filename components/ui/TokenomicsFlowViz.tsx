"use client";

import { useEffect, useRef, useState } from "react";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";

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

    // Assets State
    const [assetsLoaded, setAssetsLoaded] = useState(false);
    const assets = useRef<{
        tankHex: HTMLImageElement;
        tankRoundBands: HTMLImageElement;
        tankRoundGauge: HTMLImageElement;
        catPump: HTMLImageElement;
        liquidTex: HTMLImageElement;
        pipeLocked: HTMLImageElement;
    }>({
        tankHex: new Image(),
        tankRoundBands: new Image(),
        tankRoundGauge: new Image(),
        catPump: new Image(),
        liquidTex: new Image(),
        pipeLocked: new Image(),
    });

    // UI State
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

    // Load Images
    useEffect(() => {
        if (typeof window === 'undefined') return;

        const tankHex = new Image();
        const tankRoundBands = new Image();
        const tankRoundGauge = new Image();
        const catPump = new Image();
        const liquidTex = new Image();
        const pipeLocked = new Image();

        let loadedCount = 0;
        const checkLoaded = () => {
            loadedCount++;
            if (loadedCount === 6) {
                assets.current = { tankHex, tankRoundBands, tankRoundGauge, catPump, liquidTex, pipeLocked };
                setAssetsLoaded(true);
            }
        };

        tankHex.src = "/images/tank_hex.png";
        tankHex.onload = checkLoaded;

        tankRoundBands.src = "/images/tank_round_bands.png";
        tankRoundBands.onload = checkLoaded;

        tankRoundGauge.src = "/images/tank_round_gauge.png";
        tankRoundGauge.onload = checkLoaded;

        catPump.src = "/images/cat_pump.png";
        catPump.onload = checkLoaded;

        liquidTex.src = "/images/liquid_texture.png";
        liquidTex.onload = checkLoaded;

        pipeLocked.src = "/images/pipe_locked.png";
        pipeLocked.onload = checkLoaded;
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
        if (!canvasRef.current || dimensions.width === 0 || isLoading || !assetsLoaded) return;
        const ctx = canvasRef.current.getContext("2d");
        if (!ctx) return;

        let animationFrameId: number;
        let time = 0;
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

            // Create Liquid Pattern
            const liquidPattern = ctx.createPattern(assets.current.liquidTex, "repeat");

            // --- Layout Constants ---
            const tankBaseY = h - 80; // Lifted up slightly

            // 1. Non-Circulating Tank (Left - Hexagonal)
            const hexImg = assets.current.tankHex;
            const hexAspect = hexImg.width / hexImg.height;
            const ncHeight = 380;
            const ncWidth = ncHeight * hexAspect;
            const ncX = w * 0.15; // Moved slightly right
            const ncY = tankBaseY - ncHeight;

            const ncCapacity = 850_000_000;
            const ncFillRatio = Math.min(state.nonCirculating / ncCapacity, 1);

            // Draw Liquid (Hexagonal 3D)
            // Adjust these offsets based on the specific hex tank image perspective
            const hexLiquidY = ncY + ncHeight - 20; // Bottom of liquid area
            const hexLiquidMaxH = ncHeight * 0.85;
            const currentHexH = hexLiquidMaxH * ncFillRatio;

            drawHexLiquid(ctx, ncX, hexLiquidY, ncWidth, currentHexH, liquidPattern, "#334155", wavePhase);

            // Draw Tank Image
            ctx.drawImage(hexImg, ncX, ncY, ncWidth, ncHeight);

            // Label
            drawLabel(ctx, "Non-Circulating", ncX + ncWidth / 2, ncY - 30);
            drawLabel(ctx, `${(state.nonCirculating / 1_000_000).toFixed(0)}M`, ncX + ncWidth / 2, ncY + ncHeight / 2, "12px", "#94a3b8");


            // 2. Circulating Tank (Center - Round with Bands)
            const roundBandsImg = assets.current.tankRoundBands;
            const roundBandsAspect = roundBandsImg.width / roundBandsImg.height;
            const circHeight = 220;
            const circWidth = circHeight * roundBandsAspect;
            // Position relative to Hex tank with space for pipe
            const circX = ncX + ncWidth + 60;
            const circY = tankBaseY - circHeight;

            const circCapacity = 200_000_000;
            const circFillRatio = Math.min(state.circulating / circCapacity, 1);

            // Draw Liquid (Round 3D)
            const circLiquidY = circY + circHeight - 15; // Bottom offset
            const circLiquidMaxH = circHeight * 0.85;
            const currentCircH = circLiquidMaxH * circFillRatio;

            drawRoundLiquid(ctx, circX, circLiquidY, circWidth, currentCircH, liquidPattern, "#0ea5e9", wavePhase + 2);

            // Tank Image
            ctx.drawImage(roundBandsImg, circX, circY, circWidth, circHeight);

            // Label
            drawLabel(ctx, "Circulating", circX + circWidth / 2, circY - 30);
            drawLabel(ctx, `${(state.circulating / 1_000_000).toFixed(0)}M`, circX + circWidth / 2, circY + circHeight / 2, "12px", "#bae6fd");


            // --- Locked Pipe Connection ---
            const pipeImg = assets.current.pipeLocked;
            const pipeAspect = pipeImg.width / pipeImg.height;
            const pipeHeight = 80;
            const pipeWidth = pipeHeight * pipeAspect;

            // Connect Hex Right side to Circ Left side
            // The pipe image is vertical-ish? Let's assume it connects horizontally.
            // Actually the provided pipe image is a faucet with a chain. 
            // It should be attached to the Hex tank's right wall.
            const pipeX = ncX + ncWidth - 25;
            const pipeY = ncY + ncHeight * 0.4;

            ctx.drawImage(pipeImg, pipeX, pipeY, pipeWidth, pipeHeight);


            // 3. AF Tank (Right - Round with Gauge)
            const roundGaugeImg = assets.current.tankRoundGauge;
            const roundGaugeAspect = roundGaugeImg.width / roundGaugeImg.height;
            const afHeight = 220;
            const afWidth = afHeight * roundGaugeAspect;
            const afX = w - afWidth - w * 0.1; // Align right side
            const afY = tankBaseY - afHeight;

            const afCapacity = 100_000_000;
            const afFillRatio = Math.min(state.afHoldings / afCapacity, 1);

            // Draw Liquid (Round 3D)
            const afLiquidY = afY + afHeight - 15;
            const afLiquidMaxH = afHeight * 0.85;
            const currentAfH = afLiquidMaxH * afFillRatio;

            drawRoundLiquid(ctx, afX, afLiquidY, afWidth, currentAfH, liquidPattern, "#6366f1", wavePhase + 4);

            // Tank Image
            ctx.drawImage(roundGaugeImg, afX, afY, afWidth, afHeight);

            // Label
            drawLabel(ctx, "AF Treasury", afX + afWidth / 2, afY - 30);
            drawLabel(ctx, `${(state.afHoldings / 1_000_000).toFixed(0)}M`, afX + afWidth / 2, afY + afHeight / 2, "12px", "#c7d2fe");


            // 4. Cat Pump Operator
            const catImg = assets.current.catPump;
            const catAspect = catImg.width / catImg.height;
            const catHeight = 160;
            const catWidth = catHeight * catAspect;

            // Position Cat between Circulating and AF
            // Align bottom with tanks
            const catX = circX + circWidth + (afX - (circX + circWidth)) / 2 - catWidth / 2;
            const catY = tankBaseY - catHeight + 10;

            ctx.drawImage(catImg, catX, catY, catWidth, catHeight);

            // Draw Pipe/Flow
            // 1. Pipe from Circulating to Pump (Ground level)
            ctx.strokeStyle = "#475569";
            ctx.lineWidth = 6;
            ctx.beginPath();
            ctx.moveTo(circX + circWidth - 20, tankBaseY - 20);
            ctx.lineTo(catX + 20, tankBaseY - 20); // To Cat's pump base
            ctx.stroke();

            // 2. Pipe from Pump to AF (Arching)
            if (state.dailyRevenue > 0) {
                ctx.strokeStyle = "#60a5fa";
                ctx.lineWidth = 4;
                ctx.setLineDash([10, 10]);
                ctx.lineDashOffset = -time * 20;
                ctx.beginPath();
                // Pump spout position (approximate based on image)
                const spoutX = catX + catWidth - 30;
                const spoutY = catY + 60;

                ctx.moveTo(spoutX, spoutY);
                ctx.quadraticCurveTo(spoutX + 50, spoutY - 50, afX + 30, afY + 40);
                ctx.stroke();
                ctx.setLineDash([]);

                ctx.fillStyle = "#fbbf24";
                ctx.font = "bold 14px monospace";
                ctx.textAlign = "center";
                ctx.fillText(`Revenue: $${(state.dailyRevenue / 1_000_000).toFixed(2)}M`, catX + catWidth / 2, catY - 20);
            }

            // Stats
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
    }, [dimensions, isLoading, assetsLoaded]);

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
                    {!assetsLoaded && (
                        <div className="absolute inset-0 flex items-center justify-center text-white">
                            Loading Assets...
                        </div>
                    )}
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

// --- Helper Functions ---

function drawRoundLiquid(ctx: CanvasRenderingContext2D, x: number, bottomY: number, w: number, h: number, pattern: CanvasPattern | null, tintColor: string, phase: number) {
    if (h <= 0) return;

    const radiusX = w / 2;
    const radiusY = w * 0.15; // Perspective factor
    const centerX = x + radiusX;
    const topY = bottomY - h;

    ctx.save();
    ctx.beginPath();

    // Bottom Arc
    ctx.ellipse(centerX, bottomY - radiusY, radiusX, radiusY, 0, 0, Math.PI, false);

    // Sides
    ctx.lineTo(x, topY - radiusY);

    // Top Arc (Surface)
    ctx.ellipse(centerX, topY - radiusY, radiusX, radiusY, 0, Math.PI, 0, false);

    ctx.lineTo(x + w, bottomY - radiusY);
    ctx.closePath();

    // Fill
    fillLiquid(ctx, pattern, tintColor);

    // Top Surface (Water level)
    ctx.beginPath();
    ctx.ellipse(centerX, topY - radiusY, radiusX, radiusY, 0, 0, Math.PI * 2);
    ctx.fillStyle = tintColor;
    ctx.globalAlpha = 0.5;
    ctx.fill();
    ctx.globalAlpha = 1.0;

    // Surface Wave/Highlight
    ctx.strokeStyle = "rgba(255,255,255,0.3)";
    ctx.lineWidth = 2;
    ctx.stroke();

    ctx.restore();
}

function drawHexLiquid(ctx: CanvasRenderingContext2D, x: number, bottomY: number, w: number, h: number, pattern: CanvasPattern | null, tintColor: string, phase: number) {
    if (h <= 0) return;

    // Hexagon Perspective Logic
    // Assuming flat-topped hexagon or pointy-topped? Based on image, it looks like a standard prism.
    // Let's approximate with a 3-face visible prism.

    const sideW = w / 2;
    const perspY = w * 0.15; // Perspective dip
    const topY = bottomY - h;

    ctx.save();
    ctx.beginPath();

    // Bottom shape (Front 3 faces)
    ctx.moveTo(x, bottomY - perspY); // Bottom Left
    ctx.lineTo(x + sideW, bottomY); // Bottom Center
    ctx.lineTo(x + w, bottomY - perspY); // Bottom Right

    // Right Side
    ctx.lineTo(x + w, topY - perspY);

    // Top Shape (Back half)
    ctx.lineTo(x + sideW, topY - perspY * 2); // Top Back Center
    ctx.lineTo(x, topY - perspY); // Top Left

    ctx.closePath();

    fillLiquid(ctx, pattern, tintColor);

    // Top Surface (Water Level)
    ctx.beginPath();
    ctx.moveTo(x, topY - perspY);
    ctx.lineTo(x + sideW, topY); // Top Front Center
    ctx.lineTo(x + w, topY - perspY);
    ctx.lineTo(x + sideW, topY - perspY * 2); // Top Back Center
    ctx.closePath();

    ctx.fillStyle = tintColor;
    ctx.globalAlpha = 0.5;
    ctx.fill();
    ctx.globalAlpha = 1.0;

    ctx.strokeStyle = "rgba(255,255,255,0.3)";
    ctx.stroke();

    ctx.restore();
}

function fillLiquid(ctx: CanvasRenderingContext2D, pattern: CanvasPattern | null, tintColor: string) {
    if (pattern) {
        ctx.fillStyle = pattern;
        ctx.scale(0.5, 0.5);
        ctx.fill();
        ctx.scale(2, 2);
    } else {
        ctx.fillStyle = tintColor;
        ctx.fill();
    }

    // Tint Overlay
    ctx.globalCompositeOperation = "source-atop";
    ctx.fillStyle = tintColor;
    ctx.globalAlpha = 0.6;
    ctx.fill();
    ctx.globalCompositeOperation = "source-over";
}

function drawLabel(ctx: CanvasRenderingContext2D, text: string, x: number, y: number, font: string = "bold 16px sans-serif", color: string = "#fff") {
    ctx.fillStyle = color;
    ctx.font = font;
    ctx.textAlign = "center";
    ctx.fillText(text, x, y);
}
