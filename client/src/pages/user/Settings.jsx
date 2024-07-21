import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Sidebar from "../../components/nav/Sidebar";
import axios from "axios";
import toast from "react-hot-toast";

export default function Settings() {
  // state
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  // hook
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);
      const { data } = await axios.put("/update-password", { // Add slash to the API endpoint
        password,
      });
      if (data?.error) {
        toast.error(data.error);
      } else {
        navigate("/dashboard");
        toast.success("Password Updated !");
      }
    } catch (err) {
      console.error(err);
      toast.error("An error occurred while updating password.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <h1 className="text-4xl bg-blue-600 text-white p-5 text-center hover:bg-blue-800">
        Settings
      </h1>
      <div className="container mx-auto px-4 py-6">
        <Sidebar />
        <div className="flex flex-col mt-14">
          <div className="w-full md:w-2/3 lg:w-1/2 mx-auto">
            <form onSubmit={handleSubmit} className="space-y-6 mb-10">
              <input
                type="password"
                placeholder="Enter Your Password"
                className="w-full text-lg p-2 rounded border border-gray-300 focus:border-blue-500 focus:ring-blue-200"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />

              <button
                type="submit" // Add type submit to trigger form submission
                className={`bg-blue-600 text-xl hover:bg-blue-800 text-white py-3 px-4 rounded w-full ${
                  loading ? "opacity-30 cursor-not-allowed" : ""
                }`}
                disabled={loading}
              >
                {loading ? "Processing" : "Update Password"}
              </button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}
