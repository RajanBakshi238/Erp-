const User = require("./../models/userModel");

// have to protect to perement to pm admins only or others.
exports.getUsersOnRoles = async (req, res) => {
  try {
    let query, numTours;
    console.log(req.query, ">>>>>>>>>>req.query");
    if (req.query.user) {
      console.log("insider1");
      query = User.find({
        role: req.query.user,
        ...(req.query.name
          ? { name: { $regex: req.query.name, $options: "i" } }
          : {}),
      });
      numTours = await User.countDocuments({
        role: req.query.user,
        ...(req.query.name
          ? { name: { $regex: req.query.name, $options: "i" } }
          : {}),
      });
    } else {
      console.log("insider2");

      query = User.find({
        role: "user",
        ...(req.query.name
          ? { name: { $regex: req.query.name, $options: "i" } }
          : {}),
      });
      numTours = await User.countDocuments({
        role: "user",
        ...(req.query.name
          ? { name: { $regex: req.query.name, $options: "i" } }
          : {}),
      });
    }

    const page = req.query.page * 1 || 1;
    const limit = req.query.limit * 1 || 10;
    const skip = (page - 1) * limit;

    query = query.skip(skip).limit(limit);

    const users = await query;

    res.status(200).json({
      status: 200,
      message: "Users Fetched Successfully",
      data: {
        total: numTours,
        users,
      },
    });
  } catch (err) {
    console.log(err, "getUSerOnRoles >>>>>>> func");
    res.status(400).json({
      status: "fail",
      message: err?.message ?? err,
    });
  }
};
