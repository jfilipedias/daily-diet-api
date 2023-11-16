import { randomUUID } from 'node:crypto'
import { FastifyInstance } from 'fastify'
import { z } from 'zod'
import { knex } from '@/database'
import { validateSessionId } from '@/middlewares/validate-session-id'

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

		let sessionId = request.cookies.sessionId

		if (!sessionId) {
			sessionId = randomUUID()
			reply.cookie('sessionId', sessionId, {
				path: '/',
				maxAge: 1000 * 60 * 60 * 24 * 7, // 7 days in milliseconds
			})
		}

		await knex('meals').insert({
			id: randomUUID(),
			name,
			description,
			date,
			hour,
			diet,
			session_id: sessionId,
		})

		return reply.status(201).send()
	})

	app.get('/', { preHandler: [validateSessionId] }, async (request) => {
		const sessionId = request.cookies.sessionId

		const meals = await knex('meals')
			.where({ session_id: sessionId })
			.select('*')

		return { meals }
	})

	app.get('/:id', { preHandler: [validateSessionId] }, async (request) => {
		const getMealByIdParamsSchema = z.object({
			id: z.string(),
		})

		const { id } = getMealByIdParamsSchema.parse(request.params)

		const sessionId = request.cookies.sessionId

		const meal = await knex('meals')
			.where({ id, session_id: sessionId })
			.select('*')
			.first()

		return { meal }
	})

	app.put(
		'/:id',
		{ preHandler: [validateSessionId] },
		async (request, reply) => {
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

			const { name, description, date, hour, diet } =
				updateMealBodySchema.parse(request.body)

			const sessionId = request.cookies.sessionId

			await knex('meals').where({ id, session_id: sessionId }).update({
				id,
				name,
				description,
				date,
				hour,
				diet,
				session_id: sessionId,
			})

			return reply.status(204).send()
		},
	)

	app.delete(
		'/:id',
		{ preHandler: [validateSessionId] },
		async (request, reply) => {
			const deleteMealParamsSchema = z.object({
				id: z.string(),
			})

			const { id } = deleteMealParamsSchema.parse(request.params)

			const sessionId = request.cookies.sessionId

			await knex('meals').delete().where({ id, session_id: sessionId })

			return reply.status(204).send()
		},
	)
}
