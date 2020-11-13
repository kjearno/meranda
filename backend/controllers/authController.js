const { promisify } = require('util');
const jwt = require('jsonwebtoken');
const ac = require('../utils/permissions');
const { User } = require('../models');
const AppError = require('../utils/AppError');
const catchAsync = require('../utils/catchAsync');

const sendToken = (user, statusCode, req, res) => {
  const loggedInUser = {
    id: user.id,
    email: user.email,
    username: user.username,
    photo: user.photo,
    isAdmin: user.isAdmin,
    role: user.role
  };

  const token = jwt.sign({ id: loggedInUser.id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN
  });

  res.cookie('jwt', token, {
    expires: new Date(
      Date.now() + process.env.JWT_COOKIE_EXPIRES_IN * 24 * 60 * 60 * 1000
    ),
    httpOnly: true,
    secure: req.secure || req.headers['x-forwarded-proto'] === 'https',
    sameSite: process.env.NODE_ENV === 'production' && 'None'
  });

  res.status(statusCode).json(loggedInUser);
};

const checkToken = async req => {
  const token = req.cookies.jwt;

  if (!token) {
    throw new AppError('You are not authorized', 401);
  }

  const decoded = await promisify(jwt.verify)(token, process.env.JWT_SECRET);

  const currentUser = await User.findByPk(decoded.id, {
    attributes: {
      include: ['password']
    }
  });

  if (!currentUser) {
    throw new AppError(
      'The user belonging to this token does no longer exist',
      401
    );
  }

  if (!currentUser.isActive) {
    throw new AppError('Your account is blocked', 403);
  }

  return currentUser;
};

exports.register = catchAsync(async (req, res, next) => {
  const { email, password, username } = req.body;

  if (!email || !password || !username) {
    throw new AppError('Fill in all the fields', 400);
  }

  const user = await User.create({
    email,
    password,
    username
  });

  sendToken(user, 201, req, res);
});

exports.login = catchAsync(async (req, res, next) => {
  const { username, password } = req.body;

  if (!username || !password) {
    throw new AppError('Enter username and password', 400);
  }

  const user = await User.findOne({
    where: {
      username
    },
    attributes: {
      include: ['password']
    }
  });

  if (!user || !(await user.comparePassword(password, user.password))) {
    throw new AppError(
      'The username or password you entered is incorrect',
      401
    );
  }

  sendToken(user, 200, req, res);
});

exports.logout = catchAsync(async (req, res, next) => {
  res.clearCookie('jwt', {
    httpOnly: true,
    secure: req.secure || req.headers['x-forwarded-proto'] === 'https',
    sameSite: process.env.NODE_ENV === 'production' && 'None'
  });

  res.status(200).json({
    status: 'success'
  });
});

exports.checkAuth = catchAsync(async (req, res, next) => {
  const currentUser = await checkToken(req);

  req.user = currentUser;
  next();
});

exports.checkRights = catchAsync(async (req, res, next) => {
  const methods = {
    GET: 'readAny',
    POST: 'createOwn',
    PATCH: 'updateAny',
    DELETE: 'deleteAny'
  };

  const { baseUrl, method, user } = req;

  const resource = baseUrl.split('/').slice(-1)[0];
  const currentAction = methods[method];

  const permission = ac.can(user.role.name)[currentAction](resource);

  if (!permission.granted) {
    throw new AppError("You don't have rights to perform this action", 403);
  }

  next();
});

exports.protect = [exports.checkAuth, exports.checkRights];

exports.refreshToken = catchAsync(async (req, res, next) => {
  const user = await checkToken(req);

  sendToken(user, 200, req, res);
});
