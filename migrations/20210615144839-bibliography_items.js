'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable("BibliographyItems", {
      id: {
        primaryKey: true,
        type: Sequelize.DataTypes.UUID
      },
      bookId: {
        type: Sequelize.DataTypes.UUID,
        references: { model: "Books", key: "id" }
      },
      position: Sequelize.DataTypes.INTEGER,
      publication: Sequelize.DataTypes.TEXT,
      content: Sequelize.DataTypes.TEXT,
      createdAt: Sequelize.DataTypes.DATE,
      updatedAt: Sequelize.DataTypes.DATE
    });
    queryInterface.addIndex(
      "BibliographyItems",
      ["bookId", "position"]
    );
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable("BibliographyItems");
  }
};
