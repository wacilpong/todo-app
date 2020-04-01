const db = require("./models");

db.sequelize
  .sync()
  .then(() => {
    console.log("Connected to sqlite3 sequelize");
  })
  .catch(error => {
    console.error(error.message);
    process.exit();
  });

module.exports = db;
