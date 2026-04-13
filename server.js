const express = require('express');
const path = require('path');
const jsonServer = require('json-server');

const app = express();
const PORT = process.env.PORT || 8080;

// Middleware для JSON Server
const router = jsonServer.router('db.json');
const middlewares = jsonServer.defaults();

// Подключаем JSON Server к пути /api
app.use('/api', middlewares);
app.use('/api', router);

// Отдаем статические файлы React (фронтенд)
app.use(express.static(path.join(__dirname, 'build')));

// Все остальные запросы отдаем index.html (для React Router)
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

app.listen(PORT, () => {
  console.log(`Сервер запущен на порту ${PORT}`);
  console.log(`Фронтенд доступен по адресу http://localhost:${PORT}`);
  console.log(`API доступно по адресу http://localhost:${PORT}/api`);
});
