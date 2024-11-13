let StudentModel = require('../model/stdModell')
const mongoose = require('mongoose')


let addStudent = (req) => {
    // console.log("--------------------", req.body);
    return new Promise(async (resolve, reject) => {
        try {

            let student = new StudentModel({
                firstName: req.body.firstName,
                lastName: req.body.lastName,
                rollno: req.body.rollno,
                adress: req.body.adress,
                class: req.body.class,
                email: req.body.email
            })
            student.save()
                .catch(e => reject({ message: e.message }))

            resolve({
                student,
                mesage: "Success"
            })
        } catch (e) {
            console.log("errr", e);

            reject({
                mesage: e.message
            })
        }
    })
}


let addMultipleStudent = (req) => {
    //   console.log("--------------------",req.body);
    return new Promise(async (resolve, reject) => {
        try {

            let student = req.body
            // /student.insertMany()
            StudentModel.insertMany(student)
                .then((res) => {
                    //  console.log(res)
                    resolve({
                        res,
                        mesage: "Success"
                    })
                }).catch(e => reject({ message: e.message }))
        } catch (e) {
            console.log("errr", e);

            reject({
                mesage: e.message
            })
        }
    })
}


let existStudent = (req) => {
    //   console.log("--------------------",req.body);
    return new Promise(async (resolve, reject) => {
        try {

            let student = req.body
            let { email } = student
            //   console.log(email)
            //  StudentModel.find({email:email});

            StudentModel.find({ email: email }).then((res) => {
                //    console.log(res)
                if (res.length > 0) {
                    console.log('record already existed')
                    reject({ message: 'email already existed' })
                }
                else {
                    StudentModel.create(student).then(
                        res => resolve({
                            res,
                            mesage: "Success"
                        })).catch((e) => {
                            console.log(e)
                            reject({ message: e.message })
                        })

                }

            }).catch((e) => {
                console.log(e)
                reject({ message: e.message })
            })

        } catch (e) {
            console.log("errr", e);

            reject({
                mesage: e.message
            })
        }
    })
}

let getById = (req) => {

    return new Promise(async (resolve, reject) => {
        try {
            let student = req.params.studentId
            StudentModel.findById({ _id: student }).then(res => {
                resolve({
                    res,
                    mesage: "success"
                })
            }).catch(e =>
                reject({
                    mesage: e.message
                }))
        }
        catch (e) {
            console.log("error", e)
            reject({ mesage: e.mesage })
        }

    })
}

let getByfindOne = (req) => {
    return new Promise(async (resolve, reject) => {
        try {
            let student = req.params.studentName
            StudentModel.findOne({ firstName: student }).then(res => {
                resolve({
                    res,
                    mesage: "success"
                }).catch(e =>
                    reject({
                        message: e.mesage
                    }))
            })
        }
        catch (e) {
            console.log("error", e)
            reject({ mesage: e.mesage })
        }
    })
}

let firstNameAndLastName = (req) => {
    //   console.log("--------------------",req.body);
    return new Promise(async (resolve, reject) => {
        try {
            let student = req.params

            let { firstName, lastName } = student
            //   console.log(student)

            StudentModel.find({ firstName: firstName, lastName: lastName }).then((res) => {
                resolve({
                    res,
                    mesage: "success"
                })

            }).catch(e =>
                reject({
                    mesage: e.mesage
                }))
        }
        catch (e) {
            console.log("error", e)
            reject({
                mesage: e.mesage
            })
        }
    })
}


let getByIdAndUpdate = (req) => {

    return new Promise(async (resolve, reject) => {
        try {
            //  let student=req.params.studentId
            let body = req.body
            //  let student=req.body._id

            StudentModel.findByIdAndUpdate({ _id: body._id }, {
                $set: {
                    firstName: body.firstName
                }
            }, { upsert: true }).then(res => {
                resolve({
                    res,
                    mesage: "success"
                })
            }).catch(e =>
                reject({
                    mesage: e.message
                }))
        }
        catch (e) {
            console.log("error", e)
            reject({ mesage: e.mesage })
        }

    })
}

let getUpdate = (req) => {

    return new Promise(async (resolve, reject) => {
        try {
            let student = req.params.firstName
            //  console.log(student)
            StudentModel.updateOne({ firstName: student }, {
                $set: {
                    firstName: "abd"
                }
            }, { upsert: true }).then(res => {
                resolve({
                    res,
                    mesage: "success"
                })
            }).catch(e =>
                reject({
                    mesage: e.message
                }))
        }
        catch (e) {
            console.log("error", e)
            reject({ mesage: e.mesage })
        }

    })
}

