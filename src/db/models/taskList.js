/* eslint-disable valid-jsdoc */
/* eslint-disable require-jsdoc */
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class TaskList extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
     static associate({ Task, TaskListTask }) {
      this.belongsToMany(Task, { through: TaskListTask, foreignKey: 'taskList_id', otherKey: 'task_id'});
    }

  }
  TaskList.init({
    taskList_id: {
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
    modelName: 'TaskList',
  });
  return TaskList;
};
