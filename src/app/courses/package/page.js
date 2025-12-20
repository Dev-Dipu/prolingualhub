"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import BackButton from "@/components/BackButton";
import CalendarPicker from "@/components/CalendarPicker";
import TimeSlotSelector from "@/components/TimeSlotSelector";
import PrimaryButton from "@/components/PrimaryButton";

export default function PackagePage() {
    const router = useRouter();

    const [selectedSlots, setSelectedSlots] = useState([]);
    const [currentDate, setCurrentDate] = useState(null);
    const [currentTime, setCurrentTime] = useState(null);
    const [timeFormat, setTimeFormat] = useState("24h");

    const availableTimeSlots = [
        "08:00",
        "09:00",
        "10:00",
        "11:00",
        "12:00",
        "13:00",
    ];

    const courseData = {
        title: "PRIVATE LESSON PACKAGE (4 LESSONS) – 1 HOUR",
        description:
            "A PACKAGE OF 4 PRIVATE ONE-HOUR LESSONS, TAILORED TO YOUR LEVEL, WITH FOCUSED GUIDANCE AND STEADY PROGRESS IN EVERY SESSION.",
        duration: "1h",
        location: "Google Meet",
        timezone: "Europe/London",
        price: 199,
        maxSlots: 4,
    };

    const handleDateSelect = (dates) => {
        setCurrentDate(dates[0]);
        setCurrentTime(null);
    };

    const handleTimeSelect = (time) => {
        if (!currentDate) return;

        const exists = selectedSlots.some(
            (slot) =>
                slot.date.toDateString() === currentDate.toDateString() &&
                slot.time === time
        );

        if (exists) return;

        if (selectedSlots.length < courseData.maxSlots) {
            setSelectedSlots([...selectedSlots, { date: currentDate, time }]);
            setCurrentDate(null);
            setCurrentTime(null);
        }
    };

    const handleRemoveSlot = (indexToRemove) => {
        setSelectedSlots((prev) =>
            prev.filter((_, index) => index !== indexToRemove)
        );
    };

    const handleContinue = () => {
        if (selectedSlots.length !== courseData.maxSlots) return;

        sessionStorage.setItem(
            "bookingData",
            JSON.stringify({
                courseType: "package",
                slots: selectedSlots,
                price: courseData.price,
            })
        );

        router.push("/courses/package/checkout");
    };

    const formatSelectedDate = () => {
        if (!currentDate) return "";
        const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
        return `${days[currentDate.getDay()]} ${currentDate.getDate()}`;
    };

    const formatSlot = (slot) => {
        const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
        return `${days[slot.date.getDay()]} ${slot.date.getDate()} • ${slot.time}`;
    };

    const getDisabledDates = () => {
        return selectedSlots.map((slot) => slot.date);
    };

    return (
        <div className="h-screen bg-[#FDFDFD] font-[dm_mono]">
            <div className="h-[90%] max-w-[1280px] mx-auto px-6 py-6 flex flex-col">
                <BackButton />

                <div className="flex-1 rounded-2xl border border-gray-200 bg-white overflow-hidden">
                    <div className="h-full grid grid-cols-1 lg:grid-cols-[280px_1fr_340px]">

                        {/* LEFT INFO */}
                        <div className="p-6 border-r border-gray-200">
                            <p className="text-redy text-[12px] font-bold uppercase mb-4">
                                PROLINGUALHUB
                            </p>

                            <h1 className="text-[15px] font-bold uppercase mb-4">
                                {courseData.title}
                            </h1>

                            <p className="text-[13px] text-gray-500 leading-relaxed mb-6">
                                {courseData.description}
                            </p>

                            <div className="space-y-3 text-[13px] text-gray-500">
                                <div>{courseData.duration}</div>
                                <div>{courseData.location}</div>
                                <div>{courseData.timezone}</div>
                            </div>
                        </div>

                        {/* CALENDAR */}
                        <CalendarPicker
                            selectedDates={currentDate ? [currentDate] : []}
                            onDateSelect={handleDateSelect}
                            disabledDates={getDisabledDates()}
                        />

                        {/* RIGHT PANEL */}
                        <div className="p-6 border-l border-gray-200 flex flex-col">

                            {/* SLOT SELECT / SUMMARY */}
                            {selectedSlots.length < courseData.maxSlots ? (
                                currentDate ? (
                                    <>
                                        <div className="flex items-center justify-between mb-4">
                                            <p className="text-[14px] font-semibold">
                                                {formatSelectedDate()}
                                            </p>

                                            <div className="flex border border-gray-200 rounded-md overflow-hidden text-[11px]">
                                                <button
                                                    className={`px-3 py-1 ${
                                                        timeFormat === "12h"
                                                            ? "bg-gray-100"
                                                            : ""
                                                    }`}
                                                    onClick={() => setTimeFormat("12h")}
                                                >
                                                    12h
                                                </button>
                                                <button
                                                    className={`px-3 py-1 ${
                                                        timeFormat === "24h"
                                                            ? "bg-redy text-white"
                                                            : ""
                                                    }`}
                                                    onClick={() => setTimeFormat("24h")}
                                                >
                                                    24h
                                                </button>
                                            </div>
                                        </div>

                                        <TimeSlotSelector
                                            availableSlots={availableTimeSlots}
                                            selectedSlot={currentTime}
                                            onSlotSelect={handleTimeSelect}
                                        />
                                    </>
                                ) : (
                                    <div className="space-y-3">
                                        <p className="text-[13px] font-semibold text-gray-700">
                                            Selected slots
                                        </p>

                                        {selectedSlots.map((slot, index) => (
                                            <div
                                                key={index}
                                                className="flex items-center justify-between border border-gray-200 rounded-md px-3 py-2 text-[12px]"
                                            >
                                                <span className="text-gray-600">
                                                    {formatSlot(slot)}
                                                </span>

                                                <button
                                                    onClick={() => handleRemoveSlot(index)}
                                                    className="text-redy text-[12px]"
                                                >
                                                    Remove
                                                </button>
                                            </div>
                                        ))}
                                    </div>
                                )
                            ) : (
                                <div className="space-y-3">
                                    <p className="text-[13px] font-semibold text-gray-700">
                                        Selected slots
                                    </p>

                                    {selectedSlots.map((slot, index) => (
                                        <div
                                            key={index}
                                            className="flex items-center justify-between border border-gray-200 rounded-md px-3 py-2 text-[12px]"
                                        >
                                            <span className="text-gray-700">
                                                {formatSlot(slot)}
                                            </span>

                                            <button
                                                onClick={() => handleRemoveSlot(index)}
                                                className="text-redy text-[12px]"
                                            >
                                                Remove
                                            </button>
                                        </div>
                                    ))}
                                </div>
                            )}

                            {/* FOOTER */}
                            <div className="mt-auto pt-6 space-y-2">
                                <p className="text-[12px] text-gray-500">
                                    Selected slots: {selectedSlots.length} /{" "}
                                    {courseData.maxSlots}
                                </p>

                                <PrimaryButton
                                    fullWidth
                                    disabled={
                                        selectedSlots.length !== courseData.maxSlots
                                    }
                                    onClick={handleContinue}
                                >
                                    Continue
                                </PrimaryButton>
                            </div>
                        </div>

                    </div>
                </div>
            </div>
        </div>
    );
}
