const express = require('express');
const app = express();
const knex = require('./knex');
const cors = require('cors');
const fetch = require('node-fetch');
const jwt = require('jsonwebtoken');
const jwksClient = require('jwks-rsa');

//各種ミドルウェア
const bodyParser = require('body-parser');
// app.use(bodyParser.urlencoded({ extended: true }));
// app.use(bodyParser.json());
app.use(bodyParser.json({ limit: '50mb' })); // jsonをパースする際のlimitを設定
app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));

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

//ランダム生成用のメソッド
function getRandomSpot(arr, n) {
  const shuffled = arr.sort(() => 0.5 - Math.random());
  return shuffled.slice(0, n);
}

// 2地点間の緯度経度から距離を計算するメソッド
function getDistanceFromLatLonInKm(lat1, lon1, lat2, lon2) {
  const earthRadius = 6371; // 地球の半径（km）

  const deg2rad = (deg) => {
    return deg * (Math.PI / 180);
  };

  const dLat = deg2rad(lat2 - lat1);
  const dLon = deg2rad(lon2 - lon1);

  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(deg2rad(lat1)) *
      Math.cos(deg2rad(lat2)) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);

  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  const distance = earthRadius * c;

  return distance; // 距離（km）
}

//接続テスト
app.get('/api/test', (req, res) => {
  res.status(200).send('フロント/バックの接続完了');
});

// データベース接続テスト
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

// トークン交換
app.post('/api/token-exchange', async (req, res) => {
  //各種パラメータ設定
  const code = req.body.code;
  const clientId = process.env.clientId;
  const clientSecret = process.env.clientSecret;
  const cognitoTokenEndpoint = process.env.cognitoTokenEndpoint;
  let redirectUri;
  if (process.env.NODE_ENV === 'production') {
    redirectUri = 'https://ambassadors-btc5.com/cognito';
  } else {
    redirectUri = 'http://localhost:5173/cognito';
  }

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
      const [newUserId] = await knex('users')
        .insert({ name: name })
        .returning('id');
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
    res
      .status(500)
      .json({ message: 'Failed to refresh token', error: error.message });
  }
});

// trips配列を取得
app.get('/api/trips/:userId', verifyToken, async (req, res) => {
  try {
    const userId = Number(req.params.userId);
    const trips = await knex('trips').where({ users_id: userId }); //[{"id":1,"trips":[1,2,3,4,5],"users_id":1}]
    if (trips.length === 0) {
      res.status(200).json([]);
    } else {
      res.status(200).json(trips[0].trips); // [1,2,3,4,5]
    }
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ message: 'Error retrieving user data' });
  }
});

// trips配列からtrip概要を取得
app.post('/api/tripsummary', verifyToken, async (req, res) => {
  const { trips } = req.body;
  const result = [];

  for (const curr of trips) {
    const trip = await knex('trip').where({ id: curr });
    if (trip.length > 0) {
      result.push({ area: trip[0].area, created_at: trip[0].created_at });
    }
  }

  res.status(200).send(result);
});

// エリア一覧を取得
app.get('/api/areas', verifyToken, async (req, res) => {
  const areas = await knex('spot').select('area');
  const uniquAreas = Array.from(new Set(areas.map((area) => area.area)));
  res.status(200).json(uniquAreas);
});

// tripを取得
app.get('/api/trip/', verifyToken, async (req, res) => {
  try {
    const tripId = Number(req.query.tripId);
    const trip = await knex('trip')
      .where({ id: tripId })
      .then((ArrOfSpotId) => {
        const ArrOfSpot = ArrOfSpotId[0].trip; //[9,3,8]
        const spotPromises = ArrOfSpot.map(async (n) => {
          const spot = await knex('spot').where({ id: n });
          return spot[0];
        });

        const resolvedSpots = Promise.all(spotPromises);
        return resolvedSpots;
      });

    res.status(200).json(trip);
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ message: 'Error retrieving user data' });
  }
});

//recordを取得
app.get('/api/users/record/:userId', verifyToken, async (req, res) => {
  try {
    const userId = Number(req.params.userId);
    const record = await knex('users')
      .where({ id: userId })
      .then((ArrOfData) => {
        const ArrOfSpot = ArrOfData[0].record || []; //[9,3,8]
        const finishSpot = ArrOfSpot.filter((obj) => {
          return obj.finish === true;
        });
        return finishSpot;
      });
    res.status(200).json(record);
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ message: 'Error retrieving user data' });
  }
});

//1つのspotのrecordを取得
app.get('/api/users/:userId/record/:spotId', verifyToken, async (req, res) => {
  try {
    const userId = Number(req.params.userId);
    const spotId = Number(req.params.spotId);
    const record = await knex('users')
      .where({ id: userId })
      .then((ArrOfData) => {
        const ArrOfSpot = ArrOfData[0].record || []; //[9,3,8]
        const finishSpot = ArrOfSpot.filter((obj) => {
          return obj.spot_id === spotId;
        });
        return finishSpot;
      });
    res.status(200).json(record);
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ message: 'Error retrieving user data' });
  }
});

