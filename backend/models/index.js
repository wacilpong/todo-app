const path = require("path");
const Sequelize = require("sequelize");
const env = process.env.NODE_ENV || "development";
const config = require(path.join(__dirname, "..", "dbconfig.js"))[env];
const models = {};

const sequelize = new Sequelize(config);

models.sequelize = sequelize;
models.Sequelize = Sequelize;

models.Todo = require("./todo")(sequelize, Sequelize);
models.TodoReference = require("./todoReference")(sequelize, Sequelize);

models.Todo.hasMany(models.TodoReference);
models.TodoReference.belongsTo(models.Todo, {
  onDelete: "CASCADE",
  foreignKey: {
    allowNull: false
  }
});

module.exports = models;
