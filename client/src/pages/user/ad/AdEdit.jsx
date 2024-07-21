import React, { useState, useEffect } from "react";
import GooglePlacesAutocomplete from "react-google-places-autocomplete";
import { GOOGLE_PLACES_KEY } from "../../../config";
import CurrencyInput from "react-currency-input-field";
import ImageUpload from "../../../components/forms/ImageUpload";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import toast from "react-hot-toast";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import Sidebar from "../../../components/nav/Sidebar";

export default function AdEdit({ action, type }) {
  const [ad, setAd] = useState({
    _id: "",
    photos: [],
    uploading: false,
    price: "",
    address: "",
    bedrooms: "",
    bathrooms: "",
    carpark: "",
    landsize: "",
    title: "",
    description: "",
    loading: false,
    action,
    type,
  });
  const [loaded, setLoaded] = useState(false);

  const navigate = useNavigate();
  const params = useParams();

  useEffect(() => {
    if (params?.slug) {
      fetchAd();
    }
  }, [params?.slug]);

  const fetchAd = async () => {
    try {
      const { data } = await axios.get(`/ad/${params.slug}`);
      setAd(data?.ad);
      setLoaded(true);
    } catch (err) {
      console.log(err);
    }
  };

  const handleChange = ({ value }) => {
    if (!value || !value.description) {
      console.warn("Address data not available in response.");
      return;
    }

    const addressWithoutCountry = value.description.replace(
      /(,\s*)?Nepal\b/i,
      ""
    );
    setAd({ ...ad, address: addressWithoutCountry });
  };

  const handleClick = async () => {
    try {
      if (!ad.photos?.length) {
        toast.error("Photo is required");
        return;
      } else if (!ad.price) {
        toast.error("Price is required");
        return;
      } else if (!ad.description) {
        toast.error("Description is required");
        return;
      } else {
        setAd({ ...ad, loading: true });

        const { data } = await axios.put(`/ad/${ad._id}`, ad);
        if (data?.error) {
          toast.error(data.error);
        } else {
          toast.success("Ad updated successfully");
          navigate("/dashboard");
        }
      }
    } catch (err) {
      console.log(err);
    } finally {
      setAd({ ...ad, loading: false });
    }
  };

  const handleDelete = async () => {
    try {
      setAd({ ...ad, loading: true });

      const { data } = await axios.delete(`/ad/${ad._id}`);
      if (data?.error) {
        toast.error(data.error);
      } else {
        toast.success("Ad deleted successfully");
        setAd({ ...ad, loading: false });
        navigate("/dashboard");
      }
    } catch (err) {
      console.log(err);
      setAd({ ...ad, loading: false });
    }
  };

  if (!loaded) {
    return (
      <div className="bg-green-300 flex items-center justify-center h-screen text-5xl">
        Loading...
      </div>
    );
  }

  return (
    <div>
      <h1 className="text-4xl bg-blue-600 text-white p-5 text-center shadow-lg hover:bg-blue-800 transition duration-300 ease-in-out">
        Edit Ad
      </h1>
      <Sidebar />
      <div className="container">
        <ImageUpload ad={ad} setAd={setAd} />

        {ad?.address && (
          <div className="mb-3 form-control">
            <GooglePlacesAutocomplete
              apiKey={GOOGLE_PLACES_KEY}
              apiOptions={{ componentRestrictions: { country: "np" } }}
              selectProps={{
                defaultInputValue: ad?.address,
                placeholder: "Search for address..",
                onChange: handleChange,
              }}
            />
          </div>
        )}

        <div style={{ marginTop: "10px" }}>
          <CurrencyInput
            placeholder="Enter price"
            value={ad.price}
            intlConfig={{ locale: "en-IN", currency: "INR" }}
            prefix="Rs "
            className="form-control mb-3"
            onValueChange={(value) => setAd({ ...ad, price: value })}
          />
        </div>

        {ad.type === "House" && (
          <div>
            <input
              type="number"
              min="0"
              className="form-control mb-3"
              placeholder="Enter how many bedrooms"
              value={ad.bedrooms}
              onChange={(e) => setAd({ ...ad, bedrooms: e.target.value })}
            />

            <input
              type="number"
              min="0"
              className="form-control mb-3"
              placeholder="Enter how many bathrooms"
              value={ad.bathrooms}
              onChange={(e) => setAd({ ...ad, bathrooms: e.target.value })}
            />

            <input
              type="number"
              min="0"
              className="form-control mb-3"
              placeholder="Enter how many carpark"
              value={ad.carpark}
              onChange={(e) => setAd({ ...ad, carpark: e.target.value })}
            />
          </div>
        )}

        {(ad?.type === "Land" || ad?.action === "Sell") && (
          <input
            type="text"
            className="form-control mb-3"
            placeholder="Size of land"
            value={ad.landsize}
            onChange={(e) => setAd({ ...ad, landsize: e.target.value })}
          />
        )}

        <input
          type="text"
          className="form-control mb-3"
          placeholder="Enter title"
          value={ad.title}
          onChange={(e) => setAd({ ...ad, title: e.target.value })}
        />

        <ReactQuill
          className="form-control mb-3"
          placeholder="Enter more detailed description"
          value={ad.description}
          onChange={(value) => setAd({ ...ad, description: value })}
          style={{ height: "300px" }}
        />
        <br />

        <div className="flex justify-between mt-5 mx-auto">
          <button
            onClick={handleClick}
            className={`btn mb-5 text-2xl text-white ${
              ad?.loading
                ? "bg-red-500 cursor-not-allowed"
                : "bg-blue-900 hover:bg-blue-800"
            }`}
            style={{ flex: 1, marginRight: "10px" }}
            disabled={ad?.loading}
          >
            {ad.loading ? "Editing..." : "Edit"}
          </button>

          <button
            onClick={handleDelete}
            className={`btn mb-5 text-2xl text-white ${
              ad?.loading
                ? "bg-pink-900 cursor-not-allowed"
                : "bg-red-700 hover:bg-red-500"
            }`}
            style={{ flex: 1, marginLeft: "10px" }}
            disabled={ad?.loading}
          >
            {ad.loading ? "Deleting..." : "Delete"}
          </button>
        </div>
      </div>
    </div>
  );
}
