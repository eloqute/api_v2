'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable("SectionStructures", {
      id: {
        primaryKey: true,
        type: Sequelize.DataTypes.UUID
      },
      position: Sequelize.DataTypes.INTEGER,
      title: Sequelize.DataTypes.STRING,
      createdAt: Sequelize.DataTypes.DATE,
      updatedAt: Sequelize.DataTypes.DATE
    });
    await queryInterface.createTable("ModuleStructures", {
      id: {
        primaryKey: true,
        type: Sequelize.DataTypes.UUID
      },
      sectionId : {
        type: Sequelize.DataTypes.UUID,
        references: { model: "SectionStructures", key: "id" }
      },
      position: Sequelize.DataTypes.INTEGER,
      title: Sequelize.DataTypes.STRING,
      createdAt: Sequelize.DataTypes.DATE,
      updatedAt: Sequelize.DataTypes.DATE
    });
    await queryInterface.createTable("ContentStructures", {
      id: {
        primaryKey: true,
        type: Sequelize.DataTypes.UUID
      },
      moduleId : {
        type: Sequelize.DataTypes.UUID,
        references: { model: "ModuleStructures", key: "id" }
      },
      contentType: Sequelize.DataTypes.STRING,
      position: Sequelize.DataTypes.INTEGER,
      title: Sequelize.DataTypes.STRING,
      outerTag: Sequelize.DataTypes.STRING,
      innerTag: Sequelize.DataTypes.STRING,
      createdAt: Sequelize.DataTypes.DATE,
      updatedAt: Sequelize.DataTypes.DATE
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('ContentStructures');
    await queryInterface.dropTable('ModuleStructures');
    await queryInterface.dropTable('SectionStructures');
  }
};
