const express = require("express");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const helmet = require("helmet");
const hpp = require("hpp");
require("express-async-errors");
require("module-alias/register");

const { authRouter } = require("@features/auth");
const { categoriesRouter } = require("@features/categories");
const { commentsRouter } = require("@features/comments");
const { postsRouter } = require("@features/posts");
const { rolesRouter } = require("@features/roles");
const { subscribersRouter } = require("@features/subscribers");
const { usersRouter } = require("@features/users");

const { AppError, errorHandler } = require("@lib/errors");

const app = express();

app.enable("trust proxy");

// 1) Global middleware
app.use(helmet());
app.use(
  cors({
    origin: ["http://localhost:3000", "https://komilt.github.io"],
    credentials: true,
  })
);
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));
app.use(hpp());

// 2) API routes
app.use("/api/auth", authRouter);
app.use("/api/categories", categoriesRouter);
app.use("/api/comments", commentsRouter);
app.use("/api/posts", postsRouter);
app.use("/api/roles", rolesRouter);
app.use("/api/subscribers", subscribersRouter);
app.use("/api/users", usersRouter);

app.all("*", (req, res) => {
  throw new AppError(404, `Can't find ${req.originalUrl}`);
});

app.use(errorHandler);

module.exports = app;
