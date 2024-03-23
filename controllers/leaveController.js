const {LeaveRequestModel, LeaveTypeModel, LeaveStatusModel} = require('../models/leave');

module.exports.leaveRequest = async (req, res) => {
    const leaveInfo = req.body;
    const leaveRequestModel = new LeaveRequestModel({
        req_userID: req.user._id,
        leave_start: leaveInfo.leave_start,
        leave_end: leaveInfo.leave_end,
        leave_typeID: leaveInfo.leave_typeID,
        leave_status: leaveInfo.leave_status
    });
    await leaveRequestModel.save().then(() => {
        res.json({res:true, msg:'Leave Requested Success', data:leaveRequestModel})
    }).catch(err => {
        res.json({res:false, msg:err.message, data:null})
    })
};

module.exports.leaveInfo = async (req, res) => {
    const leaveRequest = await LeaveRequestModel.find({
        req_userID: req.user._id
    })
    res.json({res:true, msg:'Leave Information', data:leaveRequest});
};