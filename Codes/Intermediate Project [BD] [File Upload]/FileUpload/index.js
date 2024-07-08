// app crete
const express = require("express");
const app = express();

// Port find krna hai
require("dotenv").config();
const PORT = process.env.PORT || 3000;

// middleware add krna hai
app.use(express.json());
const fileUpload = require("express-fileupload");
app.use(fileUpload());

// db se connect krna hai
const db = require("./config/database");
db.connect();

// cloud se connect krna hai
const cloudinary = require("./config/cloudinary");
cloudinary.cloudinaryConnect();

// api route mount krna hai
const Upload = require("./routes/FileUpload");
app.use("/api/v1/upload", Upload);

// activate server
app.listen(PORT, () => {
    console.log(`APP is Running at ${PORT}`)
})
