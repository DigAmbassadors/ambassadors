const express = require('express');
const app = express();
const knex = require('./knex');
const cors = require('cors');
const path = require('path');

const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(express.json()); //JSON形式のファイルを扱えるようにする
app.use(cors());

//接続テスト
app.get('/api/test', (req, res) => {
  res.status(200).send('フロント/バックの接続完了');
});

// データベース接続テストのエンドポイント
app.get('/api/db-test', async (req, res) => {
  try {
    const result = await knex.raw('SELECT 1+1 AS result'); // シンプルなクエリ
    res
      .status(200)
      .json({ message: 'データベース接続成功', result: result.rows });
  } catch (error) {
    console.error('データベース接続エラー:', error);
    res
      .status(500)
      .json({ message: 'データベース接続失敗', error: error.message });
  }
});

//テンプレート
// app.get('/api', async (req, res) => {
//   await knex('table_name')
//     .select()
//     .where()
//     .then((data) => {
//       res.status(200).send(data);
//     });
// });

app.use(express.static(path.resolve(__dirname, '../client', 'dist')));
app.get('/*', (req, res) => {
  res.sendFile(path.join(__dirname, '../client', 'dist', 'index.html'));
});

app.listen(3000, () => {
  console.log('server on PORT3000');
});
