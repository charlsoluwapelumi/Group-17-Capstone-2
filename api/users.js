const express = require('express')
const router = express.Router()
const User = require('../models/User')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')


router.post('/auth/signup', async (req, res) => {
    try {
        // Get user input
    const {first_name, last_name, email, phone, password, address} = req.body

    // Validate user input
    if (!(email && password && first_name && last_name)) {
        res.status(400).send("All input is required");
    }

    // check if user already exist
    // Validate if user exist in our database
    const oldUser =  await User.query().findOne({email: email });

    if (oldUser) {
      return res.status(409).send("Email Already Exist. Please use another one");
    }

    //Encrypt user password
    encryptedPassword = await bcrypt.hash(password, 10);


    // Create user in our database
    const user = await User.query().insert({
        first_name: first_name,
        last_name,
        email,
        password: encryptedPassword,
        phone,
        address
    })

     // Create token
     const token = jwt.sign(
        { user_id: user.id, email },
        process.env.SECRET_KEY,
        {
          expiresIn: 86400 // 24 hours
        }
      );

      const data = {
        token,
        id: user.id,
        first_name: user.first_name,
        last_name: user.last_name,
        email: user.email,
    }
      return res.json({
          status: 'success',
          data: data
      })
    } catch (error) {
        console.log(error)
    }
})
router.post('/auth/signin', async (req, res) => {
    try {
        // Get user input
    const { email, password} = req.body

    // Validate user input
    if (!(email && password )) {
        res.status(400).send("All input is required");
    }

   
    // Validate if user exist in our database
    const user =  await User.query().findOne({email: email });

    if (!user) {
      return res.status(404).send("User does not exist. Please change your selection");
    }

    const isPasswordValid = await bcrypt.compare(password, user.password)

    let token
    if(isPasswordValid) {
        // Create token
        token = jwt.sign(
            { user_id: user.id, email },
            process.env.SECRET_KEY,
            {
            expiresIn: 86400 // 24 hours
            }
        );
    }

    const data = {
        token,
        id: user.id,
        first_name: user.first_name,
        last_name: user.last_name,
        email: user.email,
    }
    
    return res.json({
          status: 'success',
          data: data
      })
    } catch (error) {
        console.log(error)
    }
})

router.get('/users', async (req, res) => {
    const users = await User.query()

    return res.json({
        status: 'success',
        data: users
    })
})

module.exports = router