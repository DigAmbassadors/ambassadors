/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.seed = async function (knex) {
  // Deletes ALL existing entries
  await knex('hotel').del();
  await knex('hotel').insert([
    { name: 'フサキビーチリゾート' },
    { name: 'ＡＮＡインターコンチネンタル石垣リゾート' },
    { name: 'グランヴィリオリゾート石垣島' },
    { name: '石垣シーサイドホテル' },
  ]);
};
