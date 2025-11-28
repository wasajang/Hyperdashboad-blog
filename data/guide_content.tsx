import React from 'react';
import { ExchangeFlowViz } from '@/components/ui/ExchangeFlowViz';

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
                    <p className="mb-6 text-lg text-gray-300">
                        {isKo ? "Web3 지갑은 온체인 세상에서의 신원 증명이자 은행 계좌입니다. 거래를 승인할 수 있는 개인 키를 저장합니다." : "A Web3 wallet is your identity and bank account in the on-chain world. It stores your private keys, which allow you to approve transactions."}
                    </p>
                    <h3 className="text-2xl font-bold text-white mb-4">{isKo ? "메타마스크 설정하기" : "Setting Up MetaMask"}</h3>
                    <ol className="list-decimal pl-6 space-y-4 text-gray-300 mb-6">
                        <li>{isKo ? <><a href="https://metamask.io" target="_blank" className="text-primary hover:underline">metamask.io</a>에서 브라우저 확장 프로그램을 다운로드하세요.</> : <>Download the browser extension from <a href="https://metamask.io" target="_blank" className="text-primary hover:underline">metamask.io</a>.</>}</li>
                        <li>{isKo ? "\"새 지갑 생성\"을 클릭하세요." : "Click \"Create a new wallet\"."}</li>
                        <li><strong>{isKo ? "중요:" : "IMPORTANT:"}</strong> {isKo ? "비밀 복구 구문(12단어)을 종이에 적어두세요. 절대 누구와도 공유하거나 지갑 외의 웹사이트에 입력하지 마세요." : "Write down your Secret Recovery Phrase (12 words) on paper. NEVER share this with anyone or type it into a website other than your wallet."}</li>
                        <li>{isKo ? "구문을 확인하여 설정을 완료하세요." : "Confirm your phrase to finish setup."}</li>
                    </ol>
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
