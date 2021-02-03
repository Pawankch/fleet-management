const mongoose = require('mongoose')
const mongoConnection = require('./mongo')
const Schema = mongoose.Schema

const userAttendanceSchema = new Schema({
    driverName: {
        type: String
    },
    driverId: {
        type: String,
        required: true,
        lowercase:true,
        trim:true
    },
    driverInTime: {
        type: Date
    },
    driverOutTime: {
        type: Date
    },
    vehicleNumber: {
        type: String
    },
    tripInTime: {
        type: Date
    },
    tripOutTime: {
        type: Date
    },
    isTripActive: {
        type: Boolean,
        default: false
    },
    numOfSentOrder: {
        type: Number
    },
    numOfSuccessOrder: {
        type: Number
    },
    numOfCancelledOrder: {
        type: Number
    },
    numOfReturnedOrder: {
        type: Number
    },
    scheduledtrip:{
        type:String
    },
    isActive: {
        type: Boolean,
        default: false
    }
}, {
    timestamps: true
})


//const userMarking = mongo.mongodb_connect.model('userAttendance',userAttendanceSchema,'userAttedance')
module.exports = mongoConnection.model('userAttendance', userAttendanceSchema, 'userAttendance')