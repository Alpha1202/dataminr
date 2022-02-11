
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('TaskListTasks', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: false,
        type: Sequelize.INTEGER
      },
      taskListTask_id: {
        unique: true,
        type: Sequelize.UUID,
        required: true,
        primaryKey: true,
      },
      task_id: {
        unique: false,
        type: Sequelize.UUID,
        required: true,
      },
      taskList_id: {
        unique: false,
        type: Sequelize.UUID,
        required: true,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('TaskListTasks');
  }
};






