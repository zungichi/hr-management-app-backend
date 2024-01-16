if (process.env.NODE_ENV != 'production'){
    require('dotenv').config();
}

const passport = require('passport');
const mongoose = require('mongoose');
const {User, UserRole, UserInfo, Position, Department, SupervisorMap} = require('../models/user');
const { user_role, position, department, employee, adminInfo, } = require('./usersInit');

const DB_USERNAME = encodeURIComponent(process.env.DB_USERNAME)
const DB_PASSWORD = encodeURIComponent(process.env.DB_PASSWORD)

const dbUrl = `mongodb+srv://${DB_USERNAME}:${DB_PASSWORD}@hr-management.aw4qonc.mongodb.net/hr-management`;

mongoose.connect(dbUrl);

const db = mongoose.connection;
db.on('error', console.error.bind(console, "connection error:"));
db.once('open', () => {
    console.log("Database connected");
});

const genUserRole = async () => {
    await UserRole.deleteMany({});
    await UserRole.insertMany([{role_name:'admin'},{role_name:'user'}])
        .then((res)=>{console.log('Gen user done')})
        .catch((err)=>{console.log(err)});
}

const genPosition = async () => {
    await Position.deleteMany({});
    for (const el of position){
        const pos = new Position({level:el.level,position_name:el.position_name});
        await pos.save().then(() => {console.log('Gen position done')});
    }
}

const genDepartment = async () => {
    await Department.deleteMany({});
    for (const el of department){
        const dep = new Department({department_name:el});
        await dep.save().then(()=>{console.log('Gen department done')});
    }
}

const genUser = async () => {
    await User.deleteMany({});
    await UserInfo.deleteMany({});
    // gen admin
    for (const el of adminInfo){
        const userID = await addUser(el.firstname.toLowerCase(), '1234@abcd', 'admin');
        const positionID = await Position.findOne({level:el.level});
        const departmentID = await Department.findOne({department_name:el.department})
        const Info = new UserInfo({
            usercode:el.usercode,
            firstname:el.firstname,
            lastname:el.lastname,
            phone:el.phone,
            birthdate:el.birthdate,
            userID:userID._id,
            positionID:positionID._id,
            departmentID:departmentID._id
        })
        await Info.save();
    }
    // gen user
    for (const el of employee){
        console.log(el.firstname);
        const userID = await addUser(el.firstname.toLowerCase(), '1234@abcd', 'user');
        const positionID = await Position.findOne({level:el.level});
        const departmentID = await Department.findOne({department_name:el.department});
        if (!departmentID){
            deptID = null
        }
        else{
            deptID = departmentID._id;
        }
        const Info = new UserInfo({
            usercode:el.usercode,
            firstname:el.firstname,
            lastname:el.lastname,
            phone:el.phone,
            birthdate:el.birthdate,
            userID:userID._id,
            positionID:positionID._id,
            departmentID:deptID
        })
        await Info.save();
    }
}

const genSupervisor = async () => {
    for (const el of adminInfo){
        const subID = await UserInfo.findOne({firstname:el.firstname});
        const supID = await UserInfo.findOne({firstname:el.approver});
        const Supervisor = new SupervisorMap({subID:subID._id,supID:supID._id});
        await Supervisor.save();
        console.log('Gen supervisor');
    }
    for (const el of employee){
        const subID = await UserInfo.findOne({firstname:el.firstname});
        const supID = await UserInfo.findOne({firstname:el.approver});
        const Supervisor = new SupervisorMap({subID:subID._id,supID:supID._id});
        await Supervisor.save();
        console.log('Gen supervisor');
    }
}

const addUser = async (username, password, role) => {
    try{
        const email = username + '@gmail.com';
        const userRole = await UserRole.findOne({role_name:role});
        if (!userRole){
            console.log('Cannot find user role')
            return null;
        }
        const user = new User({username: username, email: email, roleID: userRole._id});
        const userRegister = await User.register(user, password);
        console.log('Add user success!!');
        return userRegister;
    }
    catch(err){
        console.log(err);
        return null
    }
}

const genNewDB = async() => {
    await genUserRole();
    await genPosition();
    await genDepartment();
    await genUser();
    await genSupervisor();
}

genNewDB()