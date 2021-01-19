const utils = require('./utils');

async function updateDb(client, content) {
  await Promise.all(content[0].map(async (item) => {
    if (item === null) {
      return Promise.resolve();
    }
    const updateQuery = "UPDATE item SET name=$1, color=$2 WHERE id LIKE $3 RETURNING *";
    const res = await client.query(
      updateQuery,
      [item.itemName, item.color, `${item.itemId}:%`]
    );
    console.log(res.rows);
    return Promise.resolve();
  }));
}

(async () => {
  const filename = process.argv[2];
  const pool = utils.createPoolFromEnv();

  try {
    await utils.createTxn(pool, filename, updateDb);
  } catch (e) {
    throw e;
  }
})().catch(e => console.error(e.stack));
