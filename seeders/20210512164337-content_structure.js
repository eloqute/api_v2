'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('SectionStructures', [
      {
        "id": "090f0342-8bb7-4cf7-8016-15465042fad7",
        "position": 0,
        "title": "Ways In To The Text"
      },
      {
        "id": "8badb27e-b362-4750-9d64-10bb679b687b",
        "position": 1,
        "title": "Section 1: Influences"
      },
      {
        "id": "04538ac2-7f69-4afb-804d-6937e6bc302e",
        "position": 2,
        "title": "Section 2: Ideas"
      },
      {
        "id": "b1fc7eeb-ae95-434f-b31b-f55cc4599309",
        "position": 3,
        "title": "Section 3: Impact"
      }
    ], {});

    await queryInterface.bulkInsert('ModuleStructures', [
      {
        "id": "cb573ade-551f-45a4-8be9-83d78a9f27a9",
        "sectionId": "090f0342-8bb7-4cf7-8016-15465042fad7",
        "position": 0,
        "title": null
      },
      {
        "id": "ed969fa0-227e-4fc8-8faa-d9296f9f4424",
        "sectionId": "b1fc7eeb-ae95-434f-b31b-f55cc4599309",
        "position": 0,
        "title": "Module 9: The First Responses"
      },
      {
        "id": "cc366941-cecd-48c9-98cc-6e76f88ec1a6",
        "sectionId": "b1fc7eeb-ae95-434f-b31b-f55cc4599309",
        "position": 1,
        "title": "Module 10: The Evolving Debate"
      },
      {
        "id": "f264b958-db00-4cd6-a92e-f94cda66305a",
        "sectionId": "b1fc7eeb-ae95-434f-b31b-f55cc4599309",
        "position": 2,
        "title": "Module 11: Impact And Influence Today"
      },
      {
        "id": "1186fe83-b330-4853-bd96-ac122e3da307",
        "sectionId": "b1fc7eeb-ae95-434f-b31b-f55cc4599309",
        "position": 3,
        "title": "Module 12: Where Next?"
      },
      {
        "id": "2af9e3c7-265e-4245-abaf-d25127224dea",
        "sectionId": "8badb27e-b362-4750-9d64-10bb679b687b",
        "position": 0,
        "title": "Module 1: The Author And The Historical Context"
      },
      {
        "id": "80f9b81b-39c5-4335-92f2-f1d29f99b2f6",
        "sectionId": "8badb27e-b362-4750-9d64-10bb679b687b",
        "position": 1,
        "title": "Module 2: Academic Context"
      },
      {
        "id": "e1a91ecb-98e8-4702-84eb-ea03e7eea360",
        "sectionId": "8badb27e-b362-4750-9d64-10bb679b687b",
        "position": 2,
        "title": "Module 3: The Problem"
      },
      {
        "id": "e8be7994-e485-4b84-b1f3-ae2d012afd55",
        "sectionId": "8badb27e-b362-4750-9d64-10bb679b687b",
        "position": 3,
        "title": "Module 4: The Author's Contribution"
      },
      {
        "id": "6a65f2a7-a3fa-43ec-8001-e573af4c3f35",
        "sectionId": "04538ac2-7f69-4afb-804d-6937e6bc302e",
        "position": 0,
        "title": "Module 5: Main Ideas"
      },
      {
        "id": "ac2e6f6a-764e-4134-a79d-5fa8c3c01a17",
        "sectionId": "04538ac2-7f69-4afb-804d-6937e6bc302e",
        "position": 1,
        "title": "Module 6: Secondary Ideas"
      },
      {
        "id": "ad13f9f9-39fc-4d3d-b2c0-3bed1184bb3a",
        "sectionId": "04538ac2-7f69-4afb-804d-6937e6bc302e",
        "position": 2,
        "title": "Module 7: Achievement"
      },
      {
        "id": "5de914ab-789d-4328-8b4a-b95f8ed0d58b",
        "sectionId": "04538ac2-7f69-4afb-804d-6937e6bc302e",
        "position": 3,
        "title": "Module 8: Place In The Author's Work"
      },
    ], {});

    await queryInterface.bulkInsert('ContentStructures',[
      {
        "id": "e4cb9415-cc73-4cdd-a6f8-da4c4e2eb48b",
        "moduleId": "2af9e3c7-265e-4245-abaf-d25127224dea",
        "position": 0,
        "contentType": "PullQuote",
        "title": "Pull Quote",
        "outerTag": null,
        "innerTag": "p"
      },
      {
        "id": "e2ef1008-bfbc-4f4d-9da2-8c913456667d",
        "moduleId": "2af9e3c7-265e-4245-abaf-d25127224dea",
        "position": 1,
        "contentType": "KeyPoints",
        "title": "Key Points",
        "outerTag": "ul",
        "innerTag": "li"
      },
      {
        "id": "e1dac5ea-f5e9-4509-8a60-761afd4b829a",
        "moduleId": "2af9e3c7-265e-4245-abaf-d25127224dea",
        "position": 2,
        "contentType": "WhyReadThisText",
        "title": "Why Read This Text?",
        "outerTag": null,
        "innerTag": "p"
      },
      {
        "id": "1acdd713-2e4d-426c-b117-36731e7238f6",
        "moduleId": "2af9e3c7-265e-4245-abaf-d25127224dea",
        "position": 3,
        "contentType": "AuthorsLife",
        "title": "Author's Life",
        "outerTag": null,
        "innerTag": "p"
      },
      {
        "id": "3de961d6-9aa5-4aeb-b56c-185143e08968",
        "moduleId": "2af9e3c7-265e-4245-abaf-d25127224dea",
        "position": 4,
        "contentType": "AuthorsBackGround",
        "title": "Author's Background",
        "outerTag": null,
        "innerTag": "p"
      },
      {
        "id": "34641bd8-2cac-49c4-b893-0540e75c587d",
        "moduleId": "2af9e3c7-265e-4245-abaf-d25127224dea",
        "position": 5,
        "contentType": "Notes",
        "title": "Notes",
        "outerTag": null,
        "innerTag": "p"
      },
      {
        "id": "ee0392ed-5eb9-4cf4-9a15-3df4a6770ea6",
        "moduleId": "80f9b81b-39c5-4335-92f2-f1d29f99b2f6",
        "position": 0,
        "contentType": "PullQuote",
        "title": "Pull Quote",
        "outerTag": null,
        "innerTag": "p"
      },
      {
        "id": "1b4aac3a-2b27-40dc-9c41-f7b024aeed2d",
        "moduleId": "80f9b81b-39c5-4335-92f2-f1d29f99b2f6",
        "position": 1,
        "contentType": "KeyPoints",
        "title": "Key Points",
        "outerTag": "ul",
        "innerTag": "li"
      },
      {
        "id": "8b213a03-d36b-4a3a-9ec9-6f9a761caf90",
        "moduleId": "80f9b81b-39c5-4335-92f2-f1d29f99b2f6",
        "position": 2,
        "contentType": "TheWorkInItsContext",
        "title": "The Work In Its Context",
        "outerTag": null,
        "innerTag": "p"
      },
      {
        "id": "b93df109-321c-4967-8c26-9a9a184a72d2",
        "moduleId": "80f9b81b-39c5-4335-92f2-f1d29f99b2f6",
        "position": 3,
        "contentType": "OverviewOfTheField",
        "title": "Overview Of The Field",
        "outerTag": null,
        "innerTag": "p"
      },
      {
        "id": "01cf9fb1-d698-47ae-9aa7-ea5d91ed7ebe",
        "moduleId": "80f9b81b-39c5-4335-92f2-f1d29f99b2f6",
        "position": 4,
        "contentType": "AcademicInfluences",
        "title": "Academic Influences",
        "outerTag": null,
        "innerTag": "p"
      },
      {
        "id": "bb16f474-b72d-4278-8cb2-e0664d3d14c9",
        "moduleId": "80f9b81b-39c5-4335-92f2-f1d29f99b2f6",
        "position": 5,
        "contentType": "Notes",
        "title": "Notes",
        "outerTag": null,
        "innerTag": "p"
      },
      {
        "id": "b6b08491-ceb5-4a1b-b57b-793fbf15348e",
        "moduleId": "e1a91ecb-98e8-4702-84eb-ea03e7eea360",
        "position": 0,
        "contentType": "PullQuote",
        "title": "Pull Quote",
        "outerTag": null,
        "innerTag": "p"
      },
      {
        "id": "0049029c-f7d1-4d48-a8db-412369436ea5",
        "moduleId": "e1a91ecb-98e8-4702-84eb-ea03e7eea360",
        "position": 1,
        "contentType": "KeyPoints",
        "title": "Key Points",
        "outerTag": "ul",
        "innerTag": "li"
      },
      {
        "id": "2897d2cd-a077-43da-aab8-79c4b3c1bb3f",
        "moduleId": "e1a91ecb-98e8-4702-84eb-ea03e7eea360",
        "position": 2,
        "contentType": "CoreQuestion",
        "title": "Core Question",
        "outerTag": null,
        "innerTag": "p"
      },
      {
        "id": "ac7c8566-76d3-46fd-8dfd-82d906d064cb",
        "moduleId": "e1a91ecb-98e8-4702-84eb-ea03e7eea360",
        "position": 3,
        "contentType": "TheParticipants",
        "title": "The Participants",
        "outerTag": null,
        "innerTag": "p"
      },
      {
        "id": "ac7a823b-d419-46a3-ac48-17232ec588e9",
        "moduleId": "e1a91ecb-98e8-4702-84eb-ea03e7eea360",
        "position": 4,
        "contentType": "TheContemporaryDebate",
        "title": "The Contemporary Debate",
        "outerTag": null,
        "innerTag": "p"
      },
      {
        "id": "d829469a-74d5-4b68-b9d1-bbffe63b38b7",
        "moduleId": "e1a91ecb-98e8-4702-84eb-ea03e7eea360",
        "position": 5,
        "contentType": "Notes",
        "title": "Notes",
        "outerTag": null,
        "innerTag": "p"
      },
      {
        "id": "c36a1f5b-13ee-4259-a9f5-ad3877673af7",
        "moduleId": "e8be7994-e485-4b84-b1f3-ae2d012afd55",
        "position": 0,
        "contentType": "PullQuote",
        "title": "Pull Quote",
        "outerTag": null,
        "innerTag": "p"
      },
      {
        "id": "f9ddeaa7-4a0c-4145-87ae-163ebc5e773e",
        "moduleId": "e8be7994-e485-4b84-b1f3-ae2d012afd55",
        "position": 1,
        "contentType": "KeyPoints",
        "title": "Key Points",
        "outerTag": "ul",
        "innerTag": "li"
      },
      {
        "id": "96ef086c-0ed2-4ebc-bd56-474c89ba4f5b",
        "moduleId": "e8be7994-e485-4b84-b1f3-ae2d012afd55",
        "position": 2,
        "contentType": "AuthorsAims",
        "title": "Author's Aims",
        "outerTag": null,
        "innerTag": "p"
      },
      {
        "id": "0181688b-0f79-4325-8f87-9ad30c60a657",
        "moduleId": "e8be7994-e485-4b84-b1f3-ae2d012afd55",
        "position": 3,
        "contentType": "Approach",
        "title": "Approach",
        "outerTag": null,
        "innerTag": "p"
      },
      {
        "id": "4b1ea2b5-b2fa-4cfd-a85c-42c7d0715ea2",
        "moduleId": "e8be7994-e485-4b84-b1f3-ae2d012afd55",
        "position": 4,
        "contentType": "ContributionInContext",
        "title": "Contribution In Context",
        "outerTag": null,
        "innerTag": "p"
      },
      {
        "id": "cd8b78dc-9a37-4f6a-bdae-bbc3d87135bb",
        "moduleId": "e8be7994-e485-4b84-b1f3-ae2d012afd55",
        "position": 5,
        "contentType": "Notes",
        "title": "Notes",
        "outerTag": null,
        "innerTag": "p"
      },
      {
        "id": "695d2116-bce4-4085-9d31-11bca85b19c5",
        "moduleId": "6a65f2a7-a3fa-43ec-8001-e573af4c3f35",
        "position": 0,
        "contentType": "PullQuote",
        "title": "Pull Quote",
        "outerTag": null,
        "innerTag": "p"
      },
      {
        "id": "c2bbc282-5c6c-461e-a8a3-a09186ac6f92",
        "moduleId": "6a65f2a7-a3fa-43ec-8001-e573af4c3f35",
        "position": 1,
        "contentType": "KeyPoints",
        "title": "Key Points",
        "outerTag": "ul",
        "innerTag": "li"
      },
      {
        "id": "8605f5fd-5f31-4d0a-b141-0e65812a3062",
        "moduleId": "6a65f2a7-a3fa-43ec-8001-e573af4c3f35",
        "position": 2,
        "contentType": "KeyThemes",
        "title": "Key Themes",
        "outerTag": null,
        "innerTag": "p"
      },
      {
        "id": "76c7b273-66bd-4d27-bd04-96fd62965b1d",
        "moduleId": "6a65f2a7-a3fa-43ec-8001-e573af4c3f35",
        "position": 3,
        "contentType": "ExploringTheIdeas",
        "title": "Exploring The Ideas",
        "outerTag": null,
        "innerTag": "p"
      },
      {
        "id": "055e984f-5e66-40e0-ab21-79ed129169c4",
        "moduleId": "6a65f2a7-a3fa-43ec-8001-e573af4c3f35",
        "position": 4,
        "contentType": "LanguageAndExpression",
        "title": "Language And Expression",
        "outerTag": null,
        "innerTag": "p"
      },
      {
        "id": "e02bc63d-d696-4fb9-91c9-160e6ba0a790",
        "moduleId": "6a65f2a7-a3fa-43ec-8001-e573af4c3f35",
        "position": 5,
        "contentType": "Notes",
        "title": "Notes",
        "outerTag": null,
        "innerTag": "p"
      },
      {
        "id": "fdb7150d-80ca-4c23-ba23-15df9c66994e",
        "moduleId": "ac2e6f6a-764e-4134-a79d-5fa8c3c01a17",
        "position": 0,
        "contentType": "PullQuote",
        "title": "Pull Quote",
        "outerTag": null,
        "innerTag": "p"
      },
      {
        "id": "1230c63e-cc86-4eea-971e-d8fbc9f3d116",
        "moduleId": "ac2e6f6a-764e-4134-a79d-5fa8c3c01a17",
        "position": 1,
        "contentType": "KeyPoints",
        "title": "Key Points",
        "outerTag": "ul",
        "innerTag": "li"
      },
      {
        "id": "5db36bff-46dc-4224-af52-b98c2643f26d",
        "moduleId": "ac2e6f6a-764e-4134-a79d-5fa8c3c01a17",
        "position": 2,
        "contentType": "OtherIdeas",
        "title": "Other Ideas",
        "outerTag": null,
        "innerTag": "p"
      },
      {
        "id": "5b3b6663-75c6-48d6-8355-50e3ec9d961a",
        "moduleId": "ac2e6f6a-764e-4134-a79d-5fa8c3c01a17",
        "position": 3,
        "contentType": "ExploringTheIdeas2",
        "title": "Exploring The Ideas",
        "outerTag": null,
        "innerTag": "p"
      },
      {
        "id": "c923d216-f427-4c23-9f7f-b3365cf0c1d5",
        "moduleId": "ac2e6f6a-764e-4134-a79d-5fa8c3c01a17",
        "position": 4,
        "contentType": "Overlooked",
        "title": "Overlooked",
        "outerTag": null,
        "innerTag": "p"
      },
      {
        "id": "09e94f0e-4c22-40b0-ba9c-cfba2a052382",
        "moduleId": "ac2e6f6a-764e-4134-a79d-5fa8c3c01a17",
        "position": 5,
        "contentType": "Notes",
        "title": "Notes",
        "outerTag": null,
        "innerTag": "p"
      },
      {
        "id": "9752f8a7-8a9d-415a-816b-3f025ddf2029",
        "moduleId": "ad13f9f9-39fc-4d3d-b2c0-3bed1184bb3a",
        "position": 0,
        "contentType": "PullQuote",
        "title": "Pull Quote",
        "outerTag": null,
        "innerTag": "p"
      },
      {
        "id": "3e4280ee-c3e6-47da-b252-9d2b38d3e07d",
        "moduleId": "ad13f9f9-39fc-4d3d-b2c0-3bed1184bb3a",
        "position": 1,
        "contentType": "KeyPoints",
        "title": "Key Points",
        "outerTag": "ul",
        "innerTag": "li"
      },
      {
        "id": "8a7b2eaa-e548-4de1-8030-7e282630442f",
        "moduleId": "ad13f9f9-39fc-4d3d-b2c0-3bed1184bb3a",
        "position": 2,
        "contentType": "AssessingTheArgument",
        "title": "Assessing The Argument",
        "outerTag": null,
        "innerTag": "p"
      },
      {
        "id": "f945e739-9d76-4295-b7fb-812ffb9c69e2",
        "moduleId": "ad13f9f9-39fc-4d3d-b2c0-3bed1184bb3a",
        "position": 3,
        "contentType": "AchievementInContext",
        "title": "Achievement In Context",
        "outerTag": null,
        "innerTag": "p"
      },
      {
        "id": "b55885f5-df8f-4cf5-92b0-052921a5bdb3",
        "moduleId": "ad13f9f9-39fc-4d3d-b2c0-3bed1184bb3a",
        "position": 4,
        "contentType": "Limitations",
        "title": "Limitations",
        "outerTag": null,
        "innerTag": "p"
      },
      {
        "id": "608b3af1-c292-4369-9612-e7495366f44b",
        "moduleId": "ad13f9f9-39fc-4d3d-b2c0-3bed1184bb3a",
        "position": 5,
        "contentType": "Notes",
        "title": "Notes",
        "outerTag": null,
        "innerTag": "p"
      },
      {
        "id": "1fce099a-1134-41f9-93c0-bfd5a44b988c",
        "moduleId": "5de914ab-789d-4328-8b4a-b95f8ed0d58b",
        "position": 0,
        "contentType": "PullQuote",
        "title": "Pull Quote",
        "outerTag": null,
        "innerTag": "p"
      },
      {
        "id": "fa356a83-6259-49a3-9069-ddd5c9e99613",
        "moduleId": "5de914ab-789d-4328-8b4a-b95f8ed0d58b",
        "position": 1,
        "contentType": "KeyPoints",
        "title": "Key Points",
        "outerTag": "ul",
        "innerTag": "li"
      },
      {
        "id": "c17fddbe-163a-4945-bfd7-67c965afc50b",
        "moduleId": "5de914ab-789d-4328-8b4a-b95f8ed0d58b",
        "position": 2,
        "contentType": "Positioning",
        "title": "Positioning",
        "outerTag": null,
        "innerTag": "p"
      },
      {
        "id": "8e7e289a-0551-44f9-a111-f8148821b6a1",
        "moduleId": "5de914ab-789d-4328-8b4a-b95f8ed0d58b",
        "position": 3,
        "contentType": "Integration",
        "title": "Integration",
        "outerTag": null,
        "innerTag": "p"
      },
      {
        "id": "9af3dc48-84ba-4a71-9582-2e5a1f254d01",
        "moduleId": "5de914ab-789d-4328-8b4a-b95f8ed0d58b",
        "position": 4,
        "contentType": "Significance",
        "title": "Significance",
        "outerTag": null,
        "innerTag": "p"
      },
      {
        "id": "b944de09-87ef-4cca-86c8-b29232b081dd",
        "moduleId": "5de914ab-789d-4328-8b4a-b95f8ed0d58b",
        "position": 5,
        "contentType": "Notes",
        "title": "Notes",
        "outerTag": null,
        "innerTag": "p"
      },
      {
        "id": "215d1b7c-1126-453e-8302-3c86d15db08b",
        "moduleId": "ed969fa0-227e-4fc8-8faa-d9296f9f4424",
        "position": 0,
        "contentType": "PullQuote",
        "title": "Pull Quote",
        "outerTag": null,
        "innerTag": "p"
      },
      {
        "id": "24f25b36-fc46-4e92-9509-0556fcfdc10a",
        "moduleId": "ed969fa0-227e-4fc8-8faa-d9296f9f4424",
        "position": 1,
        "contentType": "KeyPoints",
        "title": "Key Points",
        "outerTag": "ul",
        "innerTag": "li"
      },
      {
        "id": "dcd23fee-a766-4b32-8d2d-2ac33af8b36a",
        "moduleId": "ed969fa0-227e-4fc8-8faa-d9296f9f4424",
        "position": 2,
        "contentType": "Criticism",
        "title": "Criticism",
        "outerTag": null,
        "innerTag": "p"
      },
      {
        "id": "c2db7098-df6c-4e4b-8194-b80d76eee8ba",
        "moduleId": "ed969fa0-227e-4fc8-8faa-d9296f9f4424",
        "position": 3,
        "contentType": "Responses",
        "title": "Responses",
        "outerTag": null,
        "innerTag": "p"
      },
      {
        "id": "5ac6b6a9-218d-4576-ae1a-108e7a89e8e3",
        "moduleId": "ed969fa0-227e-4fc8-8faa-d9296f9f4424",
        "position": 4,
        "contentType": "ConflictAndConcensus",
        "title": "Conflict and Consensus",
        "outerTag": null,
        "innerTag": "p"
      },
      {
        "id": "a3f63004-2595-46d7-b984-f1611207dbd5",
        "moduleId": "ed969fa0-227e-4fc8-8faa-d9296f9f4424",
        "position": 5,
        "contentType": "Notes",
        "title": "Notes",
        "outerTag": null,
        "innerTag": "p"
      },
      {
        "id": "a32a75f7-6193-4d51-bbc1-95399f35e131",
        "moduleId": "cc366941-cecd-48c9-98cc-6e76f88ec1a6",
        "position": 0,
        "contentType": "PullQuote",
        "title": "Pull Quote",
        "outerTag": null,
        "innerTag": "p"
      },
      {
        "id": "fb9328b6-7a0b-421d-9e20-7b25c3fd669e",
        "moduleId": "cc366941-cecd-48c9-98cc-6e76f88ec1a6",
        "position": 1,
        "contentType": "KeyPoints",
        "title": "Key Points",
        "outerTag": "ul",
        "innerTag": "li"
      },
      {
        "id": "7f32caec-dde7-4ed8-a45c-f95fc8f8eba8",
        "moduleId": "cc366941-cecd-48c9-98cc-6e76f88ec1a6",
        "position": 2,
        "contentType": "UsesAndProblems",
        "title": "Uses And Problems",
        "outerTag": null,
        "innerTag": "p"
      },
      {
        "id": "2721e116-2d83-477c-aadc-889544289e10",
        "moduleId": "cc366941-cecd-48c9-98cc-6e76f88ec1a6",
        "position": 3,
        "contentType": "SchoolsOfThought",
        "title": "Schools Of Thought",
        "outerTag": null,
        "innerTag": "p"
      },
      {
        "id": "16a5ea6f-535c-4722-9b5d-3867634f3d37",
        "moduleId": "cc366941-cecd-48c9-98cc-6e76f88ec1a6",
        "position": 4,
        "contentType": "InCurrentScholarship",
        "title": "In Current Scholarship",
        "outerTag": null,
        "innerTag": "p"
      },
      {
        "id": "f4c07134-270f-4926-86b8-43a70013bd8e",
        "moduleId": "cc366941-cecd-48c9-98cc-6e76f88ec1a6",
        "position": 5,
        "contentType": "Notes",
        "title": "Notes",
        "outerTag": null,
        "innerTag": "p"
      },
      {
        "id": "a9650827-eaa0-465d-844f-a390eb8b9f47",
        "moduleId": "f264b958-db00-4cd6-a92e-f94cda66305a",
        "position": 0,
        "contentType": "PullQuote",
        "title": "Pull Quote",
        "outerTag": null,
        "innerTag": "p"
      },
      {
        "id": "d3cdda43-e8a6-43cb-b006-e496b7d2dd6b",
        "moduleId": "f264b958-db00-4cd6-a92e-f94cda66305a",
        "position": 1,
        "contentType": "KeyPoints",
        "title": "Key Points",
        "outerTag": "ul",
        "innerTag": "li"
      },
      {
        "id": "de7fe0f5-5b96-409c-840a-cf879943b222",
        "moduleId": "f264b958-db00-4cd6-a92e-f94cda66305a",
        "position": 2,
        "contentType": "Position",
        "title": "Position",
        "outerTag": null,
        "innerTag": "p"
      },
      {
        "id": "dc7681eb-4092-4f4f-aa7c-2d66db5f1c9f",
        "moduleId": "f264b958-db00-4cd6-a92e-f94cda66305a",
        "position": 3,
        "contentType": "Interation",
        "title": "Interaction",
        "outerTag": null,
        "innerTag": "p"
      },
      {
        "id": "5652419f-f6b3-49db-abd3-ce409a6a5a87",
        "moduleId": "f264b958-db00-4cd6-a92e-f94cda66305a",
        "position": 4,
        "contentType": "TheContinuingDebate",
        "title": "The Continuing Debate",
        "outerTag": null,
        "innerTag": "p"
      },
      {
        "id": "9a5b4261-39a1-4ea2-bb01-ecf216ce658c",
        "moduleId": "f264b958-db00-4cd6-a92e-f94cda66305a",
        "position": 5,
        "contentType": "Notes",
        "title": "Notes",
        "outerTag": null,
        "innerTag": "p"
      },
      {
        "id": "c2e48771-6544-4d33-838f-85e29bbd9f2b",
        "moduleId": "cb573ade-551f-45a4-8be9-83d78a9f27a9",
        "position": 2,
        "contentType": "WhatDoesPublicationSay",
        "title": "What Does <em>{{title}}</em> Say?",
        "outerTag": "",
        "innerTag": "p"
      },
      {
        "id": "4a92606a-7870-4fce-b2cd-9a0b4edf34b6",
        "moduleId": "cb573ade-551f-45a4-8be9-83d78a9f27a9",
        "position": 0,
        "contentType": "KeyPoints",
        "title": "Key Points",
        "outerTag": "ul",
        "innerTag": "li"
      },
      {
        "id": "a162f786-4904-4a88-9af8-8e98191e82c3",
        "moduleId": "cb573ade-551f-45a4-8be9-83d78a9f27a9",
        "position": 4,
        "contentType": "Notes",
        "title": "Notes",
        "outerTag": "",
        "innerTag": "p"
      },
      {
        "id": "245aa898-20de-4329-afdb-126d9fee608b",
        "moduleId": "cb573ade-551f-45a4-8be9-83d78a9f27a9",
        "position": 3,
        "contentType": "WhyDoesPublicationMatter",
        "title": "Why Does <em>The Sacred Wood</em> Matter?",
        "outerTag": "",
        "innerTag": "p"
      },
      {
        "id": "04a1093e-6fc7-4026-b615-caceec8b0aa6",
        "moduleId": "cb573ade-551f-45a4-8be9-83d78a9f27a9",
        "position": 1,
        "contentType": "WhoWasAuthor",
        "title": "Who was T. S. Eliot?",
        "outerTag": "",
        "innerTag": "p"
      },
      {
        "id": "d9ff72ac-491f-4a3c-a70b-fea973b53a2a",
        "moduleId": "1186fe83-b330-4853-bd96-ac122e3da307",
        "position": 0,
        "contentType": "PullQuote",
        "title": "Pull Quote",
        "outerTag": "",
        "innerTag": "p"
      },
      {
        "id": "f0ce08ba-b76d-462c-aef2-088d89d44b9d",
        "moduleId": "1186fe83-b330-4853-bd96-ac122e3da307",
        "position": 1,
        "contentType": "KeyPoints",
        "title": "Key Points",
        "outerTag": "ul",
        "innerTag": "li"
      },
      {
        "id": "3789fe9d-e4e0-4a74-8423-765ca0848af6",
        "moduleId": "1186fe83-b330-4853-bd96-ac122e3da307",
        "position": 2,
        "contentType": "Potential",
        "title": "Potential",
        "outerTag": "",
        "innerTag": "p"
      },
      {
        "id": "128d5c1d-568a-44c7-85a7-d39730701664",
        "moduleId": "1186fe83-b330-4853-bd96-ac122e3da307",
        "position": 3,
        "contentType": "FutureDirections",
        "title": "Future Directions",
        "outerTag": "",
        "innerTag": "p"
      },
      {
        "id": "e7c27b70-a02e-4218-be5d-422d7927f1d7",
        "moduleId": "1186fe83-b330-4853-bd96-ac122e3da307",
        "position": 4,
        "contentType": "Summary",
        "title": "Summary",
        "outerTag": "",
        "innerTag": "p"
      },
      {
        "id": "7fae55cd-8cfe-4e7f-8546-40190bb68a5c",
        "moduleId": "1186fe83-b330-4853-bd96-ac122e3da307",
        "position": 5,
        "contentType": "Notes",
        "title": "Notes",
        "outerTag": "",
        "innerTag": "p"
      }
    ] , {});
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('ContentStructures', null, {});
    await queryInterface.bulkDelete('ModuleStructures', null, {});
    await queryInterface.bulkDelete('SectionStructures', null, {});
  }
};
