const https = require('https');

const COINGECKO_ID = 'hyperliquid';
const URL = `https://api.coingecko.com/api/v3/coins/${COINGECKO_ID}?localization=false&tickers=false&community_data=false&developer_data=false&sparkline=false`;

https.get(URL, (res) => {
    let data = '';
    res.on('data', (chunk) => data += chunk);
    res.on('end', () => {
        try {
            const json = JSON.parse(data);
            if (json.market_data) {
                console.log('Circulating Supply:', json.market_data.circulating_supply);
                console.log('Total Supply:', json.market_data.total_supply);
                console.log('Max Supply:', json.market_data.max_supply);
                console.log('Current Price:', json.market_data.current_price.usd);
            } else {
                console.log('No market_data found:', json);
            }
        } catch (e) {
            console.error('Error parsing JSON:', e);
        }
    });
}).on('error', (e) => {
    console.error('Request error:', e);
});
