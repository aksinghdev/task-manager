
const mongoose = require("mongoose");

const taskSchema = new mongoose.Schema({
    title:{
        type : String,
        required : [true, "Title is required"],
        trim : true
    },
    description:{
        type : String,
    },
    completed:{
        type : Boolean,
        default : false
    },
    dueDate:{
        type : Date,
    },
    category: {
        type: String,
        enum: ["Family", "Personal", "Study"],
    },
    createdAt : {
        type : Date,
        default: Date.now(),
        required : true,
    },
});

const Task = mongoose.model("Task",taskSchema);
module.exports = Task;