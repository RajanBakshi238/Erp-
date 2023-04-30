const express = require("express");
const morgan = require("morgan");
const cookieParser = require("cookie-parser");
const cors = require("cors");

const AppError = require('./utils/appError')
const globalErrorHandler = require('./controllers/errorController')

const taskRouter = require("./routes/taskRoutes");
const userRouter = require("./routes/userRoutes");
const attendanceRouter = require("./routes/attendanceRoutes");
const assignedFeatureRoutes = require("./routes/assignedFeatureRoutes")
const projectRouter = require("./routes/projectRoutes")



const corsOptions = require("./config/corsOptions");
const credentials = require("./middlewares/credentials")

const app = express();

app.use(credentials);
app.use(cors(corsOptions));

app.use(express.urlencoded({ extended: false }));

app.use(express.json());

app.use(cookieParser());


// DEVELOPMENT LOGGER
if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}

app.use("/api/v1/tasks", taskRouter);
app.use("/api/v1/users", userRouter);
app.use("/api/v1/attendance", attendanceRouter);
app.use("/api/v1/assignFeatures", assignedFeatureRoutes);
app.use("/api/v1/project", projectRouter)
app.all('*', (req, res, next) => {
  next(new AppError(`can't find ${req.originalUrl} on this server!`, 404));
})

app.use(globalErrorHandler)



module.exports = app;
