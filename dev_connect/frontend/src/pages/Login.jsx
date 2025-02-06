import React, { useState } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import { addUser } from "../store/userSlice";
import { useNavigate } from "react-router-dom";
import { BASE_URL } from "../utils/constants";
import toast from "react-hot-toast";

const Login = () => {
  const [emailId, setEmailId] = useState("mrinal12@email.com");
  const [password, setPassword] = useState("Mrinal123@");
  const [error, setError] = useState("");
  const navigate = useNavigate();
  // Add data to redux store by dispatching an action
  const dispatch = useDispatch();

  const handleLogin = async () => {
    try {
      const res = await axios.post(
        BASE_URL + "/login",
        {
          emailId,
          password,
        },
        {
          withCredentials: true,
        }
      );
      // console.log(res.data.user);
      dispatch(addUser(res?.data?.user));
      toast.success("Login Successfull 🎉");
      navigate("/");
    } catch (error) {
      toast.error(error?.response?.data + "❌");
      setError(error?.response?.data || "Something went wrong !");
    }
  };

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

export default Login;
