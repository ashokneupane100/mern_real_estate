import React from "react";
import { GoogleAuthProvider, getAuth, signInWithPopup } from "firebase/auth";
import { app } from "../firebase";
import { useAuth } from "../context/auth";
import axios from "axios";
import { useNavigate, useLocation } from "react-router-dom";
import useRefreshToken from "./useRefreshToken"; // Import the custom hook

export default function OAuth() {
  const [auth, setAuth] = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const refreshAccessToken = useRefreshToken(); // Use the custom hook

  const handleGoogleClick = async () => {
    try {
      const provider = new GoogleAuthProvider();
      const firebaseAuth = getAuth(app);

      const result = await signInWithPopup(firebaseAuth, provider);

      const { data } = await axios.post("/google", {
        name: result.user.displayName,
        email: result.user.email,
        photo: result.user.photoURL,
      });

      setAuth(data);
      navigate(location.state?.from || "/dashboard");
      localStorage.setItem("auth", JSON.stringify(data));
      localStorage.setItem("refreshToken", data.refresh_token);

      // Optionally call refreshAccessToken if needed
      // await refreshAccessToken();
    } catch (error) {
      console.log("Could not sign in with Google:", error);
    }
  };

  return (
    <button
      onClick={handleGoogleClick}
      type="button"
      className="w-full text-xl bg-red-700 text-white p-3 rounded-lg uppercase hover:opacity-85"
    >
      Login with Google
    </button>
  );
}
