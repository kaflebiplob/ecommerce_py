import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import {BrowserRouter, Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import Product from './pages/Product'
import ProductDetail from './pages/ProductDetail'
import Login from './pages/Login'
import Register from './pages/Register'
import Wishlist from './pages/Wishlist'
import Cart from './pages/Cart'

function App() {
  const [count, setCount] = useState(0)

  return (
  <BrowserRouter>
  <Navbar/>
    <Routes>
      <Route path="/" element={<Home/>} />
      <Route path="/products" element={<Product/>} />
      <Route path='/product/:id' element={<ProductDetail/>} />
      <Route path = "/login" element={<Login />} />
      <Route path='/register' element={<Register />} />
      <Route path='/wishlist' element={<Wishlist />} />
      <Route path='/cart' element={<Cart  />} />
    </Routes>
    <Footer/>
  </BrowserRouter>
  )
}

export default App
