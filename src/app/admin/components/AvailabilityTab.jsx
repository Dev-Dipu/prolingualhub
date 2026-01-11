"use client";
import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Plus, Trash2, CalendarIcon } from "lucide-react";
import { format } from "date-fns";
import { adminApi } from "@/lib/axios";

// Available time slots (9 AM to 5 PM, 1-hour blocks)
const TIME_SLOTS = [
  "09:00",
  "10:00",
  "11:00",
  "12:00",
  "13:00",
  "14:00",
  "15:00",
  "16:00",
  "17:00",
];

export default function AvailabilityTab() {
  const [unavailabilities, setUnavailabilities] = useState([]);
  const [availableSlots, setAvailableSlots] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [showDialog, setShowDialog] = useState(false);
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedSlots, setSelectedSlots] = useState([]);
  const [isFullDay, setIsFullDay] = useState(false);
  const [isCalendarOpen, setIsCalendarOpen] = useState(false);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      setLoading(true);

      // Fetch unavailabilities
      const unavailResponse = await adminApi.get("/api/admin/unavailability");
      setUnavailabilities(unavailResponse.data.data);
    } catch (err) {
      setError(err.userMessage || "Failed to fetch availability data");
      console.error("Error fetching data:", err);
    } finally {
      setLoading(false);
    }
  };

  const fetchAvailableSlots = async (date) => {
    if (!date) {
      setAvailableSlots([]);
      return;
    }

    try {
      const dateString = format(date, "yyyy-MM-dd");
      const response = await adminApi.get(
        `/api/availability?date=${dateString}`
      );
      setAvailableSlots(response.data.data);
    } catch (err) {
      console.error("Error fetching available slots:", err);
      setAvailableSlots([]);
    }
  };

  const handleCreateUnavailability = async () => {
    if (!selectedDate) {
      setError("Please select a date");
      return;
    }

    if (!isFullDay && selectedSlots.length === 0) {
      setError("Please select at least one time slot or mark Full Day");
      return;
    }

    const dateString = format(selectedDate, "yyyy-MM-dd");

    try {
      await adminApi.post("/api/admin/unavailability", {
        date: dateString,
        isFullDay,
        slots: isFullDay ? [] : selectedSlots,
      });

      await fetchData();
      setShowDialog(false);
      setSelectedDate(null);
      setSelectedSlots([]);
      setIsFullDay(false);
    } catch (err) {
      setError(err.userMessage || "Failed to create unavailability");
      console.error("Error creating unavailability:", err);
    }
  };

  const handleDeleteUnavailability = async (id) => {
    if (!confirm("Are you sure you want to delete this unavailability block?"))
      return;

    try {
      await adminApi.delete(`/api/admin/unavailability/${id}`);
      await fetchData();
    } catch (err) {
      setError(err.userMessage || "Failed to delete unavailability");
      console.error("Error deleting unavailability:", err);
    }
  };

  const formatTime = (timeString) => {
    const [hours, minutes] = timeString.split(":");
    const hour = parseInt(hours);
    const ampm = hour >= 12 ? "PM" : "AM";
    const hour12 = hour % 12 || 12;
    return `${hour12}:${minutes} ${ampm}`;
  };

  if (loading) {
    return (
      <Card>
        <CardContent className="flex items-center justify-center h-64">
          <p>Loading availability...</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <div className="flex justify-between items-center">
            <div>
              <CardTitle>Irina's Availability Management</CardTitle>
              <p className="text-sm text-gray-600 mt-1">
                Manage unavailable time blocks (1-hour slots)
              </p>
            </div>
            <Dialog open={showDialog} onOpenChange={setShowDialog}>
              <DialogTrigger asChild>
                <Button
                  onClick={() => {
                    setSelectedDate(null);
                    setSelectedSlots([]);
                    setIsFullDay(false);
                    setError("");
                  }}
                >
                  <Plus className="w-4 h-4 mr-2" />
                  Add Unavailability
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-md">
                <DialogHeader>
                  <DialogTitle>Add Unavailability Block</DialogTitle>
                </DialogHeader>
                <div className="space-y-6">
                  {error && (
                    <div className="p-3 bg-red-50 border border-red-200 rounded-md">
                      <p className="text-red-600 text-sm">{error}</p>
                    </div>
                  )}

                  <div className="space-y-2">
                    <Label>Select Date</Label>
                    <Popover
                      open={isCalendarOpen}
                      onOpenChange={setIsCalendarOpen}
                    >
                      <PopoverTrigger asChild>
                        <Button
                          variant="outline"
                          className="w-full justify-start text-left font-normal"
                        >
                          <CalendarIcon className="mr-2 h-4 w-4" />
                          {selectedDate
                            ? format(selectedDate, "PPP")
                            : "Pick a date"}
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0">
                        <Calendar
                          mode="single"
                          selected={selectedDate}
                          onSelect={async (date) => {
                            setSelectedDate(date);
                            setSelectedSlots([]);
                            setIsFullDay(false);
                            setIsCalendarOpen(false); // Close calendar
                            await fetchAvailableSlots(date);
                          }}
                          disabled={(date) => date < new Date()}
                          initialFocus
                        />
                      </PopoverContent>
                    </Popover>
                  </div>

                  {selectedDate && (
                    <>
                      <div className="flex items-center space-x-2 border p-3 rounded-md bg-gray-50">
                        <input
                          type="checkbox"
                          id="fullDay"
                          className="h-4 w-4 rounded border-gray-300 text-primary focus:ring-primary"
                          checked={isFullDay}
                          onChange={(e) => {
                            setIsFullDay(e.target.checked);
                            if (e.target.checked) setSelectedSlots([]);
                          }}
                        />
                        <Label
                          htmlFor="fullDay"
                          className="cursor-pointer font-medium"
                        >
                          Mark Full Day Unavailable
                        </Label>
                      </div>

                      {!isFullDay && (
                        <div className="space-y-3">
                          <Label>Select Time Slots (Click to toggle)</Label>
                          <div className="grid grid-cols-3 gap-2">
                            {TIME_SLOTS.map((slot) => {
                              const isSelected = selectedSlots.includes(slot);
                              // Check if slot is already unavailable (not in availableSlots)
                              // But wait, our API logic is specific.
                              // availableSlots only returns FREE slots.
                              // If a slot is not in availableSlots, it's already booked/unavailable.
                              // So we should visually disable it or mark it.
                              const isBooked = !availableSlots.includes(slot);

                              return (
                                <Button
                                  key={slot}
                                  type="button"
                                  variant={isSelected ? "default" : "outline"}
                                  className={`h-9 text-xs ${isBooked ? "opacity-50 cursor-not-allowed bg-gray-100" : ""}`}
                                  disabled={isBooked}
                                  onClick={() => {
                                    if (isSelected) {
                                      setSelectedSlots((prev) =>
                                        prev.filter((s) => s !== slot)
                                      );
                                    } else {
                                      setSelectedSlots((prev) => [
                                        ...prev,
                                        slot,
                                      ]);
                                    }
                                  }}
                                >
                                  {formatTime(slot)}
                                </Button>
                              );
                            })}
                          </div>
                          {availableSlots.length === 0 && (
                            <p className="text-xs text-red-500">
                              No slots available for this date.
                            </p>
                          )}
                        </div>
                      )}
                    </>
                  )}

                  <div className="flex justify-end gap-3 pt-2">
                    <Button
                      type="button"
                      variant="outline"
                      onClick={() => setShowDialog(false)}
                    >
                      Cancel
                    </Button>
                    <Button
                      onClick={handleCreateUnavailability}
                      disabled={
                        !selectedDate ||
                        (!isFullDay && selectedSlots.length === 0)
                      }
                    >
                      Create Block{selectedSlots.length > 1 ? "s" : ""}
                    </Button>
                  </div>
                </div>
              </DialogContent>
            </Dialog>
          </div>
        </CardHeader>
        <CardContent>
          {error && !showDialog && (
            <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-md">
              <p className="text-red-600 text-sm">{error}</p>
            </div>
          )}

          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Date</TableHead>
                  <TableHead>Time Slot</TableHead>
                  <TableHead>Reason</TableHead>
                  <TableHead>Created</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {unavailabilities.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={5} className="text-center py-8">
                      No unavailability blocks. Irina is fully available!
                    </TableCell>
                  </TableRow>
                ) : (
                  unavailabilities
                    .sort(
                      (a, b) =>
                        new Date(a.date) - new Date(b.date) ||
                        a.startTime.localeCompare(b.startTime)
                    )
                    .map((block) => (
                      <TableRow key={block._id}>
                        <TableCell>
                          {format(new Date(block.date), "MMM dd, yyyy")}
                        </TableCell>
                        <TableCell>
                          {formatTime(block.startTime)} -{" "}
                          {formatTime(block.endTime)}
                        </TableCell>
                        <TableCell>
                          {block.reason || (
                            <span className="text-gray-400">-</span>
                          )}
                        </TableCell>
                        <TableCell>
                          {format(new Date(block.createdAt), "MMM dd, yyyy")}
                        </TableCell>
                        <TableCell>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() =>
                              handleDeleteUnavailability(block._id)
                            }
                            className="text-red-600 hover:text-red-700"
                          >
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))
                )}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
