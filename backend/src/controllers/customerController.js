import {
  getAllCustomers,
  createCustomer,
  updateCustomer,
  deleteCustomer,
} from '../services/customerService.js';

export async function listCustomers(req, res) {
  try {
    const { status, search } = req.query;
    const customers = await getAllCustomers({ status, search });
    res.json(customers);
  } catch (error) {
    console.error('Error fetching customers:', error);
    res.status(500).json({ message: 'Failed to fetch customers.' });
  }
}

export async function addCustomer(req, res) {
  try {
    const {
      name,
      father_name,
      cnic,
      address,
      ntn,
      phone_number,
      email,
      password,
      cafe_name,
      cafe_location,
      date_of_purchase,
      due_date,
      status,
      role,
      sales,
      inventory,
      operations,
    } = req.body;

    if (!name || !cnic || !phone_number || !email || !password) {
      return res.status(400).json({
        message: 'Name, CNIC, phone number, email, and password are required.',
      });
    }

    const customer = await createCustomer({
      name,
      father_name,
      cnic,
      address,
      ntn,
      phone_number,
      email,
      // TEMP: store plain-text password to match existing DB
      password,
      cafe_name,
      cafe_location,
      date_of_purchase,
      due_date,
      status,
      role,
      sales,
      inventory,
      operations,
    });

    res.status(201).json(customer);
  } catch (error) {
    console.error('Error creating customer:', error);
    res.status(500).json({ message: 'Failed to create customer.' });
  }
}

export async function editCustomer(req, res) {
  try {
    const { id } = req.params;
    const updates = { ...req.body };

    const success = await updateCustomer(id, updates);

    if (!success) {
      return res.status(404).json({ message: 'Customer not found.' });
    }

    res.json({ message: 'Customer updated successfully.' });
  } catch (error) {
    console.error('Error updating customer:', error);
    res.status(500).json({ message: 'Failed to update customer.' });
  }
}

export async function removeCustomer(req, res) {
  try {
    const { id } = req.params;
    const success = await deleteCustomer(id);

    if (!success) {
      return res.status(404).json({ message: 'Customer not found.' });
    }

    res.status(204).send();
  } catch (error) {
    console.error('Error deleting customer:', error);
    res.status(500).json({ message: 'Failed to delete customer.' });
  }
}

