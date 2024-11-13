const express = require('express')
const router = express.Router()
let staffController = require('../controller/staffController')
const { userValidationRules, validate } = require('../middleware/userValidator')

router.post('/registerStaff', (req, res) => {
    staffController.registerStaff(req).then((data) => {
        res.status(200).send(data)
    }).catch(e => res.status(500).send({
        message: e.message
    }))
})

router.post('/registerUsingValidator', validate(userValidationRules()), (req, res) => {
    // validate(req,res,next)
    staffController.registerStaff(req).then((data) => {
        res.status(200).send(data)
    }).catch(e => res.status(500).send({
        message: e.message
    }))
})


router.get('/loginStaff', (req, res) => {
    staffController.loginStaff(req).then((data) => {
        res.status(200).send(data)
    }).catch(e => res.status(500).send({
        message: e.message
    }))
})

router.get('/detailsOfStaffAssigned', (req, res) => {
    staffController.staffAssigned(req).then((data) => {
        res.status(200).send(data)
    }).catch(e => res.status(500).send({
        message: e.message
    }))
})

module.exports = router