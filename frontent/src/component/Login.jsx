import React, { useState } from "react";
import { Button } from "@mui/material";
import { useAuth } from "../context/AuthContext";

const Login = () => {
  const { login, loading, user } = useAuth(); // ✅ global loading
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState(null);
  const [isSubmit, setIsSubmit] = useState(false);

  // console.log(loading);
  // console.log(user);

  const handleLogin = async (e) => {
    e.preventDefault();
    setMessage(null);
    setIsSubmit(true);
    try {
      await login(email, password);
      setMessage({ type: "success", text: "Login Successful ✅" });
      setTimeout(() => {
        setMessage(null);
      }, 3000);
      setEmail("");

      setPassword("");
    } catch (err) {
      setMessage({ type: "error", text: "Something went wrong ❌" });
    } finally {
      setIsSubmit(false);
    }
  };

  return (
    <div className="max-w-md mx-auto mt-16 p-6 border rounded-lg my-28 shadow-lg bg-white">
      <h2 className="text-2xl font-bold mb-6 text-center">Login</h2>

      {!loading && message && (
        <p
          className={`mb-4 text-center font-medium ${
            message.type === "success" ? "text-green-600" : "text-red-600"
          }`}
        >
          {message.text}
        </p>
      )}

      <form className="space-y-4" onSubmit={handleLogin}>
        <div>
          <label className="block mb-1 font-medium">Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full border border-gray-300 px-3 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
            required
          />
        </div>

        <div>
          <label className="block mb-1 font-medium">Password</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full border border-gray-300 px-3 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
            required
          />
        </div>

        <Button
          type="submit"
          variant="contained"
          color="warning"
          disabled={isSubmit}
          className={`w-full mt-4  ${
            loading && "opacity-40 cursor-not-allowed"
          } `}
        >
          {loading ? "Please wait..." : "Login"}
        </Button>
      </form>
    </div>
  );
};

export default Login;
