/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
  return knex.schema.createTable('trips', function (table) {
    table.increments('id').primary();
    table.specificType('trips', 'integer[]'); //数値データ(trip_id)を格納する配列
    table.integer('users_id').references('users.id');
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
  return knex.schema.dropTable('trips');
};
