const fs = require('fs');
const Pool = require('pg').Pool;

async function readFile(filename) {
  return new Promise((resolve, reject) => {
    fs.readFile(filename, async (err, content) => {
      if (err) {
        reject(err);
      } else {
        resolve(JSON.parse(content));
      }
    });
  });
}

function sanitize(s, fn, placeholder) {
  const parsed = fn(s);

  if (isNaN(parsed) || parsed === null) {
    return placeholder;
  }

  return parsed;
}

async function createTxn(pool, filename, writeFn) {
  const content = await readFile(filename);
  const client = await pool.connect();

  try {
    await client.query('BEGIN'); 
    await writeFn(client, content);
    await client.query('COMMIT');
  } catch (e) {
    await client.query('ROLLBACK');
    throw e;
  } finally {
    console.log('done');
    client.release();
  }
}

function createPoolFromEnv() {
  return new Pool({
    user: process.env.POSTGRES_USER,
    host: process.env.DB_HOST,
    database: process.env.POSTGRES_DB,
    password: process.env.POSTGRES_PASSWORD,
    port: process.env.DB_PORT
  });
}

module.exports = {
  readFile,
  sanitize,
  createTxn,
  createPoolFromEnv
}
