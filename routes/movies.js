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
    const movie = await loadMovie(req.params.id);

    // 404
    if (!movie) {
      return res.status(404).render('404.mustache', {
        message: 'Filmen kunde inte hittas'
      });
    }

    if (movie.intro) {
      movie.introHTML = marked.parse(movie.intro);
    }

    res.render('movie.mustache', { movie });

  } catch (err) {
    console.error(err);

    // Om API returnerar 404, kör samma felsida
    if (err.response?.status === 404) {
      return res.status(404).render('404.mustache', {
        message: 'Filmen kunde inte hittas'
      });
    }

    // Annars är det ett serverfel
    res.status(500).send('<h1>Fel vid hämtning av filmen</h1>');
  }
});

export default router;
