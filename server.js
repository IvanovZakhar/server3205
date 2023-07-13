const express = require('express');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
  
    next();
  });
let currentSearchRequest = null;

// Обработка POST-запроса на поиск
app.post('/api/search', (req, res) => {
  if (currentSearchRequest) {
    // Если уже есть активный поиск, отменяем его
    clearTimeout(currentSearchRequest);
    currentSearchRequest = null;
  }

  currentSearchRequest = setTimeout(() => {
    const { email, number } = req.body;

    // Пример поиска по JSON-данным
    const data = [{
      email: 'jim@gmail.com',
      number: '221122'
    }, {
      email: 'jam@gmail.com',
      number: '830347'
    }, {
      email: 'john@gmail.com',
      number: '221122'
    }, {
      email: 'jams@gmail.com',
      number: '349425'
    }, {
      email: 'jams@gmail.com',
      number: '141424'
    }, {
      email: 'jill@gmail.com',
      number: '822287'
    }, {
      email: 'jill@gmail.com',
      number: '822286'
    }];

    const results = data.filter((item) => {
      return item.email.includes(email) && (number ? item.number.includes(number) : true);
    });

    res.json(results);
  }, 5000);
});

const port = 5000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
