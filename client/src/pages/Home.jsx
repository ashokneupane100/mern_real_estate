import { useEffect, useState } from "react";
import { useAuth } from "../context/auth";
import axios from "axios";
import AdCard from "../components/cards/AdCard";
import SearchForm from "../components/forms/SearchForm";

export default function Home() {
  // context
  const [auth, setAuth] = useAuth();
  // state
  const [adsForSell, setAdsForSell] = useState();
  const [adsForRent, setAdsForRent] = useState();

  useEffect(() => {
    fetchAds();
  }, []);

  const fetchAds = async () => {
    try {
      const { data } = await axios.get("/ads");
      setAdsForSell(data.adsForSell);
      setAdsForRent(data.adsForRent);
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
          {adsForSell?.map((ad) => (
            <AdCard ad={ad} key={ad._id} />
          ))}
        </div>
     
       <div className="bg-green-950">
      <h1 className="text-4xl bg-purple-900 text-white p-5 text-center shadow-lg hover:bg-purple-700 transition duration-300 ease-in-out">
        For Rent
      </h1>
      
        <div className="row">
          {adsForRent?.map((ad) => (
            <AdCard ad={ad} key={ad._id} />
          ))}
        
      </div>
      </div>
    </div>
  );
}
