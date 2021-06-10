'use strict';

const fs = require("fs");
var path = require("path");

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const contentItems = JSON.parse(fs.readFileSync(path.join(__dirname, "data", "contentItems.json"), "utf-8"));

    await queryInterface.bulkInsert('ContentItems', contentItems, {});
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('ContentItems', null, {});
  }
};