// tripをランダム生成
app.post('/api/trips/new/:userId/:area', verifyToken, async (req, res) => {
  try {
    const userId = Number(req.params.userId);
    const area = req.params.area;
    // ランダムでプランを作成
    const newTrip = await knex('spot')
      .where({ area: area })
      .select('id')
      .then((spotData) => {
        spotData = spotData.map((e) => e.id);
        return getRandomSpot(spotData, 3);
      });

    // 作成したプランをtripテーブルに追加
    const tripId = await knex('trip')
      .insert({
        area: area,
        trip: newTrip,
      })
      .returning('id');

    // tripテーブルに追加されたデータをtripsテーブルに追加
    const newTrips = await knex('trips')
      .select('trips')
      .where({ users_id: userId })
      .then((tripsData) => {
        const arrOfTrips = tripsData[0].trips;
        arrOfTrips.push(tripId[0].id);
        return arrOfTrips;
      });
    await knex('trips')
      .select('trips')
      .where({ users_id: userId })
      .update({ trips: newTrips })
      .then(() => {
        res.status(200).json(newTrips);
      });
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ message: 'Error retrieving user data' });
  }
});

// ミッション遂行(GPS)
app.post('/api/mission/gps/:userId', verifyToken, async (req, res) => {
  try {
    const userId = Number(req.params.userId);
    const { latitude, longitude, spot_id } = req.body;

    //目標地点の取得
    const arrOfLatLon = await knex('spot')
      .select('latitude', 'longitude')
      .where({ id: spot_id })
      .then((spot) => {
        const result = [];
        result.push(spot[0].latitude);
        result.push(spot[0].longitude);
        return result;
      });

    //距離の比較
    const distance = getDistanceFromLatLonInKm(
      arrOfLatLon[0],
      arrOfLatLon[1],
      latitude,
      longitude
    );

    if (distance < 1000) {
      const record = await knex('users')
        .select('record')
        .where({ id: userId })
        .then((record) => {
          let arrOfRecord = [];
          if (record && record[0] && record[0].record) {
            arrOfRecord = record[0].record;
          }
          return arrOfRecord;
        });

      let addFlag = true;
      for (const obj of record) {
        if (obj.spot_id === spot_id && obj.photo) {
          obj.arrived = true;
          obj.finish = true;
          addFlag = false;
        }
      }

      if (addFlag) {
        const newRecord = {
          photo: null,
          arrived: true,
          finish: false,
          spot_id: spot_id,
        };
        record.push(newRecord);
      }
      await knex('users')
        .select('users')
        .where({ id: userId })
        .update({ record: JSON.stringify(record) })
        .then(() => {
          res.status(200).send('完了');
        });
    } else {
      res.status(404).send('スポットに到着していないようです');
    }
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ message: 'Error retrieving user data' });
  }
});

// ミッション遂行(photo)
app.post('/api/mission/photo/:userId', verifyToken, async (req, res) => {
  try {
    const userId = Number(req.params.userId);
    const { photo, spot_id } = req.body;

    const record = await knex('users')
      .select('record')
      .where({ id: userId })
      .then((record) => {
        let arrOfRecord = [];
        if (record && record[0] && record[0].record) {
          arrOfRecord = record[0].record;
        }
        return arrOfRecord;
      });

    let addFlag = true;
    for (const obj of record) {
      if (obj.spot_id === spot_id && obj.arrived) {
        obj.photo = photo;
        obj.arrived = true;
        obj.finish = true;
        addFlag = false;
      }
    }

    if (addFlag) {
      const newRecord = {
        photo: photo,
        arrived: false,
        finish: false,
        spot_id: spot_id,
      };
      record.push(newRecord);
    }

    await knex('users')
      .select('users')
      .where({ id: userId })
      .update({ record: JSON.stringify(record) })
      .then(() => {
        res.status(200).send('完了');
      });
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ message: 'Error retrieving user data' });
  }
});

// spot登録
app.post('/api/newspot', verifyToken, async (req, res) => {
  try {
    const { name, area, mission, photo, longitude, latitude } = req.body;
    const spotId = await knex('spot')
      .insert({ name, area, mission, photo, longitude, latitude })
      .returning('id');
    res.status(200).send(spotId);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error });
  }
});

// mission2画像を取得
app.get('/api/imgs', verifyToken, async (req, res) => {
  try {
    const extra = await knex('users').select('record');
    const imgs = [];
    for (const objOfId of extra) {
      const recordOfId = objOfId.record;
      if (recordOfId) {
        for (const record of recordOfId) {
          imgs.push(record.photo);
        }
      }
    }
    res.status(200).json(imgs);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error });
  }
});

// スポット一覧を取得(ユーザーのクリア成否を追記)
app.get('/api/spots/:userId', async (req, res) => {
  try {
    //ユーザーのrecordを取得
    const userId = Number(req.params.userId);
    const records = await knex('users').where({ id: userId }).select('record');

    //スポットを取得し、ユーザーのクリア成否を追記
    const spots = await knex('spot');
    for (const spot of spots) {
      //ユーザのrecordsから該当するものを探す
      const rec = records[0].record.filter(
        (record) => record.spot_id === spot.id
      );
      //record内容をspotに追記
      if (rec.length === 0) {
        spot.finish = false;
      } else {
        spot.finish = rec[0].finish ? true : false;
      }
    }
    res.status(200).json(spots);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error });
  }
});

// ランキングを取得
app.get('/api/ranking', async (req, res) => {
  try {
    const users = await knex('users');
    for (const user of users) {
      if (user.record) {
        user.num_record = user.record.length;
      } else {
        user.num_record = 0;
      }
    }
    const sorted = users.sort((a, b) => b.num_record - a.num_record);
    const extra = sorted.map(({ record, ...rest }) => rest);
    res.status(200).json(extra);
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ message: 'Error retrieving user data' });
  }
});

app.listen(3000, () => {
  console.log('server on PORT3000');
});
