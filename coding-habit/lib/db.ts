import  { Pool } from 'pg'

const globalForPg = global as unknown as {
    pgPool?: Pool
    dbChecked?: boolean;
}

export const pool = 
    globalForPg.pgPool ??
    new Pool({
        connectionString: process.env.DATABASE_URL_CONNECTION
    })

    if (process.env.NODE_ENV !== 'production') {
        globalForPg.pgPool = pool;
    }

    if (!globalForPg.dbChecked) {
    globalForPg.dbChecked = true

    pool.query('SELECT 1')
        .then(() => {
        console.log('✅ Conexión a la base de datos establecida');
        })
        .catch((err) => {
        console.error('❌ Conexión a la base de datos rechazada');
        console.error(err);
        })
    }