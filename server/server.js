import express from 'express';

const app = express();
const PORT = 3000;

app.get('/', (req, res) => {
  res.send('Express server fungerar!');
});

app.listen(PORT, () => {
  console.log(`Server körs på http://localhost:${PORT}`);
});

