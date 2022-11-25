const User = require('./../models/userModel');
const jwt = require('jsonwebtoken')

const signToken = (id) => {
    return jwt.sign({id}, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_EXPIRES_IN
    })
}

exports.signup = async (req, res) => {
    try{
        const newUser = await User.create({
            name: req.body.name,
            email: req.body.email,
            password: req.body.password,
            passwordConfirm: req.body.passwordConfirm,
        })

        const token = signToken(newUser._id);

        res.status(200).json({
            status: 'success',
            token,
            data: {
                user: newUser
            }
        })

    } catch(err) {
        res.status(400).json({
            status: 'fail',
            error: err
        })
    }
}