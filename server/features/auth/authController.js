const { promisify } = require("util");
const jwt = require("jsonwebtoken");
const { AppError } = require("@lib/errors");
const { User } = require("@lib/sequelize");
const ac = require("./lib/permissions");

const sendToken = (user, statusCode, req, res) => {
  const loggedInUser = {
    id: user.id,
    email: user.email,
    username: user.username,
    photo: user.photo,
    isAdmin: user.isAdmin,
    role: user.role,
  };

  const token = jwt.sign({ id: loggedInUser.id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });

  res.cookie("jwt", token, {
    expires: new Date(
      Date.now() + process.env.JWT_COOKIE_EXPIRES_IN * 24 * 60 * 60 * 1000
    ),
    httpOnly: true,
    secure: req.secure || req.headers["x-forwarded-proto"] === "https",
    sameSite: process.env.NODE_ENV === "production" && "None",
  });

  res.status(statusCode).json(loggedInUser);
};

const checkToken = async (req) => {
  const token = req.cookies.jwt;

  if (!token) {
    throw new AppError(401, "You are not authorized");
  }

  const decoded = await promisify(jwt.verify)(token, process.env.JWT_SECRET);

  const currentUser = await User.findByPk(decoded.id, {
    attributes: {
      include: ["password"],
    },
  });

  if (!currentUser) {
    throw new AppError(
      401,
      "The user belonging to this token does no longer exist"
    );
  }

  if (!currentUser.isActive) {
    throw new AppError(403, "Your account is blocked");
  }

  return currentUser;
};

exports.register = async (req, res) => {
  const { email, password, username } = req.body;

  if (!email || !password || !username) {
    throw new AppError(400, "Fill in all the fields");
  }

  const user = await User.create({
    email,
    password,
    username,
  });

  sendToken(user, 201, req, res);
};

exports.login = async (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    throw new AppError(400, "Enter username and password");
  }

  const user = await User.findOne({
    where: {
      username,
    },
    attributes: {
      include: ["password"],
    },
  });

  if (!user || !(await user.comparePassword(password, user.password))) {
    throw new AppError(
      401,
      "The username or password you entered is incorrect"
    );
  }

  sendToken(user, 200, req, res);
};

exports.logout = async (req, res) => {
  res.clearCookie("jwt", {
    httpOnly: true,
    secure: req.secure || req.headers["x-forwarded-proto"] === "https",
    sameSite: process.env.NODE_ENV === "production" && "None",
  });

  res.status(200).json({
    status: "success",
  });
};

exports.checkAuth = async (req, res, next) => {
  const currentUser = await checkToken(req);

  req.user = currentUser;
  next();
};

exports.checkRights = async (req, res, next) => {
  const methods = {
    GET: "readAny",
    POST: "createOwn",
    PATCH: "updateAny",
    DELETE: "deleteAny",
  };

  const { baseUrl, method, user } = req;

  const resource = baseUrl.split("/").slice(-1)[0];
  const currentAction = methods[method];

  const permission = ac.can(user.role.name)[currentAction](resource);

  if (!permission.granted) {
    throw new AppError(403, "You don't have rights to perform this action");
  }

  next();
};

exports.protect = [exports.checkAuth, exports.checkRights];

exports.refreshToken = async (req, res) => {
  const user = await checkToken(req);

  sendToken(user, 200, req, res);
};
