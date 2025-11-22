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
// import AdminProduct from "./admin/AdminProduct";
import Payment from "./admin/Payment";
import { Toaster } from "react-hot-toast";
import AdminProduct from "./admin/products/AdminProduct";
import ProductForm from "./admin/products/ProductForm";
import Discount from "./admin/discounts/Discount";
import DiscountForm from "./admin/discounts/DiscountForm";
import Review from "./admin/reviews/Review";
import ReviewForm from "./admin/reviews/ReviewForm";
import Support from "./admin/supports/Support";
import Address from "./admin/address/Address";
import User from "./admin/users/User";
import UserForm from "./admin/users/UserForm";
import Order from "./admin/orders/Order";
import AdminDashboard from "./admin/AdminDashboard";
import Category from "./admin/category/Category";
// import OrderForm from "./admin/orders/OrderForm";

function App() {
  const [count, setCount] = useState(0);

  return (
    <BrowserRouter>
      <Toaster position="top-right" reverseOrder={false} />
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
          <Route path="product/create" element={<ProductForm />} />
          <Route path="product/edit/:id" element={<ProductForm />} />
          <Route path="reviews" element={<Review />} />
          <Route path="review/create" element={<ReviewForm />} />
          <Route path="review/edit/:id" element={<ReviewForm />} />
          <Route path="discounts" element={<Discount />} />
          <Route path="discount/create" element={<DiscountForm />} />
          <Route path="discount/edit/:id" element={<DiscountForm />} />
          <Route path="support-ticket" element={<Support />} />
          <Route path="user-address" element={<Address />} />
          {/* this route is for the user */}
          <Route path="users" element={<User />} />
          <Route path="user/create" element={<UserForm />}/>
          <Route path="user/edit/:id" element={<UserForm />}/>
          {/* this route is for orders */}
          <Route path="orders" element={<Order />} />
          {/* <Route path="order/create" element={<OrderForm />}/> */}
          {/* <Route path="order/edit/:id" element={<OrderForm />}/> */}

          {/* this route is for category */}
          <Route path="categories" element={<Category />}/>

          <Route path="payments" element={<Payment />} />
          <Route path="" element={<AdminDashboard />}/>
        </Route>
      </Routes>
      {/* <Footer/> */}
    </BrowserRouter>
  );
}

export default App;
