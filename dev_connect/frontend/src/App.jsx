import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";

import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Body from "./components/Body";
import Feed from "./components/Feed";
import Profile from "./pages/Profile";
import Request from "./components/Request";
import Connections from "./components/Connections";

import { Toaster } from "react-hot-toast";

const App = () => {
  return (
    <>
      <div data-theme="forest" className="w-full h-screen">
        <BrowserRouter basename="/">
          <Routes>
            <Route path="/" element={<Body />}>
              <Route path="/" element={<Feed />} />
              <Route path="/profile" element={<Profile />} />
              <Route path="/login" element={<Login />} />
              <Route path="/connections" element={<Connections />} />
              <Route path="/requests" element={<Request />} />

              <Route path="/requests" element={<Login />} />
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
