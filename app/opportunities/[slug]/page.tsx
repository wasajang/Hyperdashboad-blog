import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import Link from "next/link";
import { ArrowLeft, Calendar, Tag } from "lucide-react";
import { notFound } from "next/navigation";

// Mock data for blog posts
const posts = {
    "hyperliquid-staking": {
        title: "Hyperliquid Staking: A Deep Dive",
        date: "Nov 20, 2025",
        category: "DeFi",
        content: (
            <>
                <p className="lead text-xl text-gray-300 mb-8">
                    Hyperliquid has emerged as a leading perpetual DEX on its own L1. Staking HYPE tokens not only secures the network but also offers attractive yields.
                </p>
                <h2>Why Hyperliquid?</h2>
                <p>
                    Unlike other DEXs, Hyperliquid runs on a purpose-built L1 optimized for high-frequency trading. This means zero gas fees for trading and instant finality.
                </p>
                <h2>Staking Mechanics</h2>
                <p>
                    Staking involves locking your HYPE tokens with a validator. The current APR is hovering around 15-20%, paid out in USDC and HYPE.
                </p>
                <div className="bg-white/5 p-6 rounded-xl border border-white/10 my-8">
                    <h3 className="text-primary mt-0">Risk Assessment</h3>
                    <p className="mb-0">
                        <strong>Smart Contract Risk:</strong> Low (Audited by multiple firms)<br />
                        <strong>Impermanent Loss:</strong> None (Single-sided staking)<br />
                        <strong>Lock-up Period:</strong> 14 days unbonding
                    </p>
                </div>
                <h2>Step-by-Step Guide</h2>
                <ol>
                    <li>Bridge USDC to Hyperliquid L1 via the official bridge.</li>
                    <li>Buy HYPE on the internal spot market.</li>
                    <li>Navigate to the "Earn" tab and select a validator.</li>
                    <li>Delegate your tokens.</li>
                </ol>
            </>
        ),
    },
    "solana-nft-arbitrage": {
        title: "Solana NFT Arbitrage Strategies",
        date: "Nov 18, 2025",
        category: "NFT",
        content: (
            <>
                <p className="lead text-xl text-gray-300 mb-8">
                    With the resurgence of Solana, NFT volume has exploded. Price discrepancies between Magic Eden, Tensor, and Sniper create arbitrage opportunities.
                </p>
                <h2>The Strategy</h2>
                <p>
                    The core strategy involves monitoring floor prices across marketplaces. Often, a listing on Tensor might be priced lower than the floor on Magic Eden due to aggregation delays.
                </p>
            </>
        ),
    },
    "layer-zero-airdrop": {
        title: "Layer Zero Airdrop Checklist",
        date: "Nov 15, 2025",
        category: "Airdrop",
        content: (
            <>
                <p className="lead text-xl text-gray-300 mb-8">
                    The snapshot is rumored to be close. Here is the ultimate checklist to ensure you qualify for the $ZRO airdrop.
                </p>
                <h2>Essential Actions</h2>
                <ul>
                    <li>Bridge funds across at least 5 different chains (Optimism, Arbitrum, Polygon, Avalanche, BSC).</li>
                    <li>Use Stargate Finance to provide liquidity.</li>
                    <li>Maintain active volume over consecutive months.</li>
                </ul>
            </>
        ),
    },
    "base-ecosystem": {
        title: "Base Ecosystem Yields",
        date: "Nov 10, 2025",
        category: "DeFi",
        content: (
            <>
                <p className="lead text-xl text-gray-300 mb-8">
                    Coinbase's L2, Base, is attracting massive liquidity. We explore the top yield farms currently available.
                </p>
                <h2>Top Protocols</h2>
                <p>
                    Aerodrome is the leading liquidity layer. Providing liquidity for stablecoin pairs (USDC/USDbC) is currently yielding &gt;10%.
                </p>
            </>
        ),
    },
};

type PostSlug = keyof typeof posts;

export default async function OpportunityPage({
    params,
}: {
    params: Promise<{ slug: string }>;
}) {
    const slug = (await params).slug as PostSlug;
    const post = posts[slug];

    if (!post) {
        notFound();
    }

    return (
        <div className="min-h-screen bg-black">
            <Section>
                <Container>
                    <Link
                        href="/opportunities"
                        className="mb-8 inline-flex items-center text-sm text-gray-400 hover:text-primary transition-colors"
                    >
                        <ArrowLeft className="mr-2 h-4 w-4" />
                        Back to Opportunities
                    </Link>

                    <article className="mx-auto max-w-3xl">
                        <div className="mb-8 flex items-center gap-4 text-sm text-gray-400">
                            <span className="flex items-center gap-1">
                                <Calendar className="h-4 w-4" />
                                {post.date}
                            </span>
                            <span className="flex items-center gap-1 text-primary">
                                <Tag className="h-4 w-4" />
                                {post.category}
                            </span>
                        </div>

                        <h1 className="mb-8 text-4xl font-bold text-white sm:text-5xl">
                            {post.title}
                        </h1>

                        <div className="prose prose-invert prose-lg max-w-none prose-headings:text-white prose-a:text-primary hover:prose-a:text-primary/80">
                            {post.content}
                        </div>
                    </article>
                </Container>
            </Section>
        </div>
    );
}
