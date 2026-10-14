import pg from 'pg';

const { Pool } = pg;

const pool = new Pool({
    host: 'postgres',
    port: 5432,
    database: 'requests',
    user: 'postgres',
    password: 'postgres',
});

export async function saveToDatabase(data) {
    await pool.query(
        `
        INSERT INTO requests
        (
            full_name,
            mobile_phone,
            home_phone,
            other_contact,
            email,
            gender
        )
        VALUES ($1, $2, $3, $4, $5, $6)
        `,
        [
            data.fullName,
            data.mobilePhone, 
            data.homePhone,
            data.otherContact,
            data.email,
            data.gender
        ],
    );
}
