import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

interface CardProps {
    title: string;
    description: string;
    href: string;
    category?: string;
    date?: string;
    className?: string;
}

export function Card({ title, description, href, category, date, className = "" }: CardProps) {
    return (
        <Link
            href={href}
            className={`group relative flex flex-col overflow-hidden rounded-2xl border border-white/10 bg-card-bg p-6 transition-all hover:border-primary/50 hover:bg-white/5 hover:shadow-[0_0_30px_rgba(0,255,157,0.1)] ${className}`}
        >
            <div className="mb-4 flex items-center justify-between">
                {category && (
                    <span className="rounded-full bg-white/10 px-3 py-1 text-xs font-medium text-primary">
                        {category}
                    </span>
                )}
                {date && <span className="text-xs text-gray-500">{date}</span>}
            </div>

            <h3 className="mb-2 text-xl font-bold text-white group-hover:text-primary transition-colors">
                {title}
            </h3>

            <p className="mb-6 flex-1 text-sm text-gray-400">
                {description}
            </p>

            <div className="flex items-center text-sm font-medium text-primary opacity-0 transition-opacity group-hover:opacity-100">
                Read more <ArrowUpRight className="ml-1 h-4 w-4" />
            </div>
        </Link>
    );
}
