"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useLanguage } from "@/context/LanguageContext";

export default function ConfirmationPage() {
    const router = useRouter();
    const { t, language } = useLanguage();
    const [confirmationData, setConfirmationData] = useState(null);

    useEffect(() => {
        const data = sessionStorage.getItem("confirmationData");
        if (data) {
            setConfirmationData(JSON.parse(data));
        } else {
            const target = language === "ru" ? "/ru/courses" : "/courses";
            router.push(target);
        }
    }, [router, language]);

    if (!confirmationData) {
        return (
            <div className="min-h-screen flex items-center justify-center font-[dm_mono]">
                Loading...
            </div>
        );
    }

    const formatEventDetails = () => {
        if (confirmationData.courseType === "package") {
            return t.confirmation.types.package;
        }
        if (confirmationData.courseType === "private-lesson") {
            return t.confirmation.types.private;
        }
        // Default to workshop if not specified or workshop
        return t.confirmation.types.workshop;
    };

    const formatWhen = () => {
        if (confirmationData.date) {
            return `${confirmationData.date} · ${confirmationData.time} (${confirmationData.timezone || "GMT"})`;
        }
        return t.confirmation.scheduledViaEmail;
    };

    const handleAction = () => {
        const target = language === "ru" ? "/ru/courses" : "/courses";
        router.push(target);
    };

    return (
        <div className="h-dvh w-full bg-whitey font-[dm_mono] flex items-center justify-center px-8">
            <div className="w-full max-w-[520px] bg-white border border-gray-200 rounded-2xl px-8 py-10 my-10">
                {/* ICON */}
                <div className="flex justify-center md:mb-6 mb-4">
                    <div className="md:w-14 md:h-14 w-10 h-10 rounded-full bg-pink-100 flex items-center justify-center">
                        <svg
                            className="md:w-7 md:h-7 w-5 h-5 text-redy"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={3}
                                d="M5 13l4 4L19 7"
                            />
                        </svg>
                    </div>
                </div>

                {/* TITLE */}
                <h1 className="md:text-[22px] text-[18px] font-bold uppercase text-center text-blacky tracking-wide">
                    {t.confirmation.title}
                </h1>

                <p className="mt-2 md:text-[14px] text-[12px] text-center text-gray-500 leading-relaxed">
                    {t.confirmation.emailSent}
                </p>

                {/* DIVIDER */}
                <div className="md:my-8 my-4 border-t border-gray-200" />

                {/* DETAILS */}
                <div className="space-y-6">
                    {/* WHAT */}
                    <div className="grid grid-cols-[80px_1fr] gap-4">
                        <p className="text-[14px] font-bold uppercase text-blacky">
                            {t.confirmation.what}
                        </p>
                        <p className="text-[14px] text-gray-600 leading-relaxed">
                            {formatEventDetails()}
                        </p>
                    </div>

                    {/* WHEN */}
                    <div className="grid grid-cols-[80px_1fr] gap-4">
                        <p className="text-[14px] font-bold uppercase text-blacky">
                            {t.confirmation.when}
                        </p>
                        <p className="text-[14px] text-gray-600">
                            {formatWhen()}
                        </p>
                    </div>

                    {/* WHO */}
                    <div className="grid grid-cols-[80px_1fr] gap-4">
                        <p className="text-[14px] font-bold uppercase text-blacky">
                            {t.confirmation.who}
                        </p>
                        <div className="space-y-3 text-[14px] text-gray-600">
                            <div>
                                <p>Irina Statham</p>
                                <p>irinaxy2@gmail.com</p>
                            </div>

                            <div>
                                <p>{confirmationData.name}</p>
                                <p>{confirmationData.email}</p>
                                <p>+{confirmationData.phone}</p>
                            </div>
                        </div>
                    </div>

                    {/* WHERE */}
                    <div className="grid grid-cols-[80px_1fr] gap-4">
                        <p className="text-[14px] font-bold uppercase text-blacky">
                            {t.confirmation.where}
                        </p>
                        <a
                            href="https://meet.google.com"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-[14px] text-gray-600 hover:underline inline-flex items-center gap-2"
                        >
                            Google Meet
                            <svg
                                className="w-4 h-4"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                                />
                            </svg>
                        </a>
                    </div>
                </div>

                {/* FOOTER */}
                <div className="mt-10 pt-6 border-t border-gray-200 text-center">
                    <p className="text-[13px] text-gray-500">
                        {t.confirmation.needChange}{" "}
                        <button
                            onClick={handleAction}
                            className="font-semibold underline text-blacky hover:text-redy"
                        >
                            {t.confirmation.reschedule}
                        </button>{" "}
                        or{" "}
                        <button
                            onClick={handleAction}
                            className="font-semibold underline text-blacky hover:text-redy"
                        >
                            {t.confirmation.cancel}
                        </button>
                    </p>
                </div>
            </div>
        </div>
    );
}
