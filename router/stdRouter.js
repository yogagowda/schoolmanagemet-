const express = require('express')
const router = express.Router()
let userController = require('../controller/stdController')
const jwt = require('jsonwebtoken')
let secretKey = "yogaNgowda"
const { uploadImage, uploadVideo } = require('../middleware/multer')
const sendMail = require('../middleware/nodemailer')
const { Parser } = require('json2csv')
const fs= require('fs')
const { jsPDF } = require('jspdf')
const autoTable = require('jspdf-autotable');
const htmlTopdf = require('html-pdf')
const { GoogleSpreadsheet } = require('google-spreadsheet');
const {GoogleAuth} = require('google-auth-library')
const {google} =require('googleapis')
const xlsx = require('xlsx')



router.post('/addManyStudent', (req, res) => {
    userController.addMultipleStudent(req).then((data) => {
        res.status(200).send(data)
    }).catch(e => res.status(500).send({
        message: e.message
    }))
})

router.post('/existStudent', (req, res) => {
    userController.existStudent(req).then((data) => {
        res.status(200).send(data)
    }).catch(e => res.status(500).send({
        message: e.message
    }))
})
router.get('/getStudentId/:studentId', (req, res) => {

    userController.getById(req).then((data) => {
        res.status(200).send(data)
    }).catch(e => res.status(500).send({
        message: e.message
    }))
})

router.get('/findOne/:studentName', (req, res) => {
    userController.getByfindOne(req).then((data) => {
        res.status(200).send(data)
    }).catch(e => res.status(500).send({
        message: e.message
    }))
})

router.get('/findTwoNames/:firstName/:lastName', (req, res) => {
    userController.firstNameAndLastName(req).then((data) => {
        res.status(200).send(data)
    }).catch(e => res.status(500).send({
        message: e.message
    }))
})
router.put('/updateStudentId/', (req, res) => {
    userController.getByIdAndUpdate(req).then((data) => {
        res.status(200).send(data)
    }).catch(e => res.status(500).send({
        message: e.message
    }))
})

router.put('/updateStudent/:firstName', (req, res) => {

    userController.getUpdate(req).then((data) => {
        res.status(200).send(data)
    }).catch(e => res.status(500).send({
        message: e.message
    }))
})

router.delete('/deleteStudent/', (req, res) => {
    userController.getBYIdAndDelete(req).then((data) => {
        res.status(200).send(data)
    }).catch(e => res.status(500).send({
        message: e.message
    }))
})

router.get('/matchedStudent/', (req, res) => {
    userController.getByMatch(req).then((data) => {
        res.status(200).send(data)
    }).catch(e => res.status(500).send({
        message: e.message
    }))
})
router.get('/getByOr/', (req, res) => {
    userController.getByAndOperator(req).then((data) =>
        res.status(200).send(data)).catch(e => res.status(500).send({
            message: e.message
        }))
})
router.get('/getByIn/', (req, res) => {
    userController.getByInOperator(req).then((data) =>
        res.status(200).send(data)).catch(e => res.status(500).send({
            message: e.message
        }))
})

router.get('/getByEqual/', (req, res) => {
    userController.getByEqual(req).then((data) =>
        res.status(200).send(data)).catch(e => res.status(500).send({
            message: e.message
        }))
})

router.get('/getByNotEqual/', (req, res) => {
    userController.getByNotEqual(req).then((data) =>
        res.status(200).send(data)).catch(e => res.status(500).send({
            message: e.message
        }))
})

router.get('/getByExpression/', (req, res) => {
    userController.getByExpr(req).then((data) =>
        res.status(200).send(data)).catch(e => res.status(500).send({
            message: e.message
        }))
})

router.get('/getByNotIn/', (req, res) => {
    userController.getByNotIn(req).then((data) =>
        res.status(200).send(data)).catch(e => res.status(500).send({
            message: e.message
        }))
})

router.get('/getByCondition/', (req, res) => {
    userController.getByCondition(req).then((data) =>
        res.status(200).send(data)).catch(e => res.status(500).send({ message: e.message }))
})

router.get('/getByLookup/', (req, res) => {
    userController.getByLookup(req).then((data =>
        res.status(200).send(data))).catch(e => res.status(500).send({ message: e.message }))
})

router.get('/getByLookupAndMatch/', (req, res) => {
    userController.getByLookupAndMatch(req).then((data =>
        res.status(200).send(data))).catch(e => res.status(500).send({ message: e.message }))
})

router.get('/getBySkipAndLimit/', (req, res) => {
    userController.getBySkipAndLimit(req).then((data =>
        res.status(200).send(data))).catch(e => res.status(500).send({ message: e.message }))
})

router.get('/getByFacet/', (req, res) => {
    userController.getByfacet(req).then((data =>
        res.status(200).send(data))).catch(e => { res.status(500).send({ message: e.message }) })
})

router.get('/getByRepeatedHistoryMarks/', (req, res) => {
    userController.getRepeatedHistoryMarks(req).then((data =>
        res.status(200).send(data))).catch(e => { res.status(500).send({ message: e.message }) })
})

