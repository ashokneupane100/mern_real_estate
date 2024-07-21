import { useEffect, useState } from "react";
import GooglePlacesAutocomplete from "react-google-places-autocomplete";
import { GOOGLE_PLACES_KEY } from "../../config";
import CurrencyInput from "react-currency-input-field";
import ImageUpload from "./ImageUpload";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { useAuth } from "../../context/auth";

export default function AdForm({ action, type }) {
  const [auth, setAuth] = useAuth();
  const [ad, setAd] = useState({
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
    type,
    action,
  });

  const navigate = useNavigate();

  const handleClick = async () => {
    try {
      setAd({ ...ad, loading: true });
      const { data } = await axios.post("/ad", ad);
      console.log("ad create response => ", data);
      if (data?.error) {
        toast.error(data.error);
        setAd({ ...ad, loading: false });
      } else {
        //data{user,ad}

        // update user context
        setAuth({ ...auth, user: data.user });

        //update user in local storage

        const fromLS = JSON.parse(localStorage.getItem("auth"));
        fromLS.user = data.user;
        localStorage.setItem("auth", JSON.stringify(fromLS));
        

        toast.success("Ad created successfully");
        setAd({ ...ad, loading: false });
        // navigate("/dashboard");
        //reload page in redirect
        window.location.href = "/dashboard";
      }
    } catch (err) {
      console.log(err);
      setAd({ ...ad, loading: false });
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

  useEffect(() => {
    const observer = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        if (mutation.type === "childList") {
          // Handle your logic here
        }
      });
    });

    const targetNode = document.getElementById("your-target-element-id");
    if (targetNode) {
      observer.observe(targetNode, {
        childList: true,
      });
    }

    return () => {
      observer.disconnect();
    };
  }, []);

  return (
    <div className="container">
      <ImageUpload ad={ad} setAd={setAd} />

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

      <div style={{ marginTop: "10px" }}>
        <CurrencyInput
          placeholder="Enter price"
          defaultValue={ad.price}
          intlConfig={{ locale: "en-IN", currency: "INR" }}
          prefix="Rs "
          className="form-control mb-3"
          onValueChange={(value) => setAd({ ...ad, price: value })}
        />
      </div>

      {ad?.type === "House" ? (
        <>
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
        </>
      ) : (
        ""
      )}

      {ad?.type === "Land" || ad?.action === "Sell" ? (
        <input
          type="text"
          className="form-control mb-3"
          placeholder="Size of land"
          value={ad.landsize}
          onChange={(e) => setAd({ ...ad, landsize: e.target.value })}
        />
      ) : (
        ""
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

      <button
        onClick={handleClick}
        className={`btn btn-primary mb-5 col-12 ${
          ad?.loading ? "btn-danger disabled" : ""
        }`}
      >
        {ad.loading ? "Submitting..." : "Submit"}
      </button>
    </div>
  );
}
