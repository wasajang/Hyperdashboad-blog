const fs = require('fs');
const path = require('path');
const https = require('https');

// --- Configuration ---
const HISTORY_FILE = path.join(__dirname, '../data/tokenomics_history.json');
const TOTAL_SUPPLY = 1_000_000_000; // 1 Billion HYPE
const AF_ADDRESS = '0xfefefefefefefefefefefefefefefefefefefefe';

// Default Manual Inputs (Can be overridden by args)
// Usage: node scripts/update_tokenomics.js <deployer_count> <af_balance_override> <total_staked> <future_emissions> <other_non_circulating>
const DEFAULT_INPUTS = {
    unique_deployer_count: 3,
    af_balance: null, // Will try to fetch from API
    total_staked: 414_602_914, // From user request
    future_emissions: 419_356_760, // User provided
    other_non_circulating: 242_838_769 // User provided
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
        const total_staked = args[2] ? parseFloat(args[2]) : DEFAULT_INPUTS.total_staked;
        const future_emissions = args[3] ? parseFloat(args[3]) : DEFAULT_INPUTS.future_emissions;
        const other_non_circulating = args[4] ? parseFloat(args[4]) : DEFAULT_INPUTS.other_non_circulating;

        // 2. Fetch from API if not provided in args
        if (af_balance === null || isNaN(af_balance)) {
            const apiBalance = await getAFBalanceFromAPI();
            if (apiBalance !== null) {
                af_balance = apiBalance;
            } else {
                console.error('Failed to fetch AF balance from API and no manual override provided.');
                // Fallback to last known good value
                if (fs.existsSync(HISTORY_FILE)) {
                    const history = JSON.parse(fs.readFileSync(HISTORY_FILE, 'utf-8'));
                    if (history.length > 0) {
                        af_balance = history[history.length - 1].breakdown.af_balance;
                        console.log(`Using last known AF balance: ${af_balance}`);
                    }
                }

                if (af_balance === null) {
                    throw new Error('AF Balance is required.');
                }
            }
        }

        console.log('\n--- Calculation Inputs ---');
        console.log(`Unique Deployers: ${unique_deployer_count}`);
        console.log(`AF Balance: ${af_balance.toLocaleString()}`);
        console.log(`Total Staked: ${total_staked.toLocaleString()}`);

        // 3. Calculate HIP3 Stakes
        const hip3_stakes = unique_deployer_count * 500_000;
        console.log(`HIP3 Stakes: ${hip3_stakes.toLocaleString()}`);

        // 4. Calculate SWPE Circulating Supply
        // Note: 'other_non_circulating' (Core/Grants) is likely included in 'total_staked' (Locked tokens can be staked).
        // To avoid double counting, we do NOT subtract 'other_non_circulating' separately if 'total_staked' is already subtracted.
        // Formula: Total Supply - AF - HIP3 - Staked - Emissions

        const non_circulating = af_balance + hip3_stakes + total_staked + future_emissions;
        // We exclude other_non_circulating from the sum because it overlaps with total_staked.

        const circulating_supply_swpe = TOTAL_SUPPLY - non_circulating;

        console.log(`\n>>> SWPE Circulating Supply: ${circulating_supply_swpe.toLocaleString()} <<<\n`);

        // 5. Create Data Object
        const newData = {
            timestamp: new Date().toISOString(),
            total_supply: TOTAL_SUPPLY,
            circulating_supply_swpe: circulating_supply_swpe,
            breakdown: {
                af_balance,
                hip3_stakes,
                total_staked,
                future_emissions,
                other_non_circulating // We still record it for reference, but don't subtract it
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
