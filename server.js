const express = require('express');
const path = require('path');
const app = express();
const PORT = process.env.PORT || 8080;

// Раздаем статические файлы React
app.use(express.static(path.join(__dirname, 'build')));

// Обработка API запросов (если у вас есть json-server)
// Если нет - можно добавить простой API для теста
app.get('/api/test', (req, res) => {
  res.json({ message: 'API работает!' });
});

// Все остальные запросы отдаем index.html (для React Router)
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
