"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { useLanguage } from "@/components/providers/LanguageContext";
import { translations } from "@/data/translations";

export function Hero() {
    const { language } = useLanguage();
    const t = translations[language].hero;

    return (
        <div className="relative overflow-hidden border-b border-white/10 bg-black py-20 sm:py-32">
            <div className="absolute inset-0 bg-[url('/grid.svg')] bg-center [mask-image:linear-gradient(180deg,white,rgba(255,255,255,0))]" />
            <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-transparent to-accent/5" />

            <Container className="relative">
                <div className="mx-auto max-w-2xl text-center">
                    <div className="mb-8 flex justify-center">
                        <div className="rounded-full border border-primary/30 bg-primary/10 px-3 py-1 text-sm text-primary backdrop-blur-sm">
                            {t.badge}
                        </div>
                    </div>
                    <h1 className="text-4xl font-bold tracking-tight text-white sm:text-6xl">
                        {t.titlePrefix} <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary">{t.titleHighlight}</span>
                        <br />
                        {t.titleSuffix}
                    </h1>
                    <p className="mt-6 text-lg leading-8 text-gray-300">
                        {t.description}
                    </p>
                    <div className="mt-10 flex items-center justify-center gap-x-6">
                        <Link
                            href="/onboarding"
                            className="group flex items-center gap-2 rounded-lg bg-primary px-6 py-3 text-sm font-semibold text-black transition-all hover:bg-primary/90 hover:shadow-[0_0_20px_rgba(0,255,157,0.3)]"
                        >
                            {t.startOnboarding}
                            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                        </Link>
                        <Link
                            href="/opportunities"
                            className="text-sm font-semibold leading-6 text-white hover:text-primary transition-colors"
                        >
                            {t.viewOpportunities} <span aria-hidden="true">→</span>
                        </Link>
                    </div>
                </div>
            </Container>
        </div>
    );
}
