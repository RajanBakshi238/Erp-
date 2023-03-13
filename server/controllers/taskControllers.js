const mongoose = require("mongoose");

const Task = require("./../models/taskModel");
const User = require("./../models/userModel");

exports.createTask = async (req, res) => {
  try {
    console.log(req.body, ">>>>>>>>>>>>>>>>>>>");
    const newTask = await Task.create(req.body);
    res.status(200).json({
      status: "success",
      data: {
        task: newTask,
      },
    });
  } catch (err) {
    res.status(400).json({
      status: "fail",
      message: err,
    });
  }
};

// try{
//     const tasks = await Task.find();

//     res.status(200).json({
//         status: 'success',
//         results: tasks.length,
//         data: {
//             tasks
//         }
//     })
// }catch(err) {
//     res.status(404).json({
//         status: 'fail',
//         message: err
//     })
// }

exports.getTasks = async (req, res) => {
  var today = new Date();
  let days = new Date(today.getFullYear(), today.getMonth() + 1, 0).getDate(), // get last day of month
    oneDay = 1000 * 60 * 60 * 24,
    startDate = new Date(today.getFullYear(), today.getMonth(), 1), //month start date time stamp
    endDate = new Date(today.getFullYear(), today.getMonth(), days),
    store = {};
  // console.log(endDate, 'END DATE')
  while (startDate <= endDate) {
    store[
      `${startDate.getFullYear()}-${startDate.getMonth() + 1}-${String(
        startDate.getDate()
      ).padStart(2, "0")}`
    ] = [];
    startDate = new Date(startDate.valueOf() + oneDay);
  }
  // console.log(days, '>>>>>>>>>>>>>', endDate)
  // console.log(store, '>>>>>>>>>>>>>>>>>>>store')

  try {
    const tasks = await User.aggregate([
      {
        $match: {
          _id: mongoose.Types.ObjectId("6384eac677c9ed4ee6c73e52"), //ObjectId("6384eac677c9ed4ee6c73e52")
        },
      },
      {
        $lookup: {
          from: "tasks",
          localField: "_id",
          foreignField: "assignedTo",
          pipeline: [
            {
              $match: {
                createdAt: {
                  $gte: new Date("2023-01-01"),
                },
              },
            },
            {
              $group: {
                // _id: { $dayOfMonth: "$createdAt"},
                _id: {
                  $dateToString: { format: "%Y-%m-%d", date: "$createdAt" },
                },
                tasks: {
                  $push: {
                    taskName: "$name",
                    createdAt: "$createdAt",
                  },
                },
              },
            },
            {
              $addFields: { date: "$_id" },
            },
            {
              $sort: { date: 1 },
            },
            {
              $project: {
                _id: 0,
                date: 1,
                tasks: 1,
              },
            },
          ],
          as: "allTasks",
        },
      },
    ]);

    // console.log(tasks[0].allTasks, '>>>>>>>>>> ')

    tasks[0].allTasks.forEach((result) => {
      store[result.date] = result.tasks;
    });

    const taskJson = [];
    Object.keys(store).forEach(function (k) {
      taskJson.push({ date: k, tasks: store[k] });
    });

    // console.log(store, ">>>>>>>>>>>>>>>");

    res.status(200).json({
      status: 200,
      data: {
        tasks: store,
        // tasks,
        // taskJson
      },
    });
  } catch (err) {
    console.log(err);

    res.status(404).json({
      status: "fail",
      message: err,
    });
  }
};

// ref: https://stackoverflow.com/questions/33268955/mongodb-aggregation-group-by-date-even-if-doesnt-exist

exports.handleTask = async (req, res) => {
  try {
    const task = await Task.findById("63b7287c819c6ad4bc335322");

    // console.log(task, "???????????TASKAKAKAKA")

    let message;
    if (!task) {
      throw new Error("No task Found with this id");
    }
    //  make a check here that task must belong to the authorized user only other authorized user can't toggle the other users task.

    if (!task?.startTime) {
      task.startTime = Date.now();
      message = "Task started successfully";
    } else if (!task?.endTime) {
      task.endTime = Date.now();
      message = "Task ended successfully";
      // console.log("cheater-cock")
    } else {
      throw new Error("Start and end time already marked");
      // taskCompleted Successfully
    }

    await task.save();

    // console.log(task, ">>>>>>>>>>>>>>>>>")

    res.status(200).json({
      status: "success",
      message,
      data: {
        attendanceMarked: task,
      },
    });
  } catch (err) {
    console.log(err, ">>>>>>>>>>>>>>>>>>>>>>>>>>>>eeee");
    res.status(400).json({
      status: "fail",
      message: "TEST MESSAGE",
    });
  }
};

exports.togglePausedTask = async (req, res) => {
  try {
    let message;
    const task = await Task.findById("63b7287c819c6ad4bc335322");
    
    if (!task) {
      throw new Error("No task Found with this id");
    }

    if(!task.startTime || task.endTime){
      throw new Error("Task not started or already completed");
    }

    if(!task.pausedStartTime){
      task.pausedStartTime = Date.now()
      message="task paused successfully."
    }else if(!task.pausedEndTime) {
      task.pausedEndTime = Date.now()
      task.pausedStartTime = null;
      message="tasked again started successfully."
    }

    // console.log(task, "task toggling details>>>");

    await task.save();

    res.status(200).json({
      status: "success",
      message,
      data: {
        task
      },
    });
  } catch (err) {
    console.log(err, 'err of paused catch ')
    res.status(400).json({
      status: "fail",
      message: err?.message ?? err,
    });
  }
};
