"use client";

import { LanguageProvider } from "@/components/providers/LanguageContext";

export function Providers({ children }: { children: React.ReactNode }) {
    return <LanguageProvider>{children}</LanguageProvider>;
}
