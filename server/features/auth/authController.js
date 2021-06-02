const { promisify } = require("util");
const jwt = require("jsonwebtoken");
const { AppError } = require("@lib/errors");
const { User } = require("@lib/sequelize");
const { getResourceName } = require("@lib/utils");
const ac = require("./lib/permissions");

const sendToken = async ({ user, statusCode, req, res }) => {
  const token = await promisify(jwt.sign)(
    { id: user.id },
    process.env.JWT_SECRET,
    {
      expiresIn: process.env.JWT_EXPIRES_IN,
    }
  );

  res.cookie("jwt", token, {
    expires: new Date(
      Date.now() + process.env.JWT_COOKIE_EXPIRES_IN * 24 * 60 * 60 * 1000
    ),
    httpOnly: true,
    secure: req.secure || req.headers["x-forwarded-proto"] === "https",
    sameSite: process.env.NODE_ENV === "production" && "None",
  });

  user.setDataValue("password", undefined);

  res.status(statusCode).json(user);
};

const checkRights = async (req, res, next) => {
  const methods = {
    GET: "readAny",
    POST: "createOwn",
    PATCH: "updateAny",
    DELETE: "deleteAny",
  };

  const { method, user } = req;

  const action = methods[method];
  const resource = getResourceName(req);

  const permission = ac.can(user.role.name)[action](resource);

  if (!permission.granted) {
    throw new AppError(403, "You don't have rights to perform this action");
  }

  next();
};

exports.checkAuth = async (req, res, next) => {
  const token = req.cookies.jwt;

  if (!token) {
    throw new AppError(401, "You are not authorized");
  }

  const decoded = await promisify(jwt.verify)(token, process.env.JWT_SECRET);

  const user = await User.findByPk(decoded.id, {
    attributes: {
      include: ["password"],
    },
  });

  if (!user) {
    throw new AppError(
      401,
      "The user belonging to this token does no longer exist"
    );
  }

  if (!user.isActive) {
    throw new AppError(403, "Your account is blocked");
  }

  req.user = user;
  next();
};

exports.protect = [exports.checkAuth, checkRights];

exports.register = async (req, res) => {
  const { email, password, username } = req.body;

  const user = await User.create({
    email,
    password,
    username,
  });

  sendToken({ user, statusCode: 201, req, res });
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

  sendToken({ user, statusCode: 200, req, res });
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
