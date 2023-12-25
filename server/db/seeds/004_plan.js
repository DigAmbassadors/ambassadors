/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.seed = async function (knex) {
  // Deletes ALL existing entries
  await knex('plan').del();
  await knex('plan').insert([
    { name: 'プラン1', user_id: 1 },
    { name: 'プラン2', user_id: 1 },
    { name: 'プラン3', user_id: 1 },
  ]);
};
