import { Link } from "react-router-dom";

function Home() {
  return (
    <div style={{ backgroundColor: "cyan", minHeight: "100vh", padding: "20px" }}>
      {/* Navigation Menu */}
      <ul style={{ display: "flex", listStyle: "none", justifyContent: "center", padding: 0 }}>
        <li style={{ margin: "0 15px" }}><Link to="/">Home</Link></li>
        <li style={{ margin: "0 15px" }}><Link to="/users">Users</Link></li>
        <li style={{ margin: "0 15px" }}><Link to="/products">Products</Link></li>
        <li style={{ margin: "0 15px" }}><Link to="/orders">Orders</Link></li>
        <li style={{ margin: "0 15px" }}><Link to="#">About Us</Link></li>
        <li style={{ margin: "0 15px" }}><Link to="/">Logout</Link></li>
      </ul>

      {/* Dashboard Heading */}
      <h1 style={{ textAlign: "center", marginTop: "30px" }}>karama pavan Dashboard</h1>
      <h2 style={{ textAlign: "center" }}>Name: karanam</h2>

      {/* Content Section */}
      <div style={{ textAlign: "center", marginTop: "50px" }}>
        <h3>Software Used</h3>
        <p><strong>UI:</strong> React &nbsp; | &nbsp; <strong>Backend:</strong> PHP (Laravel) &nbsp; | &nbsp; <strong>Database:</strong> MySQL</p>

        <h3>Tools Used</h3>
        <p>Apache &nbsp; | &nbsp; MySQL Server &nbsp; | &nbsp; Node.js &nbsp; | &nbsp; VS Code &nbsp; | &nbsp; GitHub</p>

        {/* Footer */}
        <footer style={{ marginTop: "50px" }}>
          © 2025 karanam
        </footer>
      </div>
    </div>
  );
}

export default Home;