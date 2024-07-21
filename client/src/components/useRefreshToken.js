import { useAuth } from "../context/auth";
import axios from "axios";

const useRefreshToken = () => {
  const [auth, setAuth] = useAuth();

  const refreshAccessToken = async () => {
    try {
      const { data } = await axios.post("/refresh-token", {
        refresh_token: localStorage.getItem("refreshToken"),
      });

      setAuth((prevAuth) => ({
        ...prevAuth,
        token: data.access_token,
      }));

      localStorage.setItem("auth", JSON.stringify({ ...auth, token: data.access_token }));
    } catch (error) {
      console.log("Error refreshing access token:", error);
    }
  };

  return refreshAccessToken;
};

export default useRefreshToken;
