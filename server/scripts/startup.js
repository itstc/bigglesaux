const utils = require('./utils');
const { createItemTable } = require('./queries');

async function insertToDb(client) {
  await client.query(createItemTable);
}

(async () => {
  const pool = utils.createPoolFromEnv();

  try {
    await utils.createTxn(pool, insertToDb);
  } catch (e) {
    throw e;
  }
  console.log('success');
})().catch(e => console.error(e.stack));
