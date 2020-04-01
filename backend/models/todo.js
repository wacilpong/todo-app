module.exports = (sequelize, DataTypes) => {
  const Todo = sequelize.define("todo", {
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
  });

  return Todo;
};
