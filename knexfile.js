// Update with your config settings.

const settings = require("./settings_knex"); //setting_knex.json

module.exports = {

 development: {
    client: settings.client,
    connection: {
      host: settings.connection.host,
      user: settings.connection.user,
      password: settings.connection.password,
      database: settings.connection.database
    }
  },

  staging: {
    client: 'postgresql',
    connection: {
      database: 'my_db',
      user:     'username',
      password: 'password'
    },
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      tableName: 'knex_migrations'
    }
  },

  production: {
    client: 'postgresql',
    connection: {
      database: 'my_db',
      user:     'username',
      password: 'password'
    },
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      tableName: 'knex_migrations'
    }
  }

};
