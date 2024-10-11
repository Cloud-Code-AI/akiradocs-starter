const fs = require('fs');
const path = require('path');

function generateMetaContent(items, indent = 2) {
    let content = '{\n';
    for (const [key, value] of Object.entries(items)) {
        if (typeof value === 'string') {
            content += `${' '.repeat(indent)}"${key}": "${value}",\n`;
        } else if (typeof value === 'object' && value.title) {
            content += `${' '.repeat(indent)}"${key}": "${value.title}",\n`;
        }
    }
    content += '}';
    return content;
}

function generateMeta(config) {
    const metaContent = generateMetaContent(config);
    return `export default ${metaContent};`;
}

function createMetaFiles(mapping, basePath) {
    for (const [key, value] of Object.entries(mapping)) {
        if (typeof value === 'object' && value.type === 'menu' && value.pages) {
            const dirPath = path.join(basePath, key);
            if (!fs.existsSync(dirPath)) {
                fs.mkdirSync(dirPath, { recursive: true });
            }

            const metaContent = generateMeta(value.pages);
            const metaPath = path.join(dirPath, '_meta.js');
            fs.writeFileSync(metaPath, metaContent);
            console.log(`_meta.js has been generated for ${dirPath}`);

            // Recursively create meta files for subpages
            createMetaFiles(value.pages, dirPath);
        }
    }
}

const akiraConfigPath = path.join(__dirname, '..', 'akira.json');
const pagesPath = path.join(__dirname, '..', 'pages');

const akiraConfig = JSON.parse(fs.readFileSync(akiraConfigPath, 'utf8'));

// Generate main _meta.js
const mainMetaContent = generateMeta(akiraConfig.mapping);
const mainMetaPath = path.join(pagesPath, '_meta.js');
fs.writeFileSync(mainMetaPath, mainMetaContent);
console.log('Main _meta.js has been generated successfully.');

// Generate _meta.js for subpages
createMetaFiles(akiraConfig.mapping, pagesPath);