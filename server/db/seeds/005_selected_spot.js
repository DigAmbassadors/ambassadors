/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.seed = async function (knex) {
  // Deletes ALL existing entries
  await knex('selected_spot').del();
  await knex('selected_spot').insert([
    {
      photo: 'dummy',
      longitude: '34.1183',
      latitude: '134.0224',
      plan_id: 1,
      prepared_spot_id: 1,
    },
    {
      photo: 'dummy',
      longitude: '34.1183',
      latitude: '134.0224',
      plan_id: 1,
      prepared_spot_id: 4,
    },
    {
      photo: 'dummy',
      longitude: '34.1183',
      latitude: '134.0224',
      plan_id: 1,
      prepared_spot_id: 2,
    },
    {
      photo: 'dummy',
      longitude: '34.1183',
      latitude: '134.0224',
      plan_id: 2,
      prepared_spot_id: 5,
    },
    {
      photo: 'dummy',
      longitude: '34.1183',
      latitude: '134.0224',
      plan_id: 2,
      prepared_spot_id: 3,
    },
    {
      photo: 'dummy',
      longitude: '34.1183',
      latitude: '134.0224',
      plan_id: 2,
      prepared_spot_id: 6,
    },
  ]);
};
