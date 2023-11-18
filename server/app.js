const express = require("express");
const morgan = require("morgan");
const cookieParser = require("cookie-parser");
const cors = require("cors");

const AppError = require("./utils/appError");
const globalErrorHandler = require("./controllers/errorController");

const taskRouter = require("./routes/taskRoutes");
const userRouter = require("./routes/userRoutes");
const attendanceRouter = require("./routes/attendanceRoutes");
const assignedFeatureRoutes = require("./routes/assignedFeatureRoutes");
const projectRouter = require("./routes/projectRoutes");

const corsOptions = require("./config/corsOptions");
const credentials = require("./middlewares/credentials");
const AssignedFeature = require("./models/assignedFeaturesModel");
const User = require("./models/userModel");
const {permissions} = require('./utils/data/defaultPermission')

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
app.use("/api/v1/project", projectRouter);

// route to run scripts:
app.get("/update-db", async (req, res) => {
  try {
    // for renaming feid
    // const feature = await AssignedFeature.updateMany({}, {$rename: {'featureName': 'featureKey'}})

    //for adding new fields in users collection to all documents at once
    await User.updateMany({}, {$set: {permissions}})

    return res.status(201).json({ message: "success updated" });
  } catch (err) {
    res.send(400).json({ message: "unknown error", error: err });
  }
});

app.all("*", (req, res, next) => {
  next(new AppError(`can't find ${req.originalUrl} on this server!`, 404));
});

app.use(globalErrorHandler);

module.exports = app;
