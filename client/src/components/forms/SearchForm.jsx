import React, { useEffect, useRef } from "react";
import { useSearch } from "../../context/search";
import GooglePlacesAutocomplete from "react-google-places-autocomplete";
import { GOOGLE_PLACES_KEY } from "../../config";
import "./SearchForm.css";
import { sellPrices, rentPrices } from "../../helpers/priceList.js";
import queryString from "query-string";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export default function SearchForm() {
  const [search, setSearch] = useSearch();
  const navigate = useNavigate();
  const dropdownRef = useRef(null);

  const handleSearch = async () => {
    setSearch({ ...search, loading: true });
    try {
      const { results, page, price, priceRange, ...rest } = search;

      // Adjust query based on priceRange availability
      const query = queryString.stringify({
        ...rest,
        ...(priceRange ? { priceRange } : {}),
      });

      const { data } = await axios.get(`/search?${query}`);

      setSearch((prev) => ({
        ...prev,
        results: data,
        page: window.location.pathname,
        loading: false,
      }));

      if (search?.page !== "/search") {
        navigate("/search");
      }
    } catch (err) {
      console.log(err);
      setSearch({ ...search, loading: false });
    }
  };

  useEffect(() => {
    const priceButton = document.querySelector(".btn-price");
    const dropdownMenu = dropdownRef.current;

    const handleMouseEnter = () => {
      if (dropdownMenu) {
        const buttonWidth = priceButton.offsetWidth;
        dropdownMenu.style.minWidth = `${buttonWidth}px`;
      }
    };

    const handleMouseLeave = () => {
      if (dropdownMenu) {
        dropdownMenu.style.minWidth = null;
      }
    };

    if (priceButton && dropdownMenu) {
      priceButton.addEventListener("mouseenter", handleMouseEnter);
      priceButton.addEventListener("mouseleave", handleMouseLeave);
      dropdownMenu.addEventListener("mouseenter", handleMouseEnter);
      dropdownMenu.addEventListener("mouseleave", handleMouseLeave);
    }

    return () => {
      if (priceButton && dropdownMenu) {
        priceButton.removeEventListener("mouseenter", handleMouseEnter);
        priceButton.removeEventListener("mouseleave", handleMouseLeave);
        dropdownMenu.removeEventListener("mouseenter", handleMouseEnter);
        dropdownMenu.removeEventListener("mouseleave", handleMouseLeave);
      }
    };
  }, []);

  return (
    <div className="search-form">
      <div className="search-input">
        <GooglePlacesAutocomplete
          apiKey={GOOGLE_PLACES_KEY}
          apiOptions={{ language: "np" }}
          selectProps={{
            defaultInputValue: search?.address,
            placeholder: "Enter an address, neighborhood, city, or ZIP code",
            onChange: ({ value }) => {
              setSearch({ ...search, address: value.description });
            },
          }}
        />
      </div>

      <div className="button-group">
        <button
          onClick={() => setSearch({ ...search, action: "Buy", price: "", priceRange: undefined })}
          className="btn btn-buy"
        >
          {search.action === "Buy" ? "✅ Buy" : "Buy"}
        </button>

        <button
          onClick={() => setSearch({ ...search, action: "Rent", price: "", priceRange: undefined })}
          className="btn btn-rent"
        >
          {search.action === "Rent" ? "✅ Rent" : "Rent"}
        </button>

        <button
          onClick={() => setSearch({ ...search, type: "House", price: "", priceRange: undefined })}
          className="btn btn-house"
        >
          {search.type === "House" ? "✅ House" : "House"}
        </button>

        <button
          onClick={() => setSearch({ ...search, type: "Land", price: "", priceRange: undefined })}
          className="btn btn-land"
        >
          {search.type === "Land" ? "✅ Land" : "Land"}
        </button>

        <div className="dropdown">
          <button
            className="btn btn-price dropdown-toggle square"
            data-bs-toggle="dropdown"
            aria-expanded="false"
          >
            &nbsp; {search?.price ? search.price : "Price Range"}
          </button>

          <ul ref={dropdownRef} className="dropdown-menu price-dropdown-menu">
            {search.action === "Buy" ? (
              <>
                {sellPrices.map((item) => (
                  <li key={item._id}>
                    <a
                      className="dropdown-item"
                      onClick={() =>
                        setSearch({
                          ...search,
                          price: item.name,
                          priceRange: item.array,
                        })
                      }
                    >
                      {item.name}
                    </a>
                  </li>
                ))}
              </>
            ) : (
              <>
                {rentPrices.map((item) => (
                  <li key={item._id}>
                    <a
                      className="dropdown-item"
                      onClick={() =>
                        setSearch({
                          ...search,
                          price: item.name,
                          priceRange: item.array,
                        })
                      }
                    >
                      {item.name}
                    </a>
                  </li>
                ))}
              </>
            )}
          </ul>
        </div>
      </div>

      <div className="row flex justify-content-center">
        <button onClick={handleSearch} className="btn btn-search col-8 p-3">
          Search
        </button>
      </div>
    </div>
  );
}
