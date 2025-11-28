"use client";

import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { notFound, useParams } from "next/navigation";
import { useLanguage } from "@/components/providers/LanguageContext";
import { getGuideContent } from "@/data/guide_content";
import { use } from "react";

type GuideSlug = "concept" | "exchange" | "wallet" | "transfer";

export default function GuidePage() {
    const params = useParams();
    const slug = params.slug as GuideSlug;
    const { language } = useLanguage();

    // Get content based on current language
    const guides = getGuideContent(language);
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
                        {language === 'ko' ? "온보딩으로 돌아가기" : "Back to Onboarding"}
                    </Link>

                    <article className={`mx-auto ${slug === 'exchange' ? 'max-w-6xl' : 'max-w-3xl'}`}>
                        <div className={slug === 'exchange' ? 'max-w-3xl mx-auto' : ''}>
                            <h1 className="mb-8 text-4xl font-bold text-white sm:text-5xl">
                                {guide.title}
                            </h1>
                        </div>

                        <div className="prose prose-invert prose-lg max-w-none">
                            {guide.content}
                        </div>
                    </article>
                </Container>
            </Section>
        </div>
    );
}
