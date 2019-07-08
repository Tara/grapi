const path = require('path');

const BASE_PATH = path.join(__dirname, 'src', 'server', 'db');

module.exports = {
  test: {
    client: 'pg',
    connection: 'postgres://localhost:5432/grapi_test',
    // connection: 'postgres://username:password@localhost:5432/grapi_test',
    migrations: {
      directory: path.join(BASE_PATH, 'migrations')
    },
    seeds: {
      directory: path.join(BASE_PATH, 'seeds')
    }
  },
  development: {
    client: 'pg',
    connection: 'postgres://localhost:5432/grapi',
    // connection: 'postgres://username:password@localhost:5432/grapi',
    migrations: {
      directory: path.join(BASE_PATH, 'migrations')
    },
    seeds: {
      directory: path.join(BASE_PATH, 'seeds')
    }
  },
  production: {
    client: 'pg',
    connection: process.env.DATABASE_URL,
    migrations: {
        directory: path.join(BASE_PATH, 'migrations')
    },
    seeds: {
        directory: path.join(BASE_PATH, 'seeds/production')
    },
  },
};