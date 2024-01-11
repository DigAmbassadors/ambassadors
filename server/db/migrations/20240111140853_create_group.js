/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
  return knex.schema.createTable('groups', function (table) {
    table.increments('id').primary();
    table.string('name', 32);
    table.specificType('record', 'jsonb'); //数値データを格納する配列
    table.integer('pass', 4); // 4桁の整数列を追加
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
  return knex.schema.dropTable('groups');
};
