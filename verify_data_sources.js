const https = require('https');

function getSpotMeta() {
    const data = JSON.stringify({
        type: "spotMeta"
    });

    const options = {
        hostname: 'api.hyperliquid.xyz',
        path: '/info',
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Content-Length': data.length
        }
    };

    const req = https.request(options, (res) => {
        let body = '';
        res.on('data', (chunk) => body += chunk);
        res.on('end', () => {
            try {
                const result = JSON.parse(body);
                if (result.tokens) {
                    console.log(`Total Spot Tokens: ${result.tokens.length}`);
                    // Inspect a random HIP3 token (e.g., index 10 or last one)
                    const targetIndex = result.tokens.length - 1;
                    const targetToken = result.tokens[targetIndex];
                    console.log(`Token ${targetIndex}:`, JSON.stringify(targetToken, null, 2));

                    // Check if we can find any field resembling a deployer address
                    // Also check the "universe" field if it exists
                    if (result.universe) {
                        console.log('Universe field exists. Inspecting first item...');
                        console.log(JSON.stringify(result.universe[0], null, 2));
                    }
                }
            } catch (e) {
                console.log('Spot Meta Parse Error:', e);
            }
        });
    });

    req.on('error', (e) => {
        console.error('Spot Meta Request Error:', e);
    });

    req.write(data);
    req.end();
}

getSpotMeta();
