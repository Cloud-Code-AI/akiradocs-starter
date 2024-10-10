const fs = require('fs');
const path = require('path');

function generateMetaContent(items, indent = 2) {
    let metaContent = '';
    const spaces = ' '.repeat(indent);

    for (const [key, value] of Object.entries(items)) {
    if (typeof value === 'string') {
        metaContent += `${spaces}"${key}": "${value}",\n`;
    } else if (typeof value === 'object') {
        metaContent += `${spaces}"${key}": {\n`;
        metaContent += `${spaces}  "title": "${value.title}",\n`;
        metaContent += `${spaces}  "type": "menu",\n`;
        metaContent += `${spaces}  "items": {\n`;
        metaContent += generateMetaContent(value.pages, indent + 4);
        metaContent += `${spaces}  }\n`;
        metaContent += `${spaces}},\n`;
    }
    }

    return metaContent;
}

function generateMeta(config) {
    let metaContent = 'export default {\n';
    metaContent += generateMetaContent(config.sidebar);
    metaContent += '};\n';
    return metaContent;
}

const akiraConfigPath = path.join(__dirname, '..', 'akira.json');
const metaOutputPath = path.join(__dirname, '..', 'pages', '_meta.js');

const akiraConfig = JSON.parse(fs.readFileSync(akiraConfigPath, 'utf8'));
const metaContent = generateMeta(akiraConfig);

fs.writeFileSync(metaOutputPath, metaContent);
console.log('_meta.js has been generated successfully.');