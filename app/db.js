import pg from 'pg';

const { Pool } = pg;

const pool = new Pool({
    host: 'postgres',
    port: 5432,
    database: 'requests',
    user: 'postgres',
    password: 'postgres',
});

export async function getIdRange() {
    const { rows } = await pool.query(
        'SELECT MIN(id) AS min_id, MAX(id) AS max_id, COUNT(*) AS total FROM requests',
    );
    return rows[0];
}

export async function getRequestById(id) {
    const { rows } = await pool.query(
        `SELECT id, full_name, mobile_phone, home_phone, other_contact, email, gender, created_at 
         FROM requests 
         WHERE id = $1`,
        [id],
    );
    return rows[0] || null;
}

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
