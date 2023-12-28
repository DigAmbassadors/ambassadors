/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.seed = async function (knex) {
  // Deletes ALL existing entries
  await knex('users').del();
  await knex('users').insert([
    { id: 0, name: 'admin', record: [] },
    { id: 1, name: 'TakahashiTatsuhiro' },
    { id: 2, name: 'naoya' },
    { id: 3, name: 'kunokuno' },
    { id: 4, name: 'Takahiro5286' },
  ]);
};
