const User = require('./../models/userModel')

exports.getUsersOnRoles = async (req, res) => {
  try {
    let query;
    console.log(req.query, ">>>>>>>>>>req.query")
    if (req.query.user) {
      query = User.find({ roles: { Employee: req.query.user*1 } });
    } else {
      query = User.find({ roles: { Employee: 2022 } });
    }

    const users = await query;

    res.status(200).json({
      status: "success",
      data: {
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
