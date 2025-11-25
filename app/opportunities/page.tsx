import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { Card } from "@/components/ui/Card";

export default function OpportunitiesPage() {
    const opportunities = [
        {
            title: "Hyperliquid Staking",
            description: "Earn rewards by participating in the Hyperliquid ecosystem. A deep dive into the mechanics and potential returns.",
            category: "DeFi",
            date: "Nov 20, 2025",
            href: "/opportunities/hyperliquid-staking",
        },
        {
            title: "Solana NFT Arbitrage",
            description: "Strategies for identifying and capitalizing on price discrepancies across Solana marketplaces.",
            category: "NFT",
            date: "Nov 18, 2025",
            href: "/opportunities/solana-nft-arbitrage",
        },
        {
            title: "Layer Zero Airdrop Guide",
            description: "Maximize your eligibility for the upcoming Layer Zero airdrop with this comprehensive checklist.",
            category: "Airdrop",
            date: "Nov 15, 2025",
            href: "/opportunities/layer-zero-airdrop",
        },
        {
            title: "Base Ecosystem Yields",
            description: "Exploring the highest APY opportunities on the Base L2 network. Liquidity pools and lending protocols.",
            category: "DeFi",
            date: "Nov 10, 2025",
            href: "/opportunities/base-ecosystem",
        },
    ];

    return (
        <div className="min-h-screen bg-black">
            <Section>
                <Container>
                    <div className="mb-16">
                        <h1 className="text-4xl font-bold text-white sm:text-5xl">
                            Investment <span className="text-primary">Opportunities</span>
                        </h1>
                        <p className="mt-4 text-lg text-gray-400">
                            Curated strategies and alpha for the on-chain investor.
                        </p>
                    </div>

                    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                        {opportunities.map((opp) => (
                            <Card
                                key={opp.title}
                                {...opp}
                            />
                        ))}
                    </div>
                </Container>
            </Section>
        </div>
    );
}