let getBYIdAndDelete = (req) => {
    return new Promise(async (resolve, reject) => {
        try {
            let student = req.body
            StudentModel.findByIdAndDelete({ _id: student._id }).then(res => {
                resolve({
                    res,
                    message: "record deleted"
                })
            }).catch(e =>
                reject({
                    message: e.message
                }))
        }
        catch (e) {
            console.log("error", e)
            reject({ message: e.message })
        }
    })
}



let getByMatch = (req) => {
    return new Promise(async (resolve, reject) => {
        try {
            let student = req.body
            //  console.log(student)
            StudentModel.aggregate([
                {
                    $match: {
                        rollno: student.rollno
                    }
                }]).then(res => {
                    resolve({
                        res,
                        message: "matched record fetched"
                    })
                }).catch(e =>
                    reject({
                        message: e.message
                    }))
        }
        catch (e) {
            console.log("error", e)
            reject({ mesage: e.message })
        }
    })
}

let getByAndOperator = (req) => {
    return new Promise(async (resolve, reject) => {
        try {
            let firstName = req.body.firstName
            let rollno = req.body.rollno
            StudentModel.aggregate([{
                $match: { $and: [{ firstName: firstName }, { rollno: rollno }] }
            }]).then(res => {
                resolve({
                    res,
                    message: "and method success"
                })
            }).catch(e =>
                reject({
                    message: e.message
                }))
        }
        catch (e) {
            console.log("error", e)
            reject({ message: e.message })
        }
    })
}
let getByInOperator = (req) => {
    return new Promise(async (resolve, reject) => {
        try {
            let rollno = req.body.rollno
            console.log(rollno)
            StudentModel.aggregate([{
                $match: { rollno: { $in: rollno } }
            }]).then(res => {
                resolve({
                    res,
                    message: "In method success"
                })
            }).catch(e => reject({
                message: e.message
            }))

        }
        catch (e) {
            console.log("error", e);
            reject({ message: e.message })
        }
    })
}

let getByEqual = (req) => {
    return new Promise(async (resolve, reject) => {
        try {
            let rollno = req.body.rollno
            //console.log(rollno)

            StudentModel.aggregate([{ $project: { _id: 0, rollno: 1, isEqual: { $eq: ["$rollno", rollno] } } }]).then(res => {

                resolve({
                    res,
                    message: "equal operator success"
                })
            }).catch(e =>
                reject({
                    mesage: e.message
                }))
        }
        catch (e) {
            console.log("error", e)
            reject({ message: e.message })
        }
    })
}

let getByNotEqual = (req) => {
    return new Promise(async (resolve, reject) => {
        try {
            let rollno = req.body.rollno

            StudentModel.aggregate([{ $project: { _id: 0, rollno: 1, isEqual: { $ne: ["$rollno", rollno] } } }])
                // StudentModel.aggregate([{$match:{rollno:{$nin:[rollno]}}}])
                .then(
                    res => {
                        resolve({
                            res,
                            message: "not equal operator success"
                        })
                    }
                ).catch(e => {
                    reject({
                        message: e.message
                    })
                })
        }
        catch (e) {
            console.log("error", e)
            reject({ message: e.message })
        }
    })
}

let getByExpr = (req) => {
    return new Promise(async (resolve, reject) => {
        try {
            let rollno = req.body.rollno
            StudentModel.aggregate([{ $match: { $expr: { $eq: ["$rollno", rollno] } } }]).then(
                res => {
                    resolve({
                        res,
                        message: "success with expression"
                    })
                }
            ).catch(e => {
                reject({
                    message: e.message
                })
            })
        }
        catch (e) {
            console.log("error", e)
            reject({ message: e.message })
        }
    })
}


let getByNotIn = (req) => {
    return new Promise(async (resolve, reject) => {
        try {
            let rollno = req.body.rollno
            StudentModel.aggregate([{ $match: { rollno: { $nin: [rollno] } } }]).then(res => {
                resolve({
                    res,
                    message: "Not in operator success"
                })
            }).catch(e => {
                reject({
                    message: e.message
                })
            })
        }
        catch (e) {
            console.log("error", e)
            reject({
                message: e.message
            })
        }
    })
}

