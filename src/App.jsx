import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./Components/Home";
import BookingDetail from "./Components/Detail";
import BookingForm from "./Components/BookingForm";
import LandingPage from "./Components/LandingPage";
export default function App(){
  return (
    <BrowserRouter>
      <Routes>
      <Route path="/" element={<LandingPage />}/>
        <Route path="/bookings" element={<Home />} />
        <Route path="/bookings/new" element={<BookingForm />} />
        <Route path="/bookings/edit/:id" element={<BookingForm />} />
        <Route path="/bookings/:id" element={<BookingDetail />} />
      </Routes>
    </BrowserRouter>
  );
}
