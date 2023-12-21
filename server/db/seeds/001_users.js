/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.seed = async function (knex) {
  // Deletes ALL existing entries
  await knex('users').del();
  await knex('users').insert([
    {
      name: '星立　直哉',
      point: 0,
      email: 'xxxx@xxxx.com',
      salt: '123456',
      hash: 'jfksalofisha',
    },
  ]);
};