let getByCondition = (req) => {
    return new Promise(async (resolve, reject) => {
        try {
            let rollno = req.body.rollno
            StudentModel.aggregate([{
                $project: {
                    _id: 0, rollno: 1, firstName: 1, feeConsession: {
                        $cond: [{ $gte: ["$rollno", rollno] }, 10000, 20000]
                    }
                }
            }]).then(res => {
                resolve({
                    res,
                    message: "condition operation success"
                })
            }).catch(e => {
                reject({ message: e.message })
            })
        }
        catch (e) {
            console.log("error", e)
            reject({ message: e.message })
        }
    })
}

//lookup
let getByLookup = (req) => {
    return new Promise(async (resolve, reject) => {
        try {

            StudentModel.aggregate([{
                $lookup: {
                    from: "marks",
                    localField: "_id",
                    foreignField: "studentId",
                    as: "studentMarks"
                }
            },
            {
                $unwind: "$studentMarks"
            },

            {
                $project: {
                    "_id": 0,
                    "firstName": 1,
                    "lastName": 1,
                    "email": 1,
                    studentMarks: 1
                }
            }
            ]).then((res) => {
                resolve({
                    res,
                    message: "lookup details success"
                })
            }).catch(e => {
                reject({ message: e.message })
            })
        }
        catch (e) {
            console.log("error", e)
            reject({ message: e.message })
        }
    })
}

let getByLookupAndMatch = (req) => {
    return new Promise(async (resolve, reject) => {
        try {
            let studentId = req.body._id
            StudentModel.aggregate([{
                $lookup: {
                    from: "marks",
                    localField: "_id",
                    foreignField: "studentId",
                    as: "studentMarks"
                }
            },
            {
                $unwind: "$studentMarks"
            },
            {
                $match: {
                    "studentMarks.studentId": mongoose.Types.ObjectId(studentId)
                }
            },
            {
                $project: {
                    "_id": 0,
                    "firstName": 1,
                    "lastName": 1,
                    "email": 1,
                    studentMarks: 1
                }
            }
            ]).then((res) => {
                resolve({
                    res,
                    message: "lookup and Match details success"
                })
            }).catch(e => {
                reject({ message: e.message })
            })
        }
        catch (e) {
            console.log("error", e)
            reject({ message: e.message })
        }
    })
}

let getBySkipAndLimit = (req) => {
    return new Promise(async (resolve, reject) => {
        try {
            let page = req.body.page
            let add = page * 5
            StudentModel.aggregate([{ $skip: add }, { $limit: 5 }]).then((res) => {
                resolve({
                    res,
                    message: "success"
                })
            }).catch(e => {
                reject({ message: e.message })
            })
        }
        catch (e) {
            console.log("error", e)
            reject({ message: e.message })
        }
    })
}

let getByfacet = (req) => {
    return new Promise(async (resolve, reject) => {
        try {
            let page = req.body.page
            let add = page
            StudentModel.aggregate([{
                $facet: {
                    "docs": [{ $skip: add }, { $limit: 5 }],
                    "total": [
                        { $count: "total documents" }
                    ]
                }
            }]).then((res) => {
                resolve({
                    res,
                    message: "success"
                })
            }).catch(e => {
                reject({ message: e.message })
            })
        }
        catch (e) {
            console.log("error", e);
            reject({ message: e.message })
        }
    })
}


let getRepeatedHistoryMarks = (req) => {
    return new Promise(async (resolve, reject) => {
        try {
            StudentModel.aggregate([{
                $lookup: {
                    from: "marks",
                    localField: "_id",
                    foreignField: "studentId",
                    as: "studentMarks"

                }
            }, {
                $group: {
                    "_id": { "historyMarks": "$studentMarks.history" },
                    "studentDetails": {
                        $push: {
                            "studentId": "$_id", "firstName": "$firstName", "lastName": "$lastName",
                            "email": "$email"

                        }
                    },


                    repeated: { $sum: 1 }
                },

            },
            {
                $match: {
                    _id: { $ne: null },
                    repeated: { $gte: 2 }
                }
            }]).then((res) => {
                resolve({
                    res,
                    message: "success"
                })
            }).catch(e => {
                reject({ message: e.message })
            })
        }
        catch (e) {
            console.log("error", e)
            reject({ message: e.message })
        }
    })
}

