import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Product from "./pages/Product";
import ProductDetail from "./pages/ProductDetail";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Wishlist from "./pages/Wishlist";
import Cart from "./pages/Cart";
import Checkout from "./pages/Checkout";
import OrderSuccess from "./pages/OrderSuccess";
import OrderFailure from "./pages/OrderFailure";
import AdminLayout from "./admin/AdminLayout";
import AdminProduct from "./admin/AdminProduct";
import AdminOrder from "./admin/AdminOrder";
import Review from "./admin/Review";
import Discount from "./admin/Discount";
import Payment from "./admin/Payment";

function App() {
  const [count, setCount] = useState(0);

  return (
    <BrowserRouter>
      {/* <Navbar/> */}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/products" element={<Product />} />
        <Route path="/product/:id" element={<ProductDetail />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/wishlist" element={<Wishlist />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/checkout" element={<Checkout />} />
        <Route path="/order-success" element={<OrderSuccess />} />
        <Route path="/order-failure" element={<OrderFailure />} />
        <Route path="/admin" element={<AdminLayout />}>
          <Route path="products" element={<AdminProduct />} />
          <Route path="orders" element={<AdminOrder />} />
          <Route path="reviews" element={<Review />} />
          <Route path="discounts" element={<Discount />} />
          <Route path="payments" element={<Payment />} />
        </Route>
      </Routes>
      {/* <Footer/> */}
    </BrowserRouter>
  );
}

export default App;
