import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { notFound } from "next/navigation";

// This would typically come from a CMS or markdown files. 
// For this MVP, we'll hardcode the content map.
const guides = {
    concept: {
        title: "1. Concept: Understanding On-Chain",
        content: (
            <>
                <p className="mb-6 text-lg text-gray-300">
                    "On-chain" refers to transactions and activities that occur directly on a blockchain network. Unlike centralized exchanges (CEX) where trading happens on an internal database, on-chain activities are recorded on the public ledger.
                </p>
                <h3 className="text-2xl font-bold text-white mb-4">Why Go On-Chain?</h3>
                <ul className="list-disc pl-6 space-y-2 text-gray-300 mb-6">
                    <li><strong>Self-Custody:</strong> You truly own your assets. "Not your keys, not your coins."</li>
                    <li><strong>DeFi Access:</strong> Access high-yield savings, lending, and borrowing protocols not available on exchanges.</li>
                    <li><strong>Airdrops:</strong> Many projects reward early on-chain users with free tokens.</li>
                    <li><strong>Transparency:</strong> Every transaction is verifiable.</li>
                </ul>
            </>
        ),
    },
    exchange: {
        title: "2. Exchange: Your Gateway",
        content: (
            <>
                <p className="mb-6 text-lg text-gray-300">
                    To get started, you need to convert fiat currency (KRW, USD) into cryptocurrency. This is done through a Centralized Exchange (CEX).
                </p>
                <h3 className="text-2xl font-bold text-white mb-4">Recommended Exchanges</h3>
                <ul className="list-disc pl-6 space-y-2 text-gray-300 mb-6">
                    <li><strong>Upbit / Bithumb (Korea):</strong> Best for KRW on-ramping.</li>
                    <li><strong>Binance / Bybit (Global):</strong> Best for liquidity and accessing a wide range of tokens.</li>
                </ul>
                <div className="bg-white/5 p-6 rounded-xl border border-white/10 mb-6">
                    <h4 className="text-primary font-bold mb-2">💡 Pro Tip</h4>
                    <p className="text-sm text-gray-400">
                        Always enable 2FA (Google Authenticator) on your exchange accounts for maximum security.
                    </p>
                </div>
            </>
        ),
    },
    wallet: {
        title: "3. Wallet: Your Digital Vault",
        content: (
            <>
                <p className="mb-6 text-lg text-gray-300">
                    A Web3 wallet is your identity and bank account in the on-chain world. It stores your private keys, which allow you to approve transactions.
                </p>
                <h3 className="text-2xl font-bold text-white mb-4">Setting Up MetaMask</h3>
                <ol className="list-decimal pl-6 space-y-4 text-gray-300 mb-6">
                    <li>Download the browser extension from <a href="https://metamask.io" target="_blank" className="text-primary hover:underline">metamask.io</a>.</li>
                    <li>Click "Create a new wallet".</li>
                    <li><strong>IMPORTANT:</strong> Write down your Secret Recovery Phrase (12 words) on paper. NEVER share this with anyone or type it into a website other than your wallet.</li>
                    <li>Confirm your phrase to finish setup.</li>
                </ol>
            </>
        ),
    },
    transfer: {
        title: "4. Transfer: Moving Funds",
        content: (
            <>
                <p className="mb-6 text-lg text-gray-300">
                    Now that you have crypto on an exchange and a personal wallet, it's time to move your funds on-chain.
                </p>
                <h3 className="text-2xl font-bold text-white mb-4">The Withdrawal Process</h3>
                <ol className="list-decimal pl-6 space-y-4 text-gray-300 mb-6">
                    <li>Open your wallet (e.g., MetaMask) and copy your address (starts with 0x...).</li>
                    <li>Go to the "Withdraw" section of your exchange.</li>
                    <li>Select the network (e.g., Ethereum, Arbitrum, Optimism). <strong>Ensure the network matches what you want to use!</strong></li>
                    <li>Paste your wallet address and enter the amount.</li>
                    <li>Confirm the transaction with 2FA.</li>
                </ol>
                <div className="bg-red-500/10 p-6 rounded-xl border border-red-500/20 mb-6">
                    <h4 className="text-red-500 font-bold mb-2">⚠️ Warning</h4>
                    <p className="text-sm text-gray-300">
                        Sending funds to the wrong address or network can result in permanent loss. Always send a small test amount first.
                    </p>
                </div>
            </>
        ),
    },
};

type GuideSlug = keyof typeof guides;

export default async function GuidePage({
    params,
}: {
    params: Promise<{ slug: string }>;
}) {
    const slug = (await params).slug as GuideSlug;
    const guide = guides[slug];

    if (!guide) {
        notFound();
    }

    return (
        <div className="min-h-screen bg-black">
            <Section>
                <Container>
                    <Link
                        href="/onboarding"
                        className="mb-8 inline-flex items-center text-sm text-gray-400 hover:text-primary transition-colors"
                    >
                        <ArrowLeft className="mr-2 h-4 w-4" />
                        Back to Onboarding
                    </Link>

                    <article className="mx-auto max-w-3xl">
                        <h1 className="mb-8 text-4xl font-bold text-white sm:text-5xl">
                            {guide.title}
                        </h1>

                        <div className="prose prose-invert prose-lg max-w-none">
                            {guide.content}
                        </div>
                    </article>
                </Container>
            </Section>
        </div>
    );
}
