import { neon } from "@neondatabase/serverless";

function validateEnv(): string{
   if (process.env.DATABASE_URL){
        return process.env.DATABASE_URL

    } else {
        console.log('DATABASE_URL no definida')
        throw new Error('DATABASE_URL no definida');
    }
}

export const neonDB = neon(validateEnv())