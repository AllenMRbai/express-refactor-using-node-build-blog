const mysql = require("mysql");
const { MYSQL_CONF } = require("../config/db");

const con = mysql.createConnection(MYSQL_CONF);

con.connect();

function exec(sql) {
  return new Promise((resolve, reject) => {
    con.query(sql, (err, result) => {
      if (err) {
        return reject(err);
      }
      resolve(result);
    });
  });
}

module.exports = {
  exec
};
