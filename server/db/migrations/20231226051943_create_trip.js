/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
  return knex.schema.createTable('trip', function (table) {
    table.increments('id').primary();
    table.specificType('trip', 'integer[]'); //数値データ(spot_id)を格納する配列
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
  return knex.schema.dropTable('trip');
};
