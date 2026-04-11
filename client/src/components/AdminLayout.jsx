import AdminNavbar from "./AdminNavbar";

function AdminLayout({ children }) {
  return (
    <div>
      <AdminNavbar />
      <div style={{ paddingTop: "90px", minHeight: "80vh" }}>
        {children}
      </div>
    </div>
  );
}

export default AdminLayout;