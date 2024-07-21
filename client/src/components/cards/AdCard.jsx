import React from "react";
import { Badge } from "antd";
import { Link } from "react-router-dom";
import AdFeatures from "./AdFeatures";
import { formatNumber } from "../../helpers/ad";

export default function AdCard({ ad }) {
  const badgeColor = ad?.action === "Sell" ? "#000060" : "purple";

  return (
    <div className="col-lg-4 p-4 gx-4 gy-4 relative">
      <Link to={`/ad/${ad?.slug}`}>
        <div className="card hoverable shadow cursor-pointer">
          <div className="relative">
            {ad?.photos && ad?.photos.length > 0 && (
              <img
                src={ad?.photos[0]?.Location}
                alt={`${ad?.type}-${ad?.address}-${ad?.action}-${ad?.price}`}
                style={{ height: "250px", objectFit: "cover", width: "100%" }}
              />
            )}
            <div
              className="absolute bottom-0 right-0 p-1"
              style={{
                backgroundColor: badgeColor,
                color: "white",
                fontSize: "19px",
                fontWeight: "bold",
                borderRadius: "5px",
                zIndex: 1,
              }}
            >
              <div>{`${ad?.type} for ${ad?.action}`}</div>
              <Badge.Ribbon text="" color={badgeColor} style={{ position: "absolute", bottom: "0", right: "0", zIndex: 0 }} />
            </div>
          </div>

          <div className="card-body">
            <h1 className="font-bold text-2xl text-center" style={{ color: "black", padding: "5px" }}>
              Rs {formatNumber(ad?.price)}
            </h1>
          </div>

          <AdFeatures ad={ad} />
        </div>
      </Link>
    </div>
  );
}
