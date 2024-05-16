const express = require('express');
const dotenv = require('dotenv');
dotenv.config();
const routes = require('./routes');
const morgan = require('morgan');

const app = express();
const port = process.env.PORT || 8080;
app.use(morgan('dev')); 
app.get('/', (req, res) => {
    res.send('TAREA 1 BUDA.COM');
});


app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});

app.use('/api', routes);

module.exports = app