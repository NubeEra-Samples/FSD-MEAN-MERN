
---

# 📁 **Project Structure**

```
react-routing-example/
│
├── src/
│   ├── components/
│   │   └── Navbar.jsx
│   │
│   ├── pages/
│   │   ├── Home.jsx
│   │   ├── About.jsx
│   │   ├── Dashboard.jsx
│   │   ├── Profile.jsx
│   │   ├── Settings.jsx
│   │   └── User.jsx
│   │
│   ├── routes/
│   │   └── ProtectedRoute.jsx
│   │
│   ├── App.jsx
│   ├── main.jsx
│   └── index.css
│
└── package.json
```

---

# 🧩 **Full Code for Each File**

---

# 📄 **src/main.jsx**

```jsx
import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App";
import "./index.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>
);
```

---

# 📄 **src/App.jsx**

```jsx
import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";

import Home from "./pages/Home";
import About from "./pages/About";
import Dashboard from "./pages/Dashboard";
import Profile from "./pages/Profile";
import Settings from "./pages/Settings";
import User from "./pages/User";

import ProtectedRoute from "./routes/ProtectedRoute";

export default function App() {
  const isLoggedIn = true; // change to false to test redirect

  return (
    <>
      <Navbar />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />

        {/* Dynamic Routing */}
        <Route path="/user/:id" element={<User />} />

        {/* Protected Routes */}
        <Route
          path="/dashboard/*"
          element={
            <ProtectedRoute isAuth={isLoggedIn}>
              <Dashboard />
            </ProtectedRoute>
          }
        >
          <Route path="profile" element={<Profile />} />
          <Route path="settings" element={<Settings />} />
        </Route>
      </Routes>
    </>
  );
}
```

---

# 📄 **src/components/Navbar.jsx**

```jsx
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
```

---

# 📁 **Pages**

---

# 📄 **src/pages/Home.jsx**

```jsx
export default function Home() {
  return <h1>🏠 Home Page</h1>;
}
```

---

# 📄 **src/pages/About.jsx**

```jsx
export default function About() {
  return <h1>ℹ️ About Page</h1>;
}
```

---

# 📄 **src/pages/Dashboard.jsx**

```jsx
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
```

---

# 📄 **src/pages/Profile.jsx**

```jsx
export default function Profile() {
  return <h2>👤 Profile Page</h2>;
}
```

---

# 📄 **src/pages/Settings.jsx**

```jsx
export default function Settings() {
  return <h2>⚙️ Settings Page</h2>;
}
```

---

# 📄 **src/pages/User.jsx**

```jsx
import { useParams } from "react-router-dom";

export default function User() {
  const { id } = useParams();
  return <h1>👤 User ID: {id}</h1>;
}
```

---

# 📄 **src/routes/ProtectedRoute.jsx**

```jsx
import { Navigate } from "react-router-dom";

export default function ProtectedRoute({ isAuth, children }) {
  if (!isAuth) return <Navigate to="/" replace />;
  return children;
}
```

---

# 📄 **src/index.css**

```css
body {
  margin: 0;
  font-family: Arial, sans-serif;
}
nav a {
  text-decoration: none;
  color: black;
  font-weight: bold;
}
nav a:hover {
  color: blue;
}
```

---

# 🎉 What You Get

✔ Fully working **React Router v6+**
✔ Dynamic Routes (`/user/:id`)
✔ Nested Routes (`Dashboard → Profile/Settings`)
✔ Protected Routes
✔ Clean folder structure
✔ Ready-to-run project

---
