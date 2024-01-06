const passport = require('passport');
const {User, UserRole} = require('../models/user');

module.exports.addUser = async (req, res) => {
    try{
        const {username, password, email} = req.body;
        const userRole = await UserRole.findOne({role_name:'user'});
        if (!userRole){
            res.json({ret:false, msg:'Cannot find user role', data:null});
            return;
        }
        const user = new User({username: username, email: email, roleID: userRole._id});
        const userRegister = await User.register(user, password);
        res.json({ret:true, msg:'Register user success', data:{username: username}});
    }
    catch(err){
        res.json({ret:false, msg:err.message, data:null});
    }
}

module.exports.getAllUser = async (req, res) => {
    try{
        const users = await User.find().populate({path:'roleID'});
        res.json({ret:true, msg:'Get users success', data:users});
    }
    catch(err){
        res.json({ret:false, msg:err.message, data:null});
    }
}

module.exports.login = (req, res) => {
    passport.authenticate('local', (err, user, info) => {
        if (err){
            return res.json({ret:false, msg:err.message, data:null});
        }
        if (!user){
            return res.json({ret:false, msg:'Login Failed', data:null});
        }
        
        req.login(user, (err) => {
            if (err){
                return res.json({ret:false, msg:err.message, data:null});
            }
            return res.json({ret:true, msg:"Login Success", data:{username:user.username, roldID:user.roleID}});
        });
    })(req, res);
}

module.exports.logout = (req, res) => {
    req.logout((err) => {
        if (err){
            return res.json({ret:false, msg:err.message, data:null});
        }
        return res.json({ret:true, msg:"Logout Success", data:null});
    });
}