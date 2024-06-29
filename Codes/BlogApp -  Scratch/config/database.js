const mongoose = require("mongoose");

require("dotenv").config();
const dbConnect = () => {
    mongoose.connect(process.env.DATABASE_URL, {
        useNewUrlParser : true,
        useUnifiedTopology : true,
    })
    .then(console.log("DB Connected sucessfully"))
    .catch((error) => {
        console.log("DB facing Connection issues");
        console.error(error);

        process.exit(1);
    })
}

module.exports = dbConnect;