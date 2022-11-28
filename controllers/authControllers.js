const User = require("./../models/userModel");
const jwt = require("jsonwebtoken");

const signToken = (id) => {
  return jwt.sign({ id }, process.env.REFRESH_SECRET, {
    expiresIn: process.env.REFRESH_EXPIRES_IN,
  });
};

exports.signup = async (req, res) => {
  try {
    const newUser = await User.create({
      name: req.body.name,
      email: req.body.email,
      password: req.body.password,
      passwordConfirm: req.body.passwordConfirm,
    });

    newUser.password = undefined;

    const cookieOptions = {
      expires: new Date(
        Date.now() + process.env.REFRESH_COOKIE_EXPIRES_IN * 24 * 60 * 60 * 1000
      ),
      // secure: true,
      httpOnly: true,
    };

    // console.log(newUser, "newUser");

    const accessToken = jwt.sign(
      {
        id: newUser._id,
      },
      process.env.ACCESS_SECRET,
      {
        expiresIn: process.env.ACCESS_EXPIRES_IN,
      }
    );

    const refreshToken = signToken(newUser._id);

    res.cookie("jwt", refreshToken, cookieOptions);

    res.status(200).json({
      status: "success",
      refreshToken,
      accessToken,
      data: {
        user: newUser,
      },
    });
  } catch (err) {
    res.status(400).json({
      status: "fail",
      error: err,
    });
  }
};

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        status: "fail",
        error: "Please provide email and password",
      });
    }

    const user = await User.findOne({ email }).select("+password");

    if (!user || !(await user.correctPassword(password, user.password))) {
      return res.status(401).json({
        status: "fail",
        error: "Incorrect email or password",
      });
    }

    const cookieOptions = {
      expires: new Date(
        Date.now() + process.env.REFRESH_COOKIE_EXPIRES_IN * 24 * 60 * 60 * 1000
      ),
      // secure: true,
      httpOnly: true,
    };

    const accessToken = jwt.sign(
      {
        id: user._id,
      },
      process.env.ACCESS_SECRET,
      {
        expiresIn: process.env.ACCESS_EXPIRES_IN,
      }
    );

    const refreshToken = signToken(user._id);
    res.cookie("jwt", refreshToken, cookieOptions);

    res.status(200).json({
      status: "success",
      refreshToken,
      accessToken,
      data: {
        user,
      },
    });
  } catch (err) {
    res.status(400).json({
      status: "fail",
      error: err,
    });
  }
};
