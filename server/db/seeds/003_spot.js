/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.seed = async function (knex) {
  // Deletes ALL existing entries
  await knex('spot').del();
  await knex('spot').insert([
    { name: '石垣島鍾乳洞' },
    { name: '石垣やいま村' },
    { name: '石垣御神崎灯台' },
    { name: 'ドルフィンファンタジー' },
    { name: '石垣島星空ファーム' },
    { name: 'ヒルギ群落' },
    { name: '玉取崎展望台' },
    { name: 'サビチ鍾乳洞' },
    { name: 'サザンゲートブリッジ' },
    { name: '津波大石' },
  ]);
};
