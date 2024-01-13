/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.seed = async function (knex) {
	// Deletes ALL existing entries
	await knex('trips').del();
	await knex('trips').insert([
		{
			users_id: 2,
			trips: [1],
		},
	]);
};
