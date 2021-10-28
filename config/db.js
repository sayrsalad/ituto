const mongoose = require('mongoose');

const connectDB = async() => {
    await mongoose.connect(process.env.ATLAS_URI);

    console.log("MongoDB Connected");

}

module.exports = connectDB;