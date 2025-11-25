
"use client";

import { useEffect, useRef, useState, useMemo, useCallback } from "react";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { Play, Pause, RotateCcw } from "lucide-react";

// --- Data & Types ---

interface RevenuePoint {
  date: string;
  revenue: number;
  source: string;
}

// Processed Data from JSON
const RAW_DATA = [
  { date: "2025-08-14", revenue: 5170000, source: "Binance" },
  { date: "2025-08-26", revenue: 7700000, source: "Ainvest" },
  { date: "2025-09-19", revenue: 2750000, source: "MEXC" },
  { date: "2025-10-18", revenue: 3500000, source: "Medium" }, // Avg of range
  { date: "2025-11-21", revenue: 3950000, source: "DefiLlama" }, // Avg of range
];

// Simulation Constants
const INITIAL_HYPE_PRICE = 20.0;
const CIRCULATING_SUPPLY = 270000000;

interface SimulationState {
  currentDate: Date;
  progress: number; // 0 to 1
  dailyRevenue: number;
  swpe: number;
  afHoldings: number;
  hip3Count: number;
}

export function TokenomicsDataViz() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  // UI State
  const [isPlaying, setIsPlaying] = useState(true);
  const [dimensions, setDimensions] = useState({ width: 0, height: 600 });

  // Simulation State (Ref for performance)
  const simState = useRef<SimulationState>({
    currentDate: new Date("2025-08-14"),
    progress: 0,
    dailyRevenue: 5170000,
    swpe: 0,
    afHoldings: 0,
    hip3Count: 0,
  });

  // Pre-calculate daily data points
  const dailyData = useMemo(() => {
    const data: { date: Date; revenue: number; swpe: number }[] = [];
    const startDate = new Date(RAW_DATA[0].date);
    const endDate = new Date(RAW_DATA[RAW_DATA.length - 1].date);

    let current = new Date(startDate);
    while (current <= endDate) {
      // Find surrounding data points
      let p1 = RAW_DATA[0];
      let p2 = RAW_DATA[RAW_DATA.length - 1];

      for (let i = 0; i < RAW_DATA.length - 1; i++) {
        const d1 = new Date(RAW_DATA[i].date);
        const d2 = new Date(RAW_DATA[i + 1].date);
        if (current >= d1 && current <= d2) {
          p1 = RAW_DATA[i];
          p2 = RAW_DATA[i + 1];
          break;
        }
      }

      const t1 = new Date(p1.date).getTime();
      const t2 = new Date(p2.date).getTime();
      const tCur = current.getTime();
      const factor = t2 === t1 ? 0 : (tCur - t1) / (t2 - t1);

      const interpolatedRevenue = p1.revenue + (p2.revenue - p1.revenue) * factor;

      const annualizedRev = interpolatedRevenue * 365;
      const mcap = CIRCULATING_SUPPLY * INITIAL_HYPE_PRICE;
      const swpe = annualizedRev > 0 ? mcap / annualizedRev : 0;

      data.push({
        date: new Date(current),
        revenue: interpolatedRevenue,
        swpe: swpe
      });

      current.setDate(current.getDate() + 1);
    }
    return data;
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

  // Main Game Loop
  useEffect(() => {
    if (!canvasRef.current || dimensions.width === 0) return;
    const ctx = canvasRef.current.getContext("2d");
    if (!ctx) return;

    let animationFrameId: number;
    let lastTime = performance.now();

    const render = () => {
      const w = dimensions.width;
      const h = dimensions.height;
      const centerX = w / 2;
      const centerY = h / 2;
      const state = simState.current;

      // Clear
      ctx.fillStyle = "#050505";
      ctx.fillRect(0, 0, w, h);

      // --- Draw Timeline ---
      const timelineY = h - 50;
      ctx.strokeStyle = "#333";
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.moveTo(50, timelineY);
      ctx.lineTo(w - 50, timelineY);
      ctx.stroke();

      // Progress Marker
      const markerX = 50 + (w - 100) * state.progress;
      ctx.fillStyle = "#00ff9d";
      ctx.beginPath();
      ctx.arc(markerX, timelineY, 6, 0, Math.PI * 2);
      ctx.fill();

      // Labels
      ctx.fillStyle = "#666";
      ctx.font = "12px monospace";
      ctx.fillText("Aug 14", 50, timelineY + 20);
      ctx.fillText("Nov 21", w - 80, timelineY + 20);

      ctx.fillStyle = "#fff";
      ctx.font = "bold 14px monospace";
      ctx.textAlign = "center";
      ctx.fillText(state.currentDate.toLocaleDateString(), markerX, timelineY - 15);

      // --- Visualizing SWPE ---
      const gaugeRadius = 80;
      ctx.beginPath();
      ctx.arc(centerX, centerY - 50, gaugeRadius, Math.PI, 0);
      ctx.lineWidth = 15;
      ctx.strokeStyle = "#333";
      ctx.stroke();

      const minSwpe = 1.0;
      const maxSwpe = 5.0;
      const swpeNorm = Math.max(0, Math.min(1, (maxSwpe - state.swpe) / (maxSwpe - minSwpe)));

      ctx.beginPath();
      ctx.arc(centerX, centerY - 50, gaugeRadius, Math.PI, Math.PI + (Math.PI * swpeNorm));
      ctx.strokeStyle = `hsl(${Math.round(swpeNorm * 120)}, 100 %, 50 %)`;
      ctx.stroke();

      ctx.fillStyle = "#fff";
      ctx.font = "bold 32px sans-serif";
      ctx.fillText(state.swpe.toFixed(2) + "x", centerX, centerY - 60);
      ctx.font = "14px sans-serif";
      ctx.fillStyle = "#888";
      ctx.fillText("SWPE (Supply-Weighted P/E)", centerX, centerY - 30);

      // --- Buckets ---
      // AF Bucket
      const afX = centerX - 250;
      const afY = centerY + 50;
      const bucketW = 120;
      const bucketH = 150;

      ctx.strokeStyle = "#60a5fa";
      ctx.lineWidth = 2;
      ctx.strokeRect(afX, afY, bucketW, bucketH);

      const afMax = 20000000;
      const afFill = Math.min(1, state.afHoldings / afMax);
      ctx.fillStyle = "rgba(96, 165, 250, 0.3)";
      ctx.fillRect(afX, afY + bucketH * (1 - afFill), bucketW, bucketH * afFill);

      ctx.fillStyle = "#60a5fa";
      ctx.font = "bold 16px sans-serif";
      ctx.fillText("AF Treasury", afX + bucketW / 2, afY - 10);
      ctx.fillStyle = "#fff";
      ctx.font = "bold 14px monospace";
      ctx.fillText((state.afHoldings / 1000000).toFixed(1) + "M HYPE", afX + bucketW / 2, afY + bucketH + 20);

      // HIP-3 Bucket
      const hipX = centerX + 130;
      const hipY = centerY + 50;

      ctx.strokeStyle = "#00ff9d";
      ctx.strokeRect(hipX, hipY, bucketW, bucketH);

      const hipMax = 50;
      const hipFill = Math.min(1, state.hip3Count / hipMax);
      ctx.fillStyle = "rgba(0, 255, 157, 0.3)";
      ctx.fillRect(hipX, hipY + bucketH * (1 - hipFill), bucketW, bucketH * hipFill);

      ctx.fillStyle = "#00ff9d";
      ctx.font = "bold 16px sans-serif";
      ctx.fillText("HIP-3 Stakes", hipX + bucketW / 2, hipY - 10);
      ctx.fillStyle = "#fff";
      ctx.font = "bold 14px monospace";
      ctx.fillText((state.hip3Count * 0.5).toFixed(1) + "M HYPE", hipX + bucketW / 2, hipY + bucketH + 20);

      // --- Particles ---
      const particleCount = Math.floor(state.dailyRevenue / 200000);
      for (let i = 0; i < particleCount; i++) {
        // Deterministic pseudo-random for stable visual noise per frame? 
        // Actually random is fine for "flow" effect if we redraw fast enough
        const x = afX + bucketW / 2 + (Math.random() - 0.5) * bucketW;
        const y = afY + (Math.random()) * bucketH;

        ctx.fillStyle = "rgba(255, 255, 255, 0.5)";
        ctx.beginPath();
        ctx.arc(x, y, 2, 0, Math.PI * 2);
        ctx.fill();
      }

      ctx.fillStyle = "#fbbf24";
      ctx.font = "bold 20px sans-serif";
      ctx.fillText(`Daily Revenue: $${(state.dailyRevenue / 1000000).toFixed(2)} M`, centerX, 50);
    };

    const loop = (time: number) => {
      const dt = time - lastTime;
      lastTime = time;

      if (isPlaying) {
        const duration = 20000; // 20s for full loop
        let newProgress = simState.current.progress + (dt / duration);

        if (newProgress >= 1) {
          newProgress = 1;
          setIsPlaying(false); // Stop playback
        }

        // Update State Logic
        const dataIndex = Math.floor(newProgress * (dailyData.length - 1));
        const todayData = dailyData[dataIndex];

        let totalRev = 0;
        for (let i = 0; i <= dataIndex; i++) totalRev += dailyData[i].revenue;
        const afHype = totalRev / INITIAL_HYPE_PRICE;
        const hip3 = Math.floor(newProgress * 50);

        simState.current = {
          progress: newProgress,
          currentDate: todayData.date,
          dailyRevenue: todayData.revenue,
          swpe: todayData.swpe,
          afHoldings: afHype,
          hip3Count: hip3,
        };
      }

      render();
      animationFrameId = requestAnimationFrame(loop);
    };

    animationFrameId = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(animationFrameId);
  }, [dimensions, isPlaying, dailyData]); // Re-bind loop if playing state changes

  const togglePlay = () => setIsPlaying(!isPlaying);
  const reset = () => {
    simState.current.progress = 0;
    setIsPlaying(true);
  };

  return (
    <Section className="bg-black/90 border-y border-white/5 relative">
      <Container>
        <div className="flex flex-col md:flex-row items-center justify-between mb-6">
          <div>
            <h2 className="text-3xl font-bold text-white mb-2">
              Historical <span className="text-primary">Data Simulation</span>
            </h2>
            <p className="text-gray-400 text-sm">
              Visualizing Revenue, SWPE, and Accumulation from Aug to Nov 2025.
            </p>
          </div>
          <div className="flex gap-2 mt-4 md:mt-0">
            <button onClick={togglePlay} className="p-2 bg-white/10 rounded-full hover:bg-white/20 text-white">
              {isPlaying ? <Pause size={20} /> : <Play size={20} />}
            </button>
            <button onClick={reset} className="p-2 bg-white/10 rounded-full hover:bg-white/20 text-white">
              <RotateCcw size={20} />
            </button>
          </div>
        </div>

        <div ref={containerRef} className="relative w-full h-[600px] bg-black/50 rounded-xl border border-white/10 overflow-hidden">
          <canvas
            ref={canvasRef}
            width={dimensions.width}
            height={dimensions.height}
            className="w-full h-full"
          />
        </div>

        <div className="mt-4 grid grid-cols-1 md:grid-cols-3 gap-4 text-center text-xs text-gray-500">
          <div>* Revenue data interpolated from public reports (Binance, DefiLlama).</div>
          <div>* SWPE calculated assuming constant Market Cap for isolation.</div>
          <div>* Accumulation visualized based on 99% fee burn/buyback model.</div>
        </div>
      </Container>
    </Section>
  );
}

