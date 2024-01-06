const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const passportLocalMongoose = require('passport-local-mongoose');

userRoleSchema = Schema({
    role_name: {
        type: String,
        required: true
    }
});

const UserRole = mongoose.model('user_role', userRoleSchema, 'user_role');

userSchema = Schema ({
    email: {
        type: String,
        required: true,
        unique: true
    },
    roleID: {
        type: Schema.Types.ObjectId,
        require: true,
        ref: 'user_role'
    }
});

userSchema.plugin(passportLocalMongoose);


const User = mongoose.model('User', userSchema);

module.exports = {User, UserRole};