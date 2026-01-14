import express from 'express';
import renderPage from './lib/renderPage.js';

const app = express();
const PORT = 5080;

app.get('/', async (req, res) => {
    const html = await renderPage('index');
    res.send(html);
});

app.listen(PORT, () => {
  console.log(`Server körs på http://localhost:${PORT}`);
});


