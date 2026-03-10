import { useEffect, useState } from 'react'
import { useAuth } from '../context/AuthContext'
import { apiClient } from '../services/apiClient'
import TopNav from '../components/TopNav'
import CustomerTable from '../components/CustomerTable'
import CustomerForm from '../components/CustomerForm'
import './DashboardPage.css'

function DashboardPage() {
  const { user, logout } = useAuth()
  const [customers, setCustomers] = useState([])
  const [loading, setLoading] = useState(true)
  const [search, setSearch] = useState('')
  const [statusFilter, setStatusFilter] = useState('all')
  const [showForm, setShowForm] = useState(false)
  const [editingCustomer, setEditingCustomer] = useState(null)

  async function loadCustomers() {
    setLoading(true)
    try {
      const params = {}
      if (search) params.search = search
      if (statusFilter !== 'all') params.status = statusFilter
      const { data } = await apiClient.get('/customers', { params })
      setCustomers(data)
    } catch (err) {
      console.error('Failed to load customers', err)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    loadCustomers()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [statusFilter])

  async function handleSave(customer) {
    if (editingCustomer) {
      await apiClient.put(`/customers/${editingCustomer.id}`, customer)
    } else {
      await apiClient.post('/customers', customer)
    }
    setShowForm(false)
    setEditingCustomer(null)
    loadCustomers()
  }

  async function handleDelete(id) {
    if (!window.confirm('Are you sure you want to delete this customer?')) return
    await apiClient.delete(`/customers/${id}`)
    loadCustomers()
  }

  return (
    <div className="dashboard-layout">
      <TopNav user={user} onLogout={logout} />
      <main className="dashboard-main">
        <header className="dashboard-header">
          <div>
            <h2>Customers</h2>
            <p>Manage all customer accounts from one place.</p>
          </div>
          <button
            className="primary-btn"
            onClick={() => {
              setEditingCustomer(null)
              setShowForm(true)
            }}
          >
            + Add New Customer
          </button>
        </header>

        <section className="filters-row">
          <div className="search-input">
            <input
              type="text"
              placeholder="Search by name, cafe or phone…"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && loadCustomers()}
            />
          </div>
          <div className="status-filters">
            <button
              className={statusFilter === 'all' ? 'chip chip-active' : 'chip'}
              onClick={() => setStatusFilter('all')}
            >
              All
            </button>
            <button
              className={statusFilter === 'active' ? 'chip chip-active' : 'chip'}
              onClick={() => setStatusFilter('active')}
            >
              Active
            </button>
            <button
              className={statusFilter === 'inactive' ? 'chip chip-active' : 'chip'}
              onClick={() => setStatusFilter('inactive')}
            >
              Inactive
            </button>
          </div>
        </section>

        <section className="table-section">
          <CustomerTable
            customers={customers}
            loading={loading}
            onEdit={(customer) => {
              setEditingCustomer(customer)
              setShowForm(true)
            }}
            onDelete={handleDelete}
          />
        </section>
      </main>

      {showForm && (
        <CustomerForm
          initial={editingCustomer}
          onClose={() => {
            setShowForm(false)
            setEditingCustomer(null)
          }}
          onSave={handleSave}
        />
      )}
    </div>
  )
}

export default DashboardPage

