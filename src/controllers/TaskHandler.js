

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
exports.editTask = async(req, res) => {
    // console.log("req.body => ",req.body);
    const {newTitle, newDescription, newCategory, NewDueDate, taskId} = req.body
    // console.log("fetched data : ",newTitle, newDescription, NewDueDate, newCategory, taskId);
    try{
        // task id validation
        if(!taskId){
            return res.status(400).json({
                success : false,
                message : "Task ID not found "
            })
        }
        // check task existance
        const existTask = await Task.findById(taskId);
        if(!existTask){
           return res.status(404).json({
                success : false,
                message : "Task not found "
            }) 
        }
        //  update task details
        const updatedTask = await Task.findByIdAndUpdate(
            taskId,
            {
              title : newTitle || existTask.title,
              description : newDescription || existTask.description,
              category : newCategory || existTask.category,
              dueDate : NewDueDate || existTask.dueDate,
            },
            {new : true}
        );

        return res.status(201).json({
            success : true,
            message : "Task updated Successfuly",
            data : updatedTask
        })
    }catch(error){
        console.log(error)
        return res.status(500).json({
        success: false,
        message: "Task not Updated !"
        });  
    }
}

// Complete task
exports.completeTask = async (req, res) =>{
    const {taskId} = req.body;
    try{
        // check exist task 
        const existTask = await Task.findById(taskId);
        if(!existTask){
            return res.status(404).json({
                    success : false,
                    message : "Task not found "
                }) 
        }
        // check for completed 
        if(existTask.completed){
            return res.status(400).json({
                success : false,
                message : "Task already completed"
            })
        }
        // Change task Complete flag
        existTask.completed = true;
        existTask.save();

        return res.status(201).json({
            success : true,
            message : "Task Completed Successfuly",
            data : existTask
        })
    }
    catch(error){
        console.log(error)
        return res.status(500).json({
        success: false,
        message: "Failed to complete this Task "
        });
    }
}

// delete task
exports.deleteTask = async (req, res) =>{
    const {taskId} = req.body;
    try{
        // check task existance if exist then delete
        const task = await Task.findByIdAndDelete(taskId);
        if(!task){
            return res.status(404).json({
                success : false,
                message : "Task not found"
            });
        }
        return res.status(200).json({
            success : true,
            message : "Task deleted successfuly",
            data : task
        })

    }catch(error){
        console.log(error)
        return res.status(500).json({
        success: false,
        message: "Task Couldn't Delete"
        });
    }
}