const { exec } = require("../db/mysql");
const { escape } = require("mysql");
const { genPassword } = require("../util/cryp");

function login(username, password) {
  let sql = `select username,realname from users where username=${escape(
    username
  )} and password=${escape(genPassword(password))}`;
  console.log(sql);
  return exec(sql).then(rows => {
    return rows[0] || {};
  });
}

function check(username) {
  let sql = `
    select * from users where username=${escape(username)}
  `;
  return exec(sql).then(rows => {
    let row = rows[0];
    if (row) throw "registered";
    return "ok";
  });
}

function registry({ username, password, realname }) {
  let sql = `
    insert into users (username,\`password\`,realname) values(${escape(
      username
    )},${escape(genPassword(password))},${escape(realname)})
  `;
  return exec(sql);
}

module.exports = {
  login,
  check,
  registry
};
