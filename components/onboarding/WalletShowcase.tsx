import React from 'react';
import { ExternalLink } from 'lucide-react';

interface WalletInfo {
    name: string;
    description: string;
    logoUrl: string;
    link: string;
    networks: string[];
    color: string;
}

const WALLETS: WalletInfo[] = [
    {
        name: "MetaMask",
        description: "The world's most popular EVM wallet.",
        logoUrl: "https://upload.wikimedia.org/wikipedia/commons/3/36/MetaMask_Fox.svg",
        link: "https://metamask.io/",
        networks: ["Ethereum", "Arbitrum", "Optimism", "Base", "Polygon", "BNB Chain", "Avalanche", "All EVM Chains"],
        color: "from-orange-500/20 to-orange-600/5"
    },
    {
        name: "Phantom",
        description: "The best wallet for Solana & Multi-chain.",
        logoUrl: "/images/logos/phantom.png",
        link: "https://phantom.app/",
        networks: ["Solana", "Bitcoin", "Ethereum", "Polygon", "Base", "HyperEVM", "Monad"],
        color: "from-purple-500/20 to-purple-600/5"
    },
    {
        name: "Rabby",
        description: "The game-changing wallet for EVM users.",
        logoUrl: "/images/logos/rabby.png",
        link: "https://rabby.io/",
        networks: ["Ethereum", "Arbitrum", "Optimism", "Base", "Polygon", "BNB Chain", "Avalanche", "EVM Specialized"],
        color: "from-indigo-500/20 to-indigo-600/5"
    }
];

export const WalletShowcase = () => {
    return (
        <div className="grid md:grid-cols-3 gap-6">
            {WALLETS.map((wallet) => (
                <a
                    key={wallet.name}
                    href={wallet.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group relative overflow-hidden rounded-2xl border border-white/10 bg-black/40 transition-all duration-300 hover:-translate-y-1 hover:border-white/20 hover:shadow-xl"
                >
                    {/* Background Gradient */}
                    <div className={`absolute inset-0 bg-gradient-to-br ${wallet.color} opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />

                    <div className="relative p-6 flex flex-col items-center text-center h-full">
                        {/* Logo */}
                        <div className="w-20 h-20 mb-4 relative z-10 transition-all duration-300 group-hover:scale-110 group-hover:opacity-10">
                            <img
                                src={wallet.logoUrl}
                                alt={`${wallet.name} Logo`}
                                className="w-full h-full object-contain drop-shadow-lg"
                            />
                        </div>

                        {/* Text Content */}
                        <h3 className="text-xl font-bold text-white mb-2 group-hover:text-primary transition-colors">
                            {wallet.name}
                        </h3>
                        <p className="text-sm text-gray-400 mb-4 group-hover:text-gray-300 transition-colors">
                            {wallet.description}
                        </p>

                        {/* Hover Overlay: Supported Networks */}
                        <div className="absolute inset-0 bg-black/95 backdrop-blur-sm flex flex-col items-center justify-center p-6 opacity-0 group-hover:opacity-100 transition-all duration-300 translate-y-4 group-hover:translate-y-0 z-20">
                            <h4 className="text-sm font-bold text-white mb-3 border-b border-white/20 pb-1 w-full text-center">
                                Supported Networks
                            </h4>
                            <div className="flex flex-wrap justify-center gap-2">
                                {wallet.networks.map((net) => (
                                    <span
                                        key={net}
                                        className="text-xs px-2 py-1 rounded-full bg-white/10 text-gray-300 border border-white/5"
                                    >
                                        {net}
                                    </span>
                                ))}
                            </div>
                            <div className="mt-4 flex items-center text-primary text-xs font-bold">
                                Visit Website <ExternalLink className="w-3 h-3 ml-1" />
                            </div>
                        </div>
                    </div>
                </a>
            ))}
        </div>
    );
};
