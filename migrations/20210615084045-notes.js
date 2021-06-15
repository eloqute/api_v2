'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable("Notes", {
      id: {
        primaryKey: true,
        type: Sequelize.DataTypes.UUID
      },
      bookId: {
        type: Sequelize.DataTypes.UUID,
        references: { model: "Books", key: "id" }
      },
      moduleId: {
        type: Sequelize.DataTypes.UUID,
        references: { model: "ModuleStructures", key: "id" }
      },
      position: Sequelize.DataTypes.INTEGER,
      textIdentifier: Sequelize.DataTypes.STRING,
      content: Sequelize.DataTypes.TEXT,
      createdAt: Sequelize.DataTypes.DATE,
      updatedAt: Sequelize.DataTypes.DATE
    });
    queryInterface.addIndex(
      "Notes",
      ["bookId", "moduleId", "position"]
    );
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable("Notes");
  }
};
