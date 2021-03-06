const express = require('express');
const path = require('path');

if (process.env.NODE_ENV !== 'production') {

  require('dotenv').config();

}

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.urlencoded({extended: false}));

app.use(require('./routes/index.js'));

app.use(express.static(path.join(__dirname, 'public')));

app.listen(PORT, () => console.log(`Server in port ${PORT}`) );
