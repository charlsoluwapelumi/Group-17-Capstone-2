const express = require('express');
const app = express();
const cors = require('cors');
const bodyParser = require('body-parser');

// Loads environment variables from a .env file into process.env
require('dotenv').config()

const port = process.env.PORT

app.use(cors())
app.use(bodyParser.json())

// User Routes
app.use('/api/v1', require('./api/users'))

// Property Routes

// Report Routes

app.listen(port, () => {
    console.log(`Server started successfully, listening on port ${port}`)
})