const crypto = require("crypto");

// 盐
const SALT = "aneDS12#AIW_Nsn@si";

function md5(content) {
  let md5 = crypto.createHash("md5");
  return md5.update(content).digest("hex");
}

function genPassword(password) {
  let str = `ps:${password};salt:${SALT}`;
  return md5(str);
}

console.log(genPassword("123"));

module.exports = {
  genPassword,
  md5
};
