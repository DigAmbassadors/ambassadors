/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.seed = async function (knex) {
  // Deletes ALL existing entries
  await knex('hotel_spot_time').del();
  await knex('hotel_spot_time').insert([
    { hotel_id: 1, spot_id: 1, time: 12 },
    { hotel_id: 1, spot_id: 2, time: 11 },
    { hotel_id: 1, spot_id: 3, time: 25 },
    { hotel_id: 1, spot_id: 4, time: 18 },
    { hotel_id: 1, spot_id: 5, time: 22 },
    { hotel_id: 1, spot_id: 6, time: 35 },
    { hotel_id: 1, spot_id: 7, time: 36 },
    { hotel_id: 1, spot_id: 8, time: 39 },
    { hotel_id: 1, spot_id: 9, time: 19 },
    { hotel_id: 1, spot_id: 10, time: 21 },

    { hotel_id: 2, spot_id: 1, time: 14 },
    { hotel_id: 2, spot_id: 2, time: 21 },
    { hotel_id: 2, spot_id: 3, time: 35 },
    { hotel_id: 2, spot_id: 4, time: 12 },
    { hotel_id: 2, spot_id: 5, time: 33 },
    { hotel_id: 2, spot_id: 6, time: 31 },
    { hotel_id: 2, spot_id: 7, time: 32 },
    { hotel_id: 2, spot_id: 8, time: 37 },
    { hotel_id: 2, spot_id: 9, time: 12 },
    { hotel_id: 2, spot_id: 10, time: 7 },

    { hotel_id: 3, spot_id: 1, time: 8 },
    { hotel_id: 3, spot_id: 2, time: 13 },
    { hotel_id: 3, spot_id: 3, time: 27 },
    { hotel_id: 3, spot_id: 4, time: 14 },
    { hotel_id: 3, spot_id: 5, time: 25 },
    { hotel_id: 3, spot_id: 6, time: 36 },
    { hotel_id: 3, spot_id: 7, time: 37 },
    { hotel_id: 3, spot_id: 8, time: 41 },
    { hotel_id: 3, spot_id: 9, time: 15 },
    { hotel_id: 3, spot_id: 10, time: 19 },

    { hotel_id: 4, spot_id: 1, time: 25 },
    { hotel_id: 4, spot_id: 2, time: 17 },
    { hotel_id: 4, spot_id: 3, time: 18 },
    { hotel_id: 4, spot_id: 4, time: 35 },
    { hotel_id: 4, spot_id: 5, time: 11 },
    { hotel_id: 4, spot_id: 6, time: 26 },
    { hotel_id: 4, spot_id: 7, time: 37 },
    { hotel_id: 4, spot_id: 8, time: 41 },
    { hotel_id: 4, spot_id: 9, time: 36 },
    { hotel_id: 4, spot_id: 10, time: 32 },
  ]);
};
