'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Users', {
      id: {
        primaryKey: true,
        type: Sequelize.DataTypes.UUID
      },
      email: Sequelize.DataTypes.STRING,
      passwordHash: Sequelize.DataTypes.STRING,
      createdAt: Sequelize.DataTypes.DATE,
      updatedAt: Sequelize.DataTypes.DATE
    });
    await queryInterface.addIndex("Users", ["email"]);
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('Users');
  }
};
