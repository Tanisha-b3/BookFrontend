import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import api from "../api/axios";
import { useNavigate, useParams } from "react-router-dom";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardFooter,
  CardDescription,
} from "../../components/ui/card";
import { Input } from "../../components/ui/input";
import { Button } from "../../components/ui/button";
import { Label } from "../../components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../../components/ui/select";
import { Textarea } from "../../components/ui/textarea";
import { Badge } from "../../components/ui/badge";
import { Skeleton } from "../../components/ui/skeleton";
import {
  Calendar,
  Clock,
  Car,
  User,
  DollarSign,
  AlertCircle,
  CheckCircle2,
  ArrowLeft,
  Loader2,
} from "lucide-react";
import { toast } from "react-hot-toast";

export default function BookingForm() {
  const { id } = useParams();
  const isEdit = !!id;
  const [loading, setLoading] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const nav = useNavigate();

  const {
    register,
    handleSubmit,
    reset,
    watch,
    setValue,
    formState: { errors },
  } = useForm({
    defaultValues: {
      status: "Pending",
      carDetails: {
        type: "sedan",
      },
    },
  });

  const watchServiceType = watch("serviceType");
  const watchCarType = watch("carDetails.type");

  // Auto-calculate price and duration
  useEffect(() => {
    const priceMap = {
      "Basic Wash": { sedan: 25, SUV: 30, hatchback: 25, luxury: 50 },
      "Deluxe Wash": { sedan: 45, SUV: 55, hatchback: 45, luxury: 85 },
      "Full Detailing": { sedan: 120, SUV: 150, hatchback: 120, luxury: 250 },
    };
    const durationMap = {
      "Basic Wash": 30,
      "Deluxe Wash": 60,
      "Full Detailing": 180,
    };

    if (watchServiceType && watchCarType && priceMap[watchServiceType]) {
      setValue("price", priceMap[watchServiceType][watchCarType]);
      setValue("duration", durationMap[watchServiceType] || 30);
    }
  }, [watchServiceType, watchCarType, setValue]);
useEffect(() => {
  if (isEdit) {
    setLoading(true);
    (async () => {
      try {
        const res = await api.get(`/${id}`);
        const { _id, __v, ...rest } = res.data.data; 
        reset(rest);
      } catch (err) {
        console.error(err);
        toast.error("Failed to load booking data");
      } finally {
        setLoading(false);
      }
    })();
  }
}, [id, reset, isEdit]);

const cleanBookingData = (data) => {
  const { _id, __v, createdAt, updatedAt, customerPhone,notes, ...rest } = data;
  return rest;
};

// When fetching existing booking for edit
useEffect(() => {
  if (isEdit) {
    setLoading(true);
    (async () => {
      try {
        const res = await api.get(`/${id}`);
        const cleanData = cleanBookingData(res.data.data);
        reset(cleanData);
      } catch (err) {
        console.error(err);
        toast.error("Failed to load booking data");
      } finally {
        setLoading(false);
      }
    })();
  }
}, [id, reset, isEdit]);

// Before submitting
const onSubmit = async (data) => {
  setSubmitting(true);
  try {
    const payload = cleanBookingData(data); // remove _id, __v, createdAt, updatedAt

    if (isEdit) {
      await api.put(`/${id}`, payload);
      toast.success("Booking updated successfully!");
    } else {
      await api.post("/", payload);
      toast.success("Booking created successfully!");
    }
    nav("/bookings");
  } catch (err) {
    console.error(err);
    toast.error(err.response?.data?.message || "An error occurred");
  } finally {
    setSubmitting(false);
  }
};

  const serviceOptions = [
    { value: "Basic Wash", label: "Basic Wash", description: "Exterior wash and dry" },
    { value: "Deluxe Wash", label: "Deluxe Wash", description: "Exterior wash, interior vacuum, and window cleaning" },
    { value: "Full Detailing", label: "Full Detailing", description: "Complete interior and exterior detailing" },
  ];

  const carTypeOptions = [
    { value: "sedan", label: "Sedan", emoji: "🚗" },
    { value: "SUV", label: "SUV", emoji: "🚙" },
    { value: "hatchback", label: "Hatchback", emoji: "🚘" },
    { value: "luxury", label: "Luxury", emoji: "🏎️" },
  ];

  const statusOptions = [
    { value: "Pending", label: "Pending", color: "bg-yellow-100 text-yellow-800" },
    { value: "Confirmed", label: "Confirmed", color: "bg-blue-100 text-blue-800" },
    { value: "Completed", label: "Completed", color: "bg-green-100 text-green-800" },
    { value: "Cancelled", label: "Cancelled", color: "bg-red-100 text-red-800" },
  ];

  if (loading) {
    return (
      <div className="max-w-2xl mx-auto p-4 space-y-6">
        <div className="flex items-center gap-4">
          <Skeleton className="h-10 w-10 rounded-full" />
          <Skeleton className="h-8 w-48" />
        </div>
        <Card className="p-6">
          <div className="space-y-4">
            {[...Array(8)].map((_, i) => (
              <div key={i} className="space-y-2">
                <Skeleton className="h-4 w-24" />
                <Skeleton className="h-10 w-full" />
              </div>
            ))}
          </div>
        </Card>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto p-4 space-y-6">
      {/* Header */}
      <div className="flex items-center gap-4">
        <Button
          variant="outline"
          size="icon"
          onClick={() => nav("/bookings")}
          className="rounded-full"
        >
          <ArrowLeft className="w-4 h-4" />
        </Button>
        <div>
          <h1 className="text-3xl font-bold tracking-tight">
            {isEdit ? "Edit Booking" : "Create New Booking"}
          </h1>
          <p className="text-muted-foreground">
            {isEdit ? "Update booking details" : "Fill in the details to create a new booking"}
          </p>
        </div>
      </div>

      <Card className="shadow-lg border-0">
        <CardHeader className="pb-4">
          <CardTitle className="flex items-center gap-2 text-2xl">
            <User className="w-6 h-6" />
            Customer Information
          </CardTitle>
          <CardDescription>Enter the customer and vehicle details</CardDescription>
        </CardHeader>

        <form onSubmit={handleSubmit(onSubmit)}>
          <CardContent className="space-y-6">
            {/* Customer Details */}
            <div className="grid gap-4 md:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="customerName" className="flex items-center gap-2">
                  <User className="w-4 h-4" />
                  Customer Name *
                </Label>
                <Input
                  id="customerName"
                  {...register("customerName", { required: "Customer name is required" })}
                  placeholder="John Doe"
                  className={errors.customerName ? "border-red-500" : ""}
                />
                {errors.customerName && (
                  <p className="text-red-500 text-sm flex items-center gap-1">
                    <AlertCircle className="w-4 h-4" />
                    {errors.customerName.message}
                  </p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="customerPhone">Phone Number</Label>
                <Input
                  id="customerPhone"
                  {...register("customerPhone")}
                  placeholder="+91 (555) 000-0000"
                />
              </div>
            </div>

            {/* Vehicle Details */}
            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <Car className="w-5 h-5" />
                <Label className="text-lg">Vehicle Information</Label>
              </div>

              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <Label>Car Make</Label>
                  <Input {...register("carDetails.make")} placeholder="Toyota" />
                </div>

                <div className="space-y-2">
                  <Label>Car Model</Label>
                  <Input {...register("carDetails.model")} placeholder="Camry" />
                </div>
              </div>

              <div className="space-y-2">
                <Label>Car Type</Label>
                <Select
                  onValueChange={(val) => setValue("carDetails.type", val)}
                  defaultValue="sedan"
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select car type" />
                  </SelectTrigger>
                  <SelectContent>
                    {carTypeOptions.map((option) => (
                      <SelectItem key={option.value} value={option.value}>
                        <span className="flex items-center gap-2">
                          <span>{option.emoji}</span>
                          {option.label}
                        </span>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            {/* Service Details */}
            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-5 h-5" />
                <Label className="text-lg">Service Details</Label>
              </div>

              <div className="space-y-2">
                <Label>Service Type *</Label>
                <Select
                  onValueChange={(val) => setValue("serviceType", val)}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select service type" />
                  </SelectTrigger>
                  <SelectContent>
                    {serviceOptions.map((option) => (
                      <SelectItem key={option.value} value={option.value}>
                        <div>
                          <div className="font-medium">{option.label}</div>
                          <div className="text-sm text-muted-foreground">{option.description}</div>
                        </div>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                {errors.serviceType && (
                  <p className="text-red-500 text-sm flex items-center gap-1">
                    <AlertCircle className="w-4 h-4" />
                    Service type is required
                  </p>
                )}
              </div>

              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="date" className="flex items-center gap-2">
                    <Calendar className="w-4 h-4" />
                    Date & Time *
                  </Label>
                  <Input
                    id="date"
                    type="datetime-local"
                    {...register("date", { required: "Date and time are required" })}
                    className={errors.date ? "border-red-500" : ""}
                  />
                  {errors.date && (
                    <p className="text-red-500 text-sm flex items-center gap-1">
                      <AlertCircle className="w-4 h-4" />
                      {errors.date.message}
                    </p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="duration" className="flex items-center gap-2">
                    <Clock className="w-4 h-4" />
                    Duration (minutes)
                  </Label>
                  <Input id="duration" type="number" {...register("duration")} placeholder="30" />
                </div>
              </div>

              {/* Price Preview */}
              {watchServiceType && (
                <div className="p-3 bg-muted rounded-lg">
                  <Label className="flex items-center gap-2">
                    <DollarSign className="w-4 h-4" />
                    Estimated Price
                  </Label>
                  <div className="flex items-center gap-2 mt-1">
                    <span className="text-2xl font-bold">${watch("price")}</span>
                    <Badge variant="outline">{watchServiceType} • {watchCarType}</Badge>
                  </div>
                </div>
              )}
            </div>

            {/* Status */}
            <div className="space-y-2">
              <Label>Booking Status</Label>
              <Select onValueChange={(val) => setValue("status", val)} defaultValue="Pending">
                <SelectTrigger>
                  <SelectValue placeholder="Select status" />
                </SelectTrigger>
                <SelectContent>
                  {statusOptions.map((option) => (
                    <SelectItem key={option.value} value={option.value}>
                      <Badge variant="outline" className={option.color}>{option.label}</Badge>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Additional Notes */}
            <div className="space-y-2">
              <Label>Additional Notes</Label>
              <Textarea {...register("notes")} placeholder="Any special instructions or notes..." rows={3} />
            </div>
          </CardContent>

          <CardFooter className="flex gap-3 pt-6">
            <Button type="button" variant="outline" onClick={() => nav("/bookings")} className="flex-1">
              Cancel
            </Button>
            <Button type="submit" disabled={submitting} className="flex-1 gap-2">
              {submitting ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  {isEdit ? "Updating..." : "Creating..."}
                </>
              ) : (
                <>
                  <CheckCircle2 className="w-4 h-4" />
                  {isEdit ? "Update Booking" : "Create Booking"}
                </>
              )}
            </Button>
          </CardFooter>
        </form>
      </Card>
    </div>
  );
}
