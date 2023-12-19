require('dotenv').config(); //「.env」ファイルをbackendフォルダ直下に作成
const path = require('path'); //いらないかも

/**
 * @type { Object.<string, import("knex").Knex.Config> }
 */

module.exports = {
  development: {
    client: 'pg',
    connection: {
      database: process.env.DB_NAME || 'ambassador', //自分のDB設定に合わせて変更
      user: process.env.DB_USER || 'user', //自分のDB設定に合わせて変更
      password: process.env.DB_PASSWORD || null, //自分のDB設定に合わせて変更
    },
    migrations: {
      directory: './db/migrations',
    },
    seeds: {
      directory: './db/seeds',
    },
  },

  production: {
    client: 'postgresql',
    connection: process.env.DATABASE_URL,
    migrations: {
      directory: './db/migrations',
    },
    seeds: {
      directory: './db/seeds',
    },
  },
};
