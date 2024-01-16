const userModel= require('../models/user');

const isLogin = (req, res, next) => {
    if (req.isAuthenticated() === false){
        return res.json({ret:false,msg:'You has not logged in',data:null});
    }
    next();
}

const isAdmin = async (req, res, next) => {
    if (req.user){
        const userRole = await userModel.UserRole.findById(req.user.roleID);
        if (!userRole){
            return res.json({ret:false,msg:"Cannot find role ID",data:null});
        }
        if (userRole.role_name === 'admin'){
            next()
        }
        else{
            return res.json({ret:false,msg:"You don't have permission",data:null});
        }
    }
    else{
        return res.json({ret:false,msg:'You has not logged in',data:null});
    }
}

module.exports = {isLogin, isAdmin};