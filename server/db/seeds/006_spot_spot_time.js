/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.seed = async function (knex) {
  // Deletes ALL existing entries
  await knex('spot_spot_time').del();
  await knex('spot_spot_time').insert([
    { spot1_id: 1, spot2_id: 2, time: 10 },
    { spot1_id: 1, spot2_id: 3, time: 24 },
    { spot1_id: 1, spot2_id: 4, time: 12 },
    { spot1_id: 1, spot2_id: 5, time: 22 },
    { spot1_id: 1, spot2_id: 6, time: 30 },
    { spot1_id: 1, spot2_id: 7, time: 32 },
    { spot1_id: 1, spot2_id: 8, time: 36 },
    { spot1_id: 1, spot2_id: 9, time: 13 },
    { spot1_id: 1, spot2_id: 10, time: 11 },

    { spot1_id: 2, spot2_id: 3, time: 16 },
    { spot1_id: 2, spot2_id: 4, time: 20 },
    { spot1_id: 2, spot2_id: 5, time: 15 },
    { spot1_id: 2, spot2_id: 6, time: 27 },
    { spot1_id: 2, spot2_id: 7, time: 29 },
    { spot1_id: 2, spot2_id: 8, time: 34 },
    { spot1_id: 2, spot2_id: 9, time: 21 },
    { spot1_id: 2, spot2_id: 10, time: 17 },

    { spot1_id: 3, spot2_id: 4, time: 35 },
    { spot1_id: 3, spot2_id: 5, time: 15 },
    { spot1_id: 3, spot2_id: 6, time: 31 },
    { spot1_id: 3, spot2_id: 7, time: 41 },
    { spot1_id: 3, spot2_id: 8, time: 45 },
    { spot1_id: 3, spot2_id: 9, time: 35 },
    { spot1_id: 3, spot2_id: 10, time: 31 },

    { spot1_id: 4, spot2_id: 5, time: 33 },
    { spot1_id: 4, spot2_id: 6, time: 35 },
    { spot1_id: 4, spot2_id: 7, time: 36 },
    { spot1_id: 4, spot2_id: 8, time: 42 },
    { spot1_id: 4, spot2_id: 9, time: 6 },
    { spot1_id: 4, spot2_id: 10, time: 16 },

    { spot1_id: 5, spot2_id: 6, time: 14 },
    { spot1_id: 5, spot2_id: 7, time: 29 },
    { spot1_id: 5, spot2_id: 8, time: 33 },
    { spot1_id: 5, spot2_id: 9, time: 33 },
    { spot1_id: 5, spot2_id: 10, time: 29 },

    { spot1_id: 6, spot2_id: 7, time: 14 },
    { spot1_id: 6, spot2_id: 8, time: 15 },
    { spot1_id: 6, spot2_id: 9, time: 36 },
    { spot1_id: 6, spot2_id: 10, time: 26 },

    { spot1_id: 7, spot2_id: 8, time: 6 },
    { spot1_id: 7, spot2_id: 9, time: 37 },
    { spot1_id: 7, spot2_id: 10, time: 28 },

    { spot1_id: 8, spot2_id: 9, time: 37 },
    { spot1_id: 8, spot2_id: 10, time: 33 },

    { spot1_id: 9, spot2_id: 10, time: 17 },
  ]);
};
