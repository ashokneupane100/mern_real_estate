import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function RedirectRoute() {
  const [count, setCount] = useState(5); // Changed initial count for demonstration
  const navigate = useNavigate();

  useEffect(() => {
    const interval = setInterval(() => {
      setCount((currentCount) => {
        if (currentCount === 1) {
          clearInterval(interval); // Clear interval before navigation
          navigate("/login");
          return 0; // Prevent further countdown
        }
        return currentCount - 1;
      });
    }, 1000);

    return () => clearInterval(interval); // Cleanup on unmount
  }, [navigate]); // Depend on navigate to avoid unnecessary re-runs

  return (
    <div className="flex flex-col justify-center items-center h-screen bg-green-900 text-white" style={{marginTop:"-15%"}}>
      <h2 className="text-center text-5xl">
        Please Login. 
        <h2>
        Redirecting in {count} Seconds...
        </h2>
      </h2>
    </div>
  );
}
