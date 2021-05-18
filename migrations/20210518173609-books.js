'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable("Books", {
      id: {
        primaryKey: true,
        type: Sequelize.DataTypes.UUID
      },
      publicationURL: Sequelize.DataTypes.STRING,
      title: Sequelize.DataTypes.STRING,
      ISBN: Sequelize.DataTypes.STRING,
      synopsis: Sequelize.DataTypes.TEXT,
      overview: Sequelize.DataTypes.TEXT,
      createdAt: Sequelize.DataTypes.DATE,
      updatedAt: Sequelize.DataTypes.DATE
    });
    await queryInterface.addIndex("Books", ["publicationURL"]);
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable("Books");
  }
};
