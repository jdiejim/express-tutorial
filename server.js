const express = require('express');
const app = express();
const path = require('path');
const AVENGERS = require('./data.json');

const urlLogger = (req, res, next) => {
  console.log('Request URL:', req.url);
  next();
}

const timeLogger = (req, res, next) => {
  console.log('Datetime:', new Date(Date.now()).toString());
  next();
};

const notFound = (req, res, next) => {
  res.status(404).send('Not Found');
}

app.use(urlLogger, timeLogger);
app.use(express.static(path.join(__dirname, 'public')));

app.get('/', (req, res) => {
  res.send('hello world');
});

app.get('/json', (req, res) => {
  res.status(200).json(AVENGERS);
});

app.get('/sunsets', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'sunsets.html'));
})

app.listen(3000, () => {
  console.log('Express intro running on localhost:3000');
});

app.use(notFound);
