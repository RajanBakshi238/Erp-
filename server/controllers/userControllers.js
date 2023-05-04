const User = require("./../models/userModel");

// have to protect to perement to pm admins only or others.
exports.getUsersOnRoles = async (req, res) => {
  try {
    let query, numTours;
    console.log(req.query, ">>>>>>>>>>req.query");
    if (req.query.user) {
      console.log("insider1");
      query = User.find({ role: req.query.user });
      numTours = await User.countDocuments({ role: req.query.user });
    } else {
      console.log("insider2");

      query = User.find({ role: "user" });
      numTours = await User.countDocuments({ role: "user" });
    }

    const page = req.query.page * 1 || 1;
    const limit = req.query.limit * 1 || 10;
    const skip = (page - 1) * limit;

    query = query.skip(skip).limit(limit);

    const users = await query;

    res.status(200).json({
      status: "success",
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
