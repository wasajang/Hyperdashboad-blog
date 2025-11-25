const https = require('https');

function fetchUrl(url) {
    return new Promise((resolve, reject) => {
        const options = {
            headers: {
                'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36'
            }
        };
        https.get(url, options, (res) => {
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
    console.log('Testing /token/HYPE endpoint...');
    const data = await fetchUrl('https://api.hypurrscan.io/token/HYPE');
    if (data) {
        console.log('Success!');
        console.log('Keys:', Object.keys(data));
        console.log('Full Data:', JSON.stringify(data, null, 2));
    } else {
        console.log('Failed to fetch data.');
    }
}

main();
