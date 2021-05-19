'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addIndex("Books", ["ISBN"]);
    await queryInterface.createTable("Authors", {
      id: {
        primaryKey: true,
        type: Sequelize.DataTypes.UUID
      },
      name: Sequelize.DataTypes.STRING,
      biography: Sequelize.DataTypes.TEXT,
      isAlive: Sequelize.DataTypes.BOOLEAN,
      createdAt: Sequelize.DataTypes.DATE,
      updatedAt: Sequelize.DataTypes.DATE
    });
    await queryInterface.createTable("BookAuthors", {
      bookId : {
        type: Sequelize.DataTypes.UUID,
        references: { model: "Books", key: "id" }
      },
      authorId : {
        type: Sequelize.DataTypes.UUID,
        references: { model: "Authors", key: "id" }
      },
      position : Sequelize.DataTypes.INTEGER,
      isTopicAuthor: Sequelize.DataTypes.BOOLEAN
    });
    await queryInterface.addIndex("BookAuthors", ["bookId", "position"]);
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable("BookAuthors");
    await queryInterface.dropTable("Authors");
  }
};
