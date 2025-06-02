import React, { useState } from "react";
import { Link } from "react-router-dom";
import { RegisterUser } from "../../apicalls/users";
import toast from "react-hot-toast";

const Register = () => {
  const [user, setUser] = useState({
    name: "",
    email: "",
    password: "",
  });

  const register = async () => {
    try {
      const response = await RegisterUser(user)
      if(response.success){
        toast.success(response.message)
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
        <h1 className="text-2xl uppercase">Register</h1>
        <input
          type="text"
          value={user.name}
          onChange={(e) => setUser({ ...user, name: e.target.value })}
          placeholder="Enter your name"
        />
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
        <button className="contained-btn" onClick={register}>
            Register
        </button>

         <Link to="/login" className="underline">
          Login Here
        </Link>
      </div>
    </div>
  );
};

export default Register;
