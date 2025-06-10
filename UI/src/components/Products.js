import { useEffect, useState, useRef } from "react";
import { Link } from "react-router-dom";

function Products() {
  const [products_data, setProducts] = useState([]);
  const nameRefs = useRef({});
  const descriptionRefs = useRef({});
  const priceRefs = useRef({});
  const stockRefs = useRef({});

  useEffect(() => {
    fetch("http://localhost:8000/api/products")
      .then((resp) => resp.json())
      .then((resp) => setProducts(resp));
  }, []);

  const updateProduct = (id) => {
    const updated_name = nameRefs.current[id]?.value;
    const updated_description = descriptionRefs.current[id]?.value;
    const updated_price = priceRefs.current[id]?.value;
    const updated_stock = stockRefs.current[id]?.value;

    fetch("http://localhost:8000/api/products/" + id, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name: updated_name,
        description: updated_description,
        price: updated_price,
        stock: updated_stock,
      }),
    })
      .then((res) => res.json())
      .then(() => {
        alert("Product Updated Successfully");
      });
  };

  const deleteProduct = (id) => {
    fetch("http://localhost:8000/api/products/" + id, {
      method: "DELETE",
    })
      .then((res) => res.json())
      .then(() => {
        alert("Product Deleted Successfully");
        setProducts(products_data.filter((product) => product.id !== id));
      });
  };

  return (
    <>
      <h1>Product List</h1>
      <Link to="/products/add">➕ Add New Product</Link>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Description</th>
            <th>Price</th>
            <th>Stock</th>
            <th>Update</th>
            <th>Delete</th>
          </tr>
        </thead>
        <tbody>
          {products_data.map((product) => (
            <tr key={product.id}>
              <td>{product.id}</td>
              <td>
                <input
                  defaultValue={product.name}
                  ref={(el) => (nameRefs.current[product.id] = el)}
                />
              </td>
              <td>
                <input
                  defaultValue={product.description}
                  ref={(el) => (descriptionRefs.current[product.id] = el)}
                />
              </td>
              <td>
                <input
                  defaultValue={product.price}
                  ref={(el) => (priceRefs.current[product.id] = el)}
                />
              </td>
              <td>
                <input
                  defaultValue={product.stock}
                  ref={(el) => (stockRefs.current[product.id] = el)}
                />
              </td>
              <td>
                <button onClick={() => updateProduct(product.id)}>Update</button>
              </td>
              <td>
                <button onClick={() => deleteProduct(product.id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
}

export default Products;