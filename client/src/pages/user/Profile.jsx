import { useState, useEffect } from "react";
import { useAuth } from "../../context/auth";
import { useNavigate } from "react-router-dom";
import slugify from "slugify";
import Sidebar from "../../components/nav/Sidebar";
import ProfileUpload from "../../components/forms/ProfileUpload";
import axios from "axios";
import toast from "react-hot-toast";

export default function Profile() {
  // context
  const [auth, setAuth] = useAuth();

  // state
  const [username, setUsername] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [company, setCompany] = useState("");
  const [address, setAddress] = useState("");
  const [phone, setPhone] = useState("");
  const [about, setAbout] = useState("");
  const [loading, setLoading] = useState(false);
  const [photo, setPhoto] = useState(false);
  const [uploading, setUploading] = useState(false);

  // hook
  const navigate = useNavigate();

  useEffect(() => {
    if (auth.user) {
      setUsername(auth.user?.username);
      setName(auth.user?.name);
      setEmail(auth.user?.email);
      setCompany(auth.user?.company);
      setAddress(auth.user?.address);
      setPhone(auth.user?.phone);
      setAbout(auth.user?.about);
    }
  }, [auth]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);
      const { data } = await axios.put("update-profile", {
        username,
        name,
        email,
        company,
        address,
        phone,
        about,
        photo,
      });
      if (data?.error) {
        toast.error(data.error);
        setLoading(false);
      } else {
        console.log("update Profile response:=>", data);
        setAuth({ ...auth, user: data });

        let fromLS = JSON.parse(localStorage.getItem("auth"));

        localStorage.setItem("auth", JSON.stringify(fromLS));
        toast.success("Profile Upadated Successfully !");
        navigate("/dashboard")
        setLoading(false);
      }
    } catch (err) {
      console.error(err);
      setLoading(false);
    }
  };

  return (
    <>
      <h1 className="text-4xl bg-blue-600 text-white p-5 text-center hover:bg-blue-800">
        Profile
      </h1>
      <div className="container mx-auto px-4 py-6">
        <Sidebar />
        <div className="flex flex-col mt-3">
          <div className="w-full md:w-2/3 lg:w-1/2 mx-auto">
            <ProfileUpload
              photo={photo}
              setPhoto={setPhoto}
              uploading={uploading}
              setUploading={setUploading}
            />

            <form onSubmit={handleSubmit} className="space-y-6 mb-10">
              <input
                type="text"
                placeholder="Update your username"
                className="w-full text-lg p-2 rounded border border-gray-300 focus:border-blue-500 focus:ring-blue-200"
                value={username}
                onChange={(e) =>
                  setUsername(slugify(e.target.value.toLowerCase()))
                }
                autoFocus
              />
              <input
                type="text"
                placeholder="Update your name"
                className="w-full text-lg p-2 rounded border border-gray-300 focus:border-blue-500 focus:ring-blue-200"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
              <input
                type="text"
                placeholder="Update your email"
                className="w-full text-lg p-2 rounded border border-gray-300 focus:border-blue-500 focus:ring-blue-200"
                value={email}
                disabled
              />
              <input
                type="text"
                placeholder="Update your phone"
                className="w-full text-lg p-2 rounded border border-gray-300 focus:border-blue-500 focus:ring-blue-200"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
              />
              <input
                type="text"
                placeholder="Update your address"
                className="w-full text-lg p-2 rounded border border-gray-300 focus:border-blue-500 focus:ring-blue-200"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
              />
              <textarea
                name="about"
                id="about"
                value={about}
                className="w-full text-lg p-2 rounded border border-gray-300 focus:border-blue-500 focus:ring-blue-200 h-32 resize-none"
                placeholder="Enter your details here please..."
                onChange={(e) => setAbout(e.target.value)}
                maxLength={400}
              ></textarea>
              <button
                className={`bg-blue-600 text-xl hover:bg-blue-800 text-white py-3 px-4 rounded w-full ${
                  loading ? "bg-red-600 opacity-50 cursor-not-allowed" : ""
                }`}
                disabled={loading}
              >
                {loading ? "Processing" : "Submit"}
              </button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}
