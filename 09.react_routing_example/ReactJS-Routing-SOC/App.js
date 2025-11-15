const { BrowserRouter, Routes, Route, NavLink } = ReactRouterDOM;

function App() {
  return (
    <BrowserRouter>
      <nav>
        <NavLink to="/" end className={({isActive}) => isActive ? "active" : ""}>Home</NavLink>
        <NavLink to="/about" className={({isActive}) => isActive ? "active" : ""}>About</NavLink>
        <NavLink to="/contact" className={({isActive}) => isActive ? "active" : ""}>Contact</NavLink>
      </nav>

      <hr />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="*" element={<h2>404 Page Not Found</h2>} />
      </Routes>
    </BrowserRouter>
  );
}
