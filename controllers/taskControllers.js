const mongoose = require("mongoose")

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
  let days = new Date(today.getFullYear(), today.getMonth(), 0).getDate(), // get last day of month
    oneDay = 1000 * 60 * 60 * 24,
    now = new Date(today.getFullYear(), today.getMonth(), 1), //month start date time stamp
    endDate = new Date(today.getFullYear(), today.getMonth(), days),
    store = {};
  // console.log(endDate, 'END DATE')
  while (now < endDate) {
    store[
      `${now.getFullYear()}-${now.getMonth() + 1}-${String(
        now.getDate()
      ).padStart(2, "0")}`
    ] = []
    now = new Date(now.valueOf() + oneDay);
  }

  try {
    const tasks = await User.aggregate([
      {
        $match: {
          _id: mongoose.Types.ObjectId("6384eac677c9ed4ee6c73e52")//ObjectId("6384eac677c9ed4ee6c73e52")
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
                  $gte: new Date("2022-11-01"),
                },
              },
            },
            {
              $group: {
                // _id: { $dayOfMonth: "$createdAt"},
                _id: { $dateToString: { format: "%Y-%m-%d", date: "$createdAt" } },
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
              }
            },
          ],
          as: "allTasks"
        }
      },
      // {
      //   $match: {
      //     createdAt: {
      //       $gte: new Date("2022-11-01"),
      //     },
      //   },
      // },
      // {
      //   $group: {
      //     // _id: { $dayOfMonth: "$createdAt"},
      //     _id: { $dateToString: { format: "%Y-%m-%d", date: "$createdAt" } },
      //     tasks: {
      //       $push: {
      //         taskName: "$name",
      //         createdAt: "$createdAt",
      //       },
      //     },
      //   },
      // },
      // {
      //   $addFields: { date: "$_id" },
      // },
      // {
      //   $sort: { date: 1 },
      // },
      // {
      //   $project: {
      //     _id: 0,
      //     date: 1,
      //     tasks: 1,
      //   },
      // },
    ]);

    tasks.forEach((result) => {
      store[result.date] = result.tasks;
    });

    const taskJson = []
    Object.keys(store).forEach(function(k){
      taskJson.push({"date": k, tasks: store[k] })
    })

    // console.log(store, ">>>>>>>>>>>>>>>");

    res.status(200).json({
      status: "success",
      data: {
        // tasks: store,
        tasks,
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
