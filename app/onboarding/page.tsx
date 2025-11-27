import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { Card } from "@/components/ui/Card";
import Image from "next/image";
import { GraduationCap, ArrowLeftRight, Wallet, ArrowRight } from "lucide-react";

export default function OnboardingPage() {
    const steps = [
        {
            title: "1. Concept",
            description: "Understand the basics of blockchain, DeFi, and why on-chain finance matters.",
            href: "/onboarding/concept",
            icon: GraduationCap,
        },
        {
            title: "2. Exchange",
            description: "How to choose and sign up for a Centralized Exchange (CEX) to buy your first crypto.",
            href: "/onboarding/exchange",
            icon: ArrowLeftRight,
        },
        {
            title: "3. Wallet",
            description: "Setting up a self-custodial wallet like MetaMask or Phantom to take control of your assets.",
            href: "/onboarding/wallet",
            icon: Wallet,
        },
        {
            title: "4. Transfer",
            description: "Step-by-step guide to withdrawing funds from an exchange to your on-chain wallet.",
            href: "/onboarding/transfer",
            icon: ArrowRight,
        },
    ];

    return (
        <div className="min-h-screen bg-black">
            <Section>
                <Container>
                    <div className="mb-16 text-center">
                        <h1 className="text-4xl font-bold text-white sm:text-5xl">
                            Onboarding <span className="text-primary">Guide</span>
                        </h1>
                        <p className="mt-4 text-lg text-gray-400 max-w-2xl mx-auto">
                            Master the essentials of the on-chain world. Follow these four steps to go from zero to on-chain native.
                        </p>
                        <div className="mt-12 overflow-hidden rounded-2xl border border-white/10 bg-white/5">
                            <Image
                                src="/images/onboarding-hero.png"
                                alt="Custody vs Non-Custody"
                                width={1200}
                                height={675}
                                className="w-full object-cover"
                                unoptimized
                            />
                        </div>
                    </div>

                    <div className="grid gap-8 md:grid-cols-2">
                        {steps.map((step) => (
                            <Card
                                key={step.title}
                                title={step.title}
                                description={step.description}
                                href={step.href}
                                className="h-full"
                            />
                        ))}
                    </div>
                </Container>
            </Section>
        </div>
    );
}
