/**
 * Fetches Yugipedia fusion list pages and saves them as HTML in the yugipedia/ folder.
 *
 * Usage: node scripts/fetch-yugipedia-pages.js
 *
 * Creates project_root/yugipedia/ if needed and writes:
 *   yugipedia-fusions-001-200.html
 *   yugipedia-fusions-201-400.html
 *   yugipedia-fusions-401-600.html
 *   yugipedia-fusions-601-722.html
 *
 * Run this before scripts/combine-yugipedia-fusions.js to populate or update the data.
 */

const fs = require('fs');
const path = require('path');
const https = require('https');

const PROJECT_ROOT = path.join(__dirname, '..');
const YUGIPEDIA_DIR = path.join(PROJECT_ROOT, 'yugipedia');

const PAGES = [
    { slug: 'List_of_Yu-Gi-Oh!_Forbidden_Memories_Fusions_(001%E2%80%93200)', file: 'yugipedia-fusions-001-200.html' },
    { slug: 'List_of_Yu-Gi-Oh!_Forbidden_Memories_Fusions_(201%E2%80%93400)', file: 'yugipedia-fusions-201-400.html' },
    { slug: 'List_of_Yu-Gi-Oh!_Forbidden_Memories_Fusions_(401%E2%80%93600)', file: 'yugipedia-fusions-401-600.html' },
    { slug: 'List_of_Yu-Gi-Oh!_Forbidden_Memories_Fusions_(601%E2%80%93722)', file: 'yugipedia-fusions-601-722.html' }
];

function fetchUrl(url) {
    return new Promise((resolve, reject) => {
        const req = https.get(url, { headers: { 'User-Agent': 'ygofm-assist-ui/1.0 (local data fetch script)' } }, (res) => {
            if (res.statusCode !== 200) {
                res.destroy();
                reject(new Error(`HTTP ${res.statusCode} for ${url}`));
                return;
            }
            const chunks = [];
            res.on('data', chunk => chunks.push(chunk));
            res.on('end', () => {
                res.destroy();
                resolve(Buffer.concat(chunks).toString('utf8'));
            });
        });
        req.on('error', reject);
    });
}

async function main() {
    if (!fs.existsSync(YUGIPEDIA_DIR)) {
        fs.mkdirSync(YUGIPEDIA_DIR, { recursive: true });
        console.log('Created folder:', YUGIPEDIA_DIR);
    }

    const baseUrl = 'https://yugipedia.com/wiki/';
    for (const { slug, file } of PAGES) {
        const url = baseUrl + slug;
        const outPath = path.join(YUGIPEDIA_DIR, file);
        try {
            console.log('Fetching:', file);
            const html = await fetchUrl(url);
            fs.writeFileSync(outPath, html, 'utf8');
            console.log('  Saved:', outPath);
        } catch (err) {
            console.error('  Error:', err.message);
            process.exitCode = 1;
        }
    }

    if (process.exitCode !== 1) {
        console.log('\nDone. Next: node scripts/combine-yugipedia-fusions.js');
    }
    process.exit(process.exitCode || 0);
}

main();