let getRepeatedMathsMarks = (req) => {
    return new Promise(async (resolve, reject) => {
        try {
            StudentModel.aggregate([{
                $lookup: {
                    from: "marks",
                    localField: "_id",
                    foreignField: "studentId",
                    as: "studentMarks"
                }
            },
            {
                $group: {
                    _id: { "mathsMarks": "$studentMarks.maths" },
                    "studentDetails": {
                        $push: { "studentId": "$_id", "firstName": "$firstName", "lastName": "$lastName", "email": "$email" }
                    },
                    "repeated": { $sum: 1 }
                }
            }, {
                $match: {
                    _id: { $ne: null },
                    repeated: { $gte: 2 }
                }
            }
            ]).then((res) => {
                resolve({
                    res,
                    message: "success"
                })
            }).catch(e => { reject({ message: e.message }) })
        }
        catch (e) {
            console.log("error", e);
            reject({ message: e.message })
        }
    })
}
let getRepeatedPhysicsMarks = (req) => {
    return new Promise(async (resolve, reject) => {
        try {
            StudentModel.aggregate([{
                $lookup: {
                    from: "marks",
                    localField: "_id",
                    foreignField: "studentId",
                    as: "studentMarks"
                }
            },
            {
                $group: {
                    _id: { "physicsMarks": "$studentMarks.physics" },
                    "studentDetails": {
                        $push: { "studentId": "$_id", "firstName": "$firstName", "lastName": "$lastName", "email": "$email" }
                    },
                    "repeated": { $sum: 1 }
                }
            }, {
                $match: {
                    _id: { $ne: null },
                    repeated: { $gte: 2 }
                }
            }
            ]).then((res) => {
                resolve({
                    res,
                    message: "success"
                })
            }).catch(e => { reject({ message: e.message }) })
        }
        catch (e) {
            console.log("error", e);
            reject({ message: e.message })
        }
    })
}

let getBySearch = (req) => {
    return new Promise(async (resolve, reject) => {
        try {
            let text = req.body.text
            //  siddu I love nature, food. I am also a keen learner of programming
            StudentModel.find({ $text: { $search: text } }).then((res) => {
                resolve({
                    res,
                    message: "success"
                })
            }).catch(e => {
                reject({ message: e.message })
            })
        }
        catch (e) {
            console.log("error", e)
            reject({ message: e.message })
        }
    })
}

let getByRegularExpression = (req) => {
    return new Promise(async (resolve, reject) => {
        try {
            let text = req.body.text
            //  StudentModel.aggregate([{
            //     $project:{name:{$concat:["$firstName"," ","$lastName"]},_id:1}
            //  },{$match:{name:{$regex:text,$options:"i"}}}])

            StudentModel.find({
                $or:
                    [{ "firstName": { $regex: text } }, { "lastName": { $regex: text } }]
            }).then((res) => {
                if (res.length > 0) {
                    resolve({
                        res,
                        message: "success"
                    })
                }
                else {
                    reject({ message: "text not available" })
                }
            }).catch(e => {
                reject({ message: e.message })
            })
        }
        catch (e) {
            console.log("error", e);
            reject({ message: e.message })
        }
    })
}

let updateAddress = (req) => {
    return new Promise(async (resolve, reject) => {
        try {
            let address = req.body.permanentAdress
            StudentModel.updateOne({ "adress.permanentAdress": address }, {
                $set: {
                    "adress.$.permanentAdress": "southAfrica"
                }
            }).then((res) => {
                resolve({
                    res,
                    message: "updated Address"
                })
            }).catch(e => { reject({ message: e.message }) })
        }
        catch (e) {
            console.log("error", e)
            reject({ message: e.message })
        }
    })
}

let getByIdJsonToCsv = (req) => {

    return new Promise(async (resolve, reject) => {
        try {
            let student = req.params.studentId
            StudentModel.findById({ _id: student }).then(result => {

                resolve({ result })
                //  return result
            }).catch(e =>
                reject({
                    mesage: e.message
                }))
        }
        catch (e) {
            console.log("error", e)
            reject({ mesage: e.mesage })
        }

    })
}

