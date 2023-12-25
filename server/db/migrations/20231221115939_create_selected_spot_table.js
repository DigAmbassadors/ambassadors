/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
  return knex.schema.createTable('selected_spot', function (table) {
    table.increments('id').primary();
    table.text('photo');
    table.decimal('longitude', 32, 4);
    table.decimal('latitude', 32, 4);
    table.boolean('achievement');
    table.integer('plan_id').references('plan.id');
    table.integer('prepared_spot_id').references('prepared_spot.id');
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
  return knex.schema.dropTable('selected_spot');
};
