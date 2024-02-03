const express = require('express');
const bodyParser = require('body-parser');
require('dotenv').config();

const app = express();
const port = process.env.PORT;
const transferRoutes = require('./routes/transferRoutes');


// Use bodyParser to parse incoming requests as JSON
app.use(bodyParser.json());

// Route for transferring funds between accounts
app.use('/transfer', transferRoutes);
  

// Start the server
app.listen(port, () => console.log(`Example app listening on port ${port}!`));
