
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('TaskLists', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: false,
        type: Sequelize.INTEGER
      },
      taskList_id: {
        unique: true,
        type: Sequelize.UUID,
        required: true,
        primaryKey: true,
      },
      title: {
        type: Sequelize.STRING,
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
    await queryInterface.dropTable('TaskLists');
  }
};






