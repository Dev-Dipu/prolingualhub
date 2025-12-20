"use client";

import { useRouter } from "next/navigation";
import BackButton from "@/components/BackButton";
import PrimaryButton from "@/components/PrimaryButton";
import { Calendar } from "lucide-react";

export default function WorkshopPage() {
    const router = useRouter();

    const workshopData = {
        title: "MONTHLY ENGLISH WORKSHOP",
        duration: "(1 HOUR)",
        description:
            "A Focused Group Workshop To Strengthen Your English—Every Month.",
        date: "Saturday, Jan 11, 2026",
        time: "10:00 AM - 11:00 AM",
        timezone: "GMT",
        price: 68,
        seatsLeft: 12,
        whatYouLearn: [
            "ENGAGE IN PRACTICAL SPEAKING ACTIVITIES",
            "RECEIVE REAL-TIME FEEDBACK FROM THE INSTRUCTOR",
            "IMPROVE FLUENCY THROUGH THEMED SESSIONS",
            "SUITABLE FOR ALL LEVELS (A2-B2)",
        ],
        aboutWorkshop:
            "DIVE INTO HANDS-ON LEARNING! OUR WORKSHOP LETS CURIOUS MINDS EXPLORE, EXPERIMENT, AND EXCEL IN [SPECIFIC FIELD/TOPIC], WHETHER YOU'RE A BEGINNER OR AIMING TO SHARPEN YOUR SKILLS.",
    };

    return (
        <div className="min-h-screen bg-[#FDFDFD] font-[dm_mono]">
            <div className="mx-auto flex flex-col h-screen max-w-[1240px] px-6 py-8">
                <BackButton />

                {/* HEADER */}
                <div className="mt-6 max-w-3xl">
                    <h1 className="text-[30px] font-bold uppercase text-black leading-tight">
                        {workshopData.title}{" "}
                        <span className="text-[15px] font-normal text-gray-500">
                            {workshopData.duration}
                        </span>
                    </h1>

                    <p className="mt-2 text-[15px] text-gray-500">
                        {workshopData.description}
                    </p>

                    <div className="mt-4 inline-flex items-center gap-2 rounded-md border border-gray-200 px-3 py-2 text-[14px] text-gray-600">
                        <Calendar className="h-4 w-4" />
                        <span>
                            {workshopData.date} · {workshopData.time} (
                            {workshopData.timezone})
                        </span>
                    </div>
                </div>

                {/* MAIN GRID */}
                <div className="mt-8 h-full grid grid-cols-1 lg:grid-cols-[2fr_1fr] gap-8 items-start">
                    {/* LEFT CARD */}
                    <div className="rounded-2xl border h-full border-gray-200 bg-white">
                        <div className="p-6 h-1/2">
                            <h2 className="text-[15px] font-bold uppercase text-black mb-4">
                                What You’ll Learn
                            </h2>

                            <ul className="space-y-3">
                                {workshopData.whatYouLearn.map((item, i) => (
                                    <li
                                        key={i}
                                        className="flex gap-2 text-[14px] text-gray-600"
                                    >
                                        <span>•</span>
                                        <span>{item}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>

                        <div className="border-t border-gray-200 mx-6" />

                        <div className="p-6">
                            <h2 className="text-[15px] font-bold uppercase text-black mb-4">
                                About the Workshop
                            </h2>
                            <p className="text-[14px] leading-relaxed text-gray-600">
                                {workshopData.aboutWorkshop}
                            </p>
                        </div>
                    </div>

                    {/* RIGHT SUMMARY */}
                    <div className="lg:sticky lg:top-8 h-full">
                        <div className="rounded-2xl border h-full border-gray-200 bg-white p-6 flex flex-col justify-between">
                            <div>
                                <div className="mb-5">
                                    <div className="inline-flex rounded-lg bg-redy p-3">
                                        <Calendar className="h-5 w-5 text-white" />
                                    </div>
                                </div>

                                <p className="text-[15px] font-bold uppercase text-black">
                                    {workshopData.date}
                                </p>
                                <p className="text-[14px] text-gray-500">
                                    {workshopData.time} ({workshopData.timezone})
                                </p>

                                <div className="my-6 border-t border-dashed border-gray-200" />
                            </div>

                            <div>
                                <p className="text-[42px] font-bold text-black leading-none">
                                    £{workshopData.price}
                                </p>
                                <p className="mt-2 text-[14px] font-semibold uppercase text-gray-600">
                                    {workshopData.seatsLeft} Seats Left
                                </p>

                                <div className="mt-6">
                                    <PrimaryButton
                                        fullWidth
                                        onClick={() =>
                                            router.push(
                                                "/courses/workshop/checkout"
                                            )
                                        }
                                    >
                                        Join Workshop
                                    </PrimaryButton>
                                </div>

                                <p className="mt-4 text-[12px] uppercase text-gray-400 leading-snug">
                                    Once booked, workshop details will be sent to your email
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
