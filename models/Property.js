const BaseModel = require('../models/BaseModel')


class Property extends BaseModel {

    static get tableName() {
        return 'properties'
    }
}


module.exports = Property