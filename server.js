require('dotenv').config();
const express = require('express');
const app = express();
const { proRouter } = require('./router');
const PORT = process.env.PORT;

app.use(express.json());
app.use('/products', proRouter);

app.listen(PORT, (err) => {
  if (!err) console.log('Server listening on port:' + PORT);
  else 'Server error: ' + err;
});
