const utils = require('./utils');

async function insertToDb(client, content) {
  await Promise.all(content[0].map(async (item) => {
    if (item === null) {
      return Promise.resolve();
    }
    const insertQuery = "INSERT INTO item(id, buyout) VALUES ($1, $2) ON CONFLICT (id) DO UPDATE SET buyout = excluded.buyout";
    await client.query(
      insertQuery,
      [item.itemId, utils.sanitize(item.minBuyout, parseInt, -1)]
    );
    return Promise.resolve();
  }));
}

(async () => {
  const filename = process.argv[2];
  const pool = utils.createPoolFromEnv();

  try {
    await utils.createTxn(pool, filename, insertToDb);
  } catch (e) {
    throw e;
  }
})().catch(e => console.error(e.stack));
