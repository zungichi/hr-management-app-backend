const mongoose = require('mongoose');
const Schema = mongoose.Schema;

leaveRequestSchema = Schema({
    req_userID: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: 'user_info'
    },
    leave_start: {
        type: Date,
        required: true
    },
    leave_end: {
        type: Date,
        required: true
    },
    leave_typeID: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: 'leave_type'
    },
    leave_status: {
        type: Number,
        required: true
    }
});

leaveTypeSchema = Schema({
    type_name: {
        type: String,
        required: true
    }
});

leaveStatusSchema = Schema({
    status: {
        type: Number,
        required: true
    },
    status_name: {
        type: String,
        required: true
    }
});

const LeaveRequestModel = mongoose.model('leave_request', leaveRequestSchema, 'leave_request');
const LeaveTypeModel = mongoose.model('leave_type', leaveTypeSchema, 'leave_type');
const LeaveStatusModel = mongoose.model('leave_status', leaveStatusSchema, 'leave_status');

module.exports = {LeaveRequestModel, LeaveTypeModel, LeaveStatusModel};