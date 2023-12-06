module.exports = {
    development: {
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

/*   ,
      seeds: {
        directory: './src/database/seeds'
      } */