/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.seed = async function (knex) {
  // Deletes ALL existing entries
  await knex('terminal').del();
  await knex('terminal').insert([
    { name: '新石垣空港' },
    { name: '那覇空港' },
    { name: '宮古空港' },
  ]);
};
