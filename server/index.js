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

//テンプレート
// app.get('/api', async (req, res) => {
//   await knex('table_name')
//     .select()
//     .where()
//     .then((data) => {
//       res.status(200).send(data);
//     });
// });

app.use(express.static(path.resolve(__dirname, '../frontend', 'dist')));
app.get('/*', (req, res) => {
  res.sendFile(path.join(__dirname, '../frontend', 'dist', 'index.html'));
});

app.listen(3000, () => {
  console.log('server on PORT3000');
});
