import React from 'react';
import { FileKey2, Key, Wallet, Hash, ArrowRight, ArrowDown } from 'lucide-react';

export const WalletCreationFlowViz = () => {
    return (
        <div className="w-full bg-black/40 rounded-xl border border-white/10 p-6 md:p-8">
            <div className="flex flex-col md:flex-row items-center justify-between gap-6 relative">

                {/* Step 1: Mnemonic */}
                <div className="flex flex-col items-center text-center z-10 w-full md:w-1/4">
                    <div className="w-16 h-16 rounded-full bg-blue-500/20 border border-blue-500/40 flex items-center justify-center mb-4 shadow-[0_0_20px_rgba(59,130,246,0.2)]">
                        <FileKey2 className="w-8 h-8 text-blue-400" />
                    </div>
                    <h4 className="text-white font-bold mb-1">1. Mnemonic</h4>
                    <p className="text-xs text-gray-400">Seed Phrase (12/24 Words)</p>
                    <div className="mt-2 text-[10px] bg-white/5 px-2 py-1 rounded text-gray-500 font-mono">
                        witch collapse practice feed...
                    </div>
                </div>

                {/* Arrow 1 */}
                <div className="hidden md:block absolute left-[22%] top-8 w-[12%] h-[2px] bg-gradient-to-r from-blue-500/50 to-amber-500/50"></div>
                <ArrowDown className="md:hidden text-gray-600 w-6 h-6" />

                {/* Step 2: Private Key */}
                <div className="flex flex-col items-center text-center z-10 w-full md:w-1/4">
                    <div className="w-16 h-16 rounded-full bg-amber-500/20 border border-amber-500/40 flex items-center justify-center mb-4 shadow-[0_0_20px_rgba(245,158,11,0.2)]">
                        <Key className="w-8 h-8 text-amber-400" />
                    </div>
                    <h4 className="text-white font-bold mb-1">2. Private Key</h4>
                    <p className="text-xs text-gray-400">Derived from Mnemonic</p>
                    <div className="mt-2 text-[10px] bg-white/5 px-2 py-1 rounded text-gray-500 font-mono">
                        0x8a2f...3c91
                    </div>
                </div>

                {/* Arrow 2 */}
                <div className="hidden md:block absolute left-[47%] top-8 w-[12%] h-[2px] bg-gradient-to-r from-amber-500/50 to-purple-500/50"></div>
                <ArrowDown className="md:hidden text-gray-600 w-6 h-6" />

                {/* Step 3: Wallet App */}
                <div className="flex flex-col items-center text-center z-10 w-full md:w-1/4">
                    <div className="w-16 h-16 rounded-full bg-purple-500/20 border border-purple-500/40 flex items-center justify-center mb-4 shadow-[0_0_20px_rgba(168,85,247,0.2)]">
                        <Wallet className="w-8 h-8 text-purple-400" />
                    </div>
                    <h4 className="text-white font-bold mb-1">3. Wallet App</h4>
                    <p className="text-xs text-gray-400">Stores the Key</p>
                    <div className="mt-2 flex gap-1 justify-center">
                        <div className="w-4 h-4 rounded-full bg-white/10"></div>
                        <div className="w-4 h-4 rounded-full bg-white/10"></div>
                    </div>
                </div>

                {/* Arrow 3 */}
                <div className="hidden md:block absolute left-[72%] top-8 w-[12%] h-[2px] bg-gradient-to-r from-purple-500/50 to-emerald-500/50"></div>
                <ArrowDown className="md:hidden text-gray-600 w-6 h-6" />

                {/* Step 4: Address */}
                <div className="flex flex-col items-center text-center z-10 w-full md:w-1/4">
                    <div className="w-16 h-16 rounded-full bg-emerald-500/20 border border-emerald-500/40 flex items-center justify-center mb-4 shadow-[0_0_20px_rgba(16,185,129,0.2)]">
                        <Hash className="w-8 h-8 text-emerald-400" />
                    </div>
                    <h4 className="text-white font-bold mb-1">4. Address</h4>
                    <p className="text-xs text-gray-400">Public Account Number</p>
                    <div className="mt-2 text-[10px] bg-white/5 px-2 py-1 rounded text-gray-500 font-mono">
                        0x71C...9A21
                    </div>
                </div>

            </div>
        </div>
    );
};
