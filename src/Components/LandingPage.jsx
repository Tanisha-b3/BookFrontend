import React from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "../../components/ui/button";

export default function LandingPage() {
  const navigate = useNavigate(); 

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-blue-50 to-slate-50">
      <h1 className="text-5xl font-bold text-center bg-gradient-to-r from-slate-900 to-slate-700 bg-clip-text text-transparent mb-8">
        Welcome to Car Wash Service
      </h1>
      <p className="text-lg text-muted-foreground mb-6">
        Manage and book your car wash appointments easily
      </p>
      <Button
        className="px-6 py-3 text-lg shadow-lg"
        onClick={() => navigate("/bookings")} 
      >
        Go to Home
      </Button>
    </div>
  );
}
