'use strict';

const fs = require("fs");
var path = require("path");

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const books = JSON.parse(fs.readFileSync(path.join(__dirname, "data", "books.json"), "utf-8"));
    await queryInterface.bulkInsert('Books', books);
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('Books', null, {});
  }
};
