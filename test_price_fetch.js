const https = require('https');

function fetchUrl(url, payload = null) {
    return new Promise((resolve) => {
        const urlObj = new URL(url);
        const options = {
            hostname: urlObj.hostname,
            path: urlObj.pathname,
            method: payload ? 'POST' : 'GET',
            headers: {
                'Content-Type': 'application/json',
                'User-Agent': 'Node.js/Test'
            }
        };

        if (payload) {
            options.headers['Content-Length'] = payload.length;
        }

        const req = https.request(options, (res) => {
            let body = '';
            res.on('data', (chunk) => body += chunk);
            res.on('end', () => {
                try {
                    if (res.statusCode === 200) {
                        resolve(JSON.parse(body));
                    } else {
                        console.log(`[${url}] Status: ${res.statusCode}`);
                        resolve(null);
                    }
                } catch (e) {
                    console.log(`[${url}] Parse Error`);
                    resolve(null);
                }
            });
        });

        req.on('error', (e) => {
            console.log(`[${url}] Error: ${e.message}`);
            resolve(null);
        });

        if (payload) req.write(payload);
        req.end();
    });
}

async function main() {
    console.log('--- Testing Price Sources ---');

    // 1. Hypurrscan Token Info
    console.log('\n1. Hypurrscan (/token/HYPE)...');
    const hypurrData = await fetchUrl('https://api.hypurrscan.io/token/HYPE');
    if (hypurrData) {
        console.log('Hypurrscan Data:', JSON.stringify(hypurrData, null, 2));
    }

    // 2. Hyperliquid Public Info API (allMids)
    console.log('\n2. Hyperliquid Public API (allMids)...');
    const hlData = await fetchUrl('https://api.hyperliquid.xyz/info', JSON.stringify({ type: "allMids" }));
    if (hlData) {
        console.log('HYPE Price found:', hlData['HYPE']);
    }
}

main();
