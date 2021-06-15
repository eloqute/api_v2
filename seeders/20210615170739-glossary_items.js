'use strict';


const fs = require("fs");
var path = require("path");

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const glossaryItems = JSON.parse(fs.readFileSync(path.join(__dirname, "data", "glossaryItems.json"), "utf-8"));
    await queryInterface.bulkInsert('GlossaryItems', glossaryItems, {});
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('GlossaryItems', null, {});
  }
};
