import { jest } from '@jest/globals';
import request from 'supertest';

// Mocka api.js innan app import
const mockLoadMovie = jest.fn();
const mockLoadMovies = jest.fn();

await jest.unstable_mockModule('../api.js', () => ({
  loadMovie: mockLoadMovie,
  loadMovies: mockLoadMovies
}));

// Importera app EFTER mock
const { default: app } = await import('../app.js');

describe('Integrationstester för filmsidor', () => {

  beforeEach(() => {
    // Mocka loadMovie: returnerar film för id 1,2,3, annars null
    mockLoadMovie.mockImplementation((id) => {
      if (id === '1') return Promise.resolve({ id: 1, title: 'Avatar', intro: 'Film om blå aliens' });
      if (id === '2') return Promise.resolve({ id: 2, title: 'Min granne Totoro', intro: 'Animeklassiker' });
      if (id === '3') return Promise.resolve({ id: 3, title: 'Pulp Fiction', intro: 'Kultklassiker av Tarantino' });
      return Promise.resolve(null); // Alla andra → 404
    });

    // Mocka loadMovies: lista alla tre filmer
    mockLoadMovies.mockResolvedValue([
      { id: 1, title: 'Avatar', intro: 'Film om blå aliens' },
      { id: 2, title: 'Min granne Totoro', intro: 'Animeklassiker' },
      { id: 3, title: 'Pulp Fiction', intro: 'Kultklassiker av Tarantino' }
    ]);
  });

  test('ska visa rätt titel för existerande filmer', async () => {
    const res1 = await request(app).get('/movies/1');
    expect(res1.status).toBe(200);
    expect(res1.text).toContain('Avatar');

    const res2 = await request(app).get('/movies/2');
    expect(res2.status).toBe(200);
    expect(res2.text).toContain('Min granne Totoro');

    const res3 = await request(app).get('/movies/3');
    expect(res3.status).toBe(200);
    expect(res3.text).toContain('Pulp Fiction');
  });

  test('ska visa felsida och returnera 404 om film inte finns', async () => {
    const res = await request(app).get('/movies/9999');
    expect(res.status).toBe(404);
    expect(res.text).toContain('Filmen kunde inte hittas');
  });

});
