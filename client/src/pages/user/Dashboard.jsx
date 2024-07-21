import { useState, useEffect } from "react";
import Sidebar from "../../components/nav/Sidebar";
import { useAuth } from "../../context/auth";
import axios from "axios";
import UserAdCard from "../../components/cards/UserAdCard";

export default function Dashboard() {
  // context
  const [auth, setAuth] = useAuth();
  // state
  const [ads, setAds] = useState([]);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);

  const seller = auth.user?.role?.includes("Seller");

  useEffect(() => {
    fetchAds();
  }, [auth.token !== ""]);

  useEffect(() => {
    if (page === 1) return;
    fetchAds();
  }, [page]);

  const fetchAds = async () => {
    try {
      const { data } = await axios.get(`/user-ads/${page}`);
      // setAds(data.ads);
      setAds([...ads, ...data.ads]);
      setTotal(data.total);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div>
      <h1 className="text-4xl bg-blue-600 text-white p-5 text-center shadow-lg hover:bg-blue-800 transition duration-300 ease-in-out">
  Dashboard
  </h1>
      <Sidebar />

      {!seller ? (
        <div
          className="d-flex justify-content-center align-items-center vh-100"
          style={{ marginTop: "-10%" }}
        >
          <h2>
            Hey {auth.user?.name ? auth.user?.name : auth.user?.username},
            Welcome to Realist App
          </h2>
        </div>
      ) : (
        <div className="bg-slate-900">
          <div className="row">
            <div className="col-lg-8 offset-lg-2 mt-4 mb-4">
              <p className="text-center text-white">Total {total} ads found</p>
            </div>
          </div>

          <div className="row">
            {ads?.map((ad) => (
              <UserAdCard ad={ad} key={ad._id} />
            ))}
          </div>

          {ads?.length < total ? (
  <div className="row">
    <div className="col text-center mt-4 mb-4">
      <button
        disabled={loading}
        className="btn btn-info col-8 rounded py-2.5 text-xl relative overflow-hidden"
        onClick={(e) => {
          e.preventDefault();
          setPage(page + 1);
        }}
      >
        {loading ? (
          "Loading..."
        ) : (
          <>
            Showing {ads?.length} / {total} ads, click to load more ...
            <span className="absolute top-0 left-0 w-full h-full bg-gradient-to-r from-blue-500 via-blue-600 to-blue-500 opacity-20 transform rotate-45"></span>
          </>
        )}
      </button>
    </div>
  </div>
) : (
  ""
)}

        </div>
      )}
    </div>
  );
}