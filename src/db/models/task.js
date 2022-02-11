/* eslint-disable valid-jsdoc */
/* eslint-disable require-jsdoc */
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Task extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
     static associate({ TaskList, TaskListTask }) {
      this.belongsToMany(TaskList, {through: TaskListTask, foreignKey: 'task_id', otherKey: 'taskList_id'});
    }
  
  }
  Task.init({
    task_id: {
      unique: true,
      type: DataTypes.UUID,
      required: true,
      primaryKey: true,
    },
    title: {
      type: DataTypes.STRING,
      required: true,
    },
  }, {
    sequelize,
    modelName: 'Task',
  });
  return Task;
};
