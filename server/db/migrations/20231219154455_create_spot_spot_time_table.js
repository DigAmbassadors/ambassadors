/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
  return knex.schema.createTable('spot_spot_time', function (table) {
    table.increments('id').primary();
    table.integer('spot1_id').references('spot.id');
    table.integer('spot2_id').references('spot.id');
    table.integer('time', 32);
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
  return knex.schema.dropTable('spot_spot_time');
};
