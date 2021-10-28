const User = require('../models/User');
const ErrorResponse = require('../utils/errorResponse')

exports.register = async (req, res, next) => {
    const { username, email, password } = req.body;

    try {
        const user = await User.create({
            username,
            email,
            password
        });

        res.status(201).json({
            success: true,
            user
        });
    } catch (error) {
        next(error);
    }
};

exports.login = async (req, res, next) => {
    const { email, password } = req.body;

    if (!email || !password) {
       return next(new ErrorResponse("Please enter a valid email and password", 400));
    }

    try {
        const user = await User.findOne({ email }).select("+password");

        if (!user) {
            return next(new ErrorResponse("Invalid credentials", 404));
        }

        const isMatch = await user.matchPasswords(password);

        if(!isMatch) {
            return next(new ErrorResponse("Invalid credentials", 401));
        }

        res.status(201).json({
            success: true,
            user,
            token: "321312ewrq23213rerg"
        });

    } catch (error) {
        next(error);
    }
};

exports.forgotpassword = (req, res, next) => {
    res.send("Forgot Password Route");
};

exports.resetpassword = (req, res, next) => {
    res.send("Reset Password Route");
};