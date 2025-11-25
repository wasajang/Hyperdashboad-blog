const https = require('https');

// The user provided key: b7ieAuEx.mT49hiwGe6mGU36YLiIhvZBCos6uCcdO
// This looks like an Auth Token rather than a URL path component.
// Chainstack often uses Basic Auth or Bearer Token for some services, 
// or it might be part of a specific regional URL.

// Let's try a few common patterns for Chainstack Hyperliquid.
// Pattern 1: Auth Header
// Pattern 2: URL Path

const KEY = 'b7ieAuEx.mT49hiwGe6mGU36YLiIhvZBCos6uCcdO';

async function testEndpoint(url, label, headers = {}) {
    return new Promise((resolve) => {
        const options = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                ...headers
            }
        };

        const payload = JSON.stringify({
            jsonrpc: "2.0",
            method: "eth_chainId",
            params: [],
            id: 1
        });

        const req = https.request(url, options, (res) => {
            let body = '';
            res.on('data', c => body += c);
            res.on('end', () => {
                console.log(`[${label}] Status: ${res.statusCode}`);
                if (res.statusCode === 200) {
                    console.log(`[${label}] Body:`, body.substring(0, 100));
                }
                resolve(res.statusCode === 200);
            });
        });

        req.on('error', (e) => {
            console.log(`[${label}] Error: ${e.message}`);
            resolve(false);
        });

        req.write(payload);
        req.end();
    });
}

async function main() {
    console.log('Testing Chainstack Key...');

    // Attempt 1: As part of the hostname (unlikely for this format)

    // Attempt 2: As a path in a generic Chainstack URL (common for dedicated nodes)
    // We need to guess the regional domain. Common ones:
    // nd-123...p2pify.com
    // hyperliquid-mainnet.chainstacklabs.com

    // Since we don't have the full URL, this is tricky.
    // However, the key format "b7ieAuEx..." looks like a specific ID.

    // Let's try to infer if it's a standard EVM RPC or L1.
    // If the user just gave us the "API Key" from the dashboard, it might be for the Platform API, not the Node RPC.

    console.log("Warning: The provided string looks like a Platform API Key or a partial credential.");
    console.log("Chainstack RPC URLs usually look like: https://nd-123-456-789.p2pify.com/YOUR_KEY");

    // Let's try to use it as a Basic Auth password on a generic endpoint? Unlikely to work without the specific node URL.

    console.log("Cannot determine RPC URL from Key alone.");
}

main();
