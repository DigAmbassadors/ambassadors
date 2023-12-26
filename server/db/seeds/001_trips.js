/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.seed = async function (knex) {
  // Deletes ALL existing entries
  await knex('trips').del();
  await knex('trips').insert([
    {
      trips: [1, 2, 3, 4, 5],
      users_id: 1,
    },
  ]);
};
