/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.seed = async function (knex) {
	// Deletes ALL existing entries
	await knex('trip').del();
	await knex('trip').insert([
		{
			area: '名古屋市内',
			trip: [9, 3, 8],
		},
		{
			area: '名古屋市内',
			trip: [10, 5, 6],
		},
		{
			area: '名古屋市内',
			trip: [5, 2, 8],
		},
		{
			area: '名古屋市内',
			trip: [7, 9, 1],
		},
		{
			area: '名古屋市内',
			trip: [3, 8, 4],
		},
	]);
};
