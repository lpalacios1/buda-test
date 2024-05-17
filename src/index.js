const express = require('express');
const dotenv = require('dotenv');
dotenv.config();
const routes = require('./routes');
const morgan = require('morgan');

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(morgan('dev')); 
app.get('/', (req, res) => {
    res.send('TAREA 1 BUDA.COM');
});

app.use('/api', routes);

module.exports = app