import { useState } from 'react';
import axios from 'axios';
import toast from 'react-hot-toast';
import { useNavigate, Link,useLocation } from 'react-router-dom';
import { useAuth } from '../context/auth';
import OAuth from "../components/OAuth";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [auth, setAuth] = useAuth();
  const location=useLocation();

  // hooks
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);
      const { data } = await axios.post(`/login`, { email, password });
      if (data?.error) {
        toast.error(data.error)
        setLoading(false);
      } else {
        setAuth(data);
        localStorage.setItem("auth", JSON.stringify(data))

        toast.success("You have been logged in. BUY or SELL.");
        setLoading(false);
       location?.state !==null ? navigate(location.state):navigate("/dashboard")
      }

    } catch (err) {
      console.log(err);
      toast.error("Something went wrong, please try again.")
    }
  }

  return (
    <div>
      <h1 className="text-5xl font-bold bg-blue-600 hover:bg-sky-900 text-white p-4 w-full text-center">Login</h1>

      <div className="container mx-auto">
        <div className="flex justify-center">
          <div className="w-full max-w-md">
            <form onSubmit={handleSubmit} className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
              <input
                type="email"
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
                className={`w-full py-3 rounded mb-3 bg-blue-600 text-xl text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-600 ${loading ? "opacity-50 cursor-not-allowed" : ""}`}
                disabled={loading}
              >
                {loading ? "Processing..." : "Login Now"}
              </button>
              
              <div className="text-center">
                <Link to="/auth/forgot-password" className="text-red-600 text-sm hover:text-red-700">
                  Forgot Password?
                </Link>
              </div>
              
              <div className="mt-3">
                <OAuth />
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
