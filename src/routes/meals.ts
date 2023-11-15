import { randomUUID } from 'node:crypto'
import { FastifyInstance } from 'fastify'
import { z } from 'zod'
import { knex } from '@/database'

export async function mealRoutes(app: FastifyInstance) {
	app.post('/', async (request, reply) => {
		const createMealBodySchema = z.object({
			name: z.string(),
			description: z.string(),
			date: z.string(),
			hour: z.string(),
			diet: z.boolean(),
		})

		const { name, description, date, hour, diet } = createMealBodySchema.parse(
			request.body,
		)

		await knex('meals').insert({
			id: randomUUID(),
			name,
			description,
			date,
			hour,
			diet,
		})

		return reply.status(201).send()
	})

	app.get('/', async () => {
		const meals = await knex('meals').select('*')

		return { meals }
	})

	app.get('/:id', async (request) => {
		const getMealByIdParamsSchema = z.object({
			id: z.string(),
		})

		const { id } = getMealByIdParamsSchema.parse(request.params)

		const meal = await knex('meals').where({ id }).select('*').first()

		return { meal }
	})

	app.put('/:id', async (request, reply) => {
		const updateMealParamsSchema = z.object({
			id: z.string(),
		})

		const { id } = updateMealParamsSchema.parse(request.params)

		const updateMealBodySchema = z.object({
			name: z.string(),
			description: z.string(),
			date: z.string(),
			hour: z.string(),
			diet: z.boolean(),
		})

		const { name, description, date, hour, diet } = updateMealBodySchema.parse(
			request.body,
		)

		await knex('meals').where({ id }).update({
			id,
			name,
			description,
			date,
			hour,
			diet,
		})

		return reply.status(204).send()
	})
}
