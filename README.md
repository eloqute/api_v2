# Macat iLibrary API

This is the content API which backs the Macat iLibrary, and also deals with user authentication and authorization. It's an express.js app written in typescript.

## To get started with development

 - Make sure you've got node installed (I'm developing against 14.17.0 LTS at the time of writing), as well as a relational database compatible with [Sequelize](https://sequelize.org/) - sqlite will do fine in development.
 - Check out this repo.
 - Run `npm install`
 - copy `.env.example` to `.env.development` and `.env.test` and fill in the values to taste (make sure you use a different database in each or your development database will be wiped every time you run the tests)
 - Run `npm run migrate` and `npm run seed` to prepare your database
 - Run `nmp run start` to start the server, as well as to watch for changes in the source code, recompile, test and lint.


 ## General guidelines for development

 - An OpenAPI spec for the project lives in `api_spec/`, this is the canonical version. Any new feature requests should start with a change to this (in a PR). This is used to generate acceptance tests which live in `test/acceptance`
 - source code in in `src/`, builds go in `dist/`. DB migrations and seeds go in `migrations/` and `seeders/` respectively.
 - `src/index.js` is the main entry point, this loads the app frmo `app.js` and runs it. `app.js` basically sandwiches together routes and middleware from elsewhere.
 - each RESTful route has its own router in `src/routes`, these hand off to `models` and `validators` where needed, and ideally should be kept as thin as possible.
 - We're currently running ESLint with a slightly tweaked AirBNB style guide to enforce consistent coding style. I go back and forth on the value of these things so maybe it might disappear at some point, although currently I think the value outweighs the pain. If any rules in particular get annoying, we can disable them.

 ## Other useful commands:

 - `npm run compile` - compile typescript to js in `dist/`
 - `npm run clean` - nuke the built files in `dist/`
 - `npm run lint` - run the linter
 - `npm run migrate` - run the migrations
 - `npm run seed` - run the seeds
 - `npm run test` - run the tests
 - `npm run build` - `test`, `lint` and `compile` in order, stopping on failure.
 - `npm start` - run the develpment server, and watch for changes - running tests, linter, and compiler when they're detected.
 - `npx sequelize migration:generate --name NAME_FOR_YOUR_MIGRATION` to generate a new migration.
 - `npx sequelize seeder:generate --name NAME_FOR_YOUR_MIGRATION` to generate a new seed.
 - `scripts/import $BOOKS_DB_URL $CONTENT_DB_URL $DATABASE_URL` to import book content from a legacy API db dump
 - `scripts/generate_seeds $DATABASE_URL` to regenerate the dev/test seeds from a populated database



 Any questions, ask Tim!
