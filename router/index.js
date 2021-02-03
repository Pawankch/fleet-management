const express = require('express')
const router = express.Router()
const moment = require('moment')
const UserAttendance = require('../models/fleet')


router.get('/ping', (req, res) => {
    res.json('Server is up and running');
})

router.post('/markIn', async (req, res) => {

    if (req.body['driverId'] == null) {
        res.send({ message: "Driver Id is missing", response_code: 300 })
        return 0;
    }
    if (req.body['driverName'] == null) {
        res.send({ message: "Driver Name is missing", response_code: 300 })
        return 0;
    }
    // UserAttendance.findOne({
    //     driverId : req.body['driverId']
    // },
    // (err, data)=>{
    //     if(err){
    //         res.send({message:"Database Error"});
    //         return 0;
    //     }
    //     if(data.isActive){
    //         res.send({message:"This user has already marked in", response_code:300})
    //         return 0;
    //     }
    // })
    req.body['driverInTime'] = moment.now()
    console.log(moment.now())
    req.body['isActive'] = true;
    let record = new UserAttendance(req.body)
    record.save(function (err, data) {
        if (err) {
            res.json("Not Saved")
            return 0;
        }
        res.send({ message: "Marked In Successfully", response_code: 202 })

    })
})

router.post('/markOut', (req, res) => {

    if (req.body['driverId'] == null) {
        res.send({ message: "Driver Id is missing", response_code: 300 })
        return 0;
    }
    if (req.body['driverName'] == null) {
        res.send({ message: "Driver Name is missing", response_code: 300 })
        return 0;
    }
    UserAttendance.findOne({
        driverId: req.body['driverId'], isActive: true
    }, (err, data) => {
        if (err) {
            res.send({ message: "Database Error" })
            return 0;
        }
        if (data == null) {
            res.send({ message: "First Mark the Attendance", response_code: 202 })
            return 0;
        }
        data.userOutTime = moment.now()
        data.isActive = false;
        data.save();
        res.send({ message: "You have marked out successfully", response_code: 200 })
    })
})


router.post('/tripOut', (req, res) => {
    UserAttendance.findOne({
        driverId: req.body['driverId'], isActive: true
    },
        (err, data) => {
            if (err) {
                res.send({ message: "Database Error" })
                return 0;
            }
            if (data == null) {
                res.send({ message: "Data Not Found" })
                return 0;
            }
            let driver = {
                tripOutTime: moment.now(),
                driverId: data.driverId,
                driverName: data.driverName,
                driverInTime: data.driverInTime,
                isActive: data.isActive,
                isTripActive: true,
                numOfSentOrder: req.body['numOfSentOrder'],
                vehicleNumber: req.body['vehicleNumber']
            }
            let newEntry = new UserAttendance(driver)
            newEntry.save(function (err, data) {
                if (err) {
                    res.send({ message: "Cannot save" })
                    return 0;
                }

                res.send({ message: "Trip Out Successfully" })

            })
        })
})

router.post('/tripIn', (req, res) => {
    UserAttendance.findOne({
        driverId: req.body['driverId'], isActive: true, isTripActive: true
    },
        (err, data) => {
            if (err) {
                res.send({ message: "Database Error" })
                return 0;
            }
            if (data == null) {
                res.send({ message: "This trip was not started" });
                return 0;
            }
            data.tripInTime = moment.now();
            data.isTripActive = false;
            // data.vehicleNumbe = req.body['vehicleNumber'],
            data.numOfSuccessOrder = req.body['numOfSuccessOrder']
            data.numOfCancelledOrder = req.body['numOfCancelledOrder']
            data.numOfReturnedOrder = req.body['numOfReturnedOrder']
            data.save()
            res.send({ message: "Trip in successfully" })
        })

})
module.exports = router