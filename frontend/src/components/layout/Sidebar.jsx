import "./Sidebar.css";

function Sidebar({ activePage, setActivePage, goCreatePage }) {
  return (
    <aside className="sidebar">
      <div className="sidebar-logo">
        <div className="logo-icon">✓</div>
        <h1>My Plan</h1>
      </div>

      <nav className="sidebar-menu">
        <button
          className={activePage === "home" ? "menu-item active" : "menu-item"}
          onClick={() => setActivePage("home")}
        >
          <span>📅</span>
          오늘 계획
        </button>

        <button
          className={activePage === "create" ? "menu-item active" : "menu-item"}
          onClick={goCreatePage}
        >
          <span>➕</span>
          새 계획 작성
        </button>

        <button
          className={activePage === "list" ? "menu-item active" : "menu-item"}
          onClick={() => setActivePage("list")}
        >
          <span>📋</span>
          계획 목록
        </button>
      </nav>

      <div className="sidebar-footer">
        <p>© 2026 My Plan</p>
      </div>
    </aside>
  );
}

export default Sidebar;