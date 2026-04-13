const express = require('express');
const path = require('path');
const jsonServer = require('json-server');
const app = express();
const PORT = process.env.PORT || 8080;

// Создаем роутер для API на основе db.json
const router = jsonServer.router('db.json');
const middlewares = jsonServer.defaults();

// Используем middleware json-server
app.use('/api', middlewares);
app.use('/api', router);

// Раздаем статические файлы React (собранные)
app.use(express.static(path.join(__dirname, 'build')));

// Все остальные запросы отдаем index.html (для React Router)
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
  console.log(`API available at http://localhost:${PORT}/api`);
  console.log(`Frontend available at http://localhost:${PORT}`);
});
