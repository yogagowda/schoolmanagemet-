const mongoose = require('mongoose')

const studentSchema = new mongoose.Schema({
    firstName:{
        type:String,
        required: true,
        index:true
        
    },
    lastName:{
         type:String,
         required:true,
         index:true
    },
    rollno: {
        unique: true,
        type: String,

    },
    adress: [{}],
    class:{
        type:String
    },
    email:{
        type:String
    }
})


const Student = mongoose.model('student', studentSchema);


module.exports= Student;