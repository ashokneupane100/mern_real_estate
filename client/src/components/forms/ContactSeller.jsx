import React, { useState, useEffect, useRef } from "react";
import { useAuth } from "../../context/auth";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import axios from "axios";

export default function ContactSeller({ ad }) {
  const [auth] = useAuth();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [phone, setPhone] = useState("");
  const textareaRef = useRef(null);
  const navigate = useNavigate();
  const loggedIn = auth.user !== null && auth.token !== "";

  useEffect(() => {
    // textareaRef.current.focus();
    textareaRef.current.style.fontSize = "1.3rem";
    textareaRef.current.style.color = "blue"; // Corrected property name

    if (loggedIn) {
      setName(auth.user.name);
      setEmail(auth.user.email);
      setPhone(auth.user.phone);
      setMessage("");
    }
  }, [ad, loggedIn, auth.user]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);

      console.log("Sending request to contact seller...");

      const { data } = await axios.post("/contact-seller", {
        name,
        email,
        phone,
        message,
        adId: ad._id,
      });

      console.log("Response received from contact seller:", data);

      if (data?.error) {
        toast.error(data.error);
        setLoading(false);
      } else {
        toast.success("Email has been sent to the Seller.");
        setMessage("");
        setLoading(false);
      }
    } catch (err) {
      console.error("Error while contacting seller:", err);
      toast.error("An error occurred. Please try again.");
      setLoading(false);
    } 
  };

  return (
    <div className="flex flex-col items-center mt-8">
      <div className="w-full max-w-lg p-4 bg-white rounded-lg shadow-lg">
        <h3 className="text-1.3xl font-semibold mb-4 text-center">
          Contact Seller: {ad?.postedBy?.name ?? ad?.postedBy?.username}
        </h3>

        <form onSubmit={handleSubmit} className="space-y-4">
          <textarea
            ref={textareaRef}
            name="message"
            cols="100"
            rows="5"
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Your message to the seller should be here"
          />

          <input
            type="text"
            key="name"
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
            placeholder="Enter Your Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            disabled={!loggedIn}
          />

          <input
            type="email"
            key="email"
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
            value={email}
            placeholder="Your Email Address"
            onChange={(e) => setEmail(e.target.value)}
            disabled={!loggedIn}
          />

          <input
            type="tel"
            key="phone"
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
            placeholder="Input your phone"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            disabled={!loggedIn}
          />
          <button
            type="submit"
            className={`w-full p-3 mt-4 text-2xl text-white rounded-lg ${
              loading
                ? "bg-gray-500 cursor-not-allowed"
                : "bg-blue-600 hover:bg-blue-800"
            }`}
            disabled={loading}
          >
            {loading ? "Please wait..." : "Send Enquiry"}
          </button>
        </form>

        {!loggedIn && (
          <button
            className="w-full p-3 mt-4 text-white text-2xl bg-blue-600 rounded-lg hover:bg-blue-800"
            onClick={() => navigate("/login", { state: `/ad/${ad.slug}` })}
          >
            At First Login Here to send enquiry
          </button>
        )}
      </div>
    </div>
  );
}
