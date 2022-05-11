const express = require('express');
const app = express();
const cors = require('cors');
const bodyParser = require('body-parser');
const fileUpload = require('express-fileupload')

// Loads environment variables from a .env file into process.env
const dotenv = require('dotenv');
// get config vars
dotenv.config();

const port = process.env.PORT

app.use(cors())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }));
app.use(fileUpload({
    useTempFiles : true,
    tempFileDir : '/tmp/'
}))

// User Routes
app.use('/api/v1', require('./api/users'))

// Property Routes
app.use('/api/v1', require('./api/properties'))

// Report Routes

app.listen(port, () => {
    console.log(`Server started successfully, listening on port ${port}`)
})
