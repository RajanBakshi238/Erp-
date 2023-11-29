const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcrypt');
const {permissions} = require('../utils/data/defaultPermission');
const {USER, ADMIN, HR, PM} = require('../utils/constants/rolesConstant');

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Name required'],
    },
    email: {
        type: String,
        required: [true, 'Email required'],
        unique: true,
        lowercase: true,
        validate: [validator.isEmail, 'Invalid Email']
    },
    role: {
        type: String,
        enum: [USER, ADMIN, HR, PM],
        default: 'user',
      },
    // roles: {
    //     Employee: {
    //         type: Number,
    //         default: 2022
    //     },
    //     Admin: Number,
    //     HR: Number,
    //     PM: Number
    // },
    photo: String,
    password: {
        type: String,
        required: [true, 'Password Required'],
        minlength: 8,
        select: false
    },
    passwordConfirm: {
        type: String,
        required: [true, 'Confirm Password Required'],
        validate: {
            //this will work on create and save method(i.e creating new object ) will not work on update method so for update we have to use save again
            validator: function (el) {
                return el === this.password;
            }
        },
        message: 'Password not same!',
    },
    userId: String,
    permissions: {
        type: mongoose.Schema.Types.Mixed,
        default: permissions
    }

})

userSchema.pre('save', async function (next){
    // if(this.isNew){
    //     let presentRoles = [];
    //     Object.entries(this.roles).forEach((item) => {
    //         if(item[1]){
    //             presentRoles.push(item[0].slice(0, 3).toUpperCase())
    //         }
    //     })
    //     // let rolesString = Object.keys(this.roles).map((item) => item.slice(0, 3).toUpperCase()).join('-')
    //     const noOfDocuments = await this.constructor.countDocuments() + 1 + 100; // adding 100 because we want it to start from 100 
    //     this.userId = `COMP-${presentRoles.join('-')}-${noOfDocuments}`
    // }


    if(!this.isModified('password')) return next();

    this.password = await bcrypt.hash(this.password, 12);

    this.passwordConfirm = undefined;

    next();
})

// Instance method i.e available yo the all of the documents of collections
userSchema.methods.correctPassword = async function(candidatePassword, userPassword){
    // here this keyword point to current document but this.password not accessable just due to it (select: false)
    return await bcrypt.compare(candidatePassword, userPassword)
}


const User = mongoose.model('User', userSchema);

module.exports = User;



// Always remember fat model thin controller principle..