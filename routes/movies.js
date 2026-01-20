import express from 'express';
import { loadMovies, loadMovie } from '../api.js';
import { marked } from 'marked';

const router = express.Router();

// Lista alla filmer
router.get('/', async (req, res) => {
  try {
    const movies = await loadMovies();
    res.render('movies', { movies });
  } catch (err) {
    console.error(err);
    res.status(500).send('<h1>Fel vid hämtning av filmer</h1>');
  }
});

// Detaljsida för en film
router.get('/:id', async (req, res) => {
  try {
    let movie = await loadMovie(req.params.id);

    // Konvertera intro från markdown till HTML
    if (movie.intro) {
      movie.introHTML = marked.parse(movie.intro);
    }

    res.render('movie', { movie });
  } catch (err) {
    console.error(err);
    res.status(500).send('<h1>Fel vid hämtning av filmen</h1>');
  }
});

export default router;
