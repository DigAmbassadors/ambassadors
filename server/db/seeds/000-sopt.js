// 画像ファイルをBase64に変換する関数
const fs = require('fs').promises;
const path = require('path');
const sharp = require('sharp');
async function convertImageToBase64(filePath) {
  const ext = path.extname(filePath).toLowerCase();
  let mimeType;
  switch (ext) {
    case '.jpg':
    case '.jpeg':
      mimeType = 'image/jpeg';
      break;
    case '.png':
      mimeType = 'image/png';
      break;
    case '.webp':
      mimeType = 'image/webp';
      break;
    // 他の画像形式についてもここで処理を追加
    default:
      throw new Error('Unsupported image type');
  }

  // sharpを使用して画像をリサイズ
  const image = sharp(filePath);
  const metadata = await image.metadata();
  if (metadata.width > 400 || metadata.height > 400) {
    image.resize(400, 400, {
      fit: sharp.fit.inside,
      withoutEnlargement: true
    });
  }

  // 画像ファイルをBase64に変換
  const buffer = await image.toBuffer();
  return `data:${mimeType};base64,${buffer.toString('base64')}`;
}


/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.seed = async function(knex) {
  // Deletes ALL existing entries
  await knex('spot').del();

  // Inserts seed entries
  await knex('spot').insert([
    {
      name: 'ビアードパパ',
      mission: 'エクレアシューを食べよう',
      area: '愛知のB級グルメ',
      latitude: 35.16950447975525, 
      longitude:  136.88462591534423,
      photo: await convertImageToBase64('./db/imgs/ビアードパパ.jpg')
    },
    {
      name: 'あんかけ太郎',
      mission: 'レギュラーサイズを完食',
      area: '愛知のB級グルメ',
      latitude: 35.16932821283395, 
      longitude:  136.88540120347315,
      photo: await convertImageToBase64('./db/imgs/あんかけ太郎.png')
    },
    {
      name: 'CoCo壱ベーカリー',
      mission: 'スパイスクロワッサンを食べよう',
      area: '愛知のB級グルメ',
      latitude: 35.16926560390827, 
      longitude:   136.88506738523552,
      photo: await convertImageToBase64('./db/imgs/CoCo壱ベーカリー.webp')
    },
    {
      name: 'たこ咲',
      mission: 'たこ焼きを食べよう',
      area: '愛知のB級グルメ',
      latitude: 35.15847136039953, 
      longitude:  136.9037391271316,
      photo: await convertImageToBase64('./db/imgs/たこ咲.webp')
    },
    {
      name: '李さんの台湾名物屋台',
      mission: '台湾唐揚げを食べよう',
      area: '愛知のB級グルメ',
      latitude: 35.158553173642005,  
      longitude: 136.90412543269008,
      photo: await convertImageToBase64('./db/imgs/李さんの台湾名物屋台.jpg')
    },
    {
      name: '喫茶マウンテン',
      mission: '緑色したパスタを食べる',
      area: '愛知のB級グルメ',
      latitude: 35.14488497808072, 
      longitude:   136.96088575967275,
      photo: await convertImageToBase64('./db/imgs/マウンテン.jpg')
    },
    {
      name: '喫茶なごのや',
      mission: 'たまごサンドを食べる',
      area: '愛知のB級グルメ',
      latitude: 35.17637810757206, 
      longitude:   136.8921331652326,
      photo: await convertImageToBase64('./db/imgs/なごのや.jpg')
    },
    {
      name: 'チャンスセンター',
      mission: '宝くじを買う',
      area: '愛知のB級スポット',
      latitude: 35.17009252648005,  
      longitude:  136.88453445813562,
      photo: await convertImageToBase64('./db/imgs/チャンスセンター.jpeg')
    },
    {
      name: '桃太郎神社',
      mission: '桃太郎とツーショット',
      area: '愛知のB級スポット',
      latitude: 35.40539137900559,  
      longitude:  136.96613722343676,
      photo: await convertImageToBase64('./db/imgs/桃太郎.jpg')
    },
    {
      name: '名古屋大仏',
      mission: '大仏とツーショット',
      area: '愛知のB級スポット',
      latitude: 35.16124848798889, 
      longitude:   136.96500782713971,
      photo: await convertImageToBase64('./db/imgs/桃巌寺・名古屋大仏.jpg')
    },
    {
      name: '大須商店街ふれあい広場',
      mission: '招き猫とツーショット',
      area: '愛知のB級スポット',
      latitude: 35.15832098790731,  
      longitude:  136.90532905544575,
      photo: await convertImageToBase64('./db/imgs/大須商店街ふれあい広場.png')
    },
    {
      name: '矢場とん',
      mission: 'ぶーちゃんとツーショット',
      area: '愛知のB級スポット',
      latitude: 35.161737612218204,  
      longitude:  136.90625242950938,
      photo: await convertImageToBase64('./db/imgs/矢場とん 本店.jpg')
    },

  ]);
};

