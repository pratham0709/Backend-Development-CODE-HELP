const Todo = require("../models/Todo");

// define the route Handler

exports.getTodo = async(req,res) => {
    try{
        // fetch all todo item from database
        const todos = await Todo.find({});

        // responce
        res.status(200)
        .json({
            success: true,
            data:todos,
            message: "Entire Data is Fetched",
        })
    }
    catch(err){
        console.error(err);
        res.status(500)
        .json({
            success:false,
            error:err.message,
            message:'Server Error',
        })
    }
}

exports.getTodoById = async(req,res) => {
    try{
        // extract todo item basis on id
        const id = req.params.id;
        const todo = await Todo.findById({_id: id})

        //data for given id is not found
        if(!todo) {
            return res.status(404).json({
                success:false,
                message:"No Data found with given Id",
            })
        }

        // data for given if FOUND
        res.status(200).json({
            success: true,
            data: todo, 
            message: `Todo ${id} data successfully fetched`,
        })
    }
    catch(err){
        console.error(err);
        res.status(500)
        .json({
            success:false,
            error:err.message,
            message:'Server Error',
        });
    }
}