const { exec } = require('child_process');
const path = require('path');

const scripts = [
    'update_tokenomics.js',
    'update_revenue.js'
];

async function runScript(scriptName) {
    return new Promise((resolve, reject) => {
        const scriptPath = path.join(__dirname, scriptName);
        console.log(`\n>>> Running ${scriptName}...`);

        exec(`node "${scriptPath}"`, (error, stdout, stderr) => {
            if (error) {
                console.error(`Error executing ${scriptName}:`, error);
                reject(error);
                return;
            }
            if (stderr) {
                console.error(`Stderr from ${scriptName}:`, stderr);
            }
            console.log(stdout);
            resolve();
        });
    });
}

async function main() {
    console.log('Starting Daily Data Update...');
    console.log(new Date().toISOString());

    for (const script of scripts) {
        try {
            await runScript(script);
        } catch (e) {
            console.error(`Failed to run ${script}. Stopping update process.`);
            process.exit(1);
        }
    }

    console.log('\n>>> All updates completed successfully. <<<');
}

main();
