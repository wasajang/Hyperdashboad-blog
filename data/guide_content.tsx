import React from 'react';
import { ExchangeFlowViz } from '@/components/ui/ExchangeFlowViz';
import { ExchangeToWalletViz, WalletSecurityViz } from '@/components/onboarding/WalletVisualizations';
import { WalletShowcase } from '@/components/onboarding/WalletShowcase';
import { WalletCreationFlowViz } from '@/components/onboarding/WalletCreationFlowViz';

export const getGuideContent = (language: 'en' | 'ko') => {
    const isKo = language === 'ko';

    return {
        concept: {
            title: isKo ? "1. 개념: 희소성과 유틸리티" : "1. Concept: Scarcity & Utility",
            content: (
                <>
                    {/* Section 1: Fiat vs Crypto */}
                    <div className="mb-12">
                        <h3 className="text-2xl font-bold text-white mb-4">
                            {isKo ? "법정화폐 vs 암호화폐" : "Fiat Money vs. Cryptocurrency"}
                        </h3>
                        <div className="grid md:grid-cols-2 gap-8 items-center mb-6">
                            <div>
                                <p className="text-lg text-gray-300 mb-4">
                                    {isKo ? (
                                        <>
                                            <strong>법정화폐</strong>(USD, KRW 등)는 주로 교환 수단으로 설계되었습니다. 일상적인 거래에는 적합하지만, 보관과 가치 보존을 위해 은행이나 정부 같은 중앙 기관에 의존해야 합니다.
                                        </>
                                    ) : (
                                        <>
                                            <strong>Fiat Money</strong> (like USD or KRW) is primarily designed as a medium of exchange. It works well for daily transactions but relies on centralized institutions (banks, governments) for custody and value preservation.
                                        </>
                                    )}
                                </p>
                                <p className="text-lg text-gray-300">
                                    {isKo ? (
                                        <>
                                            <strong>암호화폐</strong>는 진정한 디지털 소유권의 개념을 도입합니다. <strong>개인 키(Private Keys)</strong>를 직접 보유함으로써 스스로 은행이 될 수 있습니다. 단순히 소비하는 것이 아니라, 오직 나만이 통제할 수 있는 디지털 금고에 자산을 안전하게 소유하는 것입니다.
                                        </>
                                    ) : (
                                        <>
                                            <strong>Cryptocurrency</strong> introduces the concept of true digital ownership. By holding your own <strong>Private Keys</strong>, you become your own bank. It's not just about spending; it's about securely owning assets in a digital vault that only you control.
                                        </>
                                    )}
                                </p>
                            </div>
                            <div className="relative aspect-video rounded-xl overflow-hidden border border-white/10 shadow-2xl">
                                <img
                                    src="/images/onboarding/fiat_vs_crypto.png"
                                    alt="Fiat Money vs Cryptocurrency"
                                    className="object-cover w-full h-full hover:scale-105 transition-transform duration-500"
                                />
                            </div>
                        </div>
                    </div>

                    {/* Section 2: Bitcoin */}
                    <div className="mb-12">
                        <h3 className="text-2xl font-bold text-amber-400 mb-4">
                            {isKo ? "비트코인: 희소성의 가치" : "Bitcoin: The Value of Scarcity"}
                        </h3>
                        <div className="grid md:grid-cols-2 gap-8 items-center mb-6">
                            <div className="order-2 md:order-1 relative aspect-video rounded-xl overflow-hidden border border-amber-500/20 shadow-[0_0_30px_rgba(245,158,11,0.2)]">
                                <img
                                    src="/images/onboarding/bitcoin_scarcity.png"
                                    alt="Bitcoin Scarcity"
                                    className="object-cover w-full h-full hover:scale-105 transition-transform duration-500"
                                />
                            </div>
                            <div className="order-1 md:order-2">
                                <p className="text-lg text-gray-300 mb-4">
                                    {isKo ? (
                                        <>
                                            비트코인은 흔히 <strong>디지털 금</strong>이라고 불립니다. 가장 핵심적인 가치는 바로 <strong>희소성</strong>입니다.
                                        </>
                                    ) : (
                                        <>
                                            Bitcoin is often referred to as <strong>Digital Gold</strong>. Its primary value proposition is <strong>Scarcity</strong>.
                                        </>
                                    )}
                                </p>
                                <ul className="list-disc pl-6 space-y-2 text-gray-300">
                                    {isKo ? (
                                        <>
                                            <li>2,100만 개의 고정된 공급량.</li>
                                            <li>탈중앙화 및 검열 저항성.</li>
                                            <li>디지털 시대의 가치 저장 수단.</li>
                                        </>
                                    ) : (
                                        <>
                                            <li>Fixed supply of 21 million coins.</li>
                                            <li>Decentralized and censorship-resistant.</li>
                                            <li>A store of value in the digital age.</li>
                                        </>
                                    )}
                                </ul>
                            </div>
                        </div>
                    </div>

                    {/* Section 3: Ethereum */}
                    <div className="mb-12">
                        <h3 className="text-2xl font-bold text-blue-400 mb-4">
                            {isKo ? "이더리움: 유틸리티의 가치" : "Ethereum: The Value of Utility"}
                        </h3>
                        <div className="grid md:grid-cols-2 gap-8 items-center mb-6">
                            <div>
                                <p className="text-lg text-gray-300 mb-4">
                                    {isKo ? (
                                        <>
                                            비트코인이 금이라면, 이더리움은 <strong>디지털 석유</strong>입니다. 그 가치는 <strong>유틸리티(사용성)</strong>에서 나옵니다.
                                        </>
                                    ) : (
                                        <>
                                            If Bitcoin is gold, Ethereum is <strong>Digital Oil</strong>. Its primary value comes from <strong>Utility</strong>.
                                        </>
                                    )}
                                </p>
                                <ul className="list-disc pl-6 space-y-2 text-gray-300">
                                    {isKo ? (
                                        <>
                                            <li>스마트 컨트랙트를 통한 프로그래밍 가능한 돈.</li>
                                            <li>탈중앙화 금융(DeFi)과 NFT의 기반.</li>
                                            <li>개발자들이 멈추지 않는 애플리케이션을 만들 수 있게 함.</li>
                                        </>
                                    ) : (
                                        <>
                                            <li>Programmable money via Smart Contracts.</li>
                                            <li>The foundation for Decentralized Finance (DeFi) and NFTs.</li>
                                            <li>Enables developers to build unstoppable applications.</li>
                                        </>
                                    )}
                                </ul>
                            </div>
                            <div className="relative aspect-video rounded-xl overflow-hidden border border-blue-500/20 shadow-[0_0_30px_rgba(59,130,246,0.2)]">
                                <img
                                    src="/images/onboarding/ethereum_utility.png"
                                    alt="Ethereum Utility"
                                    className="object-cover w-full h-full hover:scale-105 transition-transform duration-500"
                                />
                            </div>
                        </div>
                    </div>

                    {/* Section 4: Hyperliquid */}
                    <div className="mb-12">
                        <h3 className="text-2xl font-bold text-emerald-400 mb-4">
                            {isKo ? "하이퍼리퀴드: 희소성 + 유틸리티" : "Hyperliquid: Scarcity + Utility"}
                        </h3>
                        <div className="grid md:grid-cols-2 gap-8 items-center mb-6">
                            <div className="order-2 md:order-1 relative aspect-video rounded-xl overflow-hidden border border-emerald-500/20 shadow-[0_0_30px_rgba(16,185,129,0.2)]">
                                <img
                                    src="/images/onboarding/hyperliquid_value.png"
                                    alt="Hyperliquid Value"
                                    className="object-cover w-full h-full hover:scale-105 transition-transform duration-500"
                                />
                            </div>
                            <div className="order-1 md:order-2">
                                <p className="text-lg text-gray-300 mb-4">
                                    {isKo ? (
                                        <>
                                            하이퍼리퀴드는 두 세계의 장점을 결합한 다음 단계의 진화를 보여줍니다: <strong>희소성 + 유틸리티</strong>.
                                        </>
                                    ) : (
                                        <>
                                            Hyperliquid represents the next evolution, combining the best of both worlds: <strong>Scarcity + Utility</strong>.
                                        </>
                                    )}
                                </p>
                                <ul className="list-disc pl-6 space-y-2 text-gray-300">
                                    {isKo ? (
                                        <>
                                            <li><strong>고성능:</strong> 고빈도 거래를 위해 구축된 L1 블록체인.</li>
                                            <li><strong>리얼 일드(Real Yield):</strong> 거래 수수료에서 수익을 창출하여 토큰에 내재적 가치를 부여.</li>
                                            <li><strong>디플레이션 메커니즘:</strong> 희소 자산처럼 시간이 지날수록 가치가 상승하도록 설계됨.</li>
                                        </>
                                    ) : (
                                        <>
                                            <li><strong>High Performance:</strong> An L1 blockchain built for high-frequency trading.</li>
                                            <li><strong>Real Yield:</strong> Generates revenue from trading fees, giving the token intrinsic utility.</li>
                                            <li><strong>Deflationary Mechanics:</strong> Designed to accrue value over time, similar to scarce assets.</li>
                                        </>
                                    )}
                                </ul>
                            </div>
                        </div>
                    </div>
                </>
            ),
        },
        exchange: {
            title: isKo ? "2. 거래소: 관문" : "2. Exchange: Your Gateway",
            content: (
                <>
                    <div className="max-w-3xl mx-auto">
                        <p className="mb-6 text-lg text-gray-300">
                            {isKo ? "시작하려면 법정화폐(KRW, USD)를 암호화폐로 환전해야 합니다. 이는 중앙화 거래소(CEX)를 통해 이루어집니다." : "To get started, you need to convert fiat currency (KRW, USD) into cryptocurrency. This is done through a Centralized Exchange (CEX)."}
                        </p>
                    </div>

                    <div className="mb-8">
                        <div className="max-w-3xl mx-auto">
                            <h3 className="text-2xl font-bold text-white mb-4">{isKo ? "거래소 전략 지도 (Skill Tree)" : "Exchange Strategy Map (Skill Tree)"}</h3>
                            <p className="text-sm text-gray-400 mb-6">
                                {isKo ? "각 노드를 클릭하여 최적의 경로와 혜택을 확인하세요." : "Click on each node to discover the optimal path and benefits."}
                            </p>
                        </div>
                        <ExchangeFlowViz />
                    </div>

                    <div className="max-w-3xl mx-auto">
                        <div className="bg-white/5 p-6 rounded-xl border border-white/10 mb-6">
                            <h4 className="text-primary font-bold mb-2">💡 Pro Tip</h4>
                            <p className="text-sm text-gray-400 mb-4">
                                {isKo ? "최고의 보안을 위해 거래소 계정에서 항상 2FA(구글 OTP)를 활성화하세요." : "Always enable 2FA (Google Authenticator) on your exchange accounts for maximum security."}
                            </p>
                            <div className="border-t border-white/10 pt-4 mt-4">
                                <h4 className="text-amber-500 font-bold mb-2">🛡️ {isKo ? "다양화의 중요성" : "Importance of Diversification"}</h4>
                                <p className="text-sm text-gray-300">
                                    {isKo ?
                                        "크립토에 온보딩한 이상 중앙화 거래소(CEX)에 너무 의존하지 않아야 합니다. 다양한 거래소를 미리 준비해두어 예기치 못한 사고, 점검, 또는 새로운 투자 기회에 항상 대비하세요." :
                                        "Once onboarded to crypto, do not rely solely on Centralized Exchanges (CEX). Prepare accounts on multiple exchanges to be ready for unexpected outages, maintenance, or new investment opportunities."}
                                </p>
                            </div>
                        </div>
                    </div>
                </>
            ),
        },
        wallet: {
            title: isKo ? "3. 지갑: 디지털 금고" : "3. Wallet: Your Digital Vault",
            content: (
                <>
                    {/* Intro: CEX to Wallet */}
                    <div className="mb-12">
                        <h3 className="text-2xl font-bold text-white mb-4">
                            {isKo ? "거래소에서 개인 지갑으로" : "From Exchange to Personal Wallet"}
                        </h3>
                        <div className="grid md:grid-cols-2 gap-8 items-center mb-6">
                            <div>
                                <p className="text-lg text-gray-300 mb-4">
                                    {isKo ? (
                                        <>
                                            중앙화 거래소(CEX)는 편리하지만, 자산의 진정한 소유권은 거래소에 있습니다. 진정한 '내 돈'이 되려면 <strong>개인 지갑(Personal Wallet)</strong>으로 옮겨야 합니다.
                                        </>
                                    ) : (
                                        <>
                                            Centralized Exchanges (CEX) are convenient, but the exchange holds the real ownership. To truly make it "your money," you must move it to a <strong>Personal Wallet</strong>.
                                        </>
                                    )}
                                </p>
                                <div className="text-gray-300 mb-4">
                                    {isKo ? "대표적인 지갑들을 소개합니다:" : "Here are the leading wallets:"}
                                </div>
                            </div>
                            <div className="relative aspect-video rounded-xl overflow-hidden border border-white/10 shadow-2xl bg-black/50">
                                <ExchangeToWalletViz />
                            </div>
                        </div>

                        {/* Wallet Showcase */}
                        <div className="mt-8">
                            <WalletShowcase />
                        </div>
                    </div>

                    {/* Core Concept: Private Key */}
                    <div className="mb-12">
                        <h3 className="text-2xl font-bold text-amber-400 mb-4">
                            {isKo ? "핵심은 '개인 키'입니다" : "The Core is the 'Private Key'"}
                        </h3>
                        <div className="grid md:grid-cols-2 gap-8 items-center mb-6">
                            <div className="order-2 md:order-1 relative aspect-video rounded-xl overflow-hidden border border-amber-500/20 shadow-[0_0_30px_rgba(245,158,11,0.2)] bg-black/50">
                                <WalletSecurityViz />
                            </div>
                            <div className="order-1 md:order-2">
                                <p className="text-lg text-gray-300 mb-4">
                                    {isKo ? (
                                        <>
                                            지갑 앱(메타마스크 등)은 단지 <strong>껍데기</strong>일 뿐입니다. 본질은 <strong>니모닉(시드 문구)</strong>과 <strong>개인 키(Private Key)</strong>입니다.
                                        </>
                                    ) : (
                                        <>
                                            The wallet app (like MetaMask) is just a <strong>shell</strong>. The reality is the <strong>Mnemonic (Seed Phrase)</strong> and <strong>Private Key</strong>.
                                        </>
                                    )}
                                </p>
                                <div className="bg-red-500/10 p-4 rounded-lg border border-red-500/20">
                                    <h4 className="text-red-500 font-bold mb-2">⚠️ {isKo ? "절대 원칙" : "Golden Rule"}</h4>
                                    <p className="text-sm text-gray-300">
                                        {isKo ? (
                                            <>
                                                이 키를 가진 사람이 자산의 주인입니다. <br />
                                                <strong>절대 누구에게도 보여주지 마세요.</strong> <br />
                                                사진을 찍거나 클라우드에 올리지 말고, 종이에 적어 안전한 곳에 보관하세요.
                                            </>
                                        ) : (
                                            <>
                                                Whoever holds this key owns the assets. <br />
                                                <strong>NEVER show this to anyone.</strong> <br />
                                                Do not take photos or upload to the cloud. Write it on paper and store it safely.
                                            </>
                                        )}
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* New Section: Creation Flow */}
                    <div className="mb-12">
                        <h3 className="text-2xl font-bold text-blue-400 mb-4">
                            {isKo ? "지갑 생성 흐름: 단어에서 주소까지" : "Creation Flow: From Words to Address"}
                        </h3>
                        <p className="text-lg text-gray-300 mb-6">
                            {isKo ? (
                                <>
                                    지갑이 어떻게 만들어지는지 이해하면 왜 니모닉 관리가 중요한지 알 수 있습니다. 모든 것은 <strong>니모닉(시드 문구)</strong>에서 시작됩니다.
                                </>
                            ) : (
                                <>
                                    Understanding how a wallet is created explains why managing your Mnemonic is crucial. Everything starts from the <strong>Mnemonic (Seed Phrase)</strong>.
                                </>
                            )}
                        </p>

                        <div className="mb-8">
                            <WalletCreationFlowViz />
                        </div>

                        <div className="grid md:grid-cols-2 gap-6">
                            <div className="bg-white/5 p-5 rounded-xl border border-white/10">
                                <h4 className="text-blue-400 font-bold mb-2">1. Mnemonic (Master Key)</h4>
                                <p className="text-sm text-gray-400">
                                    {isKo ?
                                        "12개 또는 24개의 단어. 이것만 있으면 모든 지갑과 계정을 복구할 수 있는 마스터 키입니다." :
                                        "12 or 24 words. This is the master key that can recover all your wallets and accounts."}
                                </p>
                            </div>
                            <div className="bg-white/5 p-5 rounded-xl border border-white/10">
                                <h4 className="text-amber-400 font-bold mb-2">2. Private Key (Sub Key)</h4>
                                <p className="text-sm text-gray-400">
                                    {isKo ?
                                        "니모닉에서 파생된 특정 체인/계정의 비밀번호입니다. 니모닉이 있으면 언제든 다시 만들 수 있습니다." :
                                        "The password for a specific chain/account derived from the Mnemonic. Can always be recreated if you have the Mnemonic."}
                                </p>
                            </div>
                            <div className="bg-white/5 p-5 rounded-xl border border-white/10">
                                <h4 className="text-purple-400 font-bold mb-2">3. Wallet App (Tool)</h4>
                                <p className="text-sm text-gray-400">
                                    {isKo ?
                                        "키를 저장하고 서명하는 도구입니다. 앱을 삭제해도 키만 있으면 자산은 안전합니다." :
                                        "A tool to store keys and sign transactions. Even if you delete the app, your assets are safe as long as you have the key."}
                                </p>
                            </div>
                            <div className="bg-white/5 p-5 rounded-xl border border-white/10">
                                <h4 className="text-emerald-400 font-bold mb-2">4. Address (Account)</h4>
                                <p className="text-sm text-gray-400">
                                    {isKo ?
                                        "개인 키에서 생성된 공개 계좌 번호입니다. 남들에게 보여줘도 안전합니다." :
                                        "The public account number generated from the Private Key. Safe to share with others."}
                                </p>
                            </div>
                        </div>
                    </div>
                </>
            ),
        },
        transfer: {
            title: isKo ? "4. 전송: 자금 이동" : "4. Transfer: Moving Funds",
            content: (
                <>
                    <p className="mb-6 text-lg text-gray-300">
                        {isKo ? "이제 거래소에 암호화폐가 있고 개인 지갑이 생겼으니, 자금을 온체인으로 이동할 차례입니다." : "Now that you have crypto on an exchange and a personal wallet, it's time to move your funds on-chain."}
                    </p>
                    <h3 className="text-2xl font-bold text-white mb-4">{isKo ? "출금 과정" : "The Withdrawal Process"}</h3>
                    <ol className="list-decimal pl-6 space-y-4 text-gray-300 mb-6">
                        <li>{isKo ? "지갑(예: 메타마스크)을 열고 주소(0x로 시작)를 복사하세요." : "Open your wallet (e.g., MetaMask) and copy your address (starts with 0x...)."}</li>
                        <li>{isKo ? "거래소의 \"출금\" 섹션으로 이동하세요." : "Go to the \"Withdraw\" section of your exchange."}</li>
                        <li>{isKo ? <>네트워크(예: 이더리움, 아비트럼, 옵티미즘)를 선택하세요. <strong>사용하려는 네트워크와 일치하는지 반드시 확인하세요!</strong></> : <>Select the network (e.g., Ethereum, Arbitrum, Optimism). <strong>Ensure the network matches what you want to use!</strong></>}</li>
                        <li>{isKo ? "지갑 주소를 붙여넣고 수량을 입력하세요." : "Paste your wallet address and enter the amount."}</li>
                        <li>{isKo ? "2FA로 거래를 승인하세요." : "Confirm the transaction with 2FA."}</li>
                    </ol>
                    <div className="bg-red-500/10 p-6 rounded-xl border border-red-500/20 mb-6">
                        <h4 className="text-red-500 font-bold mb-2">⚠️ {isKo ? "경고" : "Warning"}</h4>
                        <p className="text-sm text-gray-300">
                            {isKo ? "잘못된 주소나 네트워크로 자금을 보내면 영구적으로 손실될 수 있습니다. 항상 소액을 먼저 테스트로 보내보세요." : "Sending funds to the wrong address or network can result in permanent loss. Always send a small test amount first."}
                        </p>
                    </div>
                </>
            ),
        },
    };
};
