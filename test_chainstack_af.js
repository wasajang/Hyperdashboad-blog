const https = require('https');
const fs = require('fs');

const INFO_URL = 'https://hyperliquid-mainnet.core.chainstack.com/763da485018ed700a60ff2ae431c1f47/info';
const AF_ADDRESS = '0xfefefefefefefefefefefefefefefefefefefefe';

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
                fs.appendFileSync('test_af_output.txt', logMsg);
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
    console.log(`Testing AF Balance Fetch for ${AF_ADDRESS}...`);

    await makeRequest('AF State', JSON.stringify({
        type: "clearinghouseState",
        user: AF_ADDRESS
    }));
}

main();
