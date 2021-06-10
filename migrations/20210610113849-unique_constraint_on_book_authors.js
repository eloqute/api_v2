'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addConstraint("BookAuthors", { fields: ["bookId", "authorId"],  type: "unique" });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeConstraint("BookAuthors", { fields: ["bookId", "authorId"],  type: "unique" });
  }
};
