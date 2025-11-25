const https = require('https');
const fs = require('fs');

const INFO_URL = 'https://hyperliquid-mainnet.core.chainstack.com/763da485018ed700a60ff2ae431c1f47/info';

function makeRequest(label, payload) {
    return new Promise((resolve) => {
        const urlObj = new URL(INFO_URL);
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
                fs.appendFileSync('test_guesses_output.txt', logMsg);
                console.log(`[${label}] Status: ${res.statusCode}`);
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
    console.log('Testing Info API Guesses...');

    // 1. Validators
    await makeRequest('validators', JSON.stringify({
        type: "validators"
    }));

    // 2. Staking
    await makeRequest('staking', JSON.stringify({
        type: "staking"
    }));

    // 3. Token Details (HYPE)
    await makeRequest('tokenDetails: HYPE', JSON.stringify({
        type: "tokenDetails",
        tokenId: "0x0d01dc56dcaaca66ad901c959b4011ec"
    }));

    // 4. Supply
    await makeRequest('supply', JSON.stringify({
        type: "supply"
    }));

    // 5. User State (Random Address) - to see if user queries work
    await makeRequest('userState: Random', JSON.stringify({
        type: "clearinghouseState",
        user: "0x0000000000000000000000000000000000000000"
    }));

    // 6. Spot State (AF Address)
    await makeRequest('spotState: AF', JSON.stringify({
        type: "spotClearinghouseState",
        user: "0xfefefefefefefefefefefefefefefefefefefefe"
    }));
}

main();
