require('dotenv').config();
const path = require('path');
const cors = require('cors');
const express = require('express');
const app = express();
const { proRouter } = require('./router');
const PORT = process.env.PORT;

app.use(express.json());
app.use(cors());
app.use('/products', express.static(path.join(__dirname, 'public')));
app.use('/products', proRouter);

app.get('/', (req, res) => {
  res.send('Welcome to The Grid!');
});

app.listen(PORT, (err) => {
  if (!err) console.log('Server listening on port:' + PORT);
  else 'Server error: ' + err;
});
