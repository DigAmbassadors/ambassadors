/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.seed = async function (knex) {
  // Deletes ALL existing entries
  await knex('terminal_spot_time').del();
  await knex('terminal_spot_time').insert([
    { terminal_id: 1, spot_id: 1, time: 22 },
    { terminal_id: 1, spot_id: 2, time: 20 },
    { terminal_id: 1, spot_id: 3, time: 34 },
    { terminal_id: 1, spot_id: 4, time: 27 },
    { terminal_id: 1, spot_id: 5, time: 28 },
    { terminal_id: 1, spot_id: 6, time: 20 },
    { terminal_id: 1, spot_id: 7, time: 19 },
    { terminal_id: 1, spot_id: 8, time: 23 },
    { terminal_id: 1, spot_id: 9, time: 27 },
    { terminal_id: 1, spot_id: 10, time: 15 },
  ]);
};
