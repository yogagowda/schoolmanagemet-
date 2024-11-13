const express = require('express')
const router = express.Router()
let markController = require('../controller/markController')
const {Parser} = require('json2csv');
const fs = require('fs')


router.post('/addMarks', (req, res) => {
    markController.addMarks(req).then((data) => {
        res.status(200).send(data)
    }).catch(e => res.status(500).send({
        message: e.message
    }))
})

router.get('/getByMarks', (req, res) => {

    markController.getByMarks(req).then((data) => {
        res.status(200).send(data)
    }).catch(e => res.status(500).send({
        message: e.message
    }))
})


router.get('/JsonToCsvConverter/:_id', async (req, res) => {

    markController.getByIdJsonToCsv(req).then((data) => {

        let data1 = [];
        data1.push(data.res);
 console.log(data1)
        
   let fields=['_id','history','maths','physics','studentId']
   var convert=new Parser({fields})
   var csv=convert.parse(data1)





        fs.writeFileSync('data.csv', csv)
         res.status(200).send(csv)


    }).catch(e => res.status(500).send({
        message: e.message
    }))
})




module.exports = router