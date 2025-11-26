const fs = require('fs');
const path = require('path');
const https = require('https');

const TOKENOMICS_FILE = path.join(__dirname, '../data/tokenomics_history.json');
const REVENUE_FILE = path.join(__dirname, '../data/revenue_history.json');
const METRICS_FILE = path.join(__dirname, '../data/metrics_history.json');

const HL_API_URL = 'https://api.hyperliquid.xyz/info';
const COINGECKO_API_URL = 'https://api.coingecko.com/api/v3/coins/hyperliquid?localization=false&tickers=false&community_data=false&developer_data=false&sparkline=false';

function fetchPrice() {
    return new Promise((resolve) => {
        const urlObj = new URL(HL_API_URL);
        const payload = JSON.stringify({ type: "allMids" });
        const options = {
            hostname: urlObj.hostname,
            path: urlObj.pathname,
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Content-Length': payload.length
            }
        };

        const req = https.request(options, (res) => {
            let body = '';
            res.on('data', (chunk) => body += chunk);
            res.on('end', () => {
                try {
                    if (res.statusCode === 200) {
                        const data = JSON.parse(body);
                        if (data && data['HYPE']) {
                            resolve(parseFloat(data['HYPE']));
                        } else {
                            resolve(null);
                        }
                    } else {
                        console.warn(`Price API Error: ${res.statusCode}`);
                        resolve(null);
                    }
                } catch (e) {
                    console.error('Error parsing price data:', e);
                    resolve(null);
                }
            });
        });

        req.on('error', (e) => {
            console.error('Price Request Error:', e);
            resolve(null);
        });

        req.write(payload);
        req.end();
    });
}

function fetchCoinGeckoData() {
    return new Promise((resolve) => {
        https.get(COINGECKO_API_URL, (res) => {
            let body = '';
            res.on('data', (chunk) => body += chunk);
            res.on('end', () => {
                try {
                    if (res.statusCode === 200) {
                        const data = JSON.parse(body);
                        if (data && data.market_data) {
                            resolve({
                                circulating_supply: data.market_data.circulating_supply,
                                price: data.market_data.current_price.usd
                            });
                        } else {
                            resolve(null);
                        }
                    } else {
                        console.warn(`CoinGecko API Error: ${res.statusCode}`);
                        resolve(null);
                    }
                } catch (e) {
                    console.error('Error parsing CoinGecko data:', e);
                    resolve(null);
                }
            });
        }).on('error', (e) => {
            console.error('CoinGecko Request Error:', e);
            resolve(null);
        });
    });
}

async function main() {
    console.log('--- Updating Metrics (SWPE) ---');

    // 1. Read Latest Tokenomics Data
    if (!fs.existsSync(TOKENOMICS_FILE)) {
        console.error('Tokenomics file not found.');
        return;
    }
    const tokenomicsData = JSON.parse(fs.readFileSync(TOKENOMICS_FILE, 'utf-8'));
    const latestTokenomics = tokenomicsData[tokenomicsData.length - 1];
    if (!latestTokenomics) {
        console.error('No tokenomics data available.');
        return;
    }
    const swpeSupply = latestTokenomics.circulating_supply_swpe;

    // 2. Read Latest Revenue Data
    if (!fs.existsSync(REVENUE_FILE)) {
        console.error('Revenue file not found.');
        return;
    }
    const revenueData = JSON.parse(fs.readFileSync(REVENUE_FILE, 'utf-8'));
    const latestRevenue = revenueData[revenueData.length - 1];
    if (!latestRevenue) {
        console.error('No revenue data available.');
        return;
    }
    const dailyRevenue = latestRevenue.revenue;

    // 3. Fetch Current Price (Hyperliquid API)
    console.log('Fetching HYPE Price...');
    const price = await fetchPrice();
    if (!price) {
        console.error('Failed to fetch HYPE price.');
        return;
    }

    // 4. Fetch CoinGecko Data
    console.log('Fetching CoinGecko Data...');
    const cgData = await fetchCoinGeckoData();
    const cgSupply = cgData ? cgData.circulating_supply : null;
    const cgPrice = cgData ? cgData.price : null;

    console.log(`Price (HL): $${price}`);
    console.log(`Price (CG): $${cgPrice}`);
    console.log(`SWPE Supply: ${swpeSupply.toLocaleString()}`);
    console.log(`CG Supply: ${cgSupply ? cgSupply.toLocaleString() : 'N/A'}`);
    console.log(`Daily Revenue: $${dailyRevenue.toLocaleString()}`);

    // 5. Calculate SWPE Ratio
    // Formula: (Price * Supply) / (Daily Revenue * 365)
    // Note: Using daily revenue to estimate annual revenue
    const annualizedRevenue = dailyRevenue * 365;
    const marketCap = price * swpeSupply;
    const swpeRatio = annualizedRevenue > 0 ? marketCap / annualizedRevenue : 0;

    console.log(`>>> SWPE Ratio: ${swpeRatio.toFixed(2)} <<<`);

    // 6. Save to File
    const newMetric = {
        date: new Date().toISOString().split('T')[0],
        timestamp: new Date().toISOString(),
        price: price,
        swpe_supply: swpeSupply,
        daily_revenue: dailyRevenue,
        swpe_ratio: swpeRatio,
        coingecko_circulating_supply: cgSupply,
        coingecko_price: cgPrice
    };

    let metricsHistory = [];
    if (fs.existsSync(METRICS_FILE)) {
        const fileContent = fs.readFileSync(METRICS_FILE, 'utf-8');
        if (fileContent.trim()) {
            metricsHistory = JSON.parse(fileContent);
        }
    }

    metricsHistory.push(newMetric);
    fs.writeFileSync(METRICS_FILE, JSON.stringify(metricsHistory, null, 2));
    console.log(`Successfully updated ${METRICS_FILE}`);
}

main();
