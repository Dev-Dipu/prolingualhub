"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import BackButton from "@/components/BackButton";
import CalendarPicker from "@/components/CalendarPicker";
import TimeSlotSelector from "@/components/TimeSlotSelector";
import PrimaryButton from "@/components/PrimaryButton";

export default function PrivateLessonPage() {
    const router = useRouter();
    const [selectedDate, setSelectedDate] = useState(new Date());
    const [selectedTime, setSelectedTime] = useState(null);
    const [timeFormat, setTimeFormat] = useState("24h");

    const slots = ["08:00", "09:00", "10:00", "11:00", "12:00", "13:00"];

    const handleContinue = () => {
        if (!selectedDate || !selectedTime) return;
        router.push("/courses/private-lesson/checkout");
    };

    return (
        <div className="h-screen bg-[#FDFDFD] font-[dm_mono]">
            <div className="mx-auto h-[90%] flex flex-col max-w-[1240px] px-6 py-8">
                <BackButton />

                {/* MAIN CONTAINER */}
                <div className="mt-6 flex-1 rounded-2xl border border-gray-200 bg-white overflow-hidden">
                    <div className="h-full grid grid-cols-1 lg:grid-cols-[280px_1fr_340px]">

                        {/* LEFT INFO */}
                        <div className="p-6 border-r border-gray-200">
                            <p className="text-redy text-[12px] font-bold uppercase mb-4">
                                PROLINGUALHUB
                            </p>

                            <h1 className="text-[15px] font-bold uppercase mb-4">
                                PRIVATE ENGLISH LESSONS – 1 HOUR
                            </h1>

                            <p className="text-[13px] text-gray-500 leading-relaxed mb-6">
                                ONE-HOUR PRIVATE ENGLISH LESSONS DESIGNED TO IMPROVE
                                YOUR SPEAKING, CONFIDENCE, AND OVERALL COMMUNICATION
                                WITH PERSONALIZED GUIDANCE.
                            </p>

                            <div className="space-y-3 text-[13px] text-gray-500">
                                <div>1h</div>
                                <div>Google Meet</div>
                                <div>Europe/London</div>
                            </div>
                        </div>

                        {/* CALENDAR */}
                        <CalendarPicker
                            selectedDates={selectedDate ? [selectedDate] : []}
                            onDateSelect={(dates) => {
                                setSelectedDate(dates[0]);
                                setSelectedTime(null);
                            }}
                        />

                        {/* TIME SLOTS */}
                        <div className="p-6 border-l border-gray-200 flex flex-col">
                            {selectedDate && (
                                <>
                                    {/* HEADER */}
                                    <div className="flex items-center justify-between mb-4">
                                        <p className="text-[14px] font-semibold">
                                            Thu {selectedDate.getDate()}
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
                                        availableSlots={slots}
                                        selectedSlot={selectedTime}
                                        onSlotSelect={setSelectedTime}
                                    />
                                </>
                            )}

                            <div className="mt-auto pt-6">
                                <PrimaryButton
                                    fullWidth
                                    disabled={!selectedDate || !selectedTime}
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
