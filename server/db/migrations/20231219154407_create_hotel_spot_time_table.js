// NAVITIMEのAPIが使えた場合、このテーブルは後で削除

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
  return knex.schema.createTable('hotel_spot_time', function (table) {
    table.increments('id').primary();
    table.integer('hotel_id').references('hotel.id');
    table.integer('spot_id').references('spot.id');
    table.integer('time', 32);
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
  return knex.schema.dropTable('hotel_spot_time');
};
