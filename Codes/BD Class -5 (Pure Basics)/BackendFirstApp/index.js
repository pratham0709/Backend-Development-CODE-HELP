const express = require("express");
const app = express();
const port = 3000;


app.use(express.json());

app.get("/", (req, res) =>{
    res.send(`<h1>This is Heading</h1>`);
})

app.post("/car", (req, res) =>{
    res.send("Received Post request");
})

app.listen(port, () => {
    console.log("App Started");
})