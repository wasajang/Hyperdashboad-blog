import { Container } from "@/components/ui/Container";

export function Footer() {
    return (
        <footer className="border-t border-white/10 bg-black py-12">
            <Container>
                <div className="flex flex-col items-center justify-between gap-6 md:flex-row">
                    <div className="flex flex-col gap-2">
                        <span className="text-lg font-bold text-white">
                            Wasajang<span className="text-primary">.Blog</span>
                        </span>
                        <p className="text-sm text-gray-400">
                            Your gateway to on-chain opportunities.
                        </p>
                    </div>
                    <div className="flex gap-6 text-sm text-gray-400">
                        <p>&copy; {new Date().getFullYear()} Wasajang. All rights reserved.</p>
                    </div>
                </div>
            </Container>
        </footer>
    );
}
