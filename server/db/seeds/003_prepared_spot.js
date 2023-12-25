/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.seed = async function (knex) {
  // Deletes ALL existing entries
  await knex('prepared_spot').del();
  await knex('prepared_spot').insert([
    {
      name: 'モリコロパーク',
      mission: '〇〇せよ',
      photo: 'dummy',
      longitude: '35.1183',
      latitude: '137.0224',
      user_id: 1,
      prefecture_id: 23,
    },
    {
      name: '名古屋バンテリンドーム',
      mission: '〇〇せよ',
      photo: 'dummy',
      longitude: '30.1183',
      latitude: '135.0224',
      user_id: 1,
      prefecture_id: 23,
    },
    {
      name: '滝頭公園',
      mission: '〇〇せよ',
      photo: 'dummy',
      longitude: '33.1183',
      latitude: '127.0224',
      user_id: 1,
      prefecture_id: 23,
    },
    {
      name: '日間賀島',
      mission: '〇〇せよ',
      photo: 'dummy',
      longitude: '39.1183',
      latitude: '126.0224',
      user_id: 1,
      prefecture_id: 23,
    },
    {
      name: 'お菓子の城',
      mission: '〇〇せよ',
      photo: 'dummy',
      longitude: '23.1183',
      latitude: '127.0224',
      user_id: 1,
      prefecture_id: 23,
    },
    {
      name: '滝頭公園',
      mission: '〇〇せよ',
      photo: 'dummy',
      longitude: '38.1183',
      latitude: '117.0224',
      user_id: 1,
      prefecture_id: 23,
    },
  ]);
};
