import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from "../api/axios";
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "../../components/ui/card";
import { Button } from "../../components/ui/button";
import { Skeleton } from "../../components/ui/skeleton";
import { Badge } from "../../components/ui/badge";
import { 
  Calendar, User, Phone, Mail, MapPin, Clock, Edit, Trash2, ArrowLeft,
  CreditCard, CheckCircle, XCircle, AlertTriangle
} from "lucide-react";
import {
  AlertDialog,
  AlertDialogTrigger,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogCancel,
  AlertDialogAction,
} from "../../components/ui/alert-dialog";
import { toast } from "react-hot-toast";

export default function BookingDetail() {
  const { id } = useParams();
  const [booking, setBooking] = useState(null);
  const [loading, setLoading] = useState(true);
  const [deleting, setDeleting] = useState(false);
  const nav = useNavigate();

  useEffect(() => {
    (async () => {
      try {
        const res = await api.get(`${id}`);
        setBooking(res.data.data);
      } catch (err) {
        console.error(err);
        toast.error("Failed to load booking details");
      } finally {
        setLoading(false);
      }
    })();
  }, [id]);

  const handleDelete = async () => {
    setDeleting(true);
    try {
      await api.delete(`${id}`);
      toast.success("Booking deleted successfully");
      nav("/bookings");
    } catch (err) {
      console.error("Delete failed:", err);
      toast.error("Failed to delete booking");
      setDeleting(false);
    }
  };

  const getStatusBadge = (status) => {
    const statusConfig = {
      confirmed: { variant: "default", icon: CheckCircle },
      pending: { variant: "secondary", icon: Clock },
      cancelled: { variant: "destructive", icon: XCircle },
      completed: { variant: "outline", icon: CheckCircle }
    };
    
    const config = statusConfig[status?.toLowerCase()] || statusConfig.pending;
    const IconComponent = config.icon;
    
    return (
      <Badge variant={config.variant} className="flex items-center gap-1">
        <IconComponent className="w-3 h-3" />
        {status?.toUpperCase() || "PENDING"}
      </Badge>
    );
  };

  const formatDate = (dateString) => new Date(dateString).toLocaleDateString('en-US', {
    weekday: 'long', year: 'numeric', month: 'long', day: 'numeric'
  });

  const formatTime = (dateString) => new Date(dateString).toLocaleTimeString('en-US', {
    hour: '2-digit', minute: '2-digit'
  });

  if (loading)
    return (
      <div className="max-w-4xl mx-auto space-y-6 p-4">
        <Skeleton className="h-10 w-40" />
        <div className="grid gap-6 md:grid-cols-2">
          <Skeleton className="h-40 w-full rounded-xl" />
          <Skeleton className="h-40 w-full rounded-xl" />
        </div>
      </div>
    );

  if (!booking) 
    return (
      <div className="max-w-4xl mx-auto p-4 text-center">
        <AlertTriangle className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
        <h2 className="text-2xl font-bold text-muted-foreground mb-2">Booking Not Found</h2>
        <Button onClick={() => nav("/bookings")}>
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Bookings
        </Button>
      </div>
    );

  return (
    <div className="max-w-4xl mx-auto p-4 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Button variant="outline" size="icon" onClick={() => nav("/bookings")}>
            <ArrowLeft className="w-4 h-4" />
          </Button>
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Booking Details</h1>
            <p className="text-muted-foreground">ID: {booking.id || booking._id}</p>
          </div>
        </div>
        {getStatusBadge(booking.status)}
      </div>

      {/* Customer Information */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-lg">
            <User className="w-5 h-5" />
            Customer Information
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4 grid gap-4 sm:grid-cols-2">
          <div>
            <p className="font-medium text-muted-foreground">Full Name</p>
            <p className="flex items-center gap-2"><User className="w-4 h-4 text-muted-foreground" /> {booking.customerName}</p>
          </div>
          <div>
            <p className="font-medium text-muted-foreground">Phone</p>
            <p className="flex items-center gap-2"><Phone className="w-4 h-4 text-muted-foreground" /> {booking.customerPhone || "Not provided"}</p>
          </div>
          <div>
            <p className="font-medium text-muted-foreground">Email</p>
            <p className="flex items-center gap-2"><Mail className="w-4 h-4 text-muted-foreground" /> {booking.customerEmail || "Not provided"}</p>
          </div>
          <div>
            <p className="font-medium text-muted-foreground">Address</p>
            <p className="flex items-center gap-2"><MapPin className="w-4 h-4 text-muted-foreground" /> {booking.customerAddress || "Not provided"}</p>
          </div>
        </CardContent>
      </Card>

      {/* Booking Details */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-lg">
            <Calendar className="w-5 h-5" />
            Booking Details
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="font-medium text-muted-foreground">Date & Time</p>
          <p className="flex items-center gap-2">
            <Calendar className="w-4 h-4 text-muted-foreground" /> {booking.date ? formatDate(booking.date) : "Not specified"} 
            <Clock className="w-4 h-4 text-muted-foreground" /> {booking.date ? formatTime(booking.date) : "Not specified"}
          </p>
          <p className="font-medium text-muted-foreground">Duration</p>
          <p>{booking.duration || "Not specified"} mins</p>
          {booking.price && (
            <>
              <p className="font-medium text-muted-foreground">Price</p>
              <p className="flex items-center gap-2"><CreditCard className="w-4 h-4 text-muted-foreground" /> ₹{booking.price}</p>
            </>
          )}
          <p className="font-medium text-muted-foreground">Service Type</p>
          <p>{booking.serviceType}</p>
          {booking.addOns?.length > 0 && (
            <>
              <p className="font-medium text-muted-foreground">Add-Ons</p>
              <div className="flex gap-2 flex-wrap">{booking.addOns.map((a,i)=><Badge key={i}>{a}</Badge>)}</div>
            </>
          )}
        </CardContent>
      </Card>

      {/* Actions */}
      <CardFooter className="flex justify-end gap-3">
        <Button variant="outline" onClick={() => nav("/bookings")}>Back</Button>
        <Button onClick={() => nav(`/bookings/edit/${id}`)} className="gap-2"><Edit className="w-4 h-4" /> Edit</Button>

        <AlertDialog>
          <AlertDialogTrigger asChild>
            <Button variant="destructive" className="gap-2" disabled={deleting}>
              <Trash2 className="w-4 h-4" /> {deleting ? "Deleting..." : "Delete"}
            </Button>
          </AlertDialogTrigger>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Confirm Deletion</AlertDialogTitle>
              <AlertDialogDescription>
                This will permanently delete the booking for <strong>{booking.customerName}</strong>.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel disabled={deleting}>Cancel</AlertDialogCancel>
              <AlertDialogAction onClick={handleDelete} disabled={deleting}>
                {deleting ? "Deleting..." : "Delete Booking"}
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </CardFooter>
    </div>
  );
}
