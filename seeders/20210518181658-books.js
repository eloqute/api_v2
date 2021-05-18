'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('Books',[
      {
        "id": "dfa16e62-0fd8-404b-9416-c3db870b19f8",
        "publicationURL": "phenomenology-of-spirit-analysis",
        "title": "The Phenomenology of Spirit",
        "ISBN": "9781912127184",
        "synopsis": "",
        "overview": ""
      },
      {
        "id": "9f9176ba-431a-40dd-9f2d-1eace0e22d49",
        "publicationURL": "metaphysics-analysis",
        "title": "Metaphysics",
        "ISBN": "9781912127214",
        "synopsis": "",
        "overview": ""
      },
      {
        "id": "dac24b14-0428-4fab-8d4f-25fdab709cfb",
        "publicationURL": "nations-and-nationalism-analysis",
        "title": "Nations and Nationalism",
        "ISBN": "9781912127306",
        "synopsis": "",
        "overview": ""
      },
      {
        "id": "d5530932-2b73-4c74-8407-d702fd6f6bbd",
        "publicationURL": "the-sacred-wood-analysis",
        "title": "The Sacred Wood: Essays on Poetry and Criticism",
        "ISBN": "9781912127412",
        "synopsis": "",
        "overview": ""
      },
      {
        "id": "d4b270f6-790b-44e4-b94e-1fe77f25ad1b",
        "publicationURL": "the-federalist-papers-analysis",
        "title": "The Federalist Papers",
        "ISBN": "9781912127634",
        "synopsis": "",
        "overview": ""
      },
      {
        "id": "51245ddd-f754-46ff-9ef2-d2cdf8a63a6c",
        "publicationURL": "the-age-of-revolution-analysis",
        "title": "The Age Of Revolution",
        "ISBN": "9781912127658",
        "synopsis": "",
        "overview": ""
      },
      {
        "id": "5b093048-a795-4d53-9e02-0d600c4e5641",
        "publicationURL": "Foucault-whatisanauthor-Macat-analysis",
        "title": "What Is An Author?",
        "ISBN": "9781912453085",
        "synopsis": "",
        "overview": ""
      }
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('Books', null, {});
  }
};
