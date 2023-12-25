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
    client: 'pg', // PostgreSQL用のクライアント
    connection: {
      host: process.env.RDS_HOST, // RDSデータベースエンドポイント
      user: process.env.RDS_USER, // RDSユーザー名
      password: process.env.RDS_PASSWORD, // RDSパスワード
      database: process.env.RDS_DATABASE, // RDSデータベース名
      port: process.env.RDS_PORT || 5432, // RDSポート（デフォルトは5432）
      ssl: { rejectUnauthorized: false } // SSL接続を有効にする
    },
    migrations: {
      directory: './db/migrations',
    },
    seeds: {
      directory: './db/seeds',
    },
  },
};
