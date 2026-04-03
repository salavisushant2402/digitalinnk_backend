const mongoose = require('mongoose');
require('dotenv').config();

const uri = process.env.MONGO_URL

const connect = async () => {
    try {
        await mongoose.connect(uri);
        console.log("MongoDB connected successfully");
    } catch (error) {
        console.error("MongoDB connection failed:", error.message);
        process.exit(1);
    }
};

module.exports = connect;