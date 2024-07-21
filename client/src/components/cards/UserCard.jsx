import { useEffect, useState } from "react";
import { Badge } from "antd";
import { Link } from "react-router-dom";
import Logo from "../../../src/logo192.png";
import dayjs from "dayjs";
import axios from "axios";
import relativeTime from "dayjs/plugin/relativeTime";

dayjs.extend(relativeTime);

export default function UserCard({ user }) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (user?._id) fetchAdCount();
  }, [user._id]);

  const fetchAdCount = async () => {
    try {
      const { data } = await axios.get(`/agent-ad-count/${user._id}`);
      setCount(data.length);
    } catch (err) {
      console.error(err);
    }
  };

  const imgSrc = user?.avatar || user?.photo?.Location || Logo;

  return (
    <div className="col-lg-4 p-4">
      <Link to={`/agent/${user.username}`} className="flex flex-col items-center">
        <div className="card hover:shadow-lg p-6 rounded-md relative transform transition-transform duration-500 ease-in-out hover:scale-105">
          {imgSrc && (
            <img
              src={imgSrc}
              alt={user.username}
              className="w-32 h-32 rounded-full object-cover mx-auto mb-4"
            />
          )}
          <div className="text-center">
            <h3 className="text-xl font-semibold">{user?.name || user?.username}</h3>
            <p className="text-sm text-gray-500">
              Joined {dayjs(user.createdAt).fromNow()}
            </p>
          </div>
          {/* Position the Badge.Ribbon at the top right of the card */}
          <div className="absolute top-0 right-0">
            <Badge.Ribbon
              text={count > 1 ? `${count} Listings` : count === 1 ? "1 Listing" : "No Listings"}
              color="darkblue"
            />
          </div>
        </div>
      </Link>
    </div>
  );
}
