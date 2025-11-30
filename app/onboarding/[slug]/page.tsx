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

    // Define the order of guides
    const GUIDE_ORDER: GuideSlug[] = ['concept', 'exchange', 'wallet', 'transfer'];
    const currentIndex = GUIDE_ORDER.indexOf(slug);

    const prevSlug = currentIndex > 0 ? GUIDE_ORDER[currentIndex - 1] : null;
    const nextSlug = currentIndex < GUIDE_ORDER.length - 1 ? GUIDE_ORDER[currentIndex + 1] : null;

    const prevGuide = prevSlug ? guides[prevSlug] : null;
    const nextGuide = nextSlug ? guides[nextSlug] : null;

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

                        <div className="prose prose-invert prose-lg max-w-none mb-16">
                            {guide.content}
                        </div>

                        {/* Navigation Buttons */}
                        <div className="grid grid-cols-2 gap-4 mt-12 pt-8 border-t border-white/10">
                            <div>
                                {prevGuide && prevSlug ? (
                                    <Link
                                        href={`/onboarding/${prevSlug}`}
                                        className="group block p-4 rounded-xl border border-white/10 hover:border-primary/50 hover:bg-white/5 transition-all"
                                    >
                                        <div className="text-sm text-gray-400 mb-1 group-hover:text-primary transition-colors">
                                            ← {language === 'ko' ? "이전 단계" : "Previous Step"}
                                        </div>
                                        <div className="text-lg font-bold text-white group-hover:text-primary transition-colors line-clamp-1">
                                            {prevGuide.title}
                                        </div>
                                    </Link>
                                ) : (
                                    <div /> // Empty div to maintain grid layout if no prev link
                                )}
                            </div>
                            <div className="text-right">
                                {nextGuide && nextSlug ? (
                                    <Link
                                        href={`/onboarding/${nextSlug}`}
                                        className="group block p-4 rounded-xl border border-white/10 hover:border-primary/50 hover:bg-white/5 transition-all"
                                    >
                                        <div className="text-sm text-gray-400 mb-1 group-hover:text-primary transition-colors">
                                            {language === 'ko' ? "다음 단계" : "Next Step"} →
                                        </div>
                                        <div className="text-lg font-bold text-white group-hover:text-primary transition-colors line-clamp-1">
                                            {nextGuide.title}
                                        </div>
                                    </Link>
                                ) : (
                                    <div />
                                )}
                            </div>
                        </div>
                    </article>
                </Container>
            </Section>
        </div>
    );
}
