import './CustomerTable.css'

function StatusBadge({ status }) {
  const value = (status || '').toLowerCase()
  const label = value === 'active' ? 'Active' : value === 'inactive' ? 'Inactive' : status || 'Unknown'
  const cls =
    value === 'active' ? 'badge badge-success' : value === 'inactive' ? 'badge badge-muted' : 'badge'
  return <span className={cls}>{label}</span>
}

function CustomerTable({ customers, loading, onEdit, onDelete }) {
  if (loading) {
    return <div className="table-loading">Loading customers…</div>
  }

  if (!customers.length) {
    return <div className="table-empty">No customers found.</div>
  }

  return (
    <div className="table-wrapper">
      <table className="data-table">
        <thead>
          <tr>
            <th>Customer ID</th>
            <th>Customer Name</th>
            <th>Father Name</th>
            <th>CNIC</th>
            <th>Cafe Name</th>
            <th>Cafe Location</th>
            <th>Phone Number</th>
            <th>Status</th>
            <th>Sales</th>
            <th>Inventory</th>
            <th>Operations</th>
            <th>Purchase Date</th>
            <th>Due Date</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {customers.map((c) => (
            <tr key={c.id}>
              <td>{c.id}</td>
              <td>{c.name}</td>
              <td>{c.father_name}</td>
              <td>{c.cnic}</td>
              <td>{c.cafe_name}</td>
              <td>{c.cafe_location}</td>
              <td>{c.phone_number}</td>
              <td>
                <StatusBadge status={c.status} />
              </td>
              <td>
                <StatusBadge status={c.sales} />
              </td>
              <td>
                <StatusBadge status={c.inventory} />
              </td>
              <td>
                <StatusBadge status={c.operations} />
              </td>
              <td>{c.date_of_purchase ? new Date(c.date_of_purchase).toLocaleDateString() : '-'}</td>
              <td>{c.due_date ? new Date(c.due_date).toLocaleDateString() : '-'}</td>
              <td>
                <button className="icon-link" onClick={() => onEdit(c)} title="Edit">
                  ✏️
                </button>
                <button className="icon-link danger" onClick={() => onDelete(c.id)} title="Delete">
                  🗑️
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default CustomerTable

