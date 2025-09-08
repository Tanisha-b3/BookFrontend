// client/src/components/SearchFilter.jsx
import React, { useState, useEffect } from "react";
import { Input } from "../../components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../../components/ui/select";
import { Card, CardContent } from "../../components/ui/card";

function SearchFilter({ searchTerm, onSearchChange, statusFilter, onStatusFilterChange }) {
  const [localSearch, setLocalSearch] = useState(searchTerm || "");

  // Debounce search input to prevent excessive calls
  useEffect(() => {
    const timer = setTimeout(() => {
      onSearchChange(localSearch);
    }, 300); // 300ms debounce
    return () => clearTimeout(timer);
  }, [localSearch, onSearchChange]);

  const handleKeyDown = (e) => {
    if (e.key === "Enter") e.preventDefault();
  };

  return (
    <Card className="mb-6 shadow-md">
      <CardContent className="p-4 flex flex-col sm:flex-row sm:items-center gap-4">
        {/* 🔍 Search Input */}
        <div className="flex-1 w-full">
          <Input
            type="text"
            placeholder="Search tasks..."
            value={localSearch}
            onChange={(e) => setLocalSearch(e.target.value)}
            onKeyDown={handleKeyDown}
            aria-label="Search tasks"
            className="w-full"
          />
        </div>

        {/* 📌 Status Filter */}
        <div className="w-full sm:w-40">
          <Select value={statusFilter} onValueChange={onStatusFilterChange}>
            <SelectTrigger aria-label="Filter tasks by status" className="w-full">
              <SelectValue placeholder="Filter by status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Status</SelectItem>
              <SelectItem value="pending">Pending</SelectItem>
              <SelectItem value="done">Done</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </CardContent>
    </Card>
  );
}

export default SearchFilter;
