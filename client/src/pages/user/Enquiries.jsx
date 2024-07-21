import { useState, useEffect } from "react";
import Sidebar from "../../components/nav/Sidebar";
import { useAuth } from "../../context/auth";
import axios from "axios";
import AdCard from "../../components/cards/AdCard";

export default function Enquiries() {
  // context
  const [auth, setAuth] = useAuth();
  // state
  const [ads, setAds] = useState([]);
  const [loading, setLoading] = useState(false);


  useEffect(() => {
    fetchAds();
  }, [auth.token !== ""]);


  const fetchAds = async () => {
    try {
      const { data } = await axios.get(`/enquiried-properties`);
      // setAds(data.ads);
      setAds(data);
      
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div>
     <h1 className="text-4xl bg-blue-600 text-white p-5 text-center shadow-lg hover:bg-blue-800 transition duration-300 ease-in-out">
      Enquired Properties
  </h1>
      <Sidebar />

      {!ads.length ? (
        <div
          className="d-flex justify-content-center align-items-center vh-100"
          style={{ marginTop: "-10%" }}
        >
          <h2>
            Hey {auth.user?.name ? auth.user?.name : auth.user?.username},
            You have not enquired to any properties yet.
          </h2>
        </div>
      ) : (
        <div className="bg-slate-900">
          <div className="row">
            <div className="col-lg-8 offset-lg-2 mt-4 mb-4">
              <p className="text-center text-white">You have enquired {ads?.length} properties</p>
            </div>
          </div>

          <div className="row">
            {ads?.map((ad) => (
              <AdCard ad={ad} key={ad._id} />
            ))}
          </div>

        </div>
      )}
    </div>
  );
}