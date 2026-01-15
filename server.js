import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = 5080;

// Serva statiska filer från public och Vite-build
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'dist')));

// Routes för sidorna
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.get('/about', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'about.html'));
});

app.get('/movies', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'movies.html'));
});

// 404-fallback
app.use((req, res) => {
  res.status(404).send('<h1>404 - Sidan finns inte</h1>');
});

app.listen(PORT, () => {
  console.log(`Server körs på http://localhost:${PORT}`);
});
