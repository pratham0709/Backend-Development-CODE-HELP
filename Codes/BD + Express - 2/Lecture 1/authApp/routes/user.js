const express = require("express");
const router = express.Router();
const user = require("../model/User");

const {login, signup} = require("../Controllers/Auth");
const {auth, isStudent, isAdmin} = require("../middleware/auth");
const User = require("../model/User");


router.post("/login", login);
router.post("/signup", signup);

// testing protected route for single middleware
router.get("/test", auth, (req,res) => {
    res.json({
        message: true,
        success: 'Welcome to protected route for TESTS'
    })
})



// Protected Route
router.get("/student", auth, isStudent, (req, res) => {
    res.json({
        success: true,
        message: 'Welcome for protected route for Students',
    });
});

router.get("/admin", auth, isAdmin, (req,res) => {
    res.json({
        success: true,
        message: 'Welcome to the protected route for admin',
    })
})

router.get("/getEmail", auth, async(req,res) => {
    try{
        const id = req.user.id;
        console.log("ID:", id);
        const user = await User.findById({id});

        res.status(200).json({
            success: true,
            user: user,
            message: "welcome to the email route"
        })
    }
    catch(error){
        res.status(500).json({
            success: false,
            error: error.message,
            message: "fatt gaya code"
        })
    }
})


module.exports = router;