const bcrypt = require("bcrypt");
const User = require("../model/User");
const jwt = require("jsonwebtoken");
// const { options } = require("../routes/user");
require("dotenv").config();


// signup route handler
exports.signup = async (req,res) => {
    try{
        //get data
        const {name, email, password, role} = req.body;
        //check if user already exist
        const existingUser = await User.findOne({email});

        if(existingUser){
            return res.status(400).json({
                success:false,
                message:'User already Exists',
            });
        }

        //secure password
        let hashedPassword;
        try{
            hashedPassword = await bcrypt.hash(password, 10);
        }
        catch(err) {
            return res.status(500).json({
                success:false,
                message:'Error inn hashing Password',
            });
        }

        //create entry for User
        const user = await User.create({
            name,email,password:hashedPassword,role
        })

        return res.status(200).json({
            success:true,
            message:'User Created Successfully',
        });

    }
    catch(error) {
        console.error(error);
        return res.status(500).json({
            success:false,
            message:'User cannot be registered, please try again later',
        });
    }
}


// Login route handler

exports.login = async (req,res) => {
    try{
        // fetch the data
        const { email, password } = req.body;

        // validation perform on email and password
        if(!email || !password){
            return res.status(400).json({
                success: false,
                message : "Please fill the detail carefully",
            });
        }

        // check for ragister user
        const user = await User.findOne({email});

        // if not a ragister user
        if(!user) {
            return res.status(401).json({
                success: false,
                message: "User is not ragistered",
            });
        }

        const payload = {
            email: user.email,
            id: user._id,
            role:user.role,
        }

        // verify password & generate a JWT token
        if(await bcrypt.compare(password, user.password)){
            // password match
            let token = jwt.sign(payload, 
                                process.env.JWT_SECRET,
                                {
                                    expiresIn: "2h",
                                });
            
            user = user.toObject();
            user.token = token;
            user.password = undefined;
            console.log(user);
            // user.token = token;

            // console.log(user);
            // user.password = undefined;
            // console.log(user);

            const options = {
                expires : new Date( Date.now() + 3 * 24 * 24 * 60 * 60 * 1000),
                httpOnly: true,
            }

            res.cookie("pratham cookie", token, options).status(200).json({
                success: true,
                token,
                user,
                message: "User Logged in successfully",
            });
        }
        else{
            // password do not match
            return res.status(403).json({
                success: false,
                message: "Password Incorrect",
            });
        }
    }
    catch(err){

    }
}