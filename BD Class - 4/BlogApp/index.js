const express = require("express");
const app = express();

require("dotenv").config();
const PORT = process.env.PORT || 3000;

// middleware
app.use(express.json());

const blog = require("./routes/blog");

// mount the routes
app.use("/api/v1", blog);

// connect with Db
const connectWithDB = require("./config/database");
connectWithDB();

// start the server
app.listen(PORT, () => {
    console.log(`App is Started at Port no ${PORT}`);
})

// Default Route
app.get("/", (req,res) => {
    res.send(`<h1>This is my HomwPage Baby</h1>`);
})

