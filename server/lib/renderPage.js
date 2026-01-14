import fs from 'fs/promises';


export default async function renderPage(pageName) {
    try {
        const html = await fs.readFile(`../${pageName}.html`, 'utf-8');
        return html;
    }
    catch {
        return`<h1>404 - Sidan "${pageName}" finns inte</h1>`;
    }
    
}