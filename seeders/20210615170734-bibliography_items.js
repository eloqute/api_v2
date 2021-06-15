'use strict';


const fs = require("fs");
var path = require("path");

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const bibliographyItems = JSON.parse(fs.readFileSync(path.join(__dirname, "data", "bibliographyItems.json"), "utf-8"));
    await queryInterface.bulkInsert('BibliographyItems', bibliographyItems, {});
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('BibliographyItems', null, {});
  }
};
