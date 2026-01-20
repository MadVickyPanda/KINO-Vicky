import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import mustacheExpress from 'mustache-express';
import moviesRouter from './routes/movies.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = 5080;


app.engine('mustache', mustacheExpress());
app.set('view engine', 'mustache');
app.set('views', path.join(__dirname, 'views'));


app.use(express.static(path.join(__dirname, 'public')));


app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});


app.use('/movies', moviesRouter);


app.use((req, res) => {
  res.status(404).send('<h1>404 - Sidan finns inte</h1>');
});

app.listen(PORT, () => console.log(`Server kör på http://localhost:${PORT}`));
