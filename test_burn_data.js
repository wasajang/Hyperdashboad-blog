const https = require('https');
const fs = require('fs');

const CHAINSTACK_INFO_URL = 'https://hyperliquid-mainnet.core.chainstack.com/763da485018ed700a60ff2ae431c1f47/info';
const DEAD_ADDRESS = '0x000000000000000000000000000000000000dead';
const ZERO_ADDRESS = '0x0000000000000000000000000000000000000000';

function fetchChainstackData(payload) {
    return new Promise((resolve) => {
        const urlObj = new URL(CHAINSTACK_INFO_URL);
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
                if (res.statusCode !== 200) {
                    console.warn(`Chainstack API Error: ${res.statusCode}`);
                    resolve(null);
                    return;
                }
                try {
                    resolve(JSON.parse(body));
                } catch (e) {
                    console.error('Error parsing Chainstack JSON:', e);
                    resolve(null);
                }
            });
        });

        req.on('error', (e) => {
            console.error('Chainstack Request Error:', e);
            resolve(null);
        });

        req.write(payload);
        req.end();
    });
}

async function checkBalance(address, label) {
    console.log(`Checking ${label} (${address})...`);
    const payload = JSON.stringify({
        type: "spotClearinghouseState",
        user: address
    });

    const data = await fetchChainstackData(payload);

    if (data && data.balances && Array.isArray(data.balances)) {
        const hypeBalance = data.balances.find(b => b.coin === 'HYPE');
        const logMsg = `[${label}] HYPE Balance: ${hypeBalance ? hypeBalance.total : '0'}\n`;
        fs.appendFileSync('test_burn_output.txt', logMsg);
        if (hypeBalance) {
            console.log(`[${label}] HYPE Balance: ${hypeBalance.total}`);
            return parseFloat(hypeBalance.total);
        } else {
            console.log(`[${label}] No HYPE balance found.`);
        }
    } else {
        console.log(`[${label}] Invalid response or empty balances.`);
    }
    return 0;
}

async function main() {
    console.log('--- Checking Burn Addresses ---');
    await checkBalance(DEAD_ADDRESS, 'DEAD Address');
    await checkBalance(ZERO_ADDRESS, 'ZERO Address');
}

main();
