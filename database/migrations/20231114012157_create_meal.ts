import { Knex } from 'knex'

export async function up(knex: Knex): Promise<void> {
	await knex.schema.createTable('meals', (table) => {
		table.uuid('id').primary()
    table.string('session_id').index()
		table.text('name').notNullable()
		table.text('description').notNullable()
		table.timestamp('date').defaultTo(knex.fn.now())
		table.boolean('is_diet')
	})
}

export async function down(knex: Knex): Promise<void> {
	await knex.schema.dropTable('meals')
}
