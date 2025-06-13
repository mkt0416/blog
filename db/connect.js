
const mongoose = require('mongoose');

const connectDB = async (url) => {
    try {
        await mongoose.connect(url);
        console.log('Success: Connected to MonogDB');
    } catch (err) {
        console.log('Failure: Unnconnected to MongoDB', err);
    }
};

module.exports = connectDB;