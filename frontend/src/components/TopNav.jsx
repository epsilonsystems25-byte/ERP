import './TopNav.css'

function TopNav({ user, onLogout }) {
  return (
    <header className="topnav">
      <div className="topnav-left">
        <span className="brand-badge">ERP</span>
        <span className="brand-title">Super Admin Console</span>
      </div>
      <div className="topnav-right">
        <button className="icon-btn" aria-label="Notifications">
          <span className="bell-icon">🔔</span>
        </button>
        <div className="avatar-wrapper">
          <div className="avatar-circle">{user?.name?.[0] || 'A'}</div>
          <div className="avatar-meta">
            <span className="avatar-name">{user?.name || 'Admin'}</span>
            <span className="avatar-role">Super Admin</span>
          </div>
        </div>
        <button className="secondary-btn" onClick={onLogout}>
          Logout
        </button>
      </div>
    </header>
  )
}

export default TopNav

