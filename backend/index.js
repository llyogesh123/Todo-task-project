require("dotenv").config();
const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");

const authRoute = require("./routes/authRoute.js");
const taskRoute = require("./routes/taskRoute.js");
const connectDB = require("./utils/db.js");

const app = express();
const PORT = process.env.PORT;

// Inserted CORS configuration
const allowedOrigins = [
  "http://localhost:5173",
  "https://todo-task-project-1.onrender.com"
];

app.use(express.json());
app.use(cookieParser());
app.use(
  cors({
    origin: allowedOrigins,
    credentials: true,
  })
);

app.use("/auth", authRoute);
app.use("/tasks", taskRoute);

app.listen(PORT, () => {
  console.log(`Server running on ${PORT}`);
  connectDB();
});