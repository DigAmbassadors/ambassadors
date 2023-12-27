/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.seed = async function (knex) {
  // Deletes ALL existing entries
  await knex('trip').del();
  await knex('trip').insert([
    {
      trip: [9, 3, 8],
    },
    {
      trip: [10, 5, 6],
    },
    {
      trip: [5, 2, 8],
    },
    {
      trip: [7, 9, 1],
    },
    {
      trip: [3, 8, 4],
    },
  ]);
};
