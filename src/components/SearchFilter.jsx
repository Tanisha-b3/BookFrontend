// client/src/components/SearchFilter.jsx
import React from "react";
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
  const handleKeyDown = (e) => {
    // Prevent Enter from reloading the page
    if (e.key === "Enter") {
      e.preventDefault();
    }
  };

  return (
    <div className="mb-6 shadow-md">
      <div className="p-4 flex flex-col md:flex-row md:items-center gap-2">
        {/* 🔍 Search Input */}
        <div className="flex-1">
          <Input
            type="text"
            placeholder="Search tasks..."
            value={searchTerm}
            onChange={(e) => onSearchChange(e.target.value)}
            onKeyDown={handleKeyDown}
          />
        </div>

        {/* 📌 Status Filter */}
        <div className="w-full md:w-40">
          <Select value={statusFilter} onValueChange={onStatusFilterChange}>
            <SelectTrigger>
              <SelectValue placeholder="Filter by status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Status</SelectItem>
              <SelectItem value="pending">Pending</SelectItem>
              <SelectItem value="done">Done</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
    </div>
  );
}

export default SearchFilter;
