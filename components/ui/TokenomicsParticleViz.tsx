"use client";

import { useEffect, useRef, useState } from "react";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { Info, Lock, Unlock, TrendingUp, Activity, DollarSign, PieChart } from "lucide-react";

interface Particle {
    x: number;
    y: number;
    vx: number;
    vy: number;
    target: "DAT" | "Protocol" | "Staked" | "HIP3" | "Ready";
    color: string;
    life: number;
    size: number;
}

interface Bucket {
    id: "DAT" | "Protocol" | "Staked" | "HIP3" | "Ready";
    x: number;
    y: number;
    width: number;
    height: number;
    label: string;
    subLabel?: string;
    color: string;
    count: number;
    maxCount: number;
    value: string; // Display string like "15M"
    desc: string; // Tooltip description
}

export function TokenomicsParticleViz() {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const [dimensions, setDimensions] = useState({ width: 0, height: 0 });
    const [hoveredBucket, setHoveredBucket] = useState<Bucket | null>(null);
    const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

    // Mock Data for emission rates (probabilities)
    const emissionRates = {
        DAT: 0.05,
        Protocol: 0.1,
        Staked: 0.4,
        HIP3: 0.05,
        Ready: 0.4,
    };

    // Metrics
    const metrics = {
        totalSupply: "1,000M",
        circulating: "270.8M",
        swpe: "2.1x",
        revenue24h: "$1.2M",
    };

    useEffect(() => {
        const handleResize = () => {
            if (canvasRef.current) {
                const parent = canvasRef.current.parentElement;
                if (parent) {
                    setDimensions({
                        width: parent.clientWidth,
                        height: 700, // Increased height for better layout
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

        const particles: Particle[] = [];
        const centerX = dimensions.width / 2;
        const centerY = dimensions.height / 2;

        // Define Buckets
        const bucketW = 160;
        const bucketH = 100;
        const padding = 20;

        // Bucket Positions
        const buckets: Bucket[] = [
            {
                id: "DAT",
                label: "DAT Treasury",
                subLabel: "HSI, Hyperion, Lion",
                color: "#c084fc", // Purple
                x: padding,
                y: padding,
                width: bucketW,
                height: bucketH,
                count: 0,
                maxCount: 500,
                value: "~15M HYPE",
                desc: "Corporate treasuries holding HYPE as a strategic asset (e.g., HSI, Hyperion).",
            },
            {
                id: "Protocol",
                label: "Protocol Controlled",
                subLabel: "AF + Team/Fund",
                color: "#60a5fa", // Blue
                x: dimensions.width - bucketW - padding,
                y: padding,
                width: bucketW,
                height: bucketH,
                count: 0,
                maxCount: 1000,
                value: "~300M HYPE",
                desc: "Tokens held by the Assistance Fund (AF), Team, and Foundation for long-term alignment.",
            },
            {
                id: "Staked",
                label: "Staked HYPE",
                subLabel: "Validators (HyperBFT)",
                color: "#f87171", // Red
                x: padding,
                y: dimensions.height - bucketH - padding,
                width: bucketW,
                height: bucketH,
                count: 0,
                maxCount: 1200,
                value: "~418M HYPE",
                desc: "Tokens staked to secure the network via HyperBFT consensus.",
            },
            {
                id: "HIP3",
                label: "HIP-3 Deployer",
                subLabel: "Builder Stakes",
                color: "#00ff9d", // Neon Green
                x: dimensions.width - bucketW - padding,
                y: dimensions.height - bucketH - padding,
                width: bucketW,
                height: bucketH,
                count: 0,
                maxCount: 300,
                value: "~5M HYPE",
                desc: "500k HYPE locked per builder to deploy perp DEXs on mainnet.",
            },
            {
                id: "Ready",
                label: "Ready-for-Sale",
                subLabel: "Float / Traders",
                color: "#ffffff", // White
                x: centerX - bucketW / 2,
                y: dimensions.height - bucketH - padding,
                width: bucketW,
                height: bucketH,
                count: 0,
                maxCount: 800,
                value: "~270M HYPE",
                desc: "Liquid supply available for trading on HyperCore and EVM bridges.",
            },
        ];

        // Helper to find bucket by ID
        const getBucket = (id: Bucket["id"]) => buckets.find((b) => b.id === id)!;

        let animationFrameId: number;

        const spawnParticle = () => {
            const rand = Math.random();
            let target: Bucket["id"] = "Ready";
            let color = "#ffffff";

            if (rand < emissionRates.DAT) {
                target = "DAT";
                color = "#c084fc";
            } else if (rand < emissionRates.DAT + emissionRates.Protocol) {
                target = "Protocol";
                color = "#60a5fa";
            } else if (rand < emissionRates.DAT + emissionRates.Protocol + emissionRates.Staked) {
                target = "Staked";
                color = "#f87171";
            } else if (rand < emissionRates.DAT + emissionRates.Protocol + emissionRates.Staked + emissionRates.HIP3) {
                target = "HIP3";
                color = "#00ff9d";
            }

            // Spawn from center
            const angle = Math.random() * Math.PI * 2;
            const speed = Math.random() * 2 + 2; // Faster initial burst

            particles.push({
                x: centerX,
                y: centerY,
                vx: Math.cos(angle) * speed,
                vy: Math.sin(angle) * speed,
                target,
                color,
                life: 1.0,
                size: Math.random() * 2 + 1,
            });
        };

        const update = () => {
            // Clear canvas
            ctx.fillStyle = "#050505";
            ctx.fillRect(0, 0, canvas.width, canvas.height);

            // Draw Center Emitter (Ecosystem Source)
            ctx.beginPath();
            ctx.arc(centerX, centerY, 30, 0, Math.PI * 2);
            ctx.fillStyle = "#ffffff";
            ctx.shadowBlur = 30;
            ctx.shadowColor = "#ffffff";
            ctx.fill();
            ctx.shadowBlur = 0;
            ctx.closePath();

            ctx.fillStyle = "#000";
            ctx.font = "bold 12px Arial";
            ctx.textAlign = "center";
            ctx.textBaseline = "middle";
            ctx.fillText("HYPE", centerX, centerY);

            // Spawn particles
            for (let i = 0; i < 8; i++) {
                spawnParticle();
            }

            // Update Particles
            for (let i = particles.length - 1; i >= 0; i--) {
                const p = particles[i];
                const targetBucket = getBucket(p.target);

                // Target center
                const tx = targetBucket.x + targetBucket.width / 2;
                const ty = targetBucket.y + targetBucket.height / 2;

                // Move logic
                const dx = tx - p.x;
                const dy = ty - p.y;
                const dist = Math.sqrt(dx * dx + dy * dy);

                if (dist < 20) {
                    targetBucket.count = Math.min(targetBucket.count + 1, targetBucket.maxCount);
                    particles.splice(i, 1);
                    continue;
                }

                // Attraction force
                p.vx += (dx / dist) * 0.2;
                p.vy += (dy / dist) * 0.2;

                // Friction
                p.vx *= 0.96;
                p.vy *= 0.96;

                p.x += p.vx;
                p.y += p.vy;

                // Draw
                ctx.beginPath();
                ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
                ctx.fillStyle = p.color;
                ctx.fill();
                ctx.closePath();
            }

            // Draw Buckets
            buckets.forEach((b) => {
                // Container
                ctx.strokeStyle = b.color;
                ctx.lineWidth = 2;
                ctx.strokeRect(b.x, b.y, b.width, b.height);

                // Fill
                const fillHeight = (b.count / b.maxCount) * b.height;
                ctx.fillStyle = b.color + "33";
                ctx.fillRect(b.x, b.y + b.height - fillHeight, b.width, fillHeight);

                // Labels
                ctx.fillStyle = "#fff";
                ctx.font = "bold 14px Arial";
                ctx.textAlign = "center";
                ctx.fillText(b.label, b.x + b.width / 2, b.y - 20);

                if (b.subLabel) {
                    ctx.fillStyle = "#aaa";
                    ctx.font = "11px Arial";
                    ctx.fillText(b.subLabel, b.x + b.width / 2, b.y - 5);
                }

                // Value inside
                ctx.fillStyle = "#fff";
                ctx.font = "bold 16px monospace";
                ctx.fillText(b.value, b.x + b.width / 2, b.y + b.height / 2);
            });

            // Draw Connection Lines
            buckets.forEach((b) => {
                ctx.beginPath();
                ctx.moveTo(centerX, centerY);
                ctx.lineTo(b.x + b.width / 2, b.y + b.height / 2);
                ctx.strokeStyle = b.color + "11";
                ctx.stroke();
            });

            animationFrameId = requestAnimationFrame(update);
        };

        update();

        // Interaction Handler
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
                            HYPE <span className="text-primary">Ecosystem Flow</span>
                        </h2>
                        <p className="text-gray-400 text-sm max-w-md">
                            Real-time visualization of token distribution buckets.
                            Dots represent HYPE tokens flowing from the ecosystem source to various sinks.
                        </p>
                    </div>

                    {/* Metrics Panel */}
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-4 md:mt-0 bg-white/5 p-4 rounded-xl border border-white/10">
                        <div className="text-center">
                            <div className="text-xs text-gray-400 uppercase">Total Supply</div>
                            <div className="text-lg font-bold text-white">{metrics.totalSupply}</div>
                        </div>
                        <div className="text-center">
                            <div className="text-xs text-gray-400 uppercase">Circulating</div>
                            <div className="text-lg font-bold text-white">{metrics.circulating}</div>
                        </div>
                        <div className="text-center">
                            <div className="text-xs text-primary uppercase font-bold">SWPE</div>
                            <div className="text-lg font-bold text-primary">{metrics.swpe}</div>
                        </div>
                        <div className="text-center">
                            <div className="text-xs text-gray-400 uppercase">24h Rev</div>
                            <div className="text-lg font-bold text-white">{metrics.revenue24h}</div>
                        </div>
                    </div>
                </div>

                <div className="relative w-full" style={{ height: "700px" }}>
                    <canvas
                        ref={canvasRef}
                        className="absolute inset-0 w-full h-full rounded-xl border border-white/10 bg-black/50 cursor-crosshair"
                    />

                    {/* Tooltip Overlay */}
                    {hoveredBucket && (
                        <div
                            className="fixed z-50 pointer-events-none bg-black/90 border border-white/20 p-4 rounded-lg shadow-xl backdrop-blur-md max-w-xs"
                            style={{
                                left: mousePos.x + 20,
                                top: mousePos.y + 20,
                            }}
                        >
                            <div className="flex items-center gap-2 mb-2">
                                <div className="w-3 h-3 rounded-full" style={{ backgroundColor: hoveredBucket.color }} />
                                <h4 className="font-bold text-white">{hoveredBucket.label}</h4>
                            </div>
                            <p className="text-sm text-gray-300 mb-2">{hoveredBucket.desc}</p>
                            <div className="text-xs text-gray-500 font-mono">
                                Holdings: <span className="text-white">{hoveredBucket.value}</span>
                            </div>
                        </div>
                    )}
                </div>

                <div className="mt-4 text-center text-xs text-gray-600">
                    * Visualization based on estimated on-chain data and structural design. Not financial advice.
                </div>
            </Container>
        </Section>
    );
}
