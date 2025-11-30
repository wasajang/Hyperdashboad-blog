import React from 'react';
import { Building2, ArrowRight, Wallet, Key, Shield, Lock, Ghost, Smartphone, FileText, Hash } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export const ExchangeToWalletViz = () => {
    return (
        <div className="w-full h-full bg-black/50 flex flex-col items-center justify-center p-6 relative overflow-hidden">
            {/* Background Elements */}
            <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 to-purple-500/10" />

            <div className="relative z-10 flex items-center justify-between w-full max-w-lg">
                {/* CEX */}
                <div className="flex flex-col items-center gap-2">
                    <div className="w-16 h-16 rounded-xl bg-blue-500/20 border border-blue-500/50 flex items-center justify-center shadow-[0_0_15px_rgba(59,130,246,0.3)]">
                        <Building2 className="w-8 h-8 text-blue-400" />
                    </div>
                    <span className="text-sm font-bold text-blue-200">Exchange (CEX)</span>
                    <span className="text-xs text-blue-400/60">KRW / USD</span>
                </div>

                {/* Flow Arrow */}
                <div className="flex-1 flex items-center justify-center px-4">
                    <div className="h-[2px] w-full bg-gradient-to-r from-blue-500/50 to-purple-500/50 relative">
                        <div className="absolute right-0 top-1/2 -translate-y-1/2">
                            <ArrowRight className="w-5 h-5 text-purple-400" />
                        </div>
                        {/* Animated particle */}
                        <div className="absolute top-1/2 -translate-y-1/2 w-2 h-2 bg-white rounded-full shadow-[0_0_10px_white] animate-[moveRight_2s_infinite_linear]" />
                    </div>
                </div>

                {/* Wallets */}
                <div className="flex flex-col gap-3">
                    {/* Phantom */}
                    <div className="flex items-center gap-3 p-2 rounded-lg bg-purple-500/10 border border-purple-500/30 w-32">
                        <Ghost className="w-5 h-5 text-purple-400" />
                        <span className="text-xs font-bold text-purple-200">Phantom</span>
                    </div>
                    {/* MetaMask */}
                    <div className="flex items-center gap-3 p-2 rounded-lg bg-orange-500/10 border border-orange-500/30 w-32">
                        <div className="w-5 h-5 relative flex items-center justify-center">
                            <div className="absolute inset-0 bg-orange-500/20 rotate-45 rounded-sm" />
                            <span className="relative text-[10px] font-bold text-orange-400">M</span>
                        </div>
                        <span className="text-xs font-bold text-orange-200">MetaMask</span>
                    </div>
                    {/* Rabby */}
                    <div className="flex items-center gap-3 p-2 rounded-lg bg-indigo-500/10 border border-indigo-500/30 w-32">
                        <Wallet className="w-5 h-5 text-indigo-400" />
                        <span className="text-xs font-bold text-indigo-200">Rabby</span>
                    </div>
                </div>
            </div>

            <style jsx>{`
                @keyframes moveRight {
                    0% { left: 0; opacity: 0; }
                    10% { opacity: 1; }
                    90% { opacity: 1; }
                    100% { left: 100%; opacity: 0; }
                }
            `}</style>
        </div>
    );
};

