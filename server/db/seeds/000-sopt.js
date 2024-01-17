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
			withoutEnlargement: true,
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
exports.seed = async function (knex) {
	// Deletes ALL existing entries
	await knex('spot').del();

	// Inserts seed entries
	await knex('spot').insert([
		{
			name: 'cesari顔出しパネル',
			mission: '顔出しパネルで撮影！',
			area: '大須ぶらり旅',
			latitude: 35.158537274779306,
			longitude: 136.90243096224847,
			photo: await convertImageToBase64('./db/imgs/cesari顔出しパネル.JPG'),
		},
    {
			name: '李さんの台湾名物屋台',
			mission: '台湾唐揚げを食べる！',
			area: '大須ぶらり旅',
			latitude: 35.158553173642005,
			longitude: 136.90412543269008,
			photo: await convertImageToBase64('./db/imgs/李さんの台湾名物屋台.jpg'),
		},
    {
			name: '鳴門鯛焼本舗',
			mission: 'たい焼きを食べる！',
			area: '大須ぶらり旅',
			latitude: 35.15825482879568,
			longitude: 136.90448825865815,
			photo: await convertImageToBase64('./db/imgs/鳴門鯛焼本舗.png'),
		},
		{
			name: '大須商店街ふれあい広場',
			mission: '招き猫を撮る！',
			area: '大須ぶらり旅',
			latitude: 35.15832098790731,
			longitude: 136.90532905544575,
			photo: await convertImageToBase64('./db/imgs/大須商店街ふれあい広場.jpeg'),
		},
		{
			name: 'ロッキン。ロビン',
			mission: 'ミニハンバーガーを食べる！',
			area: '大須ぶらり旅',
			latitude: 35.158634834803465,
			longitude: 136.90439636524204,
			photo: await convertImageToBase64('./db/imgs/rockin_robin.png'),
		},
		{
			name: '天むす屋・鬼天',
			mission: '天むすを食べる！',
			area: '大須ぶらり旅',
			latitude: 35.159511057782765,
			longitude: 136.90134204878055,
			photo: await convertImageToBase64('./db/imgs/天むす屋・鬼天.jpg'),
		},
		{
			name: '富士浅間神社',
			mission: 'お参りする！',
			area: '大須ぶらり旅',
			latitude: 35.15940532939846,
			longitude: 136.9015704707629,
			photo: await convertImageToBase64('./db/imgs/富士浅間神社.jpg'),
		},
		{
			name: 'たこ咲',
			mission: 'たこ焼きを食べよう',
			area: '大須ぶらり旅',
			latitude: 35.15847136039953,
			longitude: 136.9037391271316,
			photo: await convertImageToBase64('./db/imgs/たこ咲.webp'),
		},
		{
			name: '名古屋名物 コーチン・知多豚 秀よし',
			mission: '豚しゃぶを食べる！',
			area: '太閤通口で飲み歩き',
			latitude: 35.172986161674366,
			longitude: 136.8782364834244,
			photo: await convertImageToBase64('./db/imgs/秀よし.png'),
		},
		{
			name: '個室ダイニング 楽蔵うたげ',
			mission: '串焼きを食べる！',
			area: '太閤通口で飲み歩き',
			latitude: 35.16992493418988,
			longitude: 136.8813585207799,
			photo: await convertImageToBase64('./db/imgs/楽蔵うたげ.png'),
		},
		{
			name: 'あんかけ太郎',
			mission: 'レギュラーサイズを完食',
			area: '名古屋のB級スポット',
			latitude: 35.16932821283395,
			longitude: 136.88540120347315,
			photo: await convertImageToBase64('./db/imgs/あんかけ太郎.png'),
		},
		{
			name: 'フルッタ・ジ・フルッタ',
			mission: 'いちごのクレープを食べる',
			area: '名古屋のB級スポット',
			latitude: 35.159489043626714,
			longitude: 136.9014996408462,
			photo: await convertImageToBase64('./db/imgs/フルッタ・ジ・フルッタ.webp'),
		},
		{
			name: '小麦の禁断症状',
			mission: '禁断のカレーパンを食べる',
			area: '名古屋のB級スポット',
			latitude: 35.15851916027672,
			longitude: 136.9045438283595,
			photo: await convertImageToBase64('./db/imgs/小麦の禁断症状.webp'),
		},
		{
			name: '喫茶なごのや',
			mission: 'たまごサンドを食べる',
			area: '名古屋のB級スポット',
			latitude: 35.17637810757206,
			longitude: 136.8921331652326,
			photo: await convertImageToBase64('./db/imgs/なごのや.jpg'),
		},
		{
			name: 'チャンスセンター',
			mission: '宝くじを買う',
			area: '名古屋のB級スポット',
			latitude: 35.17009252648005,
			longitude: 136.88453445813562,
			photo: await convertImageToBase64('./db/imgs/チャンスセンター.jpeg'),
		},
		{
			name: '名古屋大仏',
			mission: '大仏とツーショット',
			area: '名古屋のB級スポット',
			latitude: 35.16124848798889,
			longitude: 136.96500782713971,
			photo: await convertImageToBase64('./db/imgs/桃巌寺・名古屋大仏.jpg'),
		},
		{
			name: '矢場とん',
			mission: 'ぶーちゃんとツーショット',
			area: '名古屋のB級スポット',
			latitude: 35.161737612218204,
			longitude: 136.90625242950938,
			photo: await convertImageToBase64('./db/imgs/矢場とん 本店.jpg'),
		},
		{
			name: '岡田旅館 和楽亭',
			mission: '温上がりに一杯',
			area: '飛騨高山で温泉ざんまい',
			latitude: 36.19392092369302,
			longitude: 137.55379238564643,
			photo: await convertImageToBase64('./db/imgs/飛騨高山.jpg'),
		},
		{
			name: 'ホテルアソシア高山リゾート',
			mission: '温上がりに一杯',
			area: '飛騨高山で温泉ざんまい',
			latitude: 36.123016478935156,
			longitude: 137.24583805555082,
			photo: await convertImageToBase64('./db/imgs/ホテルアソシア高山リゾート.jpg'),
		},
		{
			name: 'カフェ ド シエル',
			mission: '紅茶ケーキを注文！',
			area: '名古屋おしゃれカフェめぐり',
			latitude: 35.170901146075245,
			longitude: 136.88262009839673,
			photo: await convertImageToBase64('./db/imgs/カフェ ド シエル.jpeg'),
		},
		{
			name: 'コーヒーハウス かこ',
			mission: '紅茶ケーキを注文！',
			area: '名古屋おしゃれカフェめぐり',
			latitude: 35.17034467710339,
			longitude: 136.8904426849614,
			photo: await convertImageToBase64('./db/imgs/コーヒーハウス かこ.jpeg'),
		},
	]);
};
