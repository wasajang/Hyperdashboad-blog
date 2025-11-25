const fs = require('fs');
const path = require('path');
const https = require('https');

const DATA_FILE = path.join(__dirname, '../data/revenue_history.json');
const API_URL = 'https://api.llama.fi/summary/fees/hyperliquid';

function fetchUrl(url) {
    return new Promise((resolve, reject) => {
        https.get(url, (res) => {
            let body = '';
            res.on('data', (chunk) => body += chunk);
            res.on('end', () => {
                try {
                    if (res.statusCode !== 200) {
                        console.warn(`API Error ${res.statusCode} from ${url}`);
                        resolve(null);
                        return;
                    }
                    resolve(JSON.parse(body));
                } catch (e) {
                    console.error(`Error parsing JSON from ${url}:`, e);
                    resolve(null);
                }
            });
        }).on('error', (e) => {
            console.error(`Error fetching ${url}:`, e);
            resolve(null);
        });
    });
}

async function main() {
    console.log('Fetching Revenue Data from DefiLlama...');
    const data = await fetchUrl(API_URL);

    if (!data || !data.totalDataChart) {
        console.error('Failed to fetch valid revenue data.');
        return;
    }

    console.log(`Fetched ${data.totalDataChart.length} historical data points.`);

    // Process Data
    // DefiLlama returns [timestamp_in_seconds, value_in_usd]
    const processedData = data.totalDataChart.map(item => {
        const timestamp = item[0];
        const revenue = item[1];
        const date = new Date(timestamp * 1000).toISOString().split('T')[0]; // YYYY-MM-DD
        return {
            date: date,
            revenue: revenue,
            timestamp: timestamp
        };
    });

    // Sort by date just in case
    processedData.sort((a, b) => a.timestamp - b.timestamp);

    // Save to file
    fs.writeFileSync(DATA_FILE, JSON.stringify(processedData, null, 2));
    console.log(`Successfully saved revenue history to ${DATA_FILE}`);

    // Log latest entry
    const latest = processedData[processedData.length - 1];
    console.log(`Latest Revenue (${latest.date}): $${latest.revenue.toLocaleString()}`);
}

main();
