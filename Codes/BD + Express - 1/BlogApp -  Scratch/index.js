const express = require("express");
const app = express();

require("dotenv").config();
const PORT = process.env.PORT || 5000;

app.use(express.json());

const blog = require("./routes/blog");

// Mount the routes
app.use("/api/v1", blog);

// Connect with Database
const dbConnect = require("./config/database");
dbConnect();


app.listen(PORT, () => {
    console.log(`App is Started at Port no ${PORT}`)
})

app.get("/", (req,res) =>{
    res.send(`<h1>This is HomePage Baby</h1>`);
})