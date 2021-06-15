import { Sequelize, QueryTypes } from "sequelize";
import { fromString as uuidFromString } from "uuidv4";

import { asyncMap } from "../utils";

type BookResult = {
  title : string,
  ISBN : string,
  synopsis : string,
  overview : string,
  oldId : number,
  publicationURL : string
};

type BookAuthorResult = {
  ISBN : string,
  position : number,
  isTopicAuthor : boolean,
  oldAuthorId : number,
}

type AuthorResult = {
  name : string,
  biography: string,
  isAlive: boolean
}

type ContentItemResult = {
  sectionPosition : number,
  moduleIndex : number,
  position : number,
  contentType : string,
  content : string
}

type NoteResult = {
  moduleIndex : number,
  position : number,
  textIdentifier : string,
  content : string,
}

type GlossaryItemResult = {
  ISBN : string,
  position : number,
  type : string,
  textIdentifier : string,
  label : string,
  synopsis : string
}

type BibliographyItemResult = {
  ISBN : string,
  position : number,
  publication : string,
  content : string
}

class LibraryImporter {
  booksDB : Sequelize;

  contentDB : Sequelize;

  productionDB : Sequelize;

  constructor(
    booksDbUrl : string, contentDbUrl : string,
    productionDbUrl : string, sslMode = false
  ) {
    this.booksDB = new Sequelize(booksDbUrl, { logging: false });
    this.contentDB = new Sequelize(contentDbUrl, { logging: false });
    const dialectOptions = sslMode ? { ssl: { require: true, rejectUnauthorized: false } } : { };
    this.productionDB = new Sequelize(productionDbUrl, { dialectOptions, logging: false });
  }

  async run(callback : ((id : string, book : BookResult) => void) | undefined) {
    const books = await this.booksDB.query(`
      SELECT publicationUrl as publicationURL, title, ISBN,
             synopsis, title, overview, id AS oldID
      FROM Books
    `, { type: QueryTypes.SELECT }) as BookResult[];
    await asyncMap(books, async (book) => {
      const id = await this.importBook(book);
      if (callback) callback(id, book);
    });
    this.booksDB.close();
    this.contentDB.close();
    this.productionDB.close();
    return books;
  }

  async importBook(book : BookResult) {
    const {
      title, ISBN, synopsis, overview, publicationURL
    } = book;
    const id = uuidFromString(publicationURL);
    await this.productionDB.query(`
      INSERT INTO "Books" (id, "publicationURL", title, "ISBN", synopsis, overview)
      VALUES (:id, :publicationURL, :title, :ISBN, :synopsis, :overview)
      ON CONFLICT (id)
      DO UPDATE
        SET "publicationURL" = :publicationURL, title = :title,
          "ISBN" = :ISBN, synopsis = :synopsis, overview = :overview
        WHERE "Books".id = :id
    `, {
      replacements: {
        id, title, ISBN, synopsis, overview, publicationURL
      },
      type: QueryTypes.UPSERT
    });
    await this.importBookAuthors(id, book);
    await this.importBookContent(id, book);
    await this.importBookNotes(id, book);
    await this.importBookGlossary(id, book);
    await this.importBookBibliography(id, book);
    return id;
  }

  async importBookAuthors(id : string, book : BookResult) {
    const { ISBN } = book;
    const bookAuthors = await this.booksDB.query(`
      SELECT ISBN, orderNum as position, isTopicAuthor, authorId as oldAuthorId
      FROM BookAuthors
      WHERE ISBN = :ISBN
    `, {
      replacements: { ISBN },
      type: QueryTypes.SELECT
    }) as BookAuthorResult[];
    return asyncMap(
      bookAuthors,
      (bookAuthor) => this.importBookAuthor(id, bookAuthor)
    );
  }

