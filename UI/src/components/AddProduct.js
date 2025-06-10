import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import "./AddProduct.css";

function AddProduct() {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [stock, setStock] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    fetch("http://localhost:8000/api/products", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name,
        description,
        price: parseFloat(price),
        stock: parseInt(stock),
      }),
    })
      .then((res) => res.json())
      .then(() => {
        alert("Product Added Successfully");
        navigate("/products");
      })
      .catch(() => alert("Failed to add product"));
  };

  return (
    <div className="add-product-form">
      <div className="form-buttons">
        <Link to="/home" className="nav-button">🏠 Home</Link>
        <Link to="/products" className="nav-button">⬅ Back to Products</Link>
      </div>

      <h2>Add Product</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Product Name"
          required
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <input
          type="text"
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <input
          type="number"
          placeholder="Price"
          required
          value={price}
          onChange={(e) => setPrice(e.target.value)}
        />
        <input
          type="number"
          placeholder="Stock"
          required
          value={stock}
          onChange={(e) => setStock(e.target.value)}
        />
        <button type="submit">Add Product</button>
      </form>
    </div>
  );
}

export default AddProduct;