export const WalletSecurityViz = () => {
    const [activeStep, setActiveStep] = React.useState<number | null>(null);

    const steps = [
        {
            id: 1,
            title: "Mnemonic",
            subTitle: "Master Key",
            icon: <FileText className="w-8 h-8 text-blue-400" />,
            color: "blue",
            desc: {
                ko: "12개 또는 24개의 단어. 이것만 있으면 모든 지갑과 계정을 복구할 수 있는 마스터 키입니다.",
                en: "12 or 24 words. This is the master key that can recover all wallets and accounts."
            },
            detail: "Seed Phrase (12/24 Words)",
            image: "/images/onboarding/mnemonic_card.png"
        },
        {
            id: 2,
            title: "Private Key",
            subTitle: "Sub Key",
            icon: <Key className="w-8 h-8 text-amber-400" />,
            color: "amber",
            desc: {
                ko: "니모닉에서 파생된 특정 체인/계정의 비밀번호입니다. 니모닉이 있으면 언제든 다시 만들 수 있습니다.",
                en: "The password for a specific chain/account derived from the mnemonic. It can be regenerated anytime if you have the mnemonic."
            },
            detail: "Derived from Mnemonic",
            image: "/images/onboarding/private_key_ui.png"
        },
        {
            id: 3,
            title: "Wallet App",
            subTitle: "Tool",
            icon: <Wallet className="w-8 h-8 text-purple-400" />,
            color: "purple",
            desc: {
                ko: "키를 저장하고 서명하는 도구입니다. 앱을 삭제해도 키만 있으면 자산은 안전합니다.",
                en: "A tool to store keys and sign transactions. Even if you delete the app, your assets are safe as long as you have the key."
            },
            detail: "Stores the Key",
            image: "/images/onboarding/wallet_app_logos.png"
        },
        {
            id: 4,
            title: "Address",
            subTitle: "Account",
            icon: <Hash className="w-8 h-8 text-emerald-400" />,
            color: "emerald",
            desc: {
                ko: "개인 키에서 생성된 공개 계좌 번호입니다. 남들에게 보여줘도 안전합니다.",
                en: "Public account number generated from the private key. It is safe to share with others."
            },
            detail: "Public Account Number",
            image: "/images/onboarding/wallet_address_ui.png"
        }
    ];

    return (
        <div className="w-full flex flex-col gap-8 p-6 bg-black/50 rounded-xl border border-white/10">
            {/* Top Flow */}
            <div className="flex justify-between items-start relative">
                {/* Connecting Line */}
                <div className="absolute top-8 left-0 w-full h-[2px] bg-gradient-to-r from-blue-500/20 via-purple-500/20 to-emerald-500/20 -z-10" />

                {steps.map((step, index) => (
                    <div 
                        key={step.id}
                        className="flex flex-col items-center gap-4 group cursor-pointer relative z-10"
                        onMouseEnter={() => setActiveStep(step.id)}
                        onMouseLeave={() => setActiveStep(null)}
                    >
                        {/* Icon Circle */}
                        <div className={`
                            w-16 h-16 rounded-full border-2 flex items-center justify-center bg-black transition-all duration-300
                            ${activeStep === step.id 
                                ? `border-${step.color}-500 shadow-[0_0_20px_rgba(var(--${step.color}-rgb),0.5)] scale-110` 
                                : `border-${step.color}-500/30 hover:border-${step.color}-500/70`
                            }
                        `}>
                            {step.icon}
                        </div>

                        {/* Text Info */}
                        <div className="text-center">
                            <h4 className={`font-bold text-lg ${activeStep === step.id ? 'text-white' : 'text-gray-400'} transition-colors`}>
                                {step.id}. {step.title}
                            </h4>
                            <span className="text-xs text-gray-500">{step.detail}</span>
                        </div>
                    </div>
                ))}
            </div>

            {/* Bottom Detail Card */}
            <div className="h-48 relative">
                <AnimatePresence mode="wait">
                    {activeStep ? (
                        <motion.div
                            key={activeStep}
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -10 }}
                            className={`
                                absolute inset-0 rounded-xl border p-6 flex items-center gap-6
                                border-${steps[activeStep - 1].color}-500/30 bg-${steps[activeStep - 1].color}-500/5
                            `}
                        >
                            {/* Image Section */}
                            <div className="w-1/3 h-full rounded-lg overflow-hidden border border-white/10 shadow-lg shrink-0">
                                <img 
                                    src={steps[activeStep - 1].image} 
                                    alt={steps[activeStep - 1].title} 
                                    className="w-full h-full object-cover"
                                />
                            </div>

                            {/* Text Section */}
                            <div className="flex-1">
                                <div className="flex items-center gap-3 mb-3">
                                    <span className={`text-${steps[activeStep - 1].color}-400 font-bold text-xl`}>
                                        {steps[activeStep - 1].id}. {steps[activeStep - 1].title} 
                                        <span className="text-sm opacity-70 ml-2">({steps[activeStep - 1].subTitle})</span>
                                    </span>
                                </div>
                                <p className="text-gray-300 leading-relaxed text-lg">
                                    {steps[activeStep - 1].desc.ko}
                                </p>
                            </div>
                        </motion.div>
                    ) : (
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            className="absolute inset-0 flex items-center justify-center text-gray-600 border border-white/5 rounded-xl bg-white/5"
                        >
                            <p>각 아이콘에 마우스를 올려 상세 설명을 확인하세요.</p>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </div>
    );
};