  async importBookAuthor(bookId : string, bookAuthor : BookAuthorResult) {
    const { oldAuthorId, position } = bookAuthor;
    const isTopicAuthor = !!bookAuthor.isTopicAuthor;
    const authorId = await this.importAuthor(oldAuthorId);
    await this.productionDB.query(`
      INSERT INTO "BookAuthors" ("authorId", "bookId", position, "isTopicAuthor")
      VALUES (:authorId, :bookId, :position, :isTopicAuthor)
      ON CONFLICT ("authorId", "bookId")
      DO UPDATE
        SET position = :position, "isTopicAuthor" = :isTopicAuthor
        WHERE "BookAuthors"."authorId" = :authorId AND "BookAuthors"."bookId" = :bookId
    `, {
      replacements: {
        authorId, bookId, position, isTopicAuthor
      },
      type: QueryTypes.UPSERT
    });
  }

  async importAuthor(oldAuthorId : number) {
    const id = uuidFromString(oldAuthorId.toString());
    const authors = await this.booksDB.query(`
      SELECT name, biography, isAlive
      FROM Authors
      WHERE id = :oldAuthorId
    `, {
      replacements: { oldAuthorId },
      type: QueryTypes.SELECT
    }) as AuthorResult[];
    await asyncMap(authors, (author) => {
      const { name, biography } = author;
      const isAlive = !!author.isAlive;
      return this.productionDB.query(`
        INSERT INTO "Authors" (id, name, biography, "isAlive")
        VALUES (:id, :name, :biography, :isAlive)
        ON CONFLICT (id)
        DO UPDATE
          SET name = :name, biography = :biography, "isAlive" = :isAlive
          WHERE "Authors".id = :id
      `, {
        replacements: {
          id, name, biography, isAlive
        },
        type: QueryTypes.UPSERT
      });
    });
    return id;
  }

  async importBookContent(id : string, book : BookResult) {
    const { ISBN } = book;
    const contentItems = await this.contentDB.query(`
      SELECT section as sectionPosition, module as moduleIndex,
        orderNum as position, contentType, content
      FROM ContentItems
      WHERE ISBN = :ISBN
    `, {
      replacements: { ISBN }, type: QueryTypes.SELECT
    }) as ContentItemResult[];
    await asyncMap(
      contentItems,
      (contentItem) => this.importBookContentItem(id, contentItem)
    );
  }

  async importBookContentItem(bookId : string, contentItem : ContentItemResult) {
    const {
      sectionPosition, moduleIndex, position, contentType, content
    } = contentItem;
    const modulePosition = Math.max(0, (moduleIndex - 1) % 4);
    const contentStructure = await this.productionDB.query(`
      SELECT "ContentStructures".id
      FROM "ContentStructures"
      INNER JOIN "ModuleStructures"
        ON "ContentStructures"."moduleId" = "ModuleStructures".id
      INNER JOIN "SectionStructures"
        ON "ModuleStructures"."sectionId" = "SectionStructures".id
      WHERE "ModuleStructures".position = :modulePosition
        AND "SectionStructures".position = :sectionPosition
        AND "ContentStructures"."contentType" = :contentType
      LIMIT 1
    `, {
      replacements: { sectionPosition, modulePosition, contentType },
      type: QueryTypes.SELECT
    }) as Array<{id : string}>;
    const contentStructureId = contentStructure[0].id;
    const id = uuidFromString(`${bookId}-${sectionPosition}-${modulePosition}-${contentType}-${position}`);
    await this.productionDB.query(`
      INSERT INTO "ContentItems" (id, position, content, "bookId", "contentStructureId")
      VALUES (:id, :position, :content, :bookId, :contentStructureId)
      ON CONFLICT (id)
      DO UPDATE
        SET position = :position, content = :content,
          "bookId" = :bookId, "contentStructureId" = :contentStructureId
        WHERE "ContentItems".id = :id
    `, {
      replacements: {
        id, position, content, bookId, contentStructureId
      },
      type: QueryTypes.UPSERT
    });
  }

  async importBookNotes(id : string, book : BookResult) {
    const { ISBN } = book;
    const notes = await this.contentDB.query(`
      SELECT module as moduleIndex, orderNum as position,
        "TextIdentifier" as "textIdentifier", "Content" as content
      FROM "Notes"
      WHERE ISBN = :ISBN
    `, {
      replacements: { ISBN }, type: QueryTypes.SELECT
    });
    await asyncMap(notes, (note) => this.importNote(id, note as NoteResult));
  }

