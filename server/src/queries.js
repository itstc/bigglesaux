const Pool = require('pg').Pool;

const pool = new Pool({
  user: process.env.POSTGRES_USER,
  host: process.env.DB_HOST,
  database: process.env.POSTGRES_DB,
  password: process.env.POSTGRES_PASSWORD,
  port: process.env.DB_PORT
});

const getItems = (request, response) => {
  pool.query('SELECT * FROM item LIMIT 30', (error, results) => {
    if (error) {
      throw error; 
    }

    response.status(200).json(results.rows);
  });
}

module.exports = {
  getItems
}
