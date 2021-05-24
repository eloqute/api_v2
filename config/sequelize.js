"use strict";

const shared = {
  url: process.env.DATABASE_URL,
  seederStorage: "sequelize"
};

module.exports = {
  development: shared,
  test: shared,
  production: {...shared, ...{
    dialect: "postgres",
    protocol: "postgres",
    dialectOptions: {
      ssl: {
        require: true,
        rejectUnauthorized: false
      }
    }
  }}
};