  async importNote(bookId : string, note : NoteResult) {
    const {
      moduleIndex, position, textIdentifier, content
    } = note;
    const modulePosition = Math.max(0, (moduleIndex - 1) % 4);
    const sectionPosition = Math.floor((moduleIndex - 1) / 4) + 1;
    const moduleStructure = await this.productionDB.query(`
      SELECT "ModuleStructures".id
      FROM "ModuleStructures"
      INNER JOIN "SectionStructures"
        ON "ModuleStructures"."sectionId" = "SectionStructures".id
      WHERE "ModuleStructures".position = :modulePosition
        AND "SectionStructures".position = :sectionPosition
      LIMIT 1
    `, {
      replacements: { sectionPosition, modulePosition },
      type: QueryTypes.SELECT
    }) as Array<{id : string}>;
    const moduleId = moduleStructure[0].id;
    const id = uuidFromString(`${bookId}-${sectionPosition}-${modulePosition}-${position}`);
    await this.productionDB.query(`
      INSERT INTO "Notes" (id, position, content, "textIdentifier", "bookId", "moduleId")
      VALUES (:id, :position, :content, :textIdentifier, :bookId, :moduleId)
      ON CONFLICT (id)
      DO UPDATE
      SET position = :position, content = :content, "textIdentifier" = :textIdentifier,
      "bookId" = :bookId, "moduleId" = :moduleId
      WHERE "Notes".id = :id
    `, {
      replacements: {
        id, position, content, bookId, textIdentifier, moduleId
      },
      type: QueryTypes.UPSERT
    });
  }

  async importBookBibliography(id : string, book : BookResult) {
    const { ISBN } = book;
    const bibliographyItems = await this.contentDB.query(`
      SELECT "orderNum" as position, publication as publication,
        content as content
      FROM "Bibliography"
      WHERE ISBN = :ISBN
    `, {
      replacements: { ISBN }, type: QueryTypes.SELECT
    });
    await asyncMap(
      bibliographyItems,
      (bi) => this.importBibliographyItem(id, bi as BibliographyItemResult)
    );
  }

  async importBibliographyItem(bookId : string, bibliographyItem : BibliographyItemResult) {
    const {
      position, publication, content
    } = bibliographyItem;
    const id = uuidFromString(`${bookId}-bibliography-${position}`);
    await this.productionDB.query(`
      INSERT INTO "BibliographyItems" (id, "bookId", position, publication, content)
      VALUES (:id, :bookId, :position, :publication, :content)
      ON CONFLICT(id)
      DO UPDATE
      SET position = :position, publication = :publication,
        content = :content
      WHERE "BibliographyItems".id = :id
    `, {
      replacements: {
        id, bookId, position, publication, content
      },
      type: QueryTypes.UPSERT
    });
  }

  async importBookGlossary(id : string, book : BookResult) {
    const { ISBN } = book;
    const glossaryItems = await this.contentDB.query(`
      SELECT "orderNum" as position, type as type,
        "textIdentifier" as "textIdentifier",
        label as label, synopsis as synopsis
      FROM "Glossary"
      WHERE ISBN = :ISBN
    `, {
      replacements: { ISBN }, type: QueryTypes.SELECT
    });
    await asyncMap(glossaryItems, (gi) => this.importGlossaryItem(id, gi as GlossaryItemResult));
  }

  async importGlossaryItem(bookId : string, glossaryItem : GlossaryItemResult) {
    const {
      position, type, textIdentifier, label, synopsis
    } = glossaryItem;
    const id = uuidFromString(`${bookId}-glossary-${position}`);
    await this.productionDB.query(`
      INSERT INTO "GlossaryItems" (id, "bookId", position, type,
        "textIdentifier", label, synopsis)
      VALUES (:id, :bookId, :position, :type,
        :textIdentifier, :label, :synopsis)
      ON CONFLICT(id)
      DO UPDATE
      SET position = :position, type = :type,
        "textIdentifier" = :textIdentifier,
        label = :label, synopsis = :synopsis
      WHERE "GlossaryItems".id = :id
    `, {
      replacements: {
        id, bookId, position, type, textIdentifier, label, synopsis
      },
      type: QueryTypes.UPSERT
    });
  }
}

export default LibraryImporter;
