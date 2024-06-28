//import Todo
const Todo = require('../models/Todo');

//define route handler

exports.createTodo = async(req, res) =>{
    try{
        // extract or fetch the tile and description from request body
        const {title,description} = req.body;

        //create new Todo Obj and insert in DB 
        const responce = await Todo.create({title,description});

        //send a json responce with a success flag
        res.status(200).json(
            {
                success:true,
                data:responce,
                message: 'Entry Created Successfully'
            }
        );
    }
    catch(err){
        console.error(err);
        console.log(err);
        res.status(500)
        .json({
            success:false,
            data:"internal server error",
            message:err.message,
        })

    }
}