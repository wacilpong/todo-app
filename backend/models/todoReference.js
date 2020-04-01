module.exports = (sequelize, DataTypes) => {
  const TodoReference = sequelize.define("todoReference", {
    todoReferenceId: {
      type: DataTypes.INTEGER,
      allowNull: false
    }
  });

  return TodoReference;
};
