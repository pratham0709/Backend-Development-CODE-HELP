
const mongoose = require("mongoose");

require("dotenv").config();

const dbConnect = () => {
    mongoose.connect(process.env.DATABASE_URL, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    })
    .then(() => console.log("DB Ka connection successful"))
    .catch((error) => {
        console.log("Issues in DB Connection");
        console.error(error.message);

        // iska matlab Kya Hai??
        process.exit(1);
    });   
}

module.exports = dbConnect;
