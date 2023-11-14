import 'dotenv/config'
import { z } from 'zod'

const envSchema = z.object({
	DATABASE_CLIENT: z.enum(['sqlite', 'pg']),
	DATABASE_URL: z.string(),
	PORT: z.coerce.number().default(3333),
})

const result = envSchema.safeParse(process.env)

if (!result.success) {
	console.error(result.error.format())
	throw new Error('Was not possible to load the environment variables.')
}

export const env = result.data
