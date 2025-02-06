import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";

import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Body from "./components/Body";
import Feed from "./components/Feed";
import  { Toaster } from 'react-hot-toast';

const App = () => {
  return (
    <>
      <div data-theme="forest" className="w-full h-screen">
        <BrowserRouter basename="/">
          <Routes>
            <Route path="/" element={<Body />}>
              <Route path="/" element={<Feed />} />
              <Route path="/login" element={<Login />} />
              <Route path="/signup" element={<Signup />} />
            </Route>
          </Routes>
        </BrowserRouter>
        <Toaster />
      </div>
    </>
  );
};

export default App;
