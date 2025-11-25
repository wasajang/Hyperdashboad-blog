const https = require('https');

function fetchUrl(url) {
    return new Promise((resolve, reject) => {
        https.get(url, (res) => {
            let body = '';
            res.on('data', (chunk) => body += chunk);
            res.on('end', () => {
                try {
                    if (res.statusCode !== 200) {
                        console.log(`Error: Status ${res.statusCode}`);
                        resolve(null);
                        return;
                    }
                    resolve(JSON.parse(body));
                } catch (e) {
                    console.error('Error parsing JSON:', e);
                    resolve(null);
                }
            });
        }).on('error', (e) => {
            console.error('Error fetching:', e);
            resolve(null);
        });
    });
}

async function main() {
    console.log('Testing DefiLlama Revenue API...');
    const url = 'https://api.llama.fi/summary/fees/hyperliquid';
    const data = await fetchUrl(url);

    if (data) {
        console.log('Success!');
        console.log('Keys:', Object.keys(data));
        if (data.totalDataChart) {
            console.log('Total Data Chart Length:', data.totalDataChart.length);
            console.log('Last 3 Days:', JSON.stringify(data.totalDataChart.slice(-3), null, 2));
        }
        if (data.total24h) console.log('Total 24h Fees:', data.total24h);
        if (data.total24hRevenue) console.log('Total 24h Revenue:', data.total24hRevenue);
    } else {
        console.log('Failed to fetch data.');
    }
}

main();
