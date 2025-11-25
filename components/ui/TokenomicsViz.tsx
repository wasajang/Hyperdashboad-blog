"use client";

import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { Info, Lock, Unlock, TrendingUp, Activity } from "lucide-react";

export function TokenomicsViz() {
    // Mock Data representing the "Flow" or "Pressure"
    // These values are arbitrary units to represent relative size
    const supplyData = {
        hypercore: 30,
        hyperEVM: 20,
        total: 50,
    };

    const demandData = {
        hip3: 15, // 500k requirement
        af: 10,
        user: 25,
        unit: 10,
        dat: 20,
        total: 80,
    };

    // Calculate "Pressure" or "PE" proxy
    // If Demand > Supply, Price Pressure is High
    const pressureRatio = (demandData.total / supplyData.total).toFixed(2);
    const isHighPressure = demandData.total > supplyData.total;

    return (
        <Section className="bg-black/80 border-y border-white/5">
            <Container>
                <div className="mb-12 text-center">
                    <h2 className="text-3xl font-bold text-white mb-4">
                        <span className="text-primary">HYPE</span> Tokenomics Flow
                    </h2>
                    <p className="text-gray-400 max-w-2xl mx-auto">
                        Visualizing the balance between <strong>Ready-to-Sale Supply</strong> and <strong>Staked/Holding Demand</strong>.
                        <br />
                        <span className="text-xs text-gray-500">*Data is illustrative based on ecosystem structure.</span>
                    </p>
                </div>

                {/* Main Dashboard Grid */}
                <div className="grid lg:grid-cols-12 gap-8 items-stretch">

                    {/* Supply Side (Left) */}
                    <div className="lg:col-span-4 space-y-6">
                        <div className="bg-red-500/5 border border-red-500/20 rounded-2xl p-6 h-full relative overflow-hidden">
                            <div className="absolute top-0 right-0 p-4 opacity-20">
                                <Unlock className="w-24 h-24 text-red-500" />
                            </div>
                            <h3 className="text-xl font-bold text-red-400 mb-6 flex items-center gap-2">
                                <Unlock className="w-5 h-5" /> Supply (Liquid)
                            </h3>

                            <div className="space-y-6 relative z-10">
                                <div className="space-y-2">
                                    <div className="flex justify-between text-sm text-gray-300">
                                        <span>Hypercore</span>
                                        <span>{supplyData.hypercore}%</span>
                                    </div>
                                    <div className="h-3 bg-black/50 rounded-full overflow-hidden">
                                        <div className="h-full bg-red-500/60 w-[60%]" />
                                    </div>
                                    <p className="text-xs text-gray-500">Core network liquidity</p>
                                </div>

                                <div className="space-y-2">
                                    <div className="flex justify-between text-sm text-gray-300">
                                        <span>HyperEVM</span>
                                        <span>{supplyData.hyperEVM}%</span>
                                    </div>
                                    <div className="h-3 bg-black/50 rounded-full overflow-hidden">
                                        <div className="h-full bg-red-500/40 w-[40%]" />
                                    </div>
                                    <p className="text-xs text-gray-500">EVM bridge liquidity</p>
                                </div>
                            </div>

                            <div className="mt-8 pt-6 border-t border-red-500/20">
                                <div className="text-center">
                                    <span className="text-sm text-red-400 uppercase tracking-wider">Total Liquid Supply</span>
                                    <div className="text-3xl font-bold text-white mt-1">{supplyData.total}M <span className="text-sm text-gray-500 font-normal">(Est.)</span></div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Center Metric (Pressure Gauge) */}
                    <div className="lg:col-span-4 flex flex-col justify-center">
                        <div className="bg-card-bg border border-white/10 rounded-2xl p-8 text-center relative overflow-hidden group hover:border-primary/30 transition-colors">
                            <div className="absolute inset-0 bg-gradient-to-b from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />

                            <h4 className="text-sm text-gray-400 uppercase tracking-widest mb-4">Supply Weighted PE</h4>

                            <div className="relative inline-flex items-center justify-center mb-6">
                                <div className={`w-32 h-32 rounded-full border-4 flex items-center justify-center ${isHighPressure ? 'border-primary shadow-[0_0_30px_rgba(0,255,157,0.2)]' : 'border-gray-600'}`}>
                                    <div className="text-4xl font-bold text-white">{pressureRatio}x</div>
                                </div>
                                <Activity className={`absolute -right-8 top-0 w-6 h-6 ${isHighPressure ? 'text-primary animate-pulse' : 'text-gray-600'}`} />
                            </div>

                            <div className="space-y-2">
                                <div className="flex items-center justify-center gap-2 text-lg font-medium text-white">
                                    Status:
                                    <span className={isHighPressure ? "text-primary" : "text-yellow-500"}>
                                        {isHighPressure ? "High Demand" : "Neutral"}
                                    </span>
                                </div>
                                <p className="text-xs text-gray-500 max-w-xs mx-auto">
                                    Demand currently exceeds liquid supply, creating upward price pressure.
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Demand Side (Right) */}
                    <div className="lg:col-span-4 space-y-6">
                        <div className="bg-primary/5 border border-primary/20 rounded-2xl p-6 h-full relative overflow-hidden">
                            <div className="absolute top-0 right-0 p-4 opacity-20">
                                <Lock className="w-24 h-24 text-primary" />
                            </div>
                            <h3 className="text-xl font-bold text-primary mb-6 flex items-center gap-2">
                                <Lock className="w-5 h-5" /> Demand (Locked)
                            </h3>

                            <div className="space-y-4 relative z-10">
                                {/* HIP3 Highlight */}
                                <div className="bg-primary/10 border border-primary/30 rounded-lg p-3">
                                    <div className="flex justify-between text-sm text-white font-medium mb-1">
                                        <span className="flex items-center gap-1">HIP3 Deployer <Info className="w-3 h-3" /></span>
                                        <span>500k HYPE</span>
                                    </div>
                                    <div className="h-2 bg-black/50 rounded-full overflow-hidden">
                                        <div className="h-full bg-primary w-full animate-pulse" />
                                    </div>
                                    <p className="text-[10px] text-primary/80 mt-1">Required for deployment</p>
                                </div>

                                <div className="space-y-1">
                                    <div className="flex justify-between text-xs text-gray-300">
                                        <span>AF (Assistant Fund)</span>
                                        <span>{demandData.af}%</span>
                                    </div>
                                    <div className="h-2 bg-black/50 rounded-full overflow-hidden">
                                        <div className="h-full bg-blue-400 w-[20%]" />
                                    </div>
                                </div>

                                <div className="space-y-1">
                                    <div className="flex justify-between text-xs text-gray-300">
                                        <span>User Staking</span>
                                        <span>{demandData.user}%</span>
                                    </div>
                                    <div className="h-2 bg-black/50 rounded-full overflow-hidden">
                                        <div className="h-full bg-green-400 w-[40%]" />
                                    </div>
                                </div>

                                <div className="space-y-1">
                                    <div className="flex justify-between text-xs text-gray-300">
                                        <span>DAT (Hyperion/HSI)</span>
                                        <span>{demandData.dat}%</span>
                                    </div>
                                    <div className="h-2 bg-black/50 rounded-full overflow-hidden">
                                        <div className="h-full bg-purple-400 w-[30%]" />
                                    </div>
                                </div>
                            </div>

                            <div className="mt-8 pt-6 border-t border-primary/20">
                                <div className="text-center">
                                    <span className="text-sm text-primary uppercase tracking-wider">Total Locked Demand</span>
                                    <div className="text-3xl font-bold text-white mt-1">{demandData.total}M <span className="text-sm text-gray-500 font-normal">(Est.)</span></div>
                                </div>
                            </div>
                        </div>
                    </div>

                </div>

                {/* Flow Explanation */}
                <div className="mt-12 grid md:grid-cols-3 gap-6 text-center">
                    <div className="p-4 rounded-xl bg-white/5 border border-white/10">
                        <TrendingUp className="w-8 h-8 text-primary mx-auto mb-3" />
                        <h5 className="text-white font-bold mb-2">Supply Shock</h5>
                        <p className="text-sm text-gray-400">Liquid supply is constrained by bridge mechanics and core requirements.</p>
                    </div>
                    <div className="p-4 rounded-xl bg-white/5 border border-white/10">
                        <Lock className="w-8 h-8 text-primary mx-auto mb-3" />
                        <h5 className="text-white font-bold mb-2">Staking Flywheel</h5>
                        <p className="text-sm text-gray-400">HIP3 requires 500k HYPE lock-up, removing significant supply from circulation.</p>
                    </div>
                    <div className="p-4 rounded-xl bg-white/5 border border-white/10">
                        <Activity className="w-8 h-8 text-primary mx-auto mb-3" />
                        <h5 className="text-white font-bold mb-2">Ecosystem Growth</h5>
                        <p className="text-sm text-gray-400">As more DATs and Units launch, demand for locked HYPE increases exponentially.</p>
                    </div>
                </div>
            </Container>
        </Section>
    );
}
