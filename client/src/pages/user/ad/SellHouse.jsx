import React from "react";
import Sidebar from "../../../components/nav/Sidebar";
import AdForm from "../../../components/forms/AdForm";

function SellHouse() {
  return (
    <div className="dashboard-container justify-content-between">
      <h1 className="display-2 bg-primary text-white p-2">Sell House</h1>
      <Sidebar />
      <AdForm type="House" action="Sell" />
    </div>
  );
}

export default SellHouse;