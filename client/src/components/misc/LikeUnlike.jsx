import { useState, useRef, useEffect } from "react";
import axios from "axios";
import "./LikeAnimation.css";
import popSound from "../../sounds/pop.wav";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/auth";
import { BiSolidLike, BiLike } from "react-icons/bi";
import toast from "react-hot-toast";

export default function LikeUnlike({ ad }) {
  // Hooks
  const navigate = useNavigate();
  // Context
  const [auth, setAuth] = useAuth();
  const [liked, setLiked] = useState(auth?.user?.wishlist.includes(ad?._id));
  const audioRef = useRef(new Audio(popSound));

  useEffect(() => {
    setLiked(auth?.user?.wishlist.includes(ad?._id));
  }, [auth, ad]);

  const playPopSound = () => {
    audioRef.current.play();
  };

  const handleLike = async () => {
    try {
      if (auth.user === null) {
        navigate("/login", {
          state: `/ad/${ad.slug}`,
        });
        return;
      }

      const { data } = await axios.post("/wishlist", { adId: ad._id });
      setAuth({ ...auth, user: data });
      let fromLS = JSON.parse(localStorage.getItem("auth")) || {};
      fromLS.user = data;
      localStorage.setItem("auth", JSON.stringify(fromLS));
      toast.success("Added to wishlist");
      setLiked(true);
      playPopSound();
    } catch (err) {
      console.log(err);
    }
  };

  const handleUnlike = async () => {
    try {
      if (auth.user === null) {
        navigate("/login", {
          state: `/ad/${ad.slug}`,
        });
        return;
      }

      const { data } = await axios.delete(`/wishlist/${ad._id}`);
      setAuth({ ...auth, user: data });
      let fromLS = JSON.parse(localStorage.getItem("auth")) || {};
      fromLS.user = data;
      localStorage.setItem("auth", JSON.stringify(fromLS));
      toast.success("Removed from wishlist");
      setLiked(false);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div>
      {liked ? (
        <span className="like-button liked">
          <BiSolidLike
            className="text-6xl mt-3 cursor-pointer text-blue-600"
            onClick={handleUnlike}
          />
        </span>
      ) : (
        <span className="like-button">
          <BiLike
            className="text-6xl mt-3 cursor-pointer"
            onClick={handleLike}
          />
        </span>
      )}
    </div>
  );
}
