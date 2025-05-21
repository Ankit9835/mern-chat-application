import React, { useState } from "react";
import { Link } from "react-router-dom";

const Login = () => {
  const [user, setUser] = useState({
    email: "",
    password: "",
  });
  return (
    <div className="h-screen bg-primary flex items-center justify-center">
      <div className="bg-white shadow-md flex flex-col w-96 gap-5 p-5">
        <h1 className="text-2xl uppercase">Login</h1>
        <input
          type="email"
          value={user.email}
          onChange={(e) => setUser({ ...user, email: e.target.value })}
          placeholder="Enter your email"
        />
        <input
          type="password"
          value={user.password}
          onChange={(e) => setUser({ ...user, password: e.target.value })}
          placeholder="Enter your password"
        />
        <button className="contained-btn">
            Login
        </button>

         <Link to="/register" className="underline">
          Don't have an account? Register
        </Link>
      </div>
    </div>
  );
};

export default Login;
