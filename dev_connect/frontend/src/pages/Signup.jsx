import React, { useState } from "react";

const Signup = () => {
  const [emailId, setEmailId] = useState("mrinal12@email.com");
  const [password, setPassword] = useState("Mrinal123@");
  const [error, setError] = useState("");

  const  handleLogin = () =>{
    

  }
  return (
    <div className=" flex justify-center items-center  min-h-screen bg-base-100">
      <div className="card bg-base-300 w-96 shadow-xl ">
        <div className="card-body">
          <h2 className="card-title justify-center text-2xl">Login</h2>
          <div>
            <label className="form-control w-full max-w-xs my-2">
              <div className="label">
                <span className="label-text">Email ID</span>
              </div>
              <input
                type="text"
                value={emailId}
                onChange={(e) => setEmailId(e.target.value)}
                placeholder="Type here"
                className="input input-bordered w-full max-w-xs"
                required
              />
            </label>
            <label className="form-control w-full max-w-xs my-2">
              <div className="label">
                <span className="label-text">Password</span>
              </div>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Type here"
                className="input input-bordered w-full max-w-xs"
                required
              />
            </label>
          </div>
          <p className="text-red-500">{error}</p>
          <div className="card-actions justify-center m-2 ">
            <button className="btn btn-primary px-4" onClick={handleLogin}>
              Login
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signup;
