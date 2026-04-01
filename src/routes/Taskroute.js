
const express = require("express")
const router = express.Router();

const {
    createTask,
    getAllTasks,
    editTask,
    completeTask,
    deleteTask
} = require("../controllers/TaskHandler")


router.post("/createTask",createTask);
router.get("/allTasks",getAllTasks);
router.put("/editTask",editTask);
router.patch("/completeTask",completeTask);
router.delete("/deleteTask",deleteTask);



module.exports = router;