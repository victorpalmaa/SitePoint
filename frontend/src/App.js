import React from "react";
import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import LandingPage from "./components/LandingPage";
import ProductsPage from "./components/ProductsPage";
import ProductDetailPage from "./components/ProductDetailPage";
import { Toaster } from "./components/ui/toaster";
import { CartProvider } from "./context/CartContext";
import CartSidebar from "./components/CartSidebar";

function App() {
  return (
    <CartProvider>
      <div className="App">
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/products" element={<ProductsPage />} />
            <Route path="/product/:id" element={<ProductDetailPage />} />
          </Routes>
        </BrowserRouter>
        <CartSidebar />
        <Toaster />
      </div>
    </CartProvider>
  );
}

export default App;