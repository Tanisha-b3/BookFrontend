import React from "react";
import { Link } from "react-router-dom";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardFooter,
} from "../../components/ui/card";
import { Button } from "../../components/ui/button";
import { Badge } from "../../components/ui/badge";

export default function BookingCard({ booking }) {
  const { _id, customerName, carDetails = {}, serviceType, date, price, status } = booking;

  const getStatusColor = (status) => {
    switch (status) {
      case "Confirmed":
        return "bg-green-500";
      case "Completed":
        return "bg-blue-500";
      case "Pending":
        return "bg-yellow-500";
      case "Cancelled":
        return "bg-red-500";
      default:
        return "bg-gray-500";
    }
  };

  return (
    <Card className="shadow-md hover:shadow-xl transition-all rounded-2xl overflow-hidden border border-gray-100">
      <CardHeader className="flex justify-between items-center pb-2 border-b border-gray-200">
        <CardTitle className="text-lg font-semibold text-gray-900 truncate">
          {customerName}
        </CardTitle>
        <Badge className={`${getStatusColor(status)} text-white px-3 py-1 rounded-full text-xs font-medium`}>
          {status}
        </Badge>
      </CardHeader>

      <CardContent className="space-y-3 text-sm py-4">
        <p className="text-gray-700">
          <span className="font-medium">Car:</span>{" "}
          {carDetails.type || `${carDetails.make} ${carDetails.model}`}
        </p>
        <p className="text-gray-700">
          <span className="font-medium">Service:</span> {serviceType}
        </p>
        <p className="text-gray-700">
          <span className="font-medium">Date:</span>{" "}
          {new Date(date).toLocaleString()}
        </p>
        <p className="text-gray-900 font-semibold text-lg">
          ₹{price ?? "—"}
        </p>
      </CardContent>

      <CardFooter className="pt-0 border-t border-gray-200">
        <Button asChild className="w-full justify-center py-2 text-sm font-medium hover:bg-gray-100 transition">
          <Link to={`/bookings/${_id}`}>View Details</Link>
        </Button>
      </CardFooter>
    </Card>
  );
}
