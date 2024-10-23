import React, { useState } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify"; 
import "react-toastify/dist/ReactToastify.css"; 
import registrationImage from "../assets/img.avif"; 

const RegisterPage = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({
    username: "",
    email: "",
    password: "",
  });

  const handleRegister = async (e) => {
    e.preventDefault();

   
    setErrors({ username: "", email: "", password: "" });

    let hasError = false;

    
    if (!username) {
      setErrors((prev) => ({ ...prev, username: "Username is required." }));
      hasError = true;
    }
    if (!email) {
      setErrors((prev) => ({ ...prev, email: "Email is required." }));
      hasError = true;
    }
    if (!password) {
      setErrors((prev) => ({ ...prev, password: "Password is required." }));
      hasError = true;
    }

    if (hasError) return; 

    try {
      await axios.post("http://localhost:5000/api/register", {
        username,
        email,
        password,
      });
      toast.success("User registered successfully!"); 
     
      setUsername("");
      setEmail("");
      setPassword("");
    } catch (error) {
      console.error("Registration failed", error);
      toast.error("Registration failed. Please try again."); 
    }
  };

  return (
    <div className="flex min-h-screen">
      
      <div
        className="hidden md:flex w-1/2 bg-cover bg-center"
        style={{ backgroundImage: `url(${registrationImage})` }}
      >
        <div className="flex flex-col items-center justify-center w-full h-full bg-black bg-opacity-50 text-center p-6">
          <h1 className="text-white text-4xl font-bold leading-tight">
            Join Us Today
          </h1>
          <h2 className="mt-4 text-2xl font-semibold text-white sm:text-3xl md:text-4xl">
            Welcome to User 🦑
          </h2>
          <p className="mt-4 leading-relaxed text-white opacity-90">
            Lorem, ipsum dolor sit amet consectetur adipisicing elit. Eligendi
            nam dolorum aliquam, quibusdam aperiam voluptatum.
          </p>
          <div className="mt-6 flex justify-center">
            <button className="bg-blue-500 text-white font-semibold py-2 px-6 rounded-md hover:bg-blue-600 transition duration-200">
              Get Started
            </button>
          </div>
        </div>
      </div>

      
      <div className="flex items-center justify-center w-full md:w-1/2 p-8 bg-gray-100">
        <div className="w-full max-w-md p-8 space-y-6 bg-white rounded-lg shadow-md">
          <h2 className="text-2xl font-semibold text-center">Register</h2>
          <form onSubmit={handleRegister} className="space-y-4">
            <div>
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Username"
                className={`w-full p-3 border ${
                  errors.username ? "border-red-500" : "border-gray-300"
                } rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500`}
              />
              {errors.username && (
                <p className="text-red-500 text-sm">{errors.username}</p>
              )}
            </div>
            <div>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Email"
                className={`w-full p-3 border ${
                  errors.email ? "border-red-500" : "border-gray-300"
                } rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500`}
              />
              {errors.email && (
                <p className="text-red-500 text-sm">{errors.email}</p>
              )}
            </div>
            <div>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Password"
                className={`w-full p-3 border ${
                  errors.password ? "border-red-500" : "border-gray-300"
                } rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500`}
              />
              {errors.password && (
                <p className="text-red-500 text-sm">{errors.password}</p>
              )}
            </div>
            <button
              type="submit"
              className="w-full p-3 text-white bg-blue-600 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
            >
              Register
            </button>
          </form>
          <p className="text-sm text-center">
            Already have an account?{" "}
            <a href="/login" className="text-blue-600 hover:underline">
              Login
            </a>
          </p>
        </div>
      </div>
      <ToastContainer /> 
    </div>
  );
};

export default RegisterPage;
