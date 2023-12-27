/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
  return knex.schema.createTable('spot', function (table) {
    table.increments('id').primary();
    table.string('name', 32);
    table.text('mission');
    table.text('photo');
    table.decimal('longitude', 32, 4);
    table.decimal('latitude', 32, 4);
    table.string('area', 32);
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
  return knex.schema.dropTable('spot');
};
