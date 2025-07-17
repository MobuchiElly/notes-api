require("dotenv").config();
const mongoose = require("mongoose");

const uri = process.env.NODE_ENV === "dev" ? process.env.LOCAL_MONGO_URI : process.env.MONGO_URI;

const connectDB = async () => {
    await mongoose.connect(uri);
    console.log("Connected to Database");
};

module.exports = connectDB;