let staffModel=require('../model/staffModel')
const mongoose=require('mongoose')
const md5=require('md5')

let registerStaff=(req)=>{
    return new Promise(async(resolve,reject)=>{
        try{

           let staffDetails = req.body
           let {userName} = staffDetails

           staffModel.find({userName:userName}).then((res)=>{
            if(res.length > 0){
                //console.log("userName already exists ")
                reject({message:"userName already exists"})
            }
            else{
                staffModel.create(staffDetails).then(
                    res=> resolve({
                        res,
                        message:"Details registered successfully"
                    })
                ).catch((e)=>{
                    console.log(e)
                    reject({message:e.message})
                })
            }
           }).catch((e)=>{
            console.log(e)
            reject({message:e.message})
           })
           
            
        }
        catch(e){
            console.log(e)
            reject({message:e.message})
        }
    })
}

let loginStaff=(req)=>{
return new Promise(async(resolve, reject) => {
    try{
        const user= await staffModel.findOne({userName:req.body.userName})
        if(user){
                
               
            const result =user.password === md5(req.body.password)
            if(result){
                resolve({
                    
                    message:"staff logged in successfully"
                })
            }
            else{
                reject({message:"please enter correct password"})
            }
          }  else {
            reject({message:"userName not registered"})
          }
    }  
    catch(e){
        console.log("error",e)
        reject({message:e.message})
    }
    
})
}

let staffAssigned=(req)=>{
    return new Promise(async (resolve,reject)=>{
        try{
             let studentclass=req.body.classAssigned
             //console.log(studentclass)
            staffModel.aggregate([
                {
                $match:{
               classAssigned:studentclass
                }
        },
        
        {
                $lookup:{
                    from:"students",
                    localField:"classAssigned",
                    foreignField:"class",
                    as:"studentDetails"
                }
            },
            {
                $unwind:"$studentDetails"
             },
             
           {
            $lookup:{
                from:"marks",
                localField:"studentDetails._id",
                foreignField:"studentId",
                as:"markDetails"
            }
           }
            ,{
             $unwind:"$markDetails"
           }
             ,
            {
                $group:{
                    "_id":{"staffName": "$firstName"
                },
                    "studentsAssigned":{
                        $push:{
                                
                                "StudentName":"$studentDetails.firstName",
                                "class":"$studentDetails.class",
                                "HistoryMarks":"$markDetails.history",
                                "MathsMarks":"$markDetails.maths",
                                "PhysicsMarks":"$markDetails.physics"

                                
                        }
                    }
                }
             }
             
            
            // {
            //     $project:{
            //         "_id":0,
            //         "userName":1,
            //         "studentDetails.firstName":1,
            //         "studentDetails.class":1,
            //         "markDetails.history":1,
            //         "markDetails.maths":1,
            //         "markDetails.physics":1
            //     }
            // }
         ])
        


        .then((res)=>{
            resolve({res,
            message:"staff assigned details fetched"})
        }).catch(e=>{
            reject({message:e.message})
        })
         }
        catch(e){
            console.log("error",e)
            reject({message:e.message})
        }
    })

}


module.exports={registerStaff,loginStaff,staffAssigned}