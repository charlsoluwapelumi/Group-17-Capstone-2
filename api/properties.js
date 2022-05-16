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

// PATCH /property/<:property-id>: Update property data
// Note: Include any field you will like to update in your request object and only update those fields
router.patch('/property/:id', authenticateToken, async (req, res) => {
    
    const propertyId = req.params.id


    // Get property input
    const { type, state, city, address, price, created_on} = req.body

    const property = await Property.query().patchAndFetchById(propertyId, {type,state, city, address, price, created_on})
    

    return res.json({
        status: 'success',
        data: property
    })
})


// PATCH /property/<:property-id>/sold: Mark a property as sold
router.patch('/property/:id/sold', authenticateToken, async (req, res) => {

    const propertyId = req.params.id

    // Get property input
    const { status } = req.body

    const property = await Property.query().patchAndFetchById(propertyId, status)
    

    return res.json({
        status: 'success',
        data: property
    })
})

// DELETE /property/<:property-id>: Delete a property advert
router.delete('/property/:id', authenticateToken, async (req, res) => {
    const user = req.user
    const propertyId = req.params.id

    const property =  await Property.query().deleteById(propertyId)
   
    

    return res.json({
        status: 'success',
        data:  property
    })
})


module.exports = router