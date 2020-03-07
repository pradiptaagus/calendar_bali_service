const express = require('express');

const app = express();
const port = 3000;

// Partial route
const hari_raya = require('./src/hari_raya');
const dewasa = require('./src/dewasa');

// Define partial route
app.use('/hari-raya', hari_raya);
app.use('/dewasa', dewasa);
 

app.get('/', (req, res) => res.json('tes'));

app.listen(port, () => console.log(`Example app listening on port ${port}!`))