import { Knex } from 'knex'

export async function up(knex: Knex): Promise<void> {
	await knex.schema.createTable('meals', (table) => {
		table.uuid('id').primary()
		table.string('session_id').index()
		table.text('name').notNullable()
		table.text('description').notNullable()
		table.string('date').notNullable()
		table.string('hour').notNullable()
		table.boolean('diet').notNullable()
	})
}

export async function down(knex: Knex): Promise<void> {
	await knex.schema.dropTable('meals')
}
