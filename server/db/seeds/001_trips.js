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
    {
      trips: [1, 2, 3, 4, 5],
      users_id: 2,
    },
    {
      trips: [1, 2, 3, 4, 5],
      users_id: 3,
    },
    {
      trips: [1, 2, 3, 4, 5],
      users_id: 4,
    },
  ]);
};
