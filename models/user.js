const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const passportLocalMongoose = require('passport-local-mongoose');

userRoleSchema = Schema({
    role_name: {
        type: String,
        required: true
    }
});

userSchema = Schema ({
    email: {
        type: String,
        required: true,
        unique: true
    },
    roleID: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: 'user_role'
    }
});
userSchema.plugin(passportLocalMongoose);

userInfoSchema = Schema({
    usercode: {
        type: String,
        required: true,
        unique: true
    },
    firstname: {
        type: String,
        required: true
    },
    lastname: {
        type: String,
        required: true
    },
    phone: {
        type: String
    },
    birthdate: {
        type: Date,
    },
    userID: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    positionID: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: 'position'
    },
    departmentID: {
        type: Schema.Types.ObjectId,
        ref: 'department'
    }
});

positionSchema = Schema({
    level: {
        type: Number,
        required: true
    },
    position_name: {
        type: String,
        required: true
    }
});

departmentSchema = Schema({
    department_name: {
        type: String,
        required: true
    }
});

supervisorMapSchema = Schema({
    subID: {
        type: Schema.Types.ObjectId,
        required: true
    },
    supID: {
        type: Schema.Types.ObjectId,
        required: true
    }
})

const UserRole = mongoose.model('user_role', userRoleSchema, 'user_role');
const User = mongoose.model('User', userSchema);
const UserInfo = mongoose.model('user_info', userInfoSchema, 'user_info');
const Position = mongoose.model('position', positionSchema, 'position');
const Department = mongoose.model('department', departmentSchema, 'department');
const SupervisorMap = mongoose.model('supervisor_map', supervisorMapSchema, 'supervisor_map');

module.exports = {User, UserRole, UserInfo, Position, Department, SupervisorMap};