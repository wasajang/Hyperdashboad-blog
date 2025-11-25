const https = require('https');

const ENDPOINT = 'https://evmrpc-eu.hyperpc.app/8ab3e8d0d35a4670a7cb4f3cc66d22c2';

function makeRequest(label, payload) {
    return new Promise((resolve, reject) => {
        const url = new URL(ENDPOINT);
        const options = {
            hostname: url.hostname,
            path: url.pathname,
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
                console.log(`\n--- ${label} ---`);
                console.log(`Status: ${res.statusCode}`);
                try {
                    const parsed = JSON.parse(body);
                    // Truncate long output for readability
                    const logStr = JSON.stringify(parsed, null, 2);
                    console.log(logStr.length > 500 ? logStr.substring(0, 500) + '...' : logStr);
                } catch (e) {
                    console.log('Raw Body:', body);
                }
                resolve();
            });
        });

        req.on('error', (e) => {
            console.error(`Error in ${label}:`, e);
            resolve();
        });

        req.write(payload);
        req.end();
    });
}

async function main() {
    console.log(`Testing Endpoint: ${ENDPOINT}`);

    // Test 1: Standard EVM Request (eth_chainId)
    // This checks if it's a valid EVM RPC
    await makeRequest('Test 1: EVM eth_chainId', JSON.stringify({
        jsonrpc: "2.0",
        method: "eth_chainId",
        params: [],
        id: 1
    }));

    // Test 2: Hyperliquid Info API Request (spotMeta)
    // This checks if it proxies L1 Info requests
    await makeRequest('Test 2: L1 Info spotMeta', JSON.stringify({
        type: "spotMeta"
    }));

    // Test 3: Hyperliquid Info API Request (l2Book for HYPE)
    // Just to be sure
    await makeRequest('Test 3: L1 Info l2Book', JSON.stringify({
        type: "l2Book",
        coin: "HYPE"
    }));
}

main();
