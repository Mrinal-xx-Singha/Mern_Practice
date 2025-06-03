import React from "react";

const Home = () => {
  return <div>
    Home Page
    <button
    onClick={()=> {localStorage.removeItem("isAuthenticated")
        window.location.href="/"
    }}

    className="mt-4 px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
    >
        Logout
    </button>
  </div>;
};

export default Home;
