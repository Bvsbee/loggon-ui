import { BrowserRouter, Route, Routes } from "react-router";
import Login from "./screens/Login.tsx";
import Signup from "./screens/Signup.tsx";
import AuthLayout from "./components/layout/AuthLayout.tsx";
import "./App.css";

import AppLayout from "./components/layout/Layout.tsx";
import Home from "./screens/Home.tsx";
import AdminLayout from "./admin/layout/AdminLayout.tsx";
import AdminDashboard from "./admin/AdminDashboard.tsx";
import Products from "./screens/Products.tsx";
import Checkout from "./screens/Checkout.tsx";
import Cart from "./screens/Cart.tsx";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<AppLayout />}>
          <Route path="/" element={<Home />}></Route>
          <Route path="/products" element={<Products />} />{" "}
        </Route>

        <Route element={<AuthLayout />}>
          <Route path="/signup" element={<Signup />}></Route>
          <Route path="/login" element={<Login />}></Route>
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/cart" element={<Cart />} />
        </Route>

        <Route element={<AdminLayout />}>
          <Route path="/admin" element={<AdminDashboard />}></Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
