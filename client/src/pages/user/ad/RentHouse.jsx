import React from "react";
import Sidebar from "../../../components/nav/Sidebar";
import AdForm from "../../../components/forms/AdForm";

function RentHouse() {
  return (
    <div className="dashboard-container justify-content-between">
      <h1 className="display-2 bg-primary text-white p-2">Rent House</h1>
      <Sidebar />
      <AdForm type="House" action="Rent" />

       
    </div>
  );
}

export default RentHouse;