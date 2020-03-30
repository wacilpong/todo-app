module.exports = (sequelize, DataTypes) => {
  const Todo = sequelize.define(
    "Todo",
    {
      contents: DataTypes.TEXT,
      isDone: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false
      },
      isDeleted: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false
      }
    },
    {
      tableName: "todo"
    }
  );

  Todo.associate = function(models) {
    models.Todo.belongsToMany(models.TodoReference, {
      foreignKey: "referenceTodoId"
    });
  };

  return Todo;
};
