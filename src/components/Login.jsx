import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify"; 
import 'react-toastify/dist/ReactToastify.css';

const Login = () => {
  const [username, setUsername] = useState("");
  const [otp, setOtp] = useState("1234");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post("https://assignment.stage.crafto.app/login", {
        username,
        otp,
      });
      
  
      localStorage.setItem("token", response.data.token);

     
      toast.success("Login successful!"); 
      navigate("/create-quote");

    } catch (error) {
      console.error("Login failed", error);
      toast.error("Login failed. Please check your credentials."); 
    }
  };

  return (
    <div className="min-h-screen flex justify-center items-center bg-gradient-to-r from-gray-900 via-black to-gray-800">
      <ToastContainer /> 
      <form
        onSubmit={handleLogin}
        className="w-full max-w-md bg-gray-800 p-8 rounded-3xl shadow-lg"
      >
        <h2 className="text-center text-3xl font-bold mb-8 text-gray-100">
          Welcome Back!
        </h2>
        <div className="space-y-6">
          <input
            className="w-full p-4 text-lg bg-gray-700 text-gray-200 border border-gray-600 rounded-xl focus:outline-none focus:ring-4 focus:ring-purple-500"
            type="text"
            placeholder="Enter your username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <input
            className="w-full p-4 text-lg bg-gray-700 text-gray-200 border border-gray-600 rounded-xl focus:outline-none focus:ring-4 focus:ring-purple-500"
            type="password"
            placeholder="Enter OTP"
            value={otp}
            onChange={(e) => setOtp(e.target.value)}
          />
          <button className="w-full bg-gradient-to-r from-purple-500 to-indigo-600 text-white py-3 rounded-xl hover:opacity-90 transition duration-300 transform hover:scale-105">
            Sign In
          </button>
        </div>
        <p className="text-center mt-6 text-gray-400">
          Don't have an account? <a href="#" className="text-purple-500">Sign Up</a>
        </p>
      </form>
    </div>
  );
};

export default Login;
