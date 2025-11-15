import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <nav style={{ padding: "10px", background: "#f0f0f0" }}>
      <Link to="/" style={{ marginRight: 10 }}>Home</Link>
      <Link to="/about" style={{ marginRight: 10 }}>About</Link>
      <Link to="/dashboard" style={{ marginRight: 10 }}>Dashboard</Link>
      <Link to="/user/1">User 1</Link>
    </nav>
  );
}
