'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable("Sessions", {
      sid: {
        type: Sequelize.DataTypes.STRING,
        primaryKey: true,
      },
      userId: Sequelize.DataTypes.STRING,
      expires: Sequelize.DataTypes.DATE,
      data: Sequelize.DataTypes.TEXT,
      createdAt: Sequelize.DataTypes.DATE,
      updatedAt: Sequelize.DataTypes.DATE
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('Sessions');
  }
};
