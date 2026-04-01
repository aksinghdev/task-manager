
const dns = require("dns")
dns.setServers(["8.8.8.8", "8.8.4.4"]);

require("dotenv").config();
const mongoose = require("mongoose");

const database = () => {
    // console.log("db url",process.env.DB_URL);

    mongoose.connect(process.env.DB_URL,{
        family: 4
    })
    .then( () => console.log("Task Manager application is connected with database succefully"))
    .catch( (err) => {
        console.log("DataBase connection Failed");
        console.error(err);
        process.exit(1);
    })
}

module.exports = database
