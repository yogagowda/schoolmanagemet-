let markModel  = require('../model/markModel')
const {ObjectId}=require('mongoose').Types;

let addMarks = (req) => {
    console.log("--------------------",req.body);
    return new Promise(async (resolve, reject) => {
        try {
            let mark = new markModel({
               history:req.body.history,
               maths:req.body.maths,
               physics:req.body.physics,
               studentId:ObjectId(req.body.studentId)           
                })
                mark.save()
                .catch(e => reject({message: e.message}))

            resolve({
                mark,
                mesage: "Success"
            })  
           

        } catch (e) {
            console.log("errr",e);

            reject({
                mesage: e.message
            })
        }
    })
}


let getByMarks = (req) => { 
    return new Promise(async (resolve, reject) => {
        try {
            
            let student= req.query._id
            console.log(student)
            markModel.findById({ _id: student }).then(res => {
                console.log(res)
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


let getByIdJsonToCsv = (req) => { 
    return new Promise(async (resolve, reject) => {
        try {
            
            let student= req.params._id
        
            markModel.findById({ _id: student }).then(res => {
        
                resolve({
                    res
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






module.exports = {
    addMarks,getByMarks,getByIdJsonToCsv
}