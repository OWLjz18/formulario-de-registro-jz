const express = require('express');
const nodemailer = require('nodemailer');
const path = require('path');

const app = express();

app.use(express.urlencoded({extended: false}));

app.use(require('./routes/index.js'));

app.use(express.static(path.join(__dirname, 'public')));

app.listen(3000, () => console.log('Server in port 3000') );
