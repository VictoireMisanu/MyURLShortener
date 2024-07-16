const { Pool } = require('pg');

const pool = new Pool({
  user: 'postgres',
  password: 'Victoire63',
  host: 'localhost',
  port: 5432, // default Postgres port
  database: 'URLShortner'
});

module.exports = {
  query: (text, params) => pool.query(text, params)
};