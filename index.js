
const express = require("express"); 
const cors = require("cors");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const cloudinary = require("cloudinary");

const app = express(); 
const PORT = process.env.PORT || 3000; 

app.use(cors());

// parse requests of content-type - application/json
app.use(express.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));

// For testing purposes 
app.get("/", (req, res) => { 
    res.json({ message: "Welcome to ApexHauz" });
}); 

require("./src/routes/user.route.js")(app);

app.listen(PORT, () => { 
    console.log(`Server is listening on port ${PORT}`); 
});