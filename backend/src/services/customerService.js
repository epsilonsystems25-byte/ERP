import pool from '../config/db.js';

export async function getAllCustomers(filters = {}) {
  const conditions = [];
  const params = [];

  if (filters.status) {
    conditions.push('status = ?');
    params.push(filters.status);
  }

  if (filters.search) {
    conditions.push('(name LIKE ? OR cafe_name LIKE ? OR phone_number LIKE ?)');
    const term = `%${filters.search}%`;
    params.push(term, term, term);
  }

  const whereClause = conditions.length ? `WHERE ${conditions.join(' AND ')}` : '';
  const query = `
    SELECT
      customer_id AS id,
      name,
      father_name,
      address,
      ntn,
      cnic,
      email,
      cafe_name,
      cafe_location,
      phone_number,
      status,
      date_of_purchase,
      due_date,
      \`Role\` AS role,
      sales,
      inventory,
      operations
    FROM customers
    ${whereClause}
    ORDER BY created_at DESC
  `;

  const [rows] = await pool.execute(query, params);
  return rows;
}

export async function createCustomer(customer) {
  const query = `
    INSERT INTO customers
      (name, father_name, cnic, address, ntn, phone_number, email, password,
       cafe_name, cafe_location, date_of_purchase, due_date, status, \`Role\`,
       sales, inventory, operations, created_at)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, NOW())
  `;

  const params = [
    customer.name,
    customer.father_name,
    customer.cnic,
    customer.address,
    customer.ntn,
    customer.phone_number,
    customer.email,
    customer.password,
    customer.cafe_name,
    customer.cafe_location,
    customer.date_of_purchase,
    customer.due_date,
    customer.status,
    customer.role,
    customer.sales ?? null,
    customer.inventory ?? null,
    customer.operations ?? null,
  ];

  const [result] = await pool.execute(query, params);
  return { id: result.insertId, ...customer };
}

export async function updateCustomer(id, customer) {
  const fields = [];
  const params = [];

  const updatable = [
    'name',
    'father_name',
    'cnic',
    'address',
    'ntn',
    'phone_number',
    'email',
    'password',
    'cafe_name',
    'cafe_location',
    'date_of_purchase',
    'due_date',
    'status',
    'Role',
    'sales',
    'inventory',
    'operations',
  ];

  updatable.forEach((field) => {
    if (field in customer) {
      fields.push(`${field} = ?`);
      params.push(customer[field]);
    }
  });

  if (!fields.length) {
    return null;
  }

  params.push(id);

  const query = `
    UPDATE customers
    SET ${fields.join(', ')}
    WHERE customer_id = ?
  `;

  const [result] = await pool.execute(query, params);
  return result.affectedRows > 0;
}

export async function deleteCustomer(id) {
  const [result] = await pool.execute('DELETE FROM customers WHERE customer_id = ?', [id]);
  return result.affectedRows > 0;
}

