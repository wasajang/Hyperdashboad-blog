const fs = require('fs');
const path = require('path');
const https = require('https');

// --- Configuration ---
const HISTORY_FILE = path.join(__dirname, '../data/tokenomics_history.json');
const TOTAL_SUPPLY = 1_000_000_000; // 1 Billion HYPE
const AF_ADDRESS = '0xfefefefefefefefefefefefefefefefefefefefe';

// Default Manual Inputs (Based on hypeburn.fun data)
const DEFAULT_INPUTS = {
    unique_deployer_count: 3,
    af_balance: null, // Dynamic (Chainstack)
    // Non-Circulating
    future_emissions: 419_351_233,
    non_circulating_other: 242_838_769,
    // Circulating but Locked/Burned
    staked: 112_494_680,
    burned: 700_999, // Static for now
    // Circulating Components (for reference)
    hyperevm: 54_521_035,
    circulating_other: 132_852_350
};

const CHAINSTACK_INFO_URL = 'https://hyperliquid-mainnet.core.chainstack.com/763da485018ed700a60ff2ae431c1f47/info';

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

async function getAFBalanceFromAPI() {
    console.log('Fetching AF Balance from Chainstack API...');

    const payload = JSON.stringify({
        type: "spotClearinghouseState",
        user: AF_ADDRESS
    });

    const data = await fetchChainstackData(payload);

    if (data && data.balances && Array.isArray(data.balances)) {
        // Find HYPE token (Coin: "HYPE")
        const hypeBalance = data.balances.find(b => b.coin === 'HYPE');
        if (hypeBalance) {
            console.log(`Found AF Balance: ${hypeBalance.total}`);
            return parseFloat(hypeBalance.total);
        } else {
            console.warn('HYPE balance not found in AF wallet.');
        }
    } else {
        console.warn('Invalid API response structure from Chainstack.');
    }
    return null;
}

async function main() {
    try {
        // 1. Parse Arguments
        const args = process.argv.slice(2);
        const unique_deployer_count = args[0] ? parseInt(args[0]) : DEFAULT_INPUTS.unique_deployer_count;
        let af_balance = args[1] ? parseFloat(args[1]) : DEFAULT_INPUTS.af_balance;

        // 2. Fetch AF from API
        if (af_balance === null || isNaN(af_balance)) {
            const apiBalance = await getAFBalanceFromAPI();
            af_balance = apiBalance !== null ? apiBalance : 0; // Default to 0 if fail
            if (apiBalance === null) console.warn("Using 0 for AF Balance due to API failure.");
        }

        console.log('\n--- Calculation Inputs ---');
        console.log(`AF Balance: ${af_balance.toLocaleString()}`);
        console.log(`Future Emissions: ${DEFAULT_INPUTS.future_emissions.toLocaleString()}`);
        console.log(`Non-Circulating Other: ${DEFAULT_INPUTS.non_circulating_other.toLocaleString()}`);
        console.log(`Staked: ${DEFAULT_INPUTS.staked.toLocaleString()}`);
        console.log(`Burned: ${DEFAULT_INPUTS.burned.toLocaleString()}`);

        // 3. Calculate HIP3 Stakes
        const hip3_stakes = unique_deployer_count * 500_000;
        console.log(`HIP3 Stakes: ${hip3_stakes.toLocaleString()}`);

        // 4. Calculate SWPE Circulating Supply
        // Formula: Total Supply - (Non-Circulating + AF + HIP3 + Staked + Burned)
        const non_circulating_total = DEFAULT_INPUTS.future_emissions + DEFAULT_INPUTS.non_circulating_other;
        const locked_circulating = af_balance + hip3_stakes + DEFAULT_INPUTS.staked + DEFAULT_INPUTS.burned;

        const circulating_supply_swpe = TOTAL_SUPPLY - non_circulating_total - locked_circulating;

        console.log(`\n>>> SWPE Circulating Supply: ${circulating_supply_swpe.toLocaleString()} <<<\n`);

        // 5. Create Data Object
        const newData = {
            timestamp: new Date().toISOString(),
            total_supply: TOTAL_SUPPLY,
            circulating_supply_swpe: circulating_supply_swpe,
            breakdown: {
                af_balance,
                hip3_stakes,
                staked: DEFAULT_INPUTS.staked,
                burned: DEFAULT_INPUTS.burned,
                future_emissions: DEFAULT_INPUTS.future_emissions,
                non_circulating_other: DEFAULT_INPUTS.non_circulating_other,
                hyperevm: DEFAULT_INPUTS.hyperevm,
                circulating_other: DEFAULT_INPUTS.circulating_other
            }
        };

        // 6. Append to History File
        let history = [];
        if (fs.existsSync(HISTORY_FILE)) {
            const fileContent = fs.readFileSync(HISTORY_FILE, 'utf-8');
            if (fileContent.trim()) {
                history = JSON.parse(fileContent);
            }
        }

        history.push(newData);
        fs.writeFileSync(HISTORY_FILE, JSON.stringify(history, null, 2));

        console.log(`Successfully updated ${HISTORY_FILE}`);

    } catch (error) {
        console.error('Error updating tokenomics:', error);
        process.exit(1);
    }
}

main();
