'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable("GlossaryItems", {
      id: {
        primaryKey: true,
        type: Sequelize.DataTypes.UUID
      },
      bookId: {
        type: Sequelize.DataTypes.UUID,
        references: { model: "Books", key: "id" }
      },
      position: Sequelize.DataTypes.INTEGER,
      type: Sequelize.DataTypes.STRING,
      textIdentifier: Sequelize.DataTypes.STRING,
      label: Sequelize.DataTypes.TEXT,
      synopsis: Sequelize.DataTypes.TEXT,
      createdAt: Sequelize.DataTypes.DATE,
      updatedAt: Sequelize.DataTypes.DATE
    });
    queryInterface.addIndex(
      "GlossaryItems",
      ["bookId", "position"]
    );
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable("GlossaryItems");
  }
};
