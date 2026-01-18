"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import BackButton from "@/components/BackButton";
import CalendarPicker from "@/components/CalendarPicker";
import TimeSlotSelector from "@/components/TimeSlotSelector";
import PrimaryButton from "@/components/PrimaryButton";
import TimeFormatToggle from "@/components/TimeFormatToggle";
import { api } from "@/lib/axios";
import { Clock } from "lucide-react";
import Image from "next/image";
import { useLanguage } from "@/context/LanguageContext";

export default function PackagePage() {
    const router = useRouter();
    const { t, language } = useLanguage();

    const [selectedSlots, setSelectedSlots] = useState([]);
    const [currentDate, setCurrentDate] = useState(null);
    const [currentTime, setCurrentTime] = useState(null);
    const [availableTimeSlots, setAvailableTimeSlots] = useState([]);
    const [loadingSlots, setLoadingSlots] = useState(false);
    const [timeFormat, setTimeFormat] = useState("24h");

    const courseData = {
        title: t.packagePage.title,
        description: t.packagePage.desc,
        duration: "1h",
        location: t.packagePage.location,
        timezone: t.packagePage.timezone,
        price: 199,
        maxSlots: 4,
    };

    // Fetch available slots when date is selected
    useEffect(() => {
        const fetchAvailability = async () => {
            if (!currentDate) return;

            setLoadingSlots(true);
            setCurrentTime(null);

            try {
                // Format date manually to YYYY-MM-DD to avoid timezone shifts
                // This ensures what the user sees/selects is exactly what is sent to the API
                const year = currentDate.getFullYear();
                const month = String(currentDate.getMonth() + 1).padStart(
                    2,
                    "0"
                );
                const day = String(currentDate.getDate()).padStart(2, "0");
                const dateString = `${year}-${month}-${day}`;
                const response = await api.get(
                    `/api/availability?date=${dateString}`
                );

                if (response.data.success) {
                    setAvailableTimeSlots(response.data.data);
                } else {
                    console.error(
                        "Failed to fetch availability:",
                        response.data.error
                    );
                    setAvailableTimeSlots([]);
                }
            } catch (error) {
                console.error("Error fetching availability:", error);
                setAvailableTimeSlots([]);
            } finally {
                setLoadingSlots(false);
            }
        };

        fetchAvailability();
    }, [currentDate]);

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

        // Transform slots to session dates for booking API
        const sessionDates = selectedSlots.map((slot) => {
            const date = slot.date;
            const year = date.getFullYear();
            const month = String(date.getMonth() + 1).padStart(2, "0");
            const day = String(date.getDate()).padStart(2, "0");
            return `${year}-${month}-${day}`;
        });

        // All slots use the same time
        const startTime = selectedSlots[0].time;
        const endTime = addOneHour(startTime);

        const bookingData = {
            bookingType: "PRIVATE_4_PACKAGE",
            sessionDates: sessionDates,
            startTime: startTime,
            endTime: endTime,
            price: courseData.price,
            slots: selectedSlots,
        };

        sessionStorage.setItem("bookingData", JSON.stringify(bookingData));
        const target =
            language === "ru"
                ? "/ru/courses/package/checkout"
                : "/courses/package/checkout";
        router.push(target);
    };

    // Helper function to add one hour to time
    const addOneHour = (timeString) => {
        const [hours, minutes] = timeString.split(":").map(Number);
        const newHours = (hours + 1) % 24;
        return `${newHours.toString().padStart(2, "0")}:${minutes.toString().padStart(2, "0")}`;
    };

    const formatSelectedDate = () => {
        if (!currentDate) return "";
        const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"]; // TODO: Translate days?
        return `${days[currentDate.getDay()]} ${currentDate.getDate()}`;
    };

    const formatTime = (time) => {
        if (timeFormat === "24h") return time;
        const [hours, minutes] = time.split(":");
        const h = parseInt(hours, 10);
        const suffix = h >= 12 ? "PM" : "AM";
        const h12 = h % 12 || 12;
        return `${h12}:${minutes} ${suffix}`;
    };

    const formatSlot = (slot) => {
        const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
        return `${days[slot.date.getDay()]} ${slot.date.getDate()} • ${formatTime(slot.time)}`;
    };

    const getDisabledDates = () => {
        return selectedSlots.map((slot) => slot.date);
    };

    return (
        <div className="md:h-screen flex flex-col items-center justify-center bg-[#FDFDFD] font-[dm_mono]">
            <BackButton />
            <div className="h-[90%] w-full max-w-[1280px] mx-auto px-6 py-6 flex flex-col">
                <div className="mt-6 flex-1 rounded-2xl border border-gray-200 bg-white overflow-hidden">
                    <div className="h-full grid grid-cols-1 lg:grid-cols-[280px_1fr_340px]">
                        {/* LEFT INFO */}
                        <div className="p-6 border-r border-gray-200">
                            <p className="text-redy text-[12px] font-bold uppercase mb-4">
                                {t.courseData?.company || "PROLINGUALHUB"}
                            </p>

                            <h1 className="text-[15px] font-bold uppercase mb-4">
                                {courseData.title}
                            </h1>

                            <p className="text-[13px] text-gray-500 leading-relaxed mb-6">
                                {courseData.description}
                            </p>

                            <div className="space-y-3 text-[13px] text-gray-500">
                                <div className="text-[13px] flex gap-2 items-center">
                                    <Clock className="h-4 w-4 " />{" "}
                                    {courseData.duration}
                                </div>
                                <div className="flex items-center gap-2">
                                    <Image
                                        width="15"
                                        height="15"
                                        src="/googlemeet.png"
                                        alt="meet"
                                    />
                                    {courseData.location}
                                </div>
                                <div className="flex items-center gap-2">
                                    <Image
                                        width="16"
                                        height="16"
                                        src="/world.png"
                                        alt="world"
                                    />
                                    {courseData.timezone}
                                </div>
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

                                            <TimeFormatToggle
                                                value={timeFormat}
                                                onChange={setTimeFormat}
                                            />
                                        </div>

                                        {loadingSlots ? (
                                            <div className="flex items-center justify-center py-8">
                                                <div className="text-gray-500 text-sm">
                                                    {t.packagePage.loading}
                                                </div>
                                            </div>
                                        ) : (
                                            <TimeSlotSelector
                                                availableSlots={
                                                    availableTimeSlots
                                                }
                                                selectedSlot={currentTime}
                                                onSlotSelect={handleTimeSelect}
                                                format={timeFormat}
                                            />
                                        )}
                                    </>
                                ) : (
                                    <div className="space-y-3">
                                        <p className="text-[13px] font-semibold text-gray-700">
                                            {t.packagePage.selectedSlots}
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
                                                    onClick={() =>
                                                        handleRemoveSlot(index)
                                                    }
                                                    className="text-redy text-[12px]"
                                                >
                                                    {t.packagePage.remove}
                                                </button>
                                            </div>
                                        ))}
                                    </div>
                                )
                            ) : (
                                <div className="space-y-3">
                                    <p className="text-[13px] font-semibold text-gray-700">
                                        {t.packagePage.selectedSlots}
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
                                                onClick={() =>
                                                    handleRemoveSlot(index)
                                                }
                                                className="text-redy text-[12px]"
                                            >
                                                {t.packagePage.remove}
                                            </button>
                                        </div>
                                    ))}
                                </div>
                            )}

                            {/* FOOTER */}
                            <div className="mt-auto pt-6 space-y-2">
                                <p className="text-[12px] text-gray-500">
                                    {t.packagePage.selectedSlots}:{" "}
                                    {selectedSlots.length} /{" "}
                                    {courseData.maxSlots}
                                </p>

                                <PrimaryButton
                                    fullWidth
                                    disabled={
                                        selectedSlots.length !==
                                        courseData.maxSlots
                                    }
                                    onClick={handleContinue}
                                >
                                    {t.packagePage.continue}
                                </PrimaryButton>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
