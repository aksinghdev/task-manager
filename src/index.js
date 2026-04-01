

const express = require("express");
const app = express()
const dotenv = require("dotenv")
const cookieParser = require("cookie-parser")
const cors = require("cors")
const taskRautes = require('./routes/Taskroute')

const database = require("./config/database")
dotenv.config();

database();

const PORT = process.env.PORT || 3400

const allowedOrigins = [
  "http://localhost:3000",
  "http://localhost:3001"
];

app.use(express.json())
app.use(cookieParser())

app.use(
    cors({
    origin: function (origin, callback) {
    // Allow requests not from origins  
    if (!origin) return callback(null, true);
    if (allowedOrigins.includes(origin)) {
      return callback(null, true);
    } else {
      return callback(new Error("Not allowed by CORS"));
    }
  },

    credentials: true,
    })
);

// rautes
app.use("/api/v1/task",taskRautes);

// default raute
app.get("/",(req, res) => {
    return res.json({
        success : true,
        message : "Task manager server is running"
    })
})

// app listing
app.listen(PORT, ()=> {
    console.log(`app is listning at port no ${PORT}`);
})