import { IoBed } from "react-icons/io5";
import { FaBath } from "react-icons/fa";
import { FaCarSide } from "react-icons/fa";
import { BiSolidArea } from "react-icons/bi";

export default function AdFeatures({ ad }) {
  console.log("Ad data:", ad); // Debugging statement

  return (
    <p className="container mx-auto text-xl font-bold flex justify-center gap-12 items-center">
      {ad?.bedrooms ? (
        <span>
          <IoBed />
          {ad.bedrooms}
        </span>
      ) : (
        ""
      )}

      {ad?.bathrooms ? (
        <span>
          <FaBath />
          {ad.bathrooms}
        </span>
      ) : (
        ""
      )}

      {ad?.carpark ? (
        <span>
          <FaCarSide />
          {ad.carpark}
        </span>
      ) : (
        ""
      )}

      {ad?.landsize && (
        <span className="flex flex-col items-center">
          <BiSolidArea />
          <span>{ad.landsize}</span>
        </span>
      )}
    </p>
  );
}
