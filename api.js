import fetch from "node-fetch";

const API_BASE = 'https://plankton-app-xhkom.ondigitalocean.app/api';

// Hämta alla filmer
export async function loadMovies() {
  const res = await fetch(`${API_BASE}/movies`);
  const payload = await res.json();

  return payload.data.map(item => ({
    id: item.id,
    ...item.attributes
  }));
}

// Hämta en enstaka film
export async function loadMovie(id) {
  const res = await fetch(`${API_BASE}/movies/${id}`);
  const payload = await res.json();

  return {
    id: payload.data.id,
    ...payload.data.attributes
  };
}
