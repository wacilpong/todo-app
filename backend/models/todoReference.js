module.exports = (sequelize, DataTypes) => {
  const TodoReference = sequelize.define(
    "TodoReference",
    {
      referenceTodoId: DataTypes.INTEGER
    },
    {
      tableName: "todo_reference"
    }
  );

  TodoReference.associate = function(models) {
    models.TodoReference.belongsToMany(models.Todo, {
      foreignKey: "id",
      onDelete: "CASCADE"
    });
  };

  return TodoReference;
};
