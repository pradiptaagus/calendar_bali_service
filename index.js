const express = require('express');
const app = express();

// Partial route
const hari_raya = require('./src/api/hari_raya');
const dewasa = require('./src/api/dewasa');

// Define partial route
app.use('/hari-raya', hari_raya);
app.use('/dewasa', dewasa);
 

app.get('/', (req, res) => res.send('Calendar bali service'));

app.listen(process.env.PORT, () => console.log(`Calendar bali service - listening on port ${process.env.PORT}!`))