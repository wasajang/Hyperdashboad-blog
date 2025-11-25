const https = require('https');

// Credentials provided by user
const EVM_URL = 'https://hyperliquid-mainnet.core.chainstack.com/763da485018ed700a60ff2ae431c1f47/evm';
const INFO_URL = 'https://hyperliquid-mainnet.core.chainstack.com/763da485018ed700a60ff2ae431c1f47/info';

const fs = require('fs');

function makeRequest(url, label, payload) {
    return new Promise((resolve) => {
        const urlObj = new URL(url);
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
                const logMsg = `\n--- ${label} ---\nStatus: ${res.statusCode}\nBody: ${body}\n`;
                fs.appendFileSync('test_output.txt', logMsg);
                console.log(`[${label}] Status: ${res.statusCode} (Logged to file)`);
                resolve();
            });
        });
        // ... (rest of error handling)


        req.on('error', (e) => {
            console.error(`Error in ${label}:`, e);
            resolve();
        });

        req.write(payload);
        req.end();
    });
}

async function main() {
    console.log('Testing Chainstack Private Node...');

    // 1. Test EVM Connection
    await makeRequest(EVM_URL, 'EVM: eth_chainId', JSON.stringify({
        jsonrpc: "2.0",
        method: "eth_chainId",
        params: [],
        id: 1
    }));

    // 2. Test Info API: spotMeta (Basic L1 Data)
    await makeRequest(INFO_URL, 'Info: spotMeta', JSON.stringify({
        type: "spotMeta"
    }));

    // 3. Test Info API: meta (Alternative)
    await makeRequest(INFO_URL, 'Info: meta', JSON.stringify({
        type: "meta"
    }));

    // 4. Test Info API: allMids (Market Data)
    await makeRequest(INFO_URL, 'Info: allMids', JSON.stringify({
        type: "allMids"
    }));

    // 5. Test Info API: l1Tokenomics (Experimental)
    await makeRequest(INFO_URL, 'Info: l1Tokenomics', JSON.stringify({
        type: "l1Tokenomics"
    }));

    // 6. Test Info API: staking (Guess)
    await makeRequest(INFO_URL, 'Info: staking', JSON.stringify({
        type: "staking"
    }));
}

main();
