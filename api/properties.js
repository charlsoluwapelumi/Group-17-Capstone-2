const express = require('express')
const router = express.Router()
const Property = require('../models/Property')
const authenticateToken = require('../middleware/authenticateToken')
const uploadImage = require('./helpers/uploadFile')


// POST /property: Create a property advert
router.post('/property', authenticateToken, async (req, res) => {
    const user = req.user

    // Get property input
    const { type, state, city, address, price, created_on} = req.body
    const file = req.files.file

    const fileType  = file.mimetype.split('/')[0]
    const folder = 'development'
    const filePath = file.tempFilePath
    const imageUrl =  await uploadImage(filePath, fileType, folder)

    const property = await Property.query().insert({
        type,
        state,
        city,
        address,
        price,
        created_on,
        image_url: imageUrl,
        owner: user.user_id
    })
    

    return res.json({
        status: 'success',
        data: property
    })
})


module.exports = router