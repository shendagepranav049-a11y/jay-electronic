function Overview({ stats, setActiveTab }) {
  return (
    <div className="admin-overview">
      <div className="stats-grid">
        <div className="stat-card" onClick={() => setActiveTab('enquiries')}>
          <h3>Total Enquiries</h3>
          <p className="stat-number">{stats.enquiries}</p>
        </div>
        <div className="stat-card" onClick={() => setActiveTab('projects')}>
          <h3>Published Projects</h3>
          <p className="stat-number">{stats.projects}</p>
        </div>
        <div className="stat-card" onClick={() => setActiveTab('solutions')}>
          <h3>Solutions</h3>
          <p className="stat-number">{stats.solutions}</p>
        </div>
      </div>
      
      <div className="overview-welcome">
        <h2>Welcome to Content Manager</h2>
        <p>Select a section from the sidebar to manage your website content, update media, or review customer enquiries.</p>
      </div>
    </div>
  );
}

export default Overview;
