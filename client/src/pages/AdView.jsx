import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import ReactImageGallery from "../components/misc/ReactImageGallery";
import Logo from "../logo192.png";
import AdFeatures from "../components/cards/AdFeatures";
import { formatNumber } from "../helpers/ad";
import LikeUnlike from "../components/misc/LikeUnlike";
import dayjs from "dayjs";
import MapCard from "../components/cards/MapCard";
import relativeTime from "dayjs/plugin/relativeTime";
import parse from "html-react-parser";
import AdCard from "../components/cards/AdCard";
import "./AdView.css"; // Add custom CSS for styles
import ContactSeller from "../components/forms/ContactSeller";

dayjs.extend(relativeTime);

export default function AdView() {
  const params = useParams();
  const [ad, setAd] = useState({});
  const [related, setRelated] = useState([]);

  useEffect(() => {
    if (params?.slug) fetchAd();
    window.scrollTo(0, 0); // Scroll to the top when the page loads
  }, [params?.slug]);

  const fetchAd = async () => {
    try {
      const { data } = await axios.get(`/ad/${params?.slug}`);
      setAd(data?.ad);
      setRelated(data?.related || []);
    } catch (err) {
      console.log(err);
    }
  };

  const imageArrayGenerator = (photos) => {
    return photos?.length
      ? photos.map((p) => ({ original: p.Location, thumbnail: p.Location }))
      : [{ original: Logo, thumbnail: Logo }];
  };

  return (
    <>
      <div className="container-fluid ad-view-container mb-4">
        <div className="row">
          <div className="col-lg-4 mb-2 d-flex flex-column align-items-center">
            <div className="badge-container mb-3">
              <div
                className={`badge text-2xl mb-0 ${
                  ad?.sold ? "badge-sold" : "badge-available"
                }`}
              >
                For {ad?.action} {ad?.sold ? "❎ SOLD" : "☑️ AVAILABLE"}
              </div>
              {!ad?.sold && (
                <>
                  <div
                    className="like-container mt-2"
                    style={{ fontSize: "1.4rem", fontWeight: "bold" }}
                  >
                    Like it?
                  </div>
                  <LikeUnlike ad={ad} />
                </>
              )}
            </div>

            <h3 className="ad-address h4 text-center mb-3">{ad?.address}</h3>
            <AdFeatures ad={ad} />
            <h3 className="ad-price mt-3 h4 text-center">
              Rs {formatNumber(ad?.price)}
            </h3>
            <p className="text-muted">{dayjs(ad?.createdAt).fromNow()}</p>
          </div>

          <div className="col-lg-8">
            <div className="image-gallery-container d-flex justify-content-center">
              <ReactImageGallery images={imageArrayGenerator(ad?.photos)} />
            </div>
          </div>
        </div>
      </div>

      <div className="container ad-description-container mb-4">
        <div className="row justify-content-center">
          <div className="col-lg-8">
            <MapCard ad={ad} />
            <h2 className="ad-summary h4 text-center my-3">
              {ad?.type} in {ad?.address} for {ad?.action} at Rs{" "}
              {formatNumber(ad?.price)}
            </h2>
            <div className="ad-description">
              {ad?.description && parse(ad?.description)}
            </div>
          </div>
        </div>
      </div>

      <ContactSeller ad={ad} />

      <div className="container-fluid related-properties-container">
        <h4 className="text-center mb-3 h3">Related Properties</h4>
        <hr className="related-properties-divider" />
        <div className="row">
          {related.map((ad) => (
            <AdCard key={ad._id} ad={ad} />
          ))}
        </div>
      </div>
    </>
  );
}
