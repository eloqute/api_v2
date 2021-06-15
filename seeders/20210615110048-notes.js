'use strict';

const fs = require("fs");
var path = require("path");

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const notes = JSON.parse(fs.readFileSync(path.join(__dirname, "data", "notes.json"), "utf-8"));
    await queryInterface.bulkInsert('Notes', notes, {});
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('Notes', null, {});
  }
};
