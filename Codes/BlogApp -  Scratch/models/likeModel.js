
// Import
const mongoose = require("mongoose");

// Defining the Schema 
const likeSchema = new mongoose.Schema({
    post: {
        type : mongoose.Schema.Types.ObjectId,
        ref : "Post",
    },
    user: {
        type: String,
        required : true,
    }

})

// exports
module.exports = mongoose.model("Like", likeSchema);