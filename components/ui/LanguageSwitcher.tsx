"use client";

import { useLanguage } from "@/components/providers/LanguageContext";
import { Globe } from "lucide-react";

export function LanguageSwitcher() {
    const { language, setLanguage } = useLanguage();

    return (
        <div className="flex items-center gap-2">
            <Globe className="h-4 w-4 text-gray-400" />
            <div className="flex rounded-lg bg-white/5 p-1 border border-white/10">
                <button
                    onClick={() => setLanguage("en")}
                    className={`px-3 py-1 text-xs font-medium rounded-md transition-colors ${language === "en"
                            ? "bg-primary text-black"
                            : "text-gray-400 hover:text-white"
                        }`}
                >
                    EN
                </button>
                <button
                    onClick={() => setLanguage("ko")}
                    className={`px-3 py-1 text-xs font-medium rounded-md transition-colors ${language === "ko"
                            ? "bg-primary text-black"
                            : "text-gray-400 hover:text-white"
                        }`}
                >
                    KO
                </button>
            </div>
        </div>
    );
}
