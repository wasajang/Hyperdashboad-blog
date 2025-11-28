import { ASSETS } from './constants';

export type ExchangeType = 'bank' | 'domestic' | 'global' | 'wallet' | 'dapp';

export interface ExchangeNode {
    id: string;
    name: string;
    logo?: string;
    url?: string;
    type: ExchangeType;
    color: string;
    description?: string;
    referralCode?: string;
    note?: string;
}

export const EXCHANGES: ExchangeNode[] = [
    // Banks
    {
        id: 'kbank',
        name: 'K-Bank',
        logo: ASSETS.LOGOS.KBANK,
        type: 'bank',
        color: '#1e3a8a',
        description: 'Primary Bank for Upbit'
    },
    {
        id: 'kb',
        name: 'KB Bank',
        logo: ASSETS.LOGOS.KB,
        type: 'bank',
        color: '#fbbf24',
        description: 'Primary Bank for Bithumb'
    },
    {
        id: 'kakaobank',
        name: 'KakaoBank',
        logo: ASSETS.LOGOS.KAKAOBANK,
        type: 'bank',
        color: '#FEE500',
        description: 'Primary Bank for Coinone'
    },

    // Domestic Exchanges
    {
        id: 'upbit',
        name: 'Upbit',
        logo: ASSETS.LOGOS.UPBIT,
        url: 'https://upbit.com',
        type: 'domestic',
        color: '#0041da',
        description: 'Largest KR Exchange'
    },
    {
        id: 'bithumb',
        name: 'Bithumb',
        logo: ASSETS.LOGOS.BITHUMB,
        url: 'https://m.bithumb.com/react/referral/guide?referral=WASAJANG',
        referralCode: 'WASAJANG',
        type: 'domestic',
        color: '#f97316',
        description: 'Major KR Exchange',
        note: '가입 기념 5만원 이벤트 중'
    },
    {
        id: 'coinone',
        name: 'Coinone',
        logo: ASSETS.LOGOS.COINONE,
        url: 'https://coinone.co.kr/user/signup?ref=Q300JBPX',
        referralCode: 'Q300JBPX',
        type: 'domestic',
        color: '#0078FF',
        description: 'Secure KR Exchange'
    },

    // Global Exchanges
    {
        id: 'binance',
        name: 'Binance',
        logo: ASSETS.LOGOS.BINANCE,
        url: 'https://accounts.binance.com/register?ref=108218815',
        referralCode: '108218815',
        type: 'global',
        color: '#fcd535',
        description: 'World #1 Exchange'
    },
    {
        id: 'bybit',
        name: 'Bybit',
        logo: ASSETS.LOGOS.BYBIT,
        url: 'https://www.bybit.com/en/invite/?ref=6ZWLYB',
        referralCode: '6ZWLYB',
        type: 'global',
        color: '#171717',
        description: 'Derivatives Leader'
    },
    {
        id: 'okx',
        name: 'OKX',
        logo: ASSETS.LOGOS.OKX,
        url: 'https://www.okx.com/join/wasajang',
        referralCode: 'wasajang',
        type: 'global',
        color: '#000000',
        description: 'Web3 Innovator'
    },
    {
        id: 'coinbase',
        name: 'Coinbase',
        logo: ASSETS.LOGOS.COINBASE,
        url: 'https://coinbase.com/join/C3PK9CN?src=referral-link',
        referralCode: 'C3PK9CN',
        type: 'global',
        color: '#0052ff',
        description: 'US Regulated'
    },
];

export const WALLETS: ExchangeNode[] = [
    {
        id: 'metamask_mobile',
        name: 'MetaMask Mobile',
        logo: ASSETS.LOGOS.METAMASK,
        url: 'https://link.metamask.io/rewards?referral=Q8BD05',
        referralCode: 'Q8BD05',
        type: 'wallet',
        color: '#F6851B'
    },
    {
        id: 'metamask_pc',
        name: 'MetaMask PC',
        logo: ASSETS.LOGOS.METAMASK,
        url: 'https://metamask.io/ko/download',
        type: 'wallet',
        color: '#F6851B'
    },
    {
        id: 'rabby',
        name: 'Rabby',
        logo: ASSETS.LOGOS.RABBY,
        url: 'https://rabby.io/',
        type: 'wallet',
        color: '#8697FF'
    },
    {
        id: 'phantom',
        name: 'Phantom',
        logo: ASSETS.LOGOS.PHANTOM,
        url: 'https://phantom.com/download',
        type: 'wallet',
        color: '#AB9FF2'
    }
];

export const DAPPS: ExchangeNode[] = [
    {
        id: 'hyperliquid',
        name: 'Hyperliquid',
        logo: ASSETS.LOGOS.HYPERLIQUID,
        url: 'https://app.hyperliquid.xyz/join/WASAJANG',
        referralCode: 'WASAJANG',
        type: 'dapp',
        color: '#2D3436'
    },
    {
        id: 'based',
        name: 'Based',
        logo: ASSETS.LOGOS.BASED,
        url: 'https://app.based.one/r/WASAJANG',
        referralCode: 'WASAJANG',
        type: 'dapp',
        color: '#000000'
    },
    {
        id: 'tread',
        name: 'Tread',
        logo: ASSETS.LOGOS.TREAD,
        url: 'https://app.tread.fi/referral/0SKI4UJ9',
        referralCode: '0SKI4UJ9',
        type: 'dapp',
        color: '#000000'
    },
    {
        id: 'lighter',
        name: 'Lighter',
        logo: ASSETS.LOGOS.LIGHTER,
        url: 'app.lighter.xyz/?referral=WASAJANG',
        referralCode: 'WASAJANG',
        type: 'dapp',
        color: '#000000'
    },
    {
        id: 'edgex',
        name: 'EdgeX',
        logo: ASSETS.LOGOS.EDGEX,
        url: 'https://pro.edgex.exchange/referral/WASAJANG',
        referralCode: 'WASAJANG',
        type: 'dapp',
        color: '#000000'
    },
    {
        id: 'pacifica',
        name: 'Pacifica',
        logo: ASSETS.LOGOS.PACIFICA,
        url: 'https://app.pacifica.fi?referral=wasajang',
        referralCode: 'wasajang',
        type: 'dapp',
        color: '#000000'
    }
];
