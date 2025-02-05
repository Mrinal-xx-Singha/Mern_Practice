import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";

import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Body from "./components/Body";
const App = () => {
  return (
    <>
      <div data-theme="forest" className="w-full h-screen">
        <BrowserRouter basename="/">
          <Routes>
            <Route path="/" element={<Body />}>
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </div>
    </>
  );
};

export default App;
