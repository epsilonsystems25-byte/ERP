import { useEffect, useState } from 'react'
import './CustomerForm.css'

const initialState = {
  name: '',
  father_name: '',
  cnic: '',
  address: '',
  ntn: '',
  phone_number: '',
  email: '',
  password: '',
  cafe_name: '',
  cafe_location: '',
  date_of_purchase: '',
  due_date: '',
  status: 'active',
  role: 'customer',
  sales: 'inactive',
  inventory: 'inactive',
  operations: 'inactive',
}

function CustomerForm({ initial, onClose, onSave }) {
  const [form, setForm] = useState(initial || initialState)
  const [saving, setSaving] = useState(false)

  useEffect(() => {
    if (initial) {
      setForm({ ...initial, password: '' })
    }
  }, [initial])

  function handleChange(e) {
    const { name, value } = e.target
    setForm((prev) => ({ ...prev, [name]: value }))
  }

  async function handleSubmit(e) {
    e.preventDefault()
    setSaving(true)
    try {
      const payload = { ...form }
      if (!payload.password) {
        delete payload.password
      }
      await onSave(payload)
    } finally {
      setSaving(false)
    }
  }

  return (
    <div className="drawer-backdrop">
      <div className="drawer">
        <header className="drawer-header">
          <h3>{initial ? 'Edit Customer' : 'Add Customer'}</h3>
          <button className="icon-link" onClick={onClose}>
            ✕
          </button>
        </header>
        <form className="drawer-form" onSubmit={handleSubmit}>
          <div className="form-grid">
            <label>
              Name
              <input
                name="name"
                value={form.name}
                onChange={handleChange}
                required
                placeholder="Customer name"
              />
            </label>
            <label>
              Father Name
              <input
                name="father_name"
                value={form.father_name || ''}
                onChange={handleChange}
                placeholder="Father name"
              />
            </label>
            <label>
              CNIC
              <input
                name="cnic"
                value={form.cnic}
                onChange={handleChange}
                required
                placeholder="CNIC number"
              />
            </label>
            <label>
              Address
              <input
                name="address"
                value={form.address || ''}
                onChange={handleChange}
                placeholder="Address"
              />
            </label>
            <label>
              NTN
              <input
                name="ntn"
                value={form.ntn || ''}
                onChange={handleChange}
                placeholder="NTN"
              />
            </label>
            <label>
              Phone Number
              <input
                name="phone_number"
                value={form.phone_number}
                onChange={handleChange}
                required
                placeholder="Phone number"
              />
            </label>
            <label>
              Email
              <input
                type="email"
                name="email"
                value={form.email}
                onChange={handleChange}
                required
                placeholder="Email"
              />
            </label>
            <label>
              Password
              <input
                type="password"
                name="password"
                value={form.password}
                onChange={handleChange}
                placeholder={initial ? 'Leave blank to keep current' : 'Set account password'}
              />
            </label>
            <label>
              Cafe Name
              <input
                name="cafe_name"
                value={form.cafe_name || ''}
                onChange={handleChange}
                placeholder="Cafe name"
              />
            </label>
            <label>
              Cafe Location
              <input
                name="cafe_location"
                value={form.cafe_location || ''}
                onChange={handleChange}
                placeholder="Cafe location"
              />
            </label>
            <label>
              Date of Purchase
              <input
                type="date"
                name="date_of_purchase"
                value={form.date_of_purchase ? form.date_of_purchase.substring(0, 10) : ''}
                onChange={handleChange}
              />
            </label>
            <label>
              Due Date
              <input
                type="date"
                name="due_date"
                value={form.due_date ? form.due_date.substring(0, 10) : ''}
                onChange={handleChange}
              />
            </label>
            <label>
              Status
              <select name="status" value={form.status || 'active'} onChange={handleChange}>
                <option value="active">Active</option>
                <option value="inactive">Inactive</option>
              </select>
            </label>
            <label>
              Role
              <select name="role" value={form.role || 'customer'} onChange={handleChange}>
                <option value="customer">Customer</option>
                <option value="super_admin">Super Admin</option>
              </select>
            </label>
            <label>
              Sales
              <select name="sales" value={form.sales || 'inactive'} onChange={handleChange}>
                <option value="active">Active</option>
                <option value="inactive">Inactive</option>
              </select>
            </label>
            <label>
              Inventory
              <select name="inventory" value={form.inventory || 'inactive'} onChange={handleChange}>
                <option value="active">Active</option>
                <option value="inactive">Inactive</option>
              </select>
            </label>
            <label>
              Operations
              <select name="operations" value={form.operations || 'inactive'} onChange={handleChange}>
                <option value="active">Active</option>
                <option value="inactive">Inactive</option>
              </select>
            </label>
          </div>
          <div className="drawer-footer">
            <button type="button" className="secondary-btn" onClick={onClose}>
              Cancel
            </button>
            <button type="submit" className="primary-btn" disabled={saving}>
              {saving ? 'Saving…' : 'Save Customer'}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default CustomerForm

