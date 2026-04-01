

const Task = require("../models/Task")
require("dotenv").config()

// create a new task
exports.createTask = async (req, res) =>{
    let {title, description, dueDate, category} = req.body;

    try{
        if(!title){
            return res.status(400).json({ 
                success : false,
                message: "Title is required" 
            });
        }
        if (!category || category === undefined){
            category = "Personal";
        }

        const task = await Task.create({
            title,
            description,
            dueDate,
            category
        })
        return res.status(201).json({
            success : true,
            message : "Task created successfuly",
            data : task
        })
    }
    catch(error){
        console.log(error)
        return res.status(500).json({
        success: false,
        message: "Task creation fail"
        });
    }
}

// get all tasks
exports.getAllTasks = async(req, res) =>{

    try{
        const allTasks = await Task.find({},{title : true});

        console.log("All tasks : ",allTasks);
        if(allTasks.length === 0){
           return res.status(200).json({
            success : true,
            message:"Found All Tasks successfuly",
            data : []
        }) 
        }
        return res.status(200).json({
            success : true,
            message:"Found All Tasks successfuly",
            data : allTasks
        })

    }catch(error){
        console.log(error)
        return res.status(500).json({
        success: false,
        message: "Failed to fetched all task"
        });
    }
}

// Edit task



// Complete task



// delete task