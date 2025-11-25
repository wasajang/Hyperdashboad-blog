import React from "react";

interface SectionProps {
    children: React.ReactNode;
    className?: string;
    id?: string;
}

export function Section({ children, className = "", id }: SectionProps) {
    return (
        <section id={id} className={`py-12 md:py-20 ${className}`}>
            {children}
        </section>
    );
}
