import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export default async function renderPage(pageName) {
  try {
    // Läser filen från public/
    const filePath = path.join(__dirname, '..', 'public', `${pageName}.html`);
    const html = await fs.readFile(filePath, 'utf-8');
    return html;
  } catch (err) {
    return `<h1>404 - Sidan "${pageName}" finns inte</h1>`;
  }
}
