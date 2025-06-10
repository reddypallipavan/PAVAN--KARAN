import { useEffect, useState, useRef } from "react";
import { Link } from "react-router-dom";
import "./Orders.css";

function Order() {
  const [orders_data, setOrders] = useState([]);

  const orderNumberRefs = useRef({});
  const itemNameRefs = useRef({});
  const quantityRefs = useRef({});
  const totalPriceRefs = useRef({});
  const statusRefs = useRef({});

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = () => {
    fetch("http://localhost:8000/api/orders")
      .then((resp) => resp.json())
      .then((resp) => {
        setOrders(resp);
      });
  };

  const updateOrder = (id) => {
    const updated_order_number = orderNumberRefs.current[id]?.value;
    const updated_item_name = itemNameRefs.current[id]?.value;
    const updated_quantity = quantityRefs.current[id]?.value;
    const updated_total_price = totalPriceRefs.current[id]?.value;
    const updated_status = statusRefs.current[id]?.value;

    fetch("http://127.0.0.1:8000/api/orders/" + id, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        order_number: updated_order_number,
        item_name: updated_item_name,
        quantity: updated_quantity,
        total_price: updated_total_price,
        status: updated_status,
      }),
    })
      .then((res) => res.json())
      .then(() => {
        alert("Order Updated Successfully");
        fetchOrders();
      })
      .catch(() => alert("Update failed"));
  };

  const deleteOrder = (id) => {
    fetch("http://127.0.0.1:8000/api/orders/" + id, {
      method: "DELETE",
    })
      .then((res) => res.json())
      .then(() => {
        alert("Order Deleted Successfully");
        setOrders(orders_data.filter((order) => order.id !== id));
      })
      .catch(() => alert("Delete failed"));
  };

  return (
    <div className="orders-container">
      <Link to="/home" className="home-link">
        Home
      </Link>
      <Link to="/add-order" className="add-order-link" style={{ marginLeft: "20px" }}>
        Add Order
      </Link>

      <div className="table-wrapper">
        <table id="orders-table" className="orders-table">
          <thead>
            <tr>
              <th>Id</th>
              <th>Order Number</th>
              <th>Item Name</th>
              <th>Quantity</th>
              <th>Total Price</th>
              <th>Status</th>
              <th>Update</th>
              <th>Delete</th>
            </tr>
          </thead>
          <tbody>
            {orders_data.map((order) => (
              <tr key={order.id}>
                <td>{order.id}</td>
                <td>
                  <input
                    type="text"
                    defaultValue={order.order_number}
                    ref={(el) => (orderNumberRefs.current[order.id] = el)}
                  />
                </td>
                <td>
                  <input
                    type="text"
                    defaultValue={order.item_name}
                    ref={(el) => (itemNameRefs.current[order.id] = el)}
                  />
                </td>
                <td>
                  <input
                    type="text"
                    defaultValue={order.quantity}
                    ref={(el) => (quantityRefs.current[order.id] = el)}
                  />
                </td>
                <td>
                  <input
                    type="text"
                    defaultValue={order.total_price}
                    ref={(el) => (totalPriceRefs.current[order.id] = el)}
                  />
                </td>
                <td>
                  <input
                    type="text"
                    defaultValue={order.status}
                    ref={(el) => (statusRefs.current[order.id] = el)}
                  />
                </td>
                <td>
                  <button onClick={() => updateOrder(order.id)}>Update</button>
                </td>
                <td>
                  <button onClick={() => deleteOrder(order.id)}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Order;