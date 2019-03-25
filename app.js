const createError = require("http-errors");
const express = require("express");
const path = require("path");
const fs = require("fs");
const cookieParser = require("cookie-parser");
const logger = require("morgan");
const session = require("express-session");
const RedisStore = require("connect-redis")(session);
const redisClient = require("./db/redis");

const userRouter = require("./routes/user");
const blogRouter = require("./routes/blog");

const app = express();

const env = process.env.NODE_ENV;

if (env === "development") {
  app.use(
    logger("dev", {
      stream: process.stdout
    })
  );
} else if (env === "production") {
  let logDir = path.resolve(__dirname, "./logs");
  let logFile = path.resolve(logDir, "./access.log");

  if (!fs.existsSync(logDir)) {
    fs.mkdirSync(logDir);
  }

  let ws = fs.createWriteStream(logFile, {
    flags: "a"
  });

  app.use(
    logger("combined", {
      stream: ws
    })
  );
}

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(
  session({
    secret: "sdHKJSD@_FGdfg45#@",
    store: new RedisStore({
      client: redisClient
    }),
    resave: false,
    saveUninitialized: false,
    cookie: { path: "/", httpOnly: true, maxAge: 24 * 60 * 60 * 1000 }
  })
);

app.use("/api/user", userRouter);
app.use("/api/blog", blogRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});

module.exports = app;
