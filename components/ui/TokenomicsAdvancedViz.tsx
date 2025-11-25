"use client";

import { useEffect, useRef, useState } from "react";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";

// Types for our simulation
type ParticleType = "USD" | "HYPE" | "BLOCK" | "VESTING";

interface Particle {
    id: number;
    type: ParticleType;
    x: number;
    y: number;
    vx: number;
    vy: number;
    targetId: string;
    color: string;
    size: number;
    life: number;
}

interface Bucket {
    id: string;
    label: string;
    subLabel: string;
    x: number;
    y: number;
    width: number;
    height: number;
    color: string;
    count: number; // Visual counter
    displayValue: string;
    description: string;
}

export function TokenomicsAdvancedViz() {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const [dimensions, setDimensions] = useState({ width: 0, height: 0 });
    const [hoveredBucket, setHoveredBucket] = useState<Bucket | null>(null);
    const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

    // Simulation State
    const hip3Accumulator = useRef(0);

    useEffect(() => {
        const handleResize = () => {
            if (canvasRef.current) {
                const parent = canvasRef.current.parentElement;
                if (parent) {
                    setDimensions({
                        width: parent.clientWidth,
                        height: 800, // Increased height
                    });
                }
            }
        };

        window.addEventListener("resize", handleResize);
        handleResize();

        return () => window.removeEventListener("resize", handleResize);
    }, []);

    useEffect(() => {
        if (!canvasRef.current || dimensions.width === 0) return;

        const canvas = canvasRef.current;
        const ctx = canvas.getContext("2d");
        if (!ctx) return;

        canvas.width = dimensions.width;
        canvas.height = dimensions.height;

        const centerX = dimensions.width / 2;
        const centerY = dimensions.height / 2;

        // Bucket Configuration
        const bucketW = 200;
        const bucketH = 140;
        const padding = 40;

        const buckets: Bucket[] = [
            {
                id: "MARKET",
                label: "Market / Float",
                subLabel: "Ready-for-Sale Supply",
                x: centerX - bucketW / 2,
                y: centerY - bucketH / 2,
                width: bucketW,
                height: bucketH,
                color: "#ffffff",
                count: 100, // Scaled down for visual ball count
                displayValue: "~270M HYPE",
                description: "The central pool of liquid HYPE available for trading. All buybacks and staking draw from here.",
            },
            {
                id: "DAT",
                label: "DAT Treasury",
                subLabel: "HSI, Hyperion, Lion",
                x: padding,
                y: padding,
                width: bucketW,
                height: bucketH,
                color: "#c084fc", // Purple
                count: 15,
                displayValue: "~15M HYPE",
                description: "Corporate treasuries accumulating HYPE as a strategic asset.",
            },
            {
                id: "AF",
                label: "Assistance Fund",
                subLabel: "Protocol Buybacks",
                x: dimensions.width - bucketW - padding,
                y: padding,
                width: bucketW,
                height: bucketH,
                color: "#60a5fa", // Blue
                count: 110,
                displayValue: "~300M HYPE",
                description: "Protocol revenue buys HYPE from the market and locks it here.",
            },
            {
                id: "STAKED",
                label: "Staked HYPE",
                subLabel: "Validators (HyperBFT)",
                x: padding,
                y: dimensions.height - bucketH - padding,
                width: bucketW,
                height: bucketH,
                color: "#f87171", // Red
                count: 150,
                displayValue: "~418M HYPE",
                description: "HYPE staked to secure the network. Moves from Market -> Staked.",
            },
            {
                id: "HIP3",
                label: "HIP-3 Deployer",
                subLabel: "500k Blocks / Ticker",
                x: dimensions.width - bucketW - padding,
                y: dimensions.height - bucketH - padding,
                width: bucketW,
                height: bucketH,
                color: "#00ff9d", // Neon Green
                count: 10, // Represents blocks
                displayValue: "~5M HYPE",
                description: "Discrete 500k HYPE blocks locked for each new Perp DEX deployment.",
            },
        ];

        const getBucket = (id: string) => buckets.find(b => b.id === id)!;
        const marketBucket = getBucket("MARKET");

        let particles: Particle[] = [];
        let particleIdCounter = 0;

        // Spawners
        const spawnRevenue = () => {
            const y = centerY + (Math.random() - 0.5) * 100;
            particles.push({
                id: particleIdCounter++,
                type: "USD",
                x: 0,
                y: y,
                vx: (Math.random() * 3 + 4),
                vy: (centerY - y) * 0.01,
                targetId: "MARKET",
                color: "#fbbf24",
                size: 3,
                life: 1,
            });
        };

        const spawnVesting = () => {
            const x = centerX + (Math.random() - 0.5) * 100;
            particles.push({
                id: particleIdCounter++,
                type: "VESTING",
                x: x,
                y: 0,
                vx: (centerX - x) * 0.01,
                vy: (Math.random() * 1 + 1),
                targetId: "MARKET",
                color: "#52525b",
                size: 2,
                life: 1,
            });
        };

        const spawnBuyback = () => {
            const start = marketBucket;
            particles.push({
                id: particleIdCounter++,
                type: "HYPE",
                x: start.x + start.width / 2,
                y: start.y + start.height / 2,
                vx: 0,
                vy: 0,
                targetId: "AF",
                color: "#60a5fa",
                size: 5, // Ball size
                life: 1,
            });
        };

        const spawnHIP3Block = () => {
            const start = marketBucket;
            particles.push({
                id: particleIdCounter++,
                type: "BLOCK",
                x: start.x + start.width / 2,
                y: start.y + start.height / 2,
                vx: 0,
                vy: 0,
                targetId: "HIP3",
                color: "#00ff9d",
                size: 14,
                life: 1,
            });
        };

        const spawnStaking = () => {
            const start = marketBucket;
            particles.push({
                id: particleIdCounter++,
                type: "HYPE",
                x: start.x + start.width / 2,
                y: start.y + start.height / 2,
                vx: 0,
                vy: 0,
                targetId: "STAKED",
                color: "#f87171",
                size: 5,
                life: 1,
            });
        };

        const spawnDAT = () => {
            const start = marketBucket;
            particles.push({
                id: particleIdCounter++,
                type: "HYPE",
                x: start.x + start.width / 2,
                y: start.y + start.height / 2,
                vx: 0,
                vy: 0,
                targetId: "DAT",
                color: "#c084fc",
                size: 5,
                life: 1,
            });
        };

        // Helper to draw packed balls
        const drawPackedBalls = (b: Bucket) => {
            const ballRadius = 6;
            const spacing = 1;
            const cols = Math.floor(b.width / (ballRadius * 2 + spacing));

            // Limit visual count to avoid overflow
            const visualCount = Math.min(Math.floor(b.count), 200);

            for (let i = 0; i < visualCount; i++) {
                const row = Math.floor(i / cols);
                const col = i % cols;

                const x = b.x + ballRadius + spacing + col * (ballRadius * 2 + spacing);
                const y = b.y + b.height - (ballRadius + spacing) - row * (ballRadius * 2 + spacing);

                // Don't draw if outside bucket
                if (y < b.y + ballRadius) continue;

                // Draw Ball with Gradient
                const grad = ctx.createRadialGradient(x - 2, y - 2, 1, x, y, ballRadius);
                grad.addColorStop(0, "#fff");
                grad.addColorStop(0.3, b.color);
                grad.addColorStop(1, "#000");

                ctx.beginPath();
                ctx.arc(x, y, ballRadius, 0, Math.PI * 2);
                ctx.fillStyle = grad;
                ctx.fill();

                // Shine
                ctx.beginPath();
                ctx.arc(x - 2, y - 2, 2, 0, Math.PI * 2);
                ctx.fillStyle = "rgba(255,255,255,0.4)";
                ctx.fill();
            }
        };

        // Helper to draw stacked blocks for HIP-3
        const drawStackedBlocks = (b: Bucket) => {
            const blockSize = 20;
            const spacing = 2;
            const cols = Math.floor(b.width / (blockSize + spacing));

            const visualCount = Math.min(Math.floor(b.count), 50);

            for (let i = 0; i < visualCount; i++) {
                const row = Math.floor(i / cols);
                const col = i % cols;

                const x = b.x + spacing + col * (blockSize + spacing);
                const y = b.y + b.height - blockSize - spacing - row * (blockSize + spacing);

                if (y < b.y) continue;

                ctx.fillStyle = b.color;
                ctx.shadowBlur = 5;
                ctx.shadowColor = b.color;
                ctx.fillRect(x, y, blockSize, blockSize);
                ctx.shadowBlur = 0;

                // Inner detail
                ctx.strokeStyle = "rgba(0,0,0,0.5)";
                ctx.strokeRect(x, y, blockSize, blockSize);
            }
        };

        let animationFrameId: number;
        let frameCount = 0;

        const update = () => {
            frameCount++;

            // Clear
            ctx.fillStyle = "#050505";
            ctx.fillRect(0, 0, canvas.width, canvas.height);

            // --- Spawning Logic ---
            if (frameCount % 5 === 0) spawnRevenue();
            if (frameCount % 20 === 0) spawnVesting();
            if (frameCount % 15 === 0) spawnStaking();
            if (frameCount % 40 === 0) spawnDAT();

            hip3Accumulator.current += 1;
            if (hip3Accumulator.current > 300) {
                spawnHIP3Block();
                hip3Accumulator.current = 0;
            }

            // --- Draw Buckets (Background) ---
            buckets.forEach(b => {
                const isHovered = hoveredBucket?.id === b.id;

                // Glassmorphism Container
                ctx.fillStyle = "rgba(20, 20, 20, 0.6)";
                ctx.fillRect(b.x, b.y, b.width, b.height);

                // Border Glow
                ctx.shadowBlur = isHovered ? 20 : 0;
                ctx.shadowColor = b.color;
                ctx.strokeStyle = isHovered ? b.color : "rgba(255,255,255,0.1)";
                ctx.lineWidth = isHovered ? 2 : 1;
                ctx.strokeRect(b.x, b.y, b.width, b.height);
                ctx.shadowBlur = 0;

                // Label Background
                ctx.fillStyle = "rgba(0,0,0,0.5)";
                ctx.fillRect(b.x, b.y, b.width, 30);

                // Label
                ctx.fillStyle = b.color;
                ctx.font = "bold 14px Arial";
                ctx.textAlign = "center";
                ctx.fillText(b.label, b.x + b.width / 2, b.y + 20);
            });

            // --- Draw Connections ---
            buckets.forEach(b => {
                if (b.id === "MARKET") return;
                const mx = marketBucket.x + marketBucket.width / 2;
                const my = marketBucket.y + marketBucket.height / 2;
                const bx = b.x + b.width / 2;
                const by = b.y + b.height / 2;

                const grad = ctx.createLinearGradient(mx, my, bx, by);
                grad.addColorStop(0, "rgba(255,255,255,0.05)");
                grad.addColorStop(1, b.color + "22");

                ctx.strokeStyle = grad;
                ctx.lineWidth = 1;
                ctx.beginPath();
                ctx.moveTo(mx, my);
                ctx.lineTo(bx, by);
                ctx.stroke();
            });

            // Revenue Stream
            const revGrad = ctx.createLinearGradient(0, centerY, marketBucket.x, centerY);
            revGrad.addColorStop(0, "rgba(251, 191, 36, 0.4)");
            revGrad.addColorStop(1, "rgba(251, 191, 36, 0)");
            ctx.strokeStyle = revGrad;
            ctx.lineWidth = 2;
            ctx.beginPath();
            ctx.moveTo(0, centerY);
            ctx.lineTo(marketBucket.x, centerY);
            ctx.stroke();

            // --- Draw Contents (Balls/Blocks) ---
            buckets.forEach(b => {
                if (b.id === "HIP3") {
                    drawStackedBlocks(b);
                } else {
                    drawPackedBalls(b);
                }
            });

            // --- Update & Draw Particles ---
            for (let i = particles.length - 1; i >= 0; i--) {
                const p = particles[i];
                const target = getBucket(p.targetId);

                const tx = target.x + target.width / 2;
                const ty = target.y + target.height / 2;

                const dx = tx - p.x;
                const dy = ty - p.y;
                const dist = Math.sqrt(dx * dx + dy * dy);

                if (dist < 20) {
                    if (p.type === "USD" && p.targetId === "MARKET") {
                        spawnBuyback();
                    } else {
                        target.count += (p.type === "BLOCK" ? 1 : 1);
                        // Decrement market count when moving out
                        if (p.targetId !== "MARKET") {
                            marketBucket.count = Math.max(0, marketBucket.count - (p.type === "BLOCK" ? 1 : 1));
                        }
                    }
                    particles.splice(i, 1);
                    continue;
                }

                p.vx += (dx / dist) * 0.5;
                p.vy += (dy / dist) * 0.5;
                p.vx *= 0.95;
                p.vy *= 0.95;
                p.x += p.vx;
                p.y += p.vy;

                // Draw Flying Particle
                if (p.type === "BLOCK") {
                    ctx.fillStyle = p.color;
                    ctx.shadowBlur = 10;
                    ctx.shadowColor = p.color;
                    ctx.fillRect(p.x - p.size / 2, p.y - p.size / 2, p.size, p.size);
                } else if (p.type === "USD") {
                    ctx.fillStyle = "#fbbf24";
                    ctx.font = "bold 12px Arial";
                    ctx.fillText("$", p.x, p.y);
                } else {
                    // Flying Ball
                    const grad = ctx.createRadialGradient(p.x - 1, p.y - 1, 0, p.x, p.y, p.size);
                    grad.addColorStop(0, "#fff");
                    grad.addColorStop(1, p.color);
                    ctx.fillStyle = grad;
                    ctx.beginPath();
                    ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
                    ctx.fill();
                }
                ctx.shadowBlur = 0;
            }

            // --- Draw Stats Overlay on Buckets ---
            buckets.forEach(b => {
                ctx.fillStyle = "#fff";
                ctx.font = "bold 16px monospace";
                ctx.textAlign = "center";
                ctx.shadowColor = "black";
                ctx.shadowBlur = 4;
                ctx.fillText(b.displayValue, b.x + b.width / 2, b.y + b.height + 20);
                ctx.shadowBlur = 0;
            });

            animationFrameId = requestAnimationFrame(update);
        };

        update();

        const handleMouseMove = (e: MouseEvent) => {
            const rect = canvas.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            setMousePos({ x: e.clientX, y: e.clientY });

            const hovered = buckets.find(
                (b) => x >= b.x && x <= b.x + b.width && y >= b.y && y <= b.y + b.height
            );
            setHoveredBucket(hovered || null);
        };

        canvas.addEventListener("mousemove", handleMouseMove);

        return () => {
            cancelAnimationFrame(animationFrameId);
            canvas.removeEventListener("mousemove", handleMouseMove);
        };

    }, [dimensions]);

    return (
        <Section className="bg-black/90 border-y border-white/5 overflow-hidden relative">
            <Container className="relative z-10">
                <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-8">
                    <div>
                        <h2 className="text-3xl font-bold text-white mb-2">
                            Hyperliquid <span className="text-primary">Ecosystem Flow</span>
                        </h2>
                        <p className="text-gray-400 text-sm max-w-xl">
                            <strong>Simulation Mode:</strong> Visualizing the real mechanics of HYPE.
                            <br />
                            <span className="text-yellow-500">Revenue ($)</span> enters the market to buy back HYPE for the <span className="text-blue-400">AF</span>.
                            <br />
                            <span className="text-green-400">HIP-3</span> deployments lock discrete 500k blocks of HYPE.
                        </p>
                    </div>
                </div>

                <div className="relative w-full" style={{ height: "800px" }}>
                    <canvas
                        ref={canvasRef}
                        className="absolute inset-0 w-full h-full rounded-xl border border-white/10 bg-[url('/grid.svg')] bg-center bg-black/50 cursor-crosshair"
                    />

                    {hoveredBucket && (
                        <div
                            className="fixed z-50 pointer-events-none bg-black/95 border border-white/20 p-4 rounded-lg shadow-xl backdrop-blur-md max-w-xs"
                            style={{
                                left: mousePos.x + 20,
                                top: mousePos.y + 20,
                            }}
                        >
                            <div className="flex items-center gap-2 mb-2">
                                <div className="w-3 h-3 rounded-full" style={{ backgroundColor: hoveredBucket.color }} />
                                <h4 className="font-bold text-white">{hoveredBucket.label}</h4>
                            </div>
                            <p className="text-sm text-gray-300 mb-3 leading-relaxed">{hoveredBucket.description}</p>
                            <div className="pt-2 border-t border-white/10 flex justify-between items-center">
                                <span className="text-xs text-gray-500">Current Size</span>
                                <span className="text-sm font-mono font-bold text-white">{hoveredBucket.displayValue}</span>
                            </div>
                        </div>
                    )}
                </div>
            </Container>
        </Section>
    );
}
