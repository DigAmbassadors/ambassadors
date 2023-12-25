const express = require('express');
const app = express();
const knex = require('./knex');
const cors = require('cors');
const fetch = require('node-fetch');
const jwt = require('jsonwebtoken');
const jwksClient = require('jwks-rsa');

//各種ミドルウェア
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(express.json()); //JSON形式のファイルを扱えるようにする
app.use(cors());

// トークン検証用のミドルウェア
const client = jwksClient({
	jwksUri: `https://cognito-idp.${process.env.region}.amazonaws.com/${process.env.userPoolId}/.well-known/jwks.json`,
});

function getKey(header, callback) {
	client.getSigningKey(header.kid, function (err, key) {
		var signingKey = key.publicKey || key.rsaPublicKey;
		callback(null, signingKey);
	});
}

function verifyToken(req, res, next) {
  const bearerHeader = req.headers['authorization'];

  if (typeof bearerHeader !== 'undefined') {
      const token = bearerHeader.split(' ')[1];

      // トークンの署名を検証
      jwt.verify(token, getKey, { algorithms: ['RS256'] }, (err, decoded) => {
          if (err) {
              res.sendStatus(403); // Forbidden
          } else {
              // トークンの有効期限をチェック
              const currentTime = Date.now() / 1000; // 現在の時刻をUNIXタイムスタンプで取得
              if (decoded.exp < currentTime) {
                  // トークンが期限切れの場合
                  res.status(401).json({ message: 'Token expired' });
              } else {
                  // トークンが有効な場合、次の処理へ
                  req.decoded = decoded;
                  next();
              }
          }
      });
  } else {
      res.sendStatus(401); // Unauthorized
  }
}


//接続テスト
app.get('/api/test', (req, res) => {
	res.status(200).send('フロント/バックの接続完了');
});

// データベース接続テスト
app.get('/api/db-test', async (req, res) => {
	try {
		const result = await knex.raw('SELECT 1+1 AS result'); // シンプルなクエリ
		res.status(200).json({ message: 'データベース接続成功', result: result.rows });
	} catch (error) {
		console.error('データベース接続エラー:', error);
		res.status(500).json({ message: 'データベース接続失敗', error: error.message });
	}
});

// トークン交換
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
				'Content-Type': 'application/x-www-form-urlencoded',
			},
			body: params,
		});
		const tokens = await response.json();

		//IDトークンからユーザ名を取り出す
		const decoded = jwt.decode(tokens.id_token);
		const name = decoded['cognito:username'];

		//ユーザ情報を検索(ユーザ名がDBになければDBに登録
		let user = await knex('users').where({ name: name }).first();
		if (!user) {
			const [newUserId] = await knex('users').insert({ name: name }).returning('id');
			user = { id: newUserId, name: name };
		}

		//必要な情報をフロントエンドに返却(id,name,accccess_token,refresh_token)
		const reply = {
			name: user.name,
			id: user.id,
			access_token: tokens.access_token,
			refresh_token: tokens.refresh_token,
		};
		res.status(200).json(reply);
	} catch (error) {
		console.error('トークン交換エラー:', error);
		res.status(500).json({ message: 'トークン交換失敗', error: error.message });
	}
});

//アクセストークンのリフレッシュ
app.post('/api/refresh-token', async (req, res) => {
  const refreshToken = req.body.refreshToken;
  const params = new URLSearchParams();
  params.append('grant_type', 'refresh_token');
  params.append('client_id', process.env.clientId);
  params.append('client_secret', process.env.clientSecret);
  params.append('refresh_token', refreshToken);

  try {
      const response = await fetch(`${process.env.cognitoTokenEndpoint}/token`, {
          method: 'POST',
          headers: {
              'Content-Type': 'application/x-www-form-urlencoded',
          },
          body: params,
      });
      const newTokens = await response.json();

      // 必要な情報をフロントエンドに返却
      res.status(200).json({
          access_token: newTokens.access_token,
          refresh_token: newTokens.refresh_token || refreshToken, // 新しいリフレッシュトークンがなければ古いトークンを返す
      });
  } catch (error) {
      console.error('Refresh token error:', error);
      res.status(500).json({ message: 'Failed to refresh token', error: error.message });
  }
});


// tripsを取得
app.get('/api/trips/:id', verifyToken, async (req, res) => {
	try {
		const userId = Number(req.params.id);
		res.status(200).json([userId, userId + 3]);
	} catch (error) {
		console.error('Error:', error);
		res.status(500).json({ message: 'Error retrieving user data' });
	}
});



app.listen(3000, () => {
	console.log('server on PORT3000');
});
