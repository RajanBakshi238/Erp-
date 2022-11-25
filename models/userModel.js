const mongoose = require('mongoose');
const validator = require('validator')

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
    roles: {
        Employee: {
            type: Number,
            default: 2022
        },
        Admin: Number,
        HR: Number,
        PM: Number
    },
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
    }
})

userSchema.pre('save', async function (next){
    if(!this.isModified('password')) return next();

    this.password = await bcrypt.hash(this.password, 12);

    this.passwordConfirm = undefined;

    next();
})


const User = mongoose.model('User', userSchema);

module.exports = User;



// Always remember fat model thin controller principle..