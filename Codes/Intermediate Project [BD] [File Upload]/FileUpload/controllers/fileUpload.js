const File = require("../models/File")

// localfileupload --> handler function

exports.localFileUpload = async (req, res) => {
    try{

        // fetch file from request
        const file = req.files.file;
        console.log("FILE AAGYI JEE -->", file);

        // Date.now() --> it is use for giving the name for uploded file

        // create a path where file need to be stored on server
        let path = __dirname + "/files/" + Date.now() + `.${file.name.split('.')[1]}`;
        console.log("PATH->", path);

        // add path to move function 
        file.mv(path, (err) => {
            console.log(err);
        })

        // create a successful responce
        res.json({
            success: true,
            message:"Local File Uploded Successfully"
        })
    }
    catch(err){
        console.log("Not able to upload the file on server");
        console.log(err);
    }
}