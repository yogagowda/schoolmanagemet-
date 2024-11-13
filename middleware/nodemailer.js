const nodemailer=require('nodemailer')
const sendMail=async(req,res)=>{
    try{
    
 let testAccount= await nodemailer.createTestAccount()
 
 const transporter = nodemailer.createTransport({
    host: 'smtp.ethereal.email',
    port: 587,
    auth: {
        user: 'alisa63@ethereal.email',
        pass: '8UGNCjYawesCAPBBWe'
    }
})
 let info=await transporter.sendMail({
    from:'"Siddu Patil"<siddupatil1000@gmail.com>',
    to:"siddupatil101010@gmail.com",
    subject:"i have sent you mail",
    text:"hi ,i hope youre doing well"
 })
 res.json({message:"email sent successfully"})
}
 catch(e){
    console.log("error",e)
    res.json({message:e.message})
 }
}

module.exports=sendMail