const mongoose = require('mongoose')//Mongoose

const marksSchema=new mongoose.Schema({
    history:Number,
    maths:Number,
    physics:Number,
    studentId:{
         type:mongoose.Schema.Types.ObjectId,
         ref:'student'
    }
})

const Marks = mongoose.model('mark',marksSchema);

module.exports= Marks