import { useEffect, useState } from "react";
import { useAuth } from "../context/auth";
import axios from "axios";
import AdCard from "../components/cards/AdCard";
import SearchForm from "../components/forms/SearchForm";

export default function Buy() {
  // context
  const [auth, setAuth] = useAuth();
  // state
  const [ads, setAds] = useState();


  useEffect(() => {
    fetchAds();
  }, []);

  const fetchAds = async () => {
    try {
      const { data } = await axios.get("/ads-for-sell");
      setAds(data);
      
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="bg-slate-900">
      <SearchForm />
      <h1 className="text-4xl bg-blue-600 text-white p-5 text-center shadow-lg hover:bg-blue-800 transition duration-300 ease-in-out">
        For Sell
      </h1>
     
        <div className="row">
          {ads?.map((ad) => (
            <AdCard ad={ad} key={ad._id} />
          ))}
        </div>
      
    </div>
  );
}
