/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.seed = async function (knex) {
	// Deletes ALL existing entries
	await knex('trip').del();
	await knex('trip').insert([
		{
			area: '大須ぶらり旅',
			trip: [1, 2, 3, 4, 5, 6, 7, 8],
		},
	]);
};
