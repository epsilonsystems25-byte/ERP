import pool from '../config/db.js';

export async function findUserByEmail(email) {
  const query = `
    SELECT ua.*, c.\`Role\` AS role
    FROM user_auth ua
    LEFT JOIN customers c ON ua.customer_id = c.customer_id
    WHERE ua.email = ?
    LIMIT 1
  `;

  const [rows] = await pool.execute(query, [email]);
  return rows[0] || null;
}

