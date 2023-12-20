/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
  return knex.schema.createTable('terminal_spot_time', function (table) {
    table.increments('id').primary();
    table.integer('terminal_id').references('terminal.id');
    table.integer('spot_id').references('spot.id');
    table.integer('time', 32);
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
  return knex.schema.dropTable('terminal_spot_time');
};