router.get('/getByRepeatedMathsMarks/', (req, res) => {
    userController.getRepeatedMathsMarks(req).then((data =>
        res.status(200).send(data))).catch(e => { res.status(500).send({ message: e.message }) })
})

router.get('/getByRepeatedPhysicsMarks/', (req, res) => {
    userController.getRepeatedPhysicsMarks(req).then((data =>
        res.status(200).send(data))).catch(e => { res.status(500).send({ message: e.message }) })
})

router.get('/getBySearch/', (req, res) => {
    userController.getBySearch(req).then((data =>
        res.status(200).send(data))).catch(e => { res.status(500).send({ message: e.message }) })
})

router.get('/getByRegularExpression/', (req, res) => {
    userController.getByRegularExpression(req).then((data =>
        res.status(200).send(data))).catch(e => { res.status(500).send({ message: e.message }) })
})

router.put('/updateAddress/', (req, res) => {
    userController.updateAddress(req).then((data) =>
        res.status(200).send((data))).catch(e => { res.status(500).send({ message: e.message }) })
})

router.post('/generateToken', (req, res) => {
    let owner = {
        "userName": "yoganarasimhegowda@zibtek.in",
         password: "Yoga@1995gowda"
    }
    jwt.sign({ owner }, secretKey, { expiresIn: "3d" }, (error, token) => {
        res.send(token)
    })
})

router.post('/addStudent', verifyToken, (req, res) => {
    userController.addStudent(req).then((data) =>
        res.status(200).send((data))).catch(e => { res.status(500).send({ message: e.message }) })
})

function verifyToken(req, res, next) {
    let bearerHeader = req.headers['authorization']
    console.log("bearerHeader >>", bearerHeader)
    if (typeof bearerHeader !== 'undefined') {
        const bearer = bearerHeader.split(" ")
        const token = bearer[1]
        jwt.verify(token, secretKey, (error, authData) => {
            if (error) {
                console.log("error=====",error)
                res.send({ message: "token not valid" })
            }
            next()
        })
    }
    else {
        res.status(401).send({ message: "token not provided" })
    }

}

const uploadMultipleImage = uploadImage.array('myFile')

router.post('/uploadMultipleImage', function (req, res) {
    uploadMultipleImage(req, res, function (err) {

        if (err) {
            return res.status(400).send({ message: err.message })
        }



        res.status(200).send({
            message: "file uploaded successfully"
        })
    })
})

const uploadMultipleVideo = uploadVideo.array('myVideo')

router.post('/uploadMultipleVideos', function (req, res) {
    uploadMultipleVideo(req, res, function (err) {

        if (err) {
            return res.status(400).send({ message: err.message })
        }
        res.status(200).send({
            message: "video uploaded successfully"
        })
    })
})

router.get('/implementNodemailer', sendMail)

// router.get('/JsonToCsvConverter/:studentId', async (req, res) => {

//     userController.getByIdJsonToCsv(req).then((data) => {

//         const parserObj= new Parser()
//         const csv=parserObj.parse(data)

//         fs.writeFileSync('data.csv',csv)

//         }).catch(e => res.status(500).send({
//             message: e.message
//         }))
// })


router.get('/JsonToCsvConverter/', async (req, res) => {

    userController.JsonToCsvConverter(req).then((data) => {
        // console.log(data.res)

        let data1 = [];
        let studendObj = {};
        // console.log(data)
        data.res.map(obj => {
            studendObj = {
                firstName: obj.firstName,
                lastName: obj.lastName,
                history: obj.studentMarks.history,
                maths: obj.studentMarks.maths,
                physics: obj.studentMarks.physics,
            }
            data1.push(studendObj);
        }
        )

        let fields = ['firstName', 'lastName', 'history', 'maths', 'physics']
        var convert = new Parser({ fields })
        var csv = convert.parse(data1)
        fs.writeFileSync('data.csv', csv)
        res.status(200).send(csv)


    }).catch(e => res.status(500).send({
        message: e.message
    }))
})


router.get('/JsonToPdfConverter/', async (req, res) => {

    userController.JsonToPdfConverter(req).then((data) => {
        let data1 = [];
        let studendObj = {};
        // console.log(data)
        data.res.map(obj => {
            studendObj = {
                firstName: obj.firstName.trim(),
                lastName: obj.lastName.trim(),
                history: obj.studentMarks.history.toString(),
                maths: obj.studentMarks.maths.toString(),
                physics: obj.studentMarks.physics.toString(),
            }
            data1.push(studendObj);
        }
        )
        var headers = ['firstName', 'lastName', 'history', 'maths', 'physics'];

        var doc = new jsPDF({ putOnlyUsedFonts: true, orientation: 'landscape' });


        doc.table(50, 1, data1, headers, { autoSize: true, fontSize: 10 });

        doc.save('new.pdf')

        res.status(200).send(data1)


    }).catch(e => res.status(500).send({
        message: e.message
    }))
})


