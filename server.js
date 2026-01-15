import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = 5080;

// Serva allt i public som statiska filer
app.use(express.static(path.join(__dirname, 'public')));

// Skicka index.html vid root
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// 404-fallback
app.use((req, res) => {
  res.status(404).send('<h1>404 - Sidan finns inte</h1>');
});

app.listen(PORT, () => {
  console.log(`Server körs på http://localhost:${PORT}`);
});
