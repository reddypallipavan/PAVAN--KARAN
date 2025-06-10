import './App.css';
import Clock from './components/Clock';
import Home from './components/Home';
import Login from './components/Login';
import Orders from './components/Orders';
import Person from './components/Person';
import Products from './components/Products';
import Signup from './components/Signup';
import Users from './components/Users';
import Welcome from './components/Welcome';
import AddProduct from './components/AddProduct';
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import AddOrder from "./components/AddOrder";
 
function App() {
  return (
    <Router>
      <div>
      {/*  <h2>Welcome to Dashboard</h2>

         Optional: Reuse components here globally */}
        {/* <Welcome /> */}
        {/* <Clock /> */}
        {/* <Person name="peter" age="21" /> */}

        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/home" element={<Home />} />
          <Route path="/users" element={<Users />} />
          <Route path="/products" element={<Products />} />
          <Route path="/products/add" element={<AddProduct />} />
          <Route path="/orders" element={<Orders />} />
          <Route path="/add-order" element={<AddOrder />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;