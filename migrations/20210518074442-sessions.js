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
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('Sessions');
  }
};
