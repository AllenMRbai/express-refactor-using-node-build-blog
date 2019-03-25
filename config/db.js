const env = process.env.NODE_ENV;

let MYSQL_CONF;
let REDIS_CONF;

if (env === "development") {
  // mysql
  MYSQL_CONF = {
    host: "localhost",
    port: 3306,
    user: "root",
    password: "123",
    database: "myblog"
  };
  // redis
  REDIS_CONF = {
    port: 6379,
    host: "192.168.72.129"
  };
}

if (env === "production") {
  MYSQL_CONF = {
    host: "localhost",
    port: 3306,
    user: "root",
    password: "123",
    database: "myblog"
  };
  // redis
  REDIS_CONF = {
    port: 6379,
    host: "192.168.72.129"
  };
}

module.exports = {
  MYSQL_CONF,
  REDIS_CONF
};
