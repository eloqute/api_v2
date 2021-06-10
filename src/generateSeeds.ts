import { Sequelize, QueryTypes } from "sequelize";
import fs from "fs";

const ISBN_WHITE_LIST = ["9781912127184", "9781912127214", "9781912127306", "9781912127412", "9781912127634", "9781912127658", "9781912453085"];

const generate = async (dbUrl : string) => {
  const db = new Sequelize(dbUrl);

  const books = await db.query(`
    SELECT id, "publicationURL", title, "ISBN", synopsis, overview from "Books" WHERE "ISBN" in (:isbns)
  `, { type: QueryTypes.SELECT, replacements: { isbns: ISBN_WHITE_LIST } });
  await fs.writeFileSync("seeders/data/books.json", JSON.stringify(books, null, 2));

  const bookAuthors = await db.query(`
    SELECT "BookAuthors"."authorId", "BookAuthors"."bookId", "BookAuthors"."position", "BookAuthors"."isTopicAuthor" from "BookAuthors"
    INNER JOIN "Books"
    ON "Books".id = "BookAuthors"."bookId" WHERE "ISBN" in (:isbns)
  `, { type: QueryTypes.SELECT, replacements: { isbns: ISBN_WHITE_LIST } });
  await fs.writeFileSync("seeders/data/booksAuthors.json", JSON.stringify(bookAuthors, null, 2));

  const authors = await db.query(`
    SELECT "Authors".id, "Authors".name, "Authors".biography, "Authors"."isAlive" from "BookAuthors"
    INNER JOIN "Books"
    ON "Books".id = "BookAuthors"."bookId"
    INNER JOIN "Authors"
    ON "BookAuthors"."authorId" = "Authors".id WHERE "ISBN" in (:isbns)
  `, { type: QueryTypes.SELECT, replacements: { isbns: ISBN_WHITE_LIST } });
  await fs.writeFileSync("seeders/data/authors.json", JSON.stringify(authors, null, 2));

  const contentItems = await db.query(`
      SELECT "ContentItems".id, "ContentItems".position, "ContentItems".content, "ContentItems"."bookId", "ContentItems"."contentStructureId" from "ContentItems"
      INNER JOIN "Books"
      ON "ContentItems"."bookId" = "Books".id WHERE "ISBN" in (:isbns)
  `, { type: QueryTypes.SELECT, replacements: { isbns: ISBN_WHITE_LIST } });
  return fs.writeFileSync("seeders/data/contentItems.json", JSON.stringify(contentItems, null, 2));
};

export default generate;
