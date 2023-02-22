const User = require("./../models/userModel");
const jwt = require("jsonwebtoken");
const { promisify } = require("util");
const { fail } = require("assert");

const signToken = (id) => {
  return jwt.sign({ id }, process.env.REFRESH_SECRET, {
    expiresIn: process.env.REFRESH_EXPIRES_IN,
  });
};

exports.signup = async (req, res) => {
  try {
    // const newUser = await User.create({
    //   name: req.body.name,
    //   email: req.body.email,
    //   password: req.body.password,
    //   passwordConfirm: req.body.passwordConfirm,
    // });
    const newUser = await User.create(req.body);

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

    res.cookie("refresh-jwt", refreshToken, cookieOptions);

    res.status(200).json({
      status: "success",
      refreshToken,
      accessToken,
      data: {
        user: newUser,
      },
    });
  } catch (err) {
    console.log(err, ">>>>>>>>>>>>>>>err");

    res.status(400).json({
      status: "fail",
      error: err,
    });
  }
};

exports.login = async (req, res) => {
  try {
    console.log(req.body, ">>>>>>>>>>>>>>");
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
      console.log('refreshToken', refreshToken)

    res.cookie("jwt", refreshToken, cookieOptions);

    res.status(200).json({
      data: {
        status: 200,
        message: 'Login successfully.',
        refreshToken,
        accessToken,
        user
      },
    });
  } catch (err) {
    console.log(err, ">>>>>>>>>errr");
    res.status(400).json({
      status: 401,
      error: err,
    });
  }
};

exports.protect = async (req, res, next) => {
  try {
    let token;
    if (
      req.headers.authorization &&
      req.headers.authorization.startsWith("Bearer")
    ) {
      token = req.headers.authorization.split(" ")[1];
    }
    console.log(token, ">>>>>>>>>>>>>>>>>>>");

    if (!token) {
      return res.status(403).json({
        status: 403,
        error: "You are not logged in! Please log in to get access.",
      });
    }

    const decoded = await promisify(jwt.verify)(
      token,
      process.env.ACCESS_SECRET
    );
    console.log(decoded, ">>>>>>>>DECODED");

    // check if user exist or not i.e if user deleted but token exist
    const freshUser = await User.findById(decoded.id);
    if (!freshUser) {
      return res.status(401).json({
        status: "fail",
        error: "The user belonging to this token no longer exist.",
      });
    }

    // check if user password changed after the token was issued
    // this functionality left

    req.user = freshUser;
    next();
  } catch (err) {
    res.status(401).json({
      status: "fail",
      error: err,
    });
  }
};

// Note:  After making forgot password i have to make password changed at and refresh token issue date check i have to make.
exports.refreshToken = async (req, res) => {
  try {
    const cookies = req.cookies;
    console.log(cookies, ">>>>>>>>>>>>LEHMBER", Object.keys(cookies));
    if (!cookies?.["jwt"]) {
      return res.status(401).json({
        status: "fail",
        error: "You are not login !",
      });
    }
    const refreshToken = cookies?.["jwt"];
    console.log(refreshToken, "refreshTOken");
    const decoded = await promisify(jwt.verify)(
      refreshToken,
      process.env.REFRESH_SECRET
    );

    // jwt.verify(refreshToken, process.env.ACCESS_SECRET, (err, decoded) => {
    //   if (err) {
    //     return res.status(403).json({
    //       status: "fail",
    //       error: err,
    //     });
    //   }
    //   userId = decoded.id;
    // });

    const user = await User.findById(decoded.id);
    if (!user) {
      return res.status(401).json({
        status: "fail",
        error: "The user belonging to this token no longer exist.",
      });
    }

    console.log(decoded, "USER ID OF REFERSH TOKEN");

    const accessToken = jwt.sign(
      {
        id: user._id,
      },
      process.env.ACCESS_SECRET,
      {
        expiresIn: process.env.ACCESS_EXPIRES_IN,
      }
    );

    

    res.status(200).json({
      status: "success",
      data: {
        accessToken,
        user: user,
      },
    });
  } catch (err) {
    res.status(400).json({
      status: "fail",
      error: err,
    });
  }
};
