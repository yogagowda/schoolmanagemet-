const multer = require('multer')
const storageImage=multer.diskStorage({
    destination:(req,file,cb)=>{
        cb(null,'uploads')
    },
    filename:(req,file,cb)=>{
        
        const ext=file.mimetype.split('/')[1]
        cb(null,`files/admin-${file.fieldname}--${Date.now()}.${ext}`)
    }
})

const fileFilter = (req,file,cb) => {
    
    if(file.mimetype==='image/jpeg'||file.mimetype==='image/png'||file.mimetype==='image/jpg'||file.mimetype==='application/pdf'){
cb(null,true)
    }
    else{
return cb(new Error("Unsupported format"))
    }
}

const uploadImage = multer({
    storage:storageImage,
    fileFilter:fileFilter
})



const storageVideo = multer.diskStorage({
    destination:function(req,file,cb){
        cb(null,'videoUpload')
    },
    filename:function(req,file,cb){

        const ext=file.mimetype.split('/')[1]
        cb(null,`files/admin-${file.fieldname}--${Date.now()}.${ext}`)
    }
})

const fileFilterVideo = (req,file,cb) => {
    if(file.mimetype==='video/mp4'){
        
        cb(null,true)
    }else{
        
        return cb(new Error("Not a Video"))
    }
}

const uploadVideo=multer({
    storage:storageVideo,
    fileFilter:fileFilterVideo
})

module.exports = {uploadImage, uploadVideo};