router.get('/HtmlToPdfConverter/', async (req, res) => {

    userController.HtmlToPdfConverter(req).then((data) => {
        let data1 = [];
        let studendObj = {};
        // console.log(data)
        data.res.map(obj => {
            studendObj = {
                firstName: obj.firstName.trim(),
                lastName: obj.lastName.trim(),
                history: obj.studentMarks.history.toString(),
                maths: obj.studentMarks.maths.toString(),
                physics: obj.studentMarks.physics.toString(),
            }
            data1.push(studendObj);
        }
        )


        var html = generateHtmlContent(data1);

        let options = {
            format: "A4",
        };
        htmlTopdf
            .create(html, options)
            .toFile(`htmlToPdf.pdf`, function (err, res) {
                if (err) return console.log(err);
                else {
                    // resolve();
                }
            });

        res.status(200).send({ message: "Html to Pdf Generation done Successfully" })

    }).catch(e => res.status(500).send({
        message: e.message
    }))
})

function generateHtmlContent(data1) {
    try {
        let htmlresult = "";
        for (let i = 0; i < data1.length; i++) {
            htmlresult += '<tr> <td>' + data1[i].firstName + '</td><td>' + data1[i].lastName + '</td><td>' + data1[i].history + '</td><td>' + data1[i].maths + '</td><td>' + data1[i].physics + '</td></tr>'
        }


        let pdfBody = `<!DOCTYPE html>
        <html>
        <head>
        <style>
        table {
          font-family: arial, sans-serif;
          border-collapse: collapse;
          width: 100%;
        }
        
        td, th {
          border: 1px solid #dddddd;
          text-align: left;
          padding: 8px;
        }
        
        tr:nth-child(even) {
          background-color: #dddddd;
        }
        .center {
            display: block;
            margin-left: auto;
            margin-right: auto;
            width: 50%;
          }
          h2{
            text-align:center;
          }
        </style>
        </head>
        <body>
        <img src="http://localhost:3000/zibLogo.png" class="center" alt='not found' ></img>
        <h2>Custom Software</h2>
        
        <table>
          <tr>
            <th>FirstName</th>
            <th>LastName</th>
            <th>History</th>
            <th>Maths</th>
            <th>Physics</th>
          </tr>${htmlresult}
          
        </table>
        
        </body>
        </html> `

        return pdfBody
    } catch (e) {
        return e.message
    }

}
const id='18XQmBjGDG8FueP9AuzVuZfUJKNsJbCLoJQOnlyTMSqQ'

router.get('/JsonToGoogleSheets/',  (req, res) => {
    userController.JsonToGoogleSheets(req).then(async(data) =>{
       let data1 = [];
        let studendObj = {};

        data.res.map(obj => {
            studendObj = {
                firstName: obj.firstName,
                lastName: obj.lastName,
                history: obj.studentMarks.history,
                maths: obj.studentMarks.maths,
                physics: obj.studentMarks.physics,
            }
            data1.push(studendObj);
        })
        //console.log(data1)
         var result=[]
         
         
        for(let i=0;i<data1.length;i++){
            if(i==0){
           result.push(Object.keys(data1[i]))
           result.push(Object.values(data1[i]))
            }else{
                result.push(Object.values(data1[i]))
            }
        }
        //console.log(result)
        try{
            const {sheets}= await authentication()
            const response = await sheets.spreadsheets.values.update({
            spreadsheetId:id,
            range:'Sheet1',
            valueInputOption:'RAW',
            resource:{
                values:result
            }    
            })

            if(response.status==200){
            return res.json({message:"successsfully data entered into spreadsheet"})
        }
        return res.json({message:"something went wrong"})
    }

        catch(e)
        {
            console.log(e)
            res.status(500).send({message:e.message})
        }
    
 }).catch(e => {
           console.log("error",e)
         res.status(500).send({ message: e.message }) })
})


const authentication = async()=>{
    const auth = new google.auth.GoogleAuth({
        keyFile:"Credentials.json",
        scopes:"https://www.googleapis.com/auth/spreadsheets"
    })
    const client =await auth.getClient()

    const sheets= google.sheets({
        version:'v4',
        auth:client
    })
    return {sheets}
}


router.post('/importExcel',async(req,res)=>{

    try{
    // reading file from the path

    
    let xlFile=xlsx.readFile("Book1.xlsx")

    // extract data in sheet

    let sheet=xlFile.Sheets[xlFile.SheetNames[0]]

    // convert into json

    let p_JSON = xlsx.utils.sheet_to_json(sheet)
    //console.log(p_JSON)
    let data1=[]
    let studendObj = {};

    p_JSON.map(obj => {
        studendObj = {
            firstName: obj.firstName,
            lastName: obj.lastName,
            rollno:obj.rollno,
            adress:[{permanentAdress:obj.permanentAdress,
            temporaryAdress:obj.temporaryAdress}],
            class:obj.class,
            email:obj.email
        }
        data1.push(studendObj);
    })
//console.log(data1)
//res.status(200).send(data1)

      userController.excelToJson(data1,res).then((data) =>
      res.status(200).send((data))).catch(e => { res.status(500).send({ message: e.message }) })
    }
    catch(e){
        console.log("error",e)
        res.status(500).send({message:e.message})
    }

})

module.exports = router