/* eslint-disable valid-jsdoc */
/* eslint-disable require-jsdoc */
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class TaskListTask extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
     static associate({}) {}

  }
  TaskListTask.init({
    taskListTask_id: {
      unique: true,
      type: DataTypes.UUID,
      required: true,
      primaryKey: true,
    },
  }, {
    sequelize,
    modelName: 'TaskListTask',
  });
  return TaskListTask;
};
