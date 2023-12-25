const express = require('express');
const app = express();
const knex = require('./knex');
const cors = require('cors');
const path = require('path');
const fetch = require('node-fetch');
const jwt = require('jsonwebtoken');

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

// トークン交換エンドポイント
app.post('/api/token-exchange', async (req, res) => {
  //各種パラメータ設定
  const code = req.body.code;
  const clientId = process.env.clientId;
  const clientSecret = process.env.clientSecret;
  const redirectUri = process.env.redirectUri;
  const cognitoTokenEndpoint = process.env.cognitoTokenEndpoint;

  const params = new URLSearchParams();
  params.append('grant_type', 'authorization_code');
  params.append('client_id', clientId);
  params.append('client_secret', clientSecret);
  params.append('redirect_uri', redirectUri);
  params.append('code', code);

  try {
    //リクエスト送信
    const response = await fetch(cognitoTokenEndpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      body: params
    });
    const tokens = await response.json();

    //IDトークンからユーザ名を取り出す
    const decoded = jwt.decode(tokens.id_token);
    const name = decoded['cognito:username'];

    //ユーザ情報を検索(ユーザ名がDBになければDBに登録
    let user = await knex('users').where({name:name}).first();
    if (!user) {
      const [newUserId] = await knex('users').insert({ name: name }).returning('id');
      user = { id: newUserId, name: name };
    }

    //必要な情報をフロントエンドに返却(id,name,accccess_token,refresh_token)
    const reply = {
      name: user.name,
      id: user.id,
      access_token: tokens.access_token,
      refresh_token: tokens.refresh_token
    }
    res.status(200).json(reply);
  } catch (error) {
    console.error('トークン交換エラー:', error);
    res.status(500).json({ message: 'トークン交換失敗', error: error.message });
  }
});


app.use(express.static(path.resolve(__dirname, '../client', 'dist')));
app.get('/*', (req, res) => {
  res.sendFile(path.join(__dirname, '../client', 'dist', 'index.html'));
});

app.listen(3000, () => {
  console.log('server on PORT3000');
});
