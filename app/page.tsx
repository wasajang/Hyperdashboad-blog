"use client";

import { Hero } from "@/components/ui/Hero";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { Card } from "@/components/ui/Card";
import { TokenomicsDataViz } from "@/components/ui/TokenomicsDataViz";
import Link from "next/link";
import { ArrowRight, BookOpen, Wallet, ArrowLeftRight, GraduationCap } from "lucide-react";
import { useLanguage } from "@/components/providers/LanguageContext";
import { translations } from "@/data/translations";

export default function Home() {
  const { language } = useLanguage();
  const t = translations[language];

  const onboardingSteps = [
    {
      title: t.onboarding.steps.concept.title,
      description: t.onboarding.steps.concept.description,
      icon: GraduationCap,
      href: "/onboarding/concept",
    },
    {
      title: t.onboarding.steps.exchange.title,
      description: t.onboarding.steps.exchange.description,
      icon: ArrowLeftRight,
      href: "/onboarding/exchange",
    },
    {
      title: t.onboarding.steps.wallet.title,
      description: t.onboarding.steps.wallet.description,
      icon: Wallet,
      href: "/onboarding/wallet",
    },
    {
      title: t.onboarding.steps.transfer.title,
      description: t.onboarding.steps.transfer.description,
      icon: ArrowRight,
      href: "/onboarding/transfer",
    },
  ];

  const featuredOpportunities = [
    {
      title: t.opportunities.items.hyperliquid.title,
      description: t.opportunities.items.hyperliquid.description,
      category: "DeFi",
      date: "Nov 20, 2025",
      href: "/opportunities/hyperliquid-staking",
    },
    {
      title: t.opportunities.items.nftArbitrage.title,
      description: t.opportunities.items.nftArbitrage.description,
      category: "NFT",
      date: "Nov 18, 2025",
      href: "/opportunities/solana-nft-arbitrage",
    },
    {
      title: t.opportunities.items.layerZero.title,
      description: t.opportunities.items.layerZero.description,
      category: "Airdrop",
      date: "Nov 15, 2025",
      href: "/opportunities/layer-zero-airdrop",
    },
  ];

  return (
    <div className="flex flex-col min-h-screen">
      <Hero />

      <TokenomicsDataViz />

      <Section id="onboarding" className="bg-black">
        <Container>
          <div className="mb-12 flex items-end justify-between">
            <div>
              <h2 className="text-3xl font-bold text-white">{t.onboarding.title}</h2>
              <p className="mt-2 text-gray-400">{t.onboarding.subtitle}</p>
            </div>
            <Link href="/onboarding" className="hidden text-sm font-semibold text-primary hover:text-primary/80 sm:block">
              {t.onboarding.viewFull} <span aria-hidden="true">→</span>
            </Link>
          </div>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {onboardingSteps.map((step) => (
              <Link
                key={step.title}
                href={step.href}
                className="group relative overflow-hidden rounded-2xl border border-white/10 bg-white/5 p-6 transition-all hover:bg-white/10 hover:shadow-[0_0_30px_rgba(0,255,157,0.05)]"
              >
                <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10 text-primary group-hover:bg-primary group-hover:text-black transition-colors">
                  <step.icon className="h-6 w-6" />
                </div>
                <h3 className="mb-2 text-lg font-bold text-white">{step.title}</h3>
                <p className="text-sm text-gray-400">{step.description}</p>
              </Link>
            ))}
          </div>

          <div className="mt-8 sm:hidden">
            <Link href="/onboarding" className="text-sm font-semibold text-primary hover:text-primary/80">
              {t.onboarding.viewFull} <span aria-hidden="true">→</span>
            </Link>
          </div>
        </Container>
      </Section>

      <Section id="opportunities" className="bg-black/50">
        <Container>
          <div className="mb-12 flex items-end justify-between">
            <div>
              <h2 className="text-3xl font-bold text-white">{t.opportunities.title}</h2>
              <p className="mt-2 text-gray-400">{t.opportunities.subtitle}</p>
            </div>
            <Link href="/opportunities" className="hidden text-sm font-semibold text-primary hover:text-primary/80 sm:block">
              {t.opportunities.viewAll} <span aria-hidden="true">→</span>
            </Link>
          </div>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {featuredOpportunities.map((opp) => (
              <Card
                key={opp.title}
                {...opp}
              />
            ))}
          </div>

          <div className="mt-8 sm:hidden">
            <Link href="/opportunities" className="text-sm font-semibold text-primary hover:text-primary/80">
              {t.opportunities.viewAll} <span aria-hidden="true">→</span>
            </Link>
          </div>
        </Container>
      </Section>
    </div>
  );
}
