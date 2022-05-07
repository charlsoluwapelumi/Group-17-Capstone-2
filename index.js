
const express = require("express"); 
const bodyParser = require('body-parser');

const app = express(); 
const PORT = process.env.PORT || 3000; 

// parse request data content type application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({extended: false}));

// parse request data content type application/json
app.use(bodyParser.json());

// For testing purposes 
app.get("/", (req, res) => { 
    res.send("<h2>It's Working!</h2>"); 
});
// import user routes
const userRoutes = require('./src/routes/user.route');

// create user routes
app.use('/api/v1/user', userRoutes);

app.listen(PORT, () => { 
    console.log(`App is listening on port ${PORT}`); 
});