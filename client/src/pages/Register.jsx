import { useState } from 'react';
import axios from 'axios';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import OAuth from "../components/OAuth";

export default function Register() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);
      const { data } = await axios.post(`/pre-register`, { email, password });
      if (data?.error) {
        toast.error(data.error)
        setLoading(false);
      } else {
        toast.success("Please Check Your email and click to activate.")
        setLoading(false);
        navigate("/")
      }
    } catch (err) {
      console.log(err);
      toast.error("Something went wrong, please try again")
    }
  }

  return (
    <div>
      <h1 className="text-5xl font-bold bg-blue-600 hover:bg-sky-700 text-white p-4 w-full text-center">Register</h1>

      <div className="container mx-auto">
        <div className="flex justify-center">
          <div className="w-full max-w-md">
            <form onSubmit={handleSubmit} className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
              <input
                type="text"
                placeholder="Enter your email"
                className="form-control mb-4 p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-600 w-full"
                value={email}
                onChange={e => setEmail(e.target.value)}
                required
                autoFocus
              />

              <input
                type="password"
                placeholder="Enter your password"
                className="form-control mb-4 p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-600 w-full"
                value={password}
                onChange={e => setPassword(e.target.value)}
                required
              />

              <button
                type="submit"
                className={`w-full py-3 rounded mb-4 bg-blue-600 text-xl text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-600 ${loading ? "opacity-50 cursor-not-allowed" : ""}`}
                disabled={loading}
              >
                {loading ? "Processing..." : "Register Now"}
              </button>

              <OAuth />
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
