import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Orders.css";

function AddOrder() {
  const [newOrder, setNewOrder] = useState({
    order_number: "",
    item_name: "",
    quantity: "",
    total_price: "",
    status: "",
  });

  const navigate = useNavigate();

  const handleNewOrderChange = (e) => {
    const { name, value } = e.target;
    setNewOrder((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const addOrder = (e) => {
    e.preventDefault();

    fetch("http://127.0.0.1:8000/api/orders", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newOrder),
    })
      .then((res) => {
        if (!res.ok) throw new Error("Failed to add order");
        return res.json();
      })
      .then(() => {
        alert("Order Added Successfully");
        navigate("/orders"); // Redirect to order list page after adding
      })
      .catch((err) => {
        alert(err.message);
      });
  };

  return (
    <div className="orders-container">
      <Link to="/orders" className="home-link">
        Back to Orders
      </Link>
      <form className="add-order-form" onSubmit={addOrder}>
        <h3>Add New Order</h3>
        <input
          type="text"
          name="order_number"
          placeholder="Order Number"
          value={newOrder.order_number}
          onChange={handleNewOrderChange}
          required
        />
        <input
          type="text"
          name="item_name"
          placeholder="Item Name"
          value={newOrder.item_name}
          onChange={handleNewOrderChange}
          required
        />
        <input
          type="number"
          name="quantity"
          placeholder="Quantity"
          value={newOrder.quantity}
          onChange={handleNewOrderChange}
          required
          min="1"
        />
        <input
          type="number"
          name="total_price"
          placeholder="Total Price"
          value={newOrder.total_price}
          onChange={handleNewOrderChange}
          required
          min="0"
          step="0.01"
        />
        <input
          type="text"
          name="status"
          placeholder="Status"
          value={newOrder.status}
          onChange={handleNewOrderChange}
          required
        />
        <button type="submit">Add Order</button>
      </form>
    </div>
  );
}

export default AddOrder;