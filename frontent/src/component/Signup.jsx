import { useAuth } from "../context/AuthContext";
import { useState } from "react";
import { Button } from "@mui/material";

const Signup = () => {
  const { loading, signup } = useAuth();
  const [message, setMessage] = useState(null);
  const [userName, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSignup = async (e) => {
    e.preventDefault();
    setMessage(null);
    try {
      await signup({ userName, email, password, isAdmin: true });
      setMessage({ type: "success", text: "Signup Successful ✅" });
      setTimeout(() => {
        setMessage(null);
      }, 3000);
      setEmail("");
      setUserName("");
      setPassword("");
    } catch (error) {
      setMessage({
        type: "error",
        text: "Something went wrong ❌",
      });
    }
  };

  return (
    <div className="max-w-md mx-auto  mt-16 p-6 border rounded-lg shadow-lg my-28 bg-white">
      <h2 className="text-2xl font-bold mb-6 text-center">Signup</h2>
      {!loading && message && (
        <p
          className={`mb-4 text-center font-medium ${
            message.type === "success" ? "text-green-600" : "text-red-600"
          }`}
        >
          {message.text}
        </p>
      )}

      <form className="space-y-4" onSubmit={handleSignup}>
        <div>
          <label className="block mb-1 font-medium">Username</label>
          <input
            type="text"
            value={userName}
            onChange={(e) => setUserName(e.target.value)}
            className="w-full border border-gray-300 px-3 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
            required
          />
        </div>
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
            className="w-full border border-gray-300 px-3 mb-5 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
            required
          />
        </div>
        <Button
          type="submit"
          variant="contained"
          color="warning"
          className={`w-full mt-4  ${
            loading && "opacity-40 cursor-not-allowed"
          } `}
          disabled={loading}
        >
          {loading ? "Please wait..." : "Signup"}
        </Button>
      </form>
    </div>
  );
};

export default Signup;
