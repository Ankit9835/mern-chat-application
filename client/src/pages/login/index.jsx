import React, { useState } from "react";
import toast from "react-hot-toast";
import { Link } from "react-router-dom";
import { LoginUser } from "../../apicalls/users";

const Login = () => {
  const [user, setUser] = useState({
    email: "",
    password: "",
  });

  const login = async() => {
    try {
      const response = await LoginUser(user)
      if(response.success){
        toast.success(response.message)
        localStorage.setItem('token', response.data)
        window.location.href = '/'
      } else {
        toast.error(response.message)
      }
    } catch (error) { 
      alert(error.message)
    }
  }
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
        <button className="contained-btn" onClick={login}>
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
