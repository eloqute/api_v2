'use strict';

const fs = require("fs");
var path = require("path");

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const authors = JSON.parse(fs.readFileSync(path.join(__dirname, "data", "authors.json"), "utf-8"));
    const bookAuthors = JSON.parse(fs.readFileSync(path.join(__dirname, "data", "bookAuthors.json"), "utf-8"));

    await queryInterface.bulkInsert("Authors", authors);
    await queryInterface.bulkInsert("BookAuthors", bookAuthors);
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('BookAuthors', null, {});
    await queryInterface.bulkDelete('Authors', null, {});
  }
};
