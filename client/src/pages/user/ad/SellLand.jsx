import React from "react";
import Sidebar from "../../../components/nav/Sidebar";
import AdForm from "../../../components/forms/AdForm";

function SellLand() {
  return (
    <div className="dashboard-container justify-content-between">
      <h1 className="display-2 bg-primary text-white p-2">Sell Land</h1>
      <Sidebar />
      <AdForm type="Land" action="Sell" />
    </div>
  );
}

export default SellLand;