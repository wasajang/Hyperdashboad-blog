import { ethers } from 'ethers';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Configuration
const RPC_URL = 'https://rpc.hyperliquid.xyz/evm';
const DATA_FILE_PATH = path.join(__dirname, '../data/hype_balances.json');

const ACCOUNTS = {
    af: '0xfefefefefefefefefefefefefefefefefefefefe',
    hip3Deployers: {
        xyz: '0x88806a71D74ad0a510b350545C9aE490912F0888',
        felix: '0x2fab552502a6d45920d5741a2f3ebf4c35536352',
    },
};

interface BalanceEntry {
    date: string;
    timestamp: number;
    balances: {
        af: string;
        hip3Deployers: {
            xyz: string;
            felix: string;
        };
    };
}

async function main() {
    console.log('Starting HYPE token balance tracker...');

    try {
        const provider = new ethers.JsonRpcProvider(RPC_URL);

        // Fetch balances
        console.log('Fetching balances...');
        const afBalance = await provider.getBalance(ACCOUNTS.af);
        const xyzBalance = await provider.getBalance(ACCOUNTS.hip3Deployers.xyz);
        const felixBalance = await provider.getBalance(ACCOUNTS.hip3Deployers.felix);

        const newEntry: BalanceEntry = {
            date: new Date().toISOString().split('T')[0],
            timestamp: Date.now(),
            balances: {
                af: ethers.formatEther(afBalance),
                hip3Deployers: {
                    xyz: ethers.formatEther(xyzBalance),
                    felix: ethers.formatEther(felixBalance),
                },
            },
        };

        console.log('Fetched data:', JSON.stringify(newEntry, null, 2));

        // Read existing data
        let data: BalanceEntry[] = [];
        if (fs.existsSync(DATA_FILE_PATH)) {
            const fileContent = fs.readFileSync(DATA_FILE_PATH, 'utf-8');
            try {
                data = JSON.parse(fileContent);
            } catch (e) {
                console.warn('Could not parse existing data file, starting fresh.');
            }
        }

        // Append new data
        data.push(newEntry);

        // Write back to file
        fs.writeFileSync(DATA_FILE_PATH, JSON.stringify(data, null, 2));
        console.log(`Successfully updated ${DATA_FILE_PATH}`);

    } catch (error) {
        console.error('Error tracking balances:', error);
        process.exit(1);
    }
}

main();
