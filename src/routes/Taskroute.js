
const express = require("express")
const router = express.Router();

const {
    createTask,
    getAllTasks

} = require("../controllers/TaskHandler")


router.post("/createTask",createTask);
router.get("/allTasks",getAllTasks);



module.exports = router;