import { Outlet, Link } from "react-router-dom";

export default function Dashboard() {
  return (
    <>
      <h1>📊 Dashboard</h1>

      <Link to="profile" style={{ marginRight: 10 }}>Profile</Link>
      <Link to="settings">Settings</Link>

      <hr />
      <Outlet />
    </>
  );
}