let JsonToCsvConverter = (req) => {
    return new Promise(async (resolve, reject) => {
        try {

            StudentModel.aggregate([{
                $lookup: {
                    from: "marks",
                    localField: "_id",
                    foreignField: "studentId",
                    as: "studentMarks"
                }
            },
            {
                $unwind: "$studentMarks"
            },

            {
                $project: {
                    "_id": 0,
                    "firstName": 1,
                    "lastName": 1,
                    "studentMarks": 1
                }
            }
            ]).then((res) => {
                //console.log(res)
                resolve({
                    res,
                    message: "lookup details success"
                })
            }).catch(e => {
                reject({ message: e.message })
            })
        }
        catch (e) {
            console.log("error", e)
            reject({ message: e.message })
        }
    })
}


let JsonToPdfConverter = (req) => {
    return new Promise(async (resolve, reject) => {
        try {

            StudentModel.aggregate([{
                $lookup: {
                    from: "marks",
                    localField: "_id",
                    foreignField: "studentId",
                    as: "studentMarks"
                }
            },
            {
                $unwind: "$studentMarks"
            },

            {
                $project: {
                    "_id": 0,
                    "firstName": 1,
                    "lastName": 1,
                    "studentMarks": 1
                }
            }
            ]).then((res) => {
                //console.log(res)
                resolve({
                    res,
                    message: "lookup details success"
                })
            }).catch(e => {
                reject({ message: e.message })
            })
        }
        catch (e) {
            console.log("error", e)
            reject({ message: e.message })
        }
    })
}


let HtmlToPdfConverter = (req) => {
    return new Promise(async (resolve, reject) => {
        try {

            StudentModel.aggregate([{
                $lookup: {
                    from: "marks",
                    localField: "_id",
                    foreignField: "studentId",
                    as: "studentMarks"
                }
            },
            {
                $unwind: "$studentMarks"
            },

            {
                $project: {
                    "_id": 0,
                    "firstName": 1,
                    "lastName": 1,
                    "studentMarks": 1
                }
            }
            ]).then((res) => {
                //console.log(res)
                resolve({
                    res,
                    message: "lookup details success"
                })
            }).catch(e => {
                reject({ message: e.message })
            })
        }
        catch (e) {
            console.log("error", e)
            reject({ message: e.message })
        }
    })
}

let JsonToGoogleSheets = (req) => {
    return new Promise(async (resolve, reject) => {
        try {

            StudentModel.aggregate([{
                $lookup: {
                    from: "marks",
                    localField: "_id",
                    foreignField: "studentId",
                    as: "studentMarks"
                }
            },
            {
                $unwind: "$studentMarks"
            },

            {
                $project: {
                    "_id": 0,
                    "firstName": 1,
                    "lastName": 1,
                    "studentMarks": 1
                }
            }
            ]).then((res) => {
                //console.log(res)
                resolve({
                    res,
                    message: "lookup details success"
                })
            }).catch(e => {
                reject({ message: e.message })
            })
        }
        catch (e) {
            console.log("error", e)
            reject({ message: e.message })
        }
    })
}



let excelToJson=(req,res)=>{
    return new Promise(async(resolve,reject)=>{
       //console.log(req)
        try{
            let count=0

   for(let i=0;i<req.length;i++){
    
let uniqueDetails= await StudentModel.findOne({email:req[i].email})
    // console.log(uniqueDetails)
   
     if(!uniqueDetails){
        count++
     await  StudentModel.create(req[i])
     }
     
      }
      //console.log(count)
      if(count==req.length)
        res.send({message:"all are unique records and inserted into database"})
        else if(count==0)
        res.send({message:"all are duplicate records"})
        else if (count<= req.length)
        res.send({message:"few duplicate records are present and other unique records inserted"})
       
    }

        catch(e){
            console.log("error",e)
            reject({message:e.message})
        }
    })
}

module.exports = {
    addStudent, addMultipleStudent, existStudent, getById, getByfindOne, firstNameAndLastName, getByIdAndUpdate, getUpdate, getBYIdAndDelete, getByMatch, getByAndOperator, getByInOperator, getByEqual, getByNotEqual, getByExpr, getByNotIn, getByCondition, getByLookup, getByLookupAndMatch, getBySkipAndLimit, getByfacet, getRepeatedHistoryMarks, getRepeatedMathsMarks, getRepeatedPhysicsMarks, getBySearch,
    getByRegularExpression, updateAddress, getByIdJsonToCsv, JsonToCsvConverter, JsonToPdfConverter, HtmlToPdfConverter,JsonToGoogleSheets,excelToJson
}