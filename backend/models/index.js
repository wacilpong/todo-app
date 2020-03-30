const path = require("path");
const Sequelize = require("sequelize");

const env = process.env.NODE_ENV || "development";
const config = require(path.join(__dirname, "..", "dbconfig.json"))[env];
const db = {};

const sequelize = new Sequelize(config);

db.sequelize = sequelize;
db.Sequelize = Sequelize;

db.Todo = require("./todo")(sequelize, Sequelize);
db.TodoReference = require("./todoReference")(sequelize, Sequelize);

db.Todo.belongsToMany(db.TodoReference, {
  foreignKey: "referenceTodoId",
  sourceKey: "id"
});

db.TodoReference.belongsToMany(db.Todo, {
  foreignKey: "id",
  targetKey: "referenceTodoId"
});

module.exports = db;

// const fs = require("fs");
// const path = require("path");
// const Sequelize = require("sequelize");
// const basename = path.basename(__filename);
// const env = process.env.NODE_ENV || "development";
// const config = require(__dirname + "/../dbconfig.json")[env];
// const db = {};
// let sequelize;

// if (config.use_env_variable) {
//   sequelize = new Sequelize(process.env[config.use_env_variable], config);
// } else {
//   sequelize = new Sequelize(
//     config.database,
//     config.username,
//     config.password,
//     config
//   );
// }

// fs.readdirSync(__dirname)
//   .filter(file => {
//     return (
//       file.indexOf(".") !== 0 && file !== basename && file.slice(-3) === ".js"
//     );
//   })
//   .forEach(file => {
//     var model = sequelize["import"](path.join(__dirname, file));
//     db[model.name] = model;
//   });

// Object.keys(db).forEach(modelName => {
//   if (db[modelName].associate) {
//     db[modelName].associate(db);
//   }
// });

// db.sequelize = sequelize;
// db.Sequelize = Sequelize;

// module.exports = db;
