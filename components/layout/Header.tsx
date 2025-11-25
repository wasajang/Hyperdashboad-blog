"use client";

import Link from "next/link";
import { useState } from "react";
import { Menu, X, Wallet } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { LanguageSwitcher } from "@/components/ui/LanguageSwitcher";
import { useLanguage } from "@/components/providers/LanguageContext";
import { translations } from "@/data/translations";

export function Header() {
    const [isOpen, setIsOpen] = useState(false);
    const { language } = useLanguage();
    const t = translations[language].nav;

    const navigation = [
        { name: t.home, href: "/" },
        { name: t.onboarding, href: "/onboarding" },
        { name: t.opportunities, href: "/opportunities" },
    ];

    return (
        <header className="fixed top-0 left-0 right-0 z-50 border-b border-white/10 bg-black/50 backdrop-blur-md">
            <Container>
                <div className="flex h-16 items-center justify-between">
                    <div className="flex items-center gap-2">
                        <Link href="/" className="flex items-center gap-2">
                            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary/20 text-primary">
                                <Wallet className="h-5 w-5" />
                            </div>
                            <span className="text-xl font-bold tracking-tight text-white">
                                Wasajang<span className="text-primary">.Blog</span>
                            </span>
                        </Link>
                    </div>

                    {/* Desktop Navigation */}
                    <nav className="hidden md:flex items-center gap-8">
                        {navigation.map((item) => (
                            <Link
                                key={item.href}
                                href={item.href}
                                className="text-sm font-medium text-gray-300 transition-colors hover:text-primary"
                            >
                                {item.name}
                            </Link>
                        ))}
                        <LanguageSwitcher />
                    </nav>

                    {/* Mobile Menu Button */}
                    <div className="flex items-center gap-4 md:hidden">
                        <LanguageSwitcher />
                        <button
                            className="p-2 text-gray-300 hover:text-white"
                            onClick={() => setIsOpen(!isOpen)}
                        >
                            {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
                        </button>
                    </div>
                </div>
            </Container>

            {/* Mobile Navigation */}
            {isOpen && (
                <div className="md:hidden border-t border-white/10 bg-black/90 backdrop-blur-xl">
                    <Container className="py-4">
                        <div className="flex flex-col gap-4">
                            {navigation.map((item) => (
                                <Link
                                    key={item.href}
                                    href={item.href}
                                    className="text-base font-medium text-gray-300 hover:text-primary"
                                    onClick={() => setIsOpen(false)}
                                >
                                    {item.name}
                                </Link>
                            ))}
                        </div>
                    </Container>
                </div>
            )}
        </header>
    );
}
