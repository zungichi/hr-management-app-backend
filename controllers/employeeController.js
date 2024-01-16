const userModel= require('../models/user');

module.exports.getEmployees = async (req, res) => {
    const userInfo = await userModel.UserInfo.find().populate({path:'positionID'}).populate({path:'departmentID'});
    res.json({res:true, msg:'Employee List', data:userInfo});
}

module.exports.addEmployee = async (req, res) => {
    const body = req.body;
    if (body.firstname && body.lastname && body.birthdate && body.positionID && body.departmentID){
        const addData = {
            usercode: Math.floor(Math.random() * 10000).toString().padStart(4, '0'),
            firstname: body.firstname,
            lastname: body.lastname,
            phone: body.phone ? body.phone : null,
            birthdate: body.birthdate,
            positionID: body.positionID,
            departmentID: body.departmentID
        }
        const userInfo = new userModel.UserInfo(addData);
        await userInfo.save()
            .then(() => res.json({res:true, msg:'Add employee success', data:userInfo}))
            .catch(err => {res.json({res:false, msg:`Error : ${err}`, data:null})})
    }
    else{
        res.json({res:false, msg:'Input data not complete', data:null});
    }
}

module.exports.deleteEmployee = async (req, res) => {
    const employeeID = req.params.employeeID;
    if (employeeID){
        const userInfo = await userModel.UserInfo.findByIdAndDelete(employeeID);
        res.json({res:true, msg:'Delete employee success', data:userInfo});
    }
    else{
        res.json({res:false, msg:'Input data not complete', data:null});
    }
}