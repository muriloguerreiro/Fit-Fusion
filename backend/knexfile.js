require('dotenv').config()

module.exports = {
  development: {
    client: 'mysql2',
    connection: {
      host: process.env.DB_HOST,
      user: process.env.DB_USER,
      password: process.env.DB_PASS,
      database: process.env.DB_DATABASE
    },
    pool: {
      min: 2,
      max: 3
    },
    migrations: {
      tableName: 'knex_migrations',
      directory: './src/database/migrations'
    }
  },
  teste: {
    client: 'mysql2',
    connection: {
      host: 'localhost',
      user: 'root',
      password: 'banco123',
      database: 'fitfusion'
    },
    migrations: {
      tableName: 'knex_migrations',
      directory: './src/database/migrations'
    }
  }
}