import React, { useEffect, useState } from "react";
import api from "../api/axios";
import BookingCard from "./card";

// shadcn/ui components
import { Input } from "../../components/ui/input";
import { Button } from "../../components/ui/button";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "../../components/ui/pagination";
import { Skeleton } from "../../components/ui/skeleton";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../../components/ui/select";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "../../components/ui/card";
import { Badge } from "../../components/ui/badge";
import { Search, Filter, X, Plus } from "lucide-react";
import { toast } from "react-hot-toast";

export default function Home() {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(8);
  const [totalPages, setTotalPages] = useState(1);
  const [totalItems, setTotalItems] = useState(0);
  const [searchQuery, setSearchQuery] = useState("");
  const [filters, setFilters] = useState({
    status: "",
    serviceType: "",
    sortBy: "date",
    sortOrder: "desc",
  });

  const fetchBookings = async () => {
    try {
      setLoading(true);
      const params = {
        page,
        limit,
        status: filters.status,
        serviceType: filters.serviceType,
        sortBy: filters.sortBy,
        sortOrder: filters.sortOrder,
        q: searchQuery, // search query sent directly
      };

      const res = await api.get("", { params });

      setBookings(res.data.data);
      setTotalPages(
        res.data.meta?.totalPages || Math.ceil((res.data.meta?.total || 0) / limit)
      );
      setTotalItems(res.data.meta?.total || 0);
    } catch (err) {
      console.error(err);
      toast.error("Failed to load bookings");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBookings();
  }, [page, filters, searchQuery]);

  const clearAllFilters = () => {
    setFilters({
      status: "",
      serviceType: "",
      sortBy: "date",
      sortOrder: "desc",
    });
    setSearchQuery("");
    setPage(1);
  };

  const skeletonCards = Array.from({ length: limit }, (_, i) => (
    <Card key={i} className="overflow-hidden">
      <CardContent className="p-0">
        <div className="p-6 space-y-3">
          <Skeleton className="h-6 w-3/4" />
          <Skeleton className="h-4 w-1/2" />
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-2/3" />
        </div>
        <div className="flex gap-2 p-6 pt-0">
          <Skeleton className="h-9 flex-1" />
          <Skeleton className="h-9 flex-1" />
        </div>
      </CardContent>
    </Card>
  ));

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50/30">
      <div className="container mx-auto px-4 py-8 max-w-7xl">
        {/* Header */}
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6 mb-8">
          <div>
            <h1 className="text-4xl font-bold bg-gradient-to-r from-slate-900 to-slate-700 bg-clip-text text-transparent">
              Car Wash Bookings
            </h1>
          </div>

          <Button
            className="gap-2 shadow-lg"
            onClick={() => (window.location.href = "/bookings/new")}
          >
            <Plus className="w-4 h-4" />
            New Booking
          </Button>
        </div>

        {/* Search & Filters */}
        <Card className="mb-8 border-0 shadow-lg">
          <CardHeader className="pb-4">
            <CardTitle className="flex items-center gap-2 text-lg">
              <Filter className="w-5 h-5" />
              Filters
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {/* <div className="relative">
              <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              <Input
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search by customer, car make/model, or license..."
                className="pl-10 pr-4 py-2 h-11"
              />
            </div> */}

            <div className="flex flex-col sm:flex-row gap-4">
              <Select
                value={filters.status || "all"}
                onValueChange={(value) =>
                  setFilters((prev) => ({
                    ...prev,
                    status: value === "all" ? "" : value,
                  }))
                }
              >
                <SelectTrigger className="flex-1">
                  <SelectValue placeholder="Filter by status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Statuses</SelectItem>
                  <SelectItem value="Pending">Pending</SelectItem>
                  <SelectItem value="Confirmed">Confirmed</SelectItem>
                  <SelectItem value="Completed">Completed</SelectItem>
                  <SelectItem value="Cancelled">Cancelled</SelectItem>
                </SelectContent>
              </Select>

              <Select
                value={filters.serviceType || "all"}
                onValueChange={(value) =>
                  setFilters((prev) => ({
                    ...prev,
                    serviceType: value === "all" ? "" : value,
                  }))
                }
              >
                <SelectTrigger className="flex-1">
                  <SelectValue placeholder="Filter by service" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Services</SelectItem>
                  <SelectItem value="Basic Wash">Basic Wash</SelectItem>
                  <SelectItem value="Deluxe Wash">Deluxe Wash</SelectItem>
                  <SelectItem value="Full Detailing">Full Detailing</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="flex items-center gap-2 flex-wrap mt-2">
              {(filters.status || filters.serviceType || searchQuery) && (
                <>
                  {searchQuery && (
                    <Badge variant="secondary" className="gap-1">
                      Search: "{searchQuery}"
                      <X
                        className="w-3 h-3 cursor-pointer"
                        onClick={() => setSearchQuery("")}
                      />
                    </Badge>
                  )}
                  {filters.status && (
                    <Badge variant="secondary" className="gap-1">
                      Status: {filters.status}
                      <X
                        className="w-3 h-3 cursor-pointer"
                        onClick={() =>
                          setFilters((prev) => ({ ...prev, status: "" }))
                        }
                      />
                    </Badge>
                  )}
                  {filters.serviceType && (
                    <Badge variant="secondary" className="gap-1">
                      Service: {filters.serviceType}
                      <X
                        className="w-3 h-3 cursor-pointer"
                        onClick={() =>
                          setFilters((prev) => ({ ...prev, serviceType: "" }))
                        }
                      />
                    </Badge>
                  )}
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={clearAllFilters}
                    className="ml-2 h-7"
                  >
                    Clear all
                  </Button>
                </>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Bookings Grid */}
        <div className="space-y-6">
          {loading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">{skeletonCards}</div>
          ) : bookings.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {bookings.map((booking) => (
                <BookingCard key={booking._id} booking={booking} />
              ))}
            </div>
          ) : (
            <Card className="text-center py-12">
              <CardContent>
                <div className="text-muted-foreground text-lg mb-4">
                  No bookings found
                </div>
                <Button onClick={clearAllFilters}>Clear filters</Button>
              </CardContent>
            </Card>
          )}

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="flex justify-center mt-12">
              <Pagination>
                <PaginationContent>
                  <PaginationItem>
                    <PaginationPrevious
                      onClick={() => setPage((p) => Math.max(p - 1, 1))}
                      className={page === 1 ? "pointer-events-none opacity-50" : "cursor-pointer"}
                    />
                  </PaginationItem>

                  {Array.from({ length: totalPages }, (_, i) => (
                    <PaginationItem key={i + 1}>
                      <PaginationLink
                        isActive={page === i + 1}
                        onClick={() => setPage(i + 1)}
                        className="cursor-pointer"
                      >
                        {i + 1}
                      </PaginationLink>
                    </PaginationItem>
                  ))}

                  <PaginationItem>
                    <PaginationNext
                      onClick={() => setPage((p) => Math.min(p + 1, totalPages))}
                      className={page === totalPages ? "pointer-events-none opacity-50" : "cursor-pointer"}
                    />
                  </PaginationItem>
                </PaginationContent>
              </Pagination>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
