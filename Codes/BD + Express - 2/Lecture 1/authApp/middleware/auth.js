// auth, isStudent, isAdmin

const jwt = require("jsonwebtoken");
require("dotenv").config();

exports.auth = (req,res, next) => {
    try{
        // extract the token
        // PENDING: OTHER WAYS TO FETCH TOKENS
        const token = req.body.token;

        if(!token) {
            return res.status(401).json({
                success: false,
                message: 'Token Missing',
            })
        }

        // verify the token
        try{
            const payload = jwt.verify(token, process.env.JWT_SECRET);
            console.log(payload);

            req.user = payload;
        } 
        catch(error){
            return res.status(401).json({
                success: false,
                message: 'token is invalid', 
            });
        }
        next();
    
    } catch(error){
        return res.status(401).json({
            success: false,
            message: 'Something went wrong , While verifying the token',
        });
    }

}

exports.isStudent = (req,res, next) => {
    try{
         if(req.user.role !== "Student"){
            return res.status(401).json({
                success: false,
                message: 'This is protected route for Student',
            })
         }
         next();
    }
    catch(error) {
        res.status(500).json({
            success: false,
            message: 'User role is not matching',
        })
    }
}

exports.isAdmin = (req, res, next) => {
    try{
        if(res.body.role !== "Admin"){
            return res.status(401).json({
                success: false,
                messgae: 'This is Protected Route for Admin',
            })
        }
        next();
    }
    catch(error){
        return res.status(500).json({
            success: false,
            message: 'User role is not matching',
        })
    }
    next();
}