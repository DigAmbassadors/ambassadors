/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.seed = async function (knex) {
	// Deletes ALL existing entries
	await knex('users').del();
	await knex('users').insert([
		{
			name: 'TakahashiTatsuhiro',
			record: [],
			group: JSON.stringify([
				{
					groupName: 'アンバサダーず',
					groupId: 2,
					groupPass: 1234,
				},
			]),
		},
		{
			name: 'アンバサダーず',
			group: JSON.stringify([]),
      record: []
		},
	]);
};
