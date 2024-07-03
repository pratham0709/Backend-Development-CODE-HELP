const express = require("express");
const router = express.Router();

const {login, signup} = require("../Controllers/Auth");
const {auth, isStudent, isAdmin} = require("../middleware/auth");


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

module.exports = router;