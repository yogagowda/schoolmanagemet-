const mongoose = require('mongoose')

const staffSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    userName: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    classAssigned:{
        type:String,
        required:true
    }
})

const Staff = mongoose.model('staff', staffSchema)

module.exports = Staff