import 'server-only'
import { neon } from "@neondatabase/serverless";

const DATABASE_URL = process.env.DATABASE_URL
if (!DATABASE_URL) {
    console.log('DATABASE_URL no definida')
    throw new Error('DATABASE_URL no definida')
}
export const neonDB = neon(DATABASE_URL)