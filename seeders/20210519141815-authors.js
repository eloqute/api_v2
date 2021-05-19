'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert("Authors", [
      {
        "name": "Georg Wilhelm Friedrich Hegel",
        "biography": "<p>G. W. F. Hegel was born in Stuttgart, Germany, on August 27, 1770. In 1805 he became a professor at Jena University and began to write the first of his great philosophical texts there. A key figure in the explosion of philosophy in Germany at the turn of the nineteenth century, the sheer breadth of Hegel’s thinking has influenced political philosophers for centuries. Closely associated with the University of Berlin in the latter part of his life, Hegel died from disease—possibly cholera—in 1831 at the age of 61.</p>",
        "isAlive": false,
        "id": "6a930da3-1107-48d6-aaf7-3df1c0722a5b"
      },
      {
        "name": "Ian Jackson",
        "biography": "<p><br>Ian Jackson—Lancaster University<br></p>",
        "isAlive": true,
        "id": "af91a4cb-faad-4048-a4a1-c259155eb15a"
      },
      {
        "name": "Aristotle",
        "biography": "<p>Aristotle was born in 384 B.C.E. in what is present-day Macedonia. At the age of 17 he moved to Athens in Greece to begin an education in philosophy under Plato, one of the founders of European philosophy, at his renowned Academy. On Plato’s death in 347 B.C.E., Aristotle moved back to Macedonia to tutor the young Alexander the Great. But in 335 B.C.E. he returned to Athens and established his own school, the Lyceum. Political unrest forced Aristotle to leave Athens again in 322 B.C.E., and he died shortly afterwards on the island of Euboea.</p>",
        "isAlive": false,
        "id": "1bb878fd-abdc-4095-893f-df13449d2d5c"
      },
      {
        "name": "Aiste Celkyte",
        "biography": "<p>Dr. Aiste Celkyte—Yonsei University, South Korea</p>",
        "isAlive": true,
        "id": "abb05978-5541-46ba-990d-f8742cb876e1"
      },
      {
        "name": "Ernst Gellner",
        "biography": "<p>Ernest Gellner was born in Paris, France, in 1925. He spent his boyhood in Prague, Czechoslovakia, but his time there ended when Nazi Germany invaded and the Jewish Gellners escaped to Great Britain. Ernest eventually obtained degrees from Oxford and the London School of Economics. Having fled his homeland because of the Nazis’ extreme nationalism, it is perhaps not surprising that Gellner came to study the phenomenon. He finally returned to Prague in 1993 as the founding director of the Centre for the Study of Nationalism at Central European University. He died there just two years later, at the age of 69.</p>",
        "isAlive": false,
        "id": "36212efa-d6a8-400d-a709-d3e5563c4870"
      },
      {
        "name": "Dale J. Stahl",
        "biography": "<p>Dale J. Stahl—New York University, Abu Dhabi</p>",
        "isAlive": true,
        "id": "8c6c1525-a236-42f5-a652-e1a973c28617"
      },
      {
        "name": "T. S. Eliot",
        "biography": "<p>Born in 1888 in the US state of Missouri, Thomas Stearns (T. S.) Eliot moved to England in 1914, where he lived for the rest of his life, working variously as a poet, a cultural and literary critic, an editor, and even a financier. Eliot’s reputation as a literary critic soared after the publication of <i>The Sacred Wood</i> in 1920 and two years later his poem <i>The Waste Land</i> brought him huge recognition as a poet. He died in 1965 aged 76, hailed as one of the greatest poets of the twentieth century.</p>",
        "isAlive": false,
        "id": "68180522-9003-4415-aba8-8a4723d0aff1"
      },
      {
        "name": "Rachel Teubner",
        "biography": "<p>Rachel Teubner—University of Virginia</p>",
        "isAlive": true,
        "id": "8ced62e7-9b84-40dd-be6b-0ba9a3a6d8b5"
      },
      {
        "name": "Alexander Hamilton",
        "biography": "<p>Alexander Hamilton (1755 or 1757–1804) was born in the British West Indies. An aide to George Washington during the American Revolution, he went on to establish the US Department of the Treasury.</p>",
        "isAlive": false,
        "id": "868e37e9-14b6-419a-be99-06ca9cc0c031"
      },
      {
        "name": "James Madison",
        "biography": "<p>James Madison (1751–1836) was born into a wealthy plantation-owning family in Virginia; he later wrote the first draft of the US Constitution and became the fourth president of the United States.</p>",
        "isAlive": false,
        "id": "2b6dae9f-f5b4-4556-94bb-5f1a2615fdbf"
      },
      {
        "name": "John Jay",
        "biography": "<p>John Jay (1745–1829) was born in New York City. A lawyer and politician, he was the first chief justice of the US Supreme Court. They are considered three of America’s “Founding Fathers.”</p>",
        "isAlive": false,
        "id": "12e48e1b-74e3-4ee6-b2ff-b33d394af7c8"
      },
      {
        "name": "Jeremy Kleidosty with Jason Xidias",
        "biography": "<p><br>Jeremy Kleidosty—University of St Andrews<br>\n<br>Dr. Jason Xidias—University of California, Berkeley<br></p>",
        "isAlive": true,
        "id": "8cd0f5ef-42e4-4a8d-9bd0-65ae22d11661"
      },
      {
        "name": "Eric Hobsbawm",
        "biography": "<p>British historian Eric Hobsbawm was born in Egypt in 1917 to an English father and Austrian mother, but the family settled in Berlin. By 1931 both of Hobsbawm’s parents had died, and he and his sister were taken in by his aunt and uncle. When the Nazis came to power in Germany two years later, the family fled to London. Hobsbawm went to Cambridge University, joined the British army in World War II, then continued his academic path to become one of Britain’s most respected historians. A lifelong member of the Communist Party, Hobsbawm lived until the grand old age of 95.</p>",
        "isAlive": false,
        "id": "63f7fdc3-b057-47c8-9204-302bff9f5df4"
      },
      {
        "name": "Tom Stammers with Patrick Glen",
        "biography": "<p><br>Dr. Tom Stammers—Emmanuel College Cambridge/University of Durham<br>\n<br>Patrick Glen—University of Sheffield<br></p>",
        "isAlive": true,
        "id": "693b70d1-2b89-437c-8801-bd0d3a63ea8f"
      },
      {
        "name": "Michel Foucault",
        "biography": "<p>The French philosopher and historian Michel Foucault was one of the most influential figures in twentieth century thought. Born in 1926 in Poitiers, France, he was a central player in the development of “French theory”—a loosely affiliated intellectual movement of iconoclastic thinkers working in 1960s Paris, whose work reverberated through university departments across the world from the 1970s onwards. Foucault was a pioneering analyst of hidden and repressed histories whose work, in his own words, sought to “show up, transform, and reverse the systems which quietly order us about”—the invisible structures that confine and define us as humans. \nAlong with the short, influential “What is an Author?” (1969), Foucault was the author of a number of seminal texts including The History of Madness (1961), The Order of Things (1966), Archaeology of Knowledge (1969), Discipline and Punish (1975), and The History of Sexuality (1976-1984). Through these he came to be known as the greatest analyst of the interactions between power and social life, consistently unsettling our deepest assumptions about what is true, real, or natural. By the time of his death from complications of AIDS in 1984 he was widely recognized as the most influential thinker in the world.</p>",
        "isAlive": true,
        "id": "799cac23-a729-4dd0-bf8e-0302647babc1"
      },
      {
        "name": "Tim Smith-Laing",
        "biography": "<p>Dr Tim Smith-Laing took his DPhil at Merton College, Oxford, and has held positions at Jesus College, Oxford, and Sciences Politiques in Paris.</p>",
        "isAlive": true,
        "id": "8d32bebc-55be-484e-8fba-dbfc37c7c228"
      }
    ]);
    await queryInterface.bulkInsert("BookAuthors", [
      {
        "authorId": "6a930da3-1107-48d6-aaf7-3df1c0722a5b",
        "bookId": "dfa16e62-0fd8-404b-9416-c3db870b19f8",
        "position": 0,
        "isTopicAuthor": true
      },
      {
        "authorId": "af91a4cb-faad-4048-a4a1-c259155eb15a",
        "bookId": "dfa16e62-0fd8-404b-9416-c3db870b19f8",
        "position": 1,
        "isTopicAuthor": false
      },
      {
        "authorId": "1bb878fd-abdc-4095-893f-df13449d2d5c",
        "bookId": "9f9176ba-431a-40dd-9f2d-1eace0e22d49",
        "position": 0,
        "isTopicAuthor": true
      },
      {
        "authorId": "abb05978-5541-46ba-990d-f8742cb876e1",
        "bookId": "9f9176ba-431a-40dd-9f2d-1eace0e22d49",
        "position": 1,
        "isTopicAuthor": false
      },
      {
        "authorId": "36212efa-d6a8-400d-a709-d3e5563c4870",
        "bookId": "dac24b14-0428-4fab-8d4f-25fdab709cfb",
        "position": 0,
        "isTopicAuthor": true
      },
      {
        "authorId": "8c6c1525-a236-42f5-a652-e1a973c28617",
        "bookId": "dac24b14-0428-4fab-8d4f-25fdab709cfb",
        "position": 1,
        "isTopicAuthor": false
      },
      {
        "authorId": "68180522-9003-4415-aba8-8a4723d0aff1",
        "bookId": "d5530932-2b73-4c74-8407-d702fd6f6bbd",
        "position": 0,
        "isTopicAuthor": true
      },
      {
        "authorId": "8ced62e7-9b84-40dd-be6b-0ba9a3a6d8b5",
        "bookId": "d5530932-2b73-4c74-8407-d702fd6f6bbd",
        "position": 1,
        "isTopicAuthor": false
      },
      {
        "authorId": "868e37e9-14b6-419a-be99-06ca9cc0c031",
        "bookId": "d4b270f6-790b-44e4-b94e-1fe77f25ad1b",
        "position": 0,
        "isTopicAuthor": true
      },
      {
        "authorId": "2b6dae9f-f5b4-4556-94bb-5f1a2615fdbf",
        "bookId": "d4b270f6-790b-44e4-b94e-1fe77f25ad1b",
        "position": 1,
        "isTopicAuthor": true
      },
      {
        "authorId": "12e48e1b-74e3-4ee6-b2ff-b33d394af7c8",
        "bookId": "d4b270f6-790b-44e4-b94e-1fe77f25ad1b",
        "position": 2,
        "isTopicAuthor": true
      },
      {
        "authorId": "8cd0f5ef-42e4-4a8d-9bd0-65ae22d11661",
        "bookId": "d4b270f6-790b-44e4-b94e-1fe77f25ad1b",
        "position": 3,
        "isTopicAuthor": false
      },
      {
        "authorId": "63f7fdc3-b057-47c8-9204-302bff9f5df4",
        "bookId": "51245ddd-f754-46ff-9ef2-d2cdf8a63a6c",
        "position": 0,
        "isTopicAuthor": true
      },
      {
        "authorId": "693b70d1-2b89-437c-8801-bd0d3a63ea8f",
        "bookId": "51245ddd-f754-46ff-9ef2-d2cdf8a63a6c",
        "position": 1,
        "isTopicAuthor": false
      },
      {
        "authorId": "799cac23-a729-4dd0-bf8e-0302647babc1",
        "bookId": "5b093048-a795-4d53-9e02-0d600c4e5641",
        "position": 0,
        "isTopicAuthor": true
      },
      {
        "authorId": "8d32bebc-55be-484e-8fba-dbfc37c7c228",
        "bookId": "5b093048-a795-4d53-9e02-0d600c4e5641",
        "position": 1,
        "isTopicAuthor": false
      }
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('BookAuthors', null, {});
    await queryInterface.bulkDelete('Authors', null, {});
  }
};
