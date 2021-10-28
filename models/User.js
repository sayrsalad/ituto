const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const Schema = mongoose.Schema;

const UserSchema = new Schema({
    username: {
        type: String,
        required: [true, "Please enter a valid username"]
    }, 
    email: {
        type: String,
        required: [true, "Please enter a valid email address"],
        unique: true,
        match: [
            /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
            'Please add a valid email address',
          ]
    },
    password: {
        type: String,
        required: [true, "Please enter a valid password"],
        minlength: 8,
        select: false
    },
    resetPasswordToken: String,
    resetPasswordDate: Date
}, {
    timestamps: true
});

UserSchema.pre("save", async function(next) {
    if(!this.isModified("password")) {
        next();
    }

    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
});

UserSchema.methods.matchPasswords = async function(password) {
    return await bcrypt.compare(password, this.password);
}

const User = mongoose.model('User', UserSchema);

module.exports = User;
