'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable("ContentItems", {
      id: {
        primaryKey: true,
        type: Sequelize.DataTypes.UUID
      },
      bookId: {
        type: Sequelize.DataTypes.UUID,
        references: { model: "Books", key: "id" }
      },
      contentStructureId: {
        type: Sequelize.DataTypes.UUID,
        references: { model: "ContentStructures", key: "id" }
      },
      position: Sequelize.DataTypes.INTEGER,
      content: Sequelize.DataTypes.TEXT,
      createdAt: Sequelize.DataTypes.DATE,
      updatedAt: Sequelize.DataTypes.DATE
    });
    queryInterface.addIndex(
      "ContentItems",
      ["bookId", "contentStructureId", "position"]
    );
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable("ContentItems");
  }
};
