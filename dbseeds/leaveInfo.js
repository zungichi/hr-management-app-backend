if (process.env.NODE_ENV != 'production'){
    require('dotenv').config();
}

const mongoose = require('mongoose');
const {LeaveRequestModel, LeaveTypeModel, LeaveStatusModel} = require('../models/leave');

const DB_USERNAME = encodeURIComponent(process.env.DB_USERNAME)
const DB_PASSWORD = encodeURIComponent(process.env.DB_PASSWORD)

const dbUrl = `mongodb+srv://${DB_USERNAME}:${DB_PASSWORD}@hr-management.aw4qonc.mongodb.net/hr-management`;

mongoose.connect(dbUrl);

const db = mongoose.connection;

db.on('error', console.error.bind(console, "connection error:"));
db.once('open', () => {
    console.log("Database connected");
});

const leaveType = [
    {
        type_name: 'Private Leave'
    },
    {
        type_name: 'Annual Leave'
    },
    {
        type_name: 'Sick Leave'
    }
];
const leaveStatus = [
    {
        status: 1,
        status_name: 'Requested'
    },
    {
        status: 2,
        status_name: 'Approved'
    },
    {
        status: 3,
        status_name: 'Rejected'
    },
    {
        status: 4,
        status_name: 'Cancel'
    }
]

const genLeaveType = async () => {
    await LeaveTypeModel.deleteMany({});
    for (el of leaveType){
        const leaveTypeModel = new LeaveTypeModel({type_name:el.type_name});
        await leaveTypeModel.save().then(() => {console.log('Gen leave type')})
    }
};

const getLeaveStatus = async () => {
    await LeaveStatusModel.deleteMany({});
    for (el of leaveStatus){
        const leaveStatusModel = new LeaveStatusModel({
            status: el.status,
            status_name: el.status_name
        });
        await leaveStatusModel.save().then(() => {console.log('Gen leave status')})
    }
}

const genLeave = async () => {
    await genLeaveType();
    await getLeaveStatus();
}

genLeave();