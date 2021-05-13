import { exec } from 'child-process-promise';
import env from "../../src/env";
import db  from "../../src/db";
import logger from "../../src/logger";


function logLines(logger : (_0: string) => void, lines : string) {
  lines.split("\n").forEach((line : string) => line.length > 0 ? logger(line) : null);
}

async function sequelizeCommand(cmd : string) {
  const command = `npx sequelize ${cmd} --url ${env.DATABASE_URL}`;
  try {
    const result = await exec(command);
    logLines(logger.debug, result.stdout)
    logLines(logger.debug, result.stderr);
  } catch(error) {
    logger.info("Error IGNORED running sequelize command: ");
    logger.info(command);
    logger.info("Error message logged to debug log.")
    logLines(logger.debug, error.stdout);
    logLines(logger.debug, error.stderr);
  }
}

export async function setup() {
  await db.drop({logging: logger.debug.bind(logger)});
  await db.query("DROP TABLE IF EXISTS SequelizeMeta");
  await sequelizeCommand("db:migrate");
  await sequelizeCommand("db:seed:all");
}

export async function teardown() {
  await db.close();
}
