import React from "react";
import Header from "./components/Header";

import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import CreatePage from "./pages/CreatePage";
import UpdateProduct from "./pages/UpdateProduct";
import WishList from "./pages/WishList"
import Cart from "./pages/Cart";

const App = () => {
  return (
    <div className="min-h-screen bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200">
      <Header />
      <main className="container mx-auto">
        <Routes>
          <Route path="/" element={<Home />} />
          {/* <Route path="/cart" element={<Cart />}/> */}
          <Route path="/wishlist" element={<WishList />}/>
          <Route path="/create" element={<CreatePage />} />
          <Route path="/update/:id" element={<UpdateProduct />} />
          <Route path="/cart" element={<Cart />}/>
        </Routes>
      </main>
    </div>
  );
};

export default App;
