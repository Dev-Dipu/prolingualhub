"use client";

import React, { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Mail, Phone, Linkedin, X } from "lucide-react";

import { useLanguage } from "@/context/LanguageContext";

gsap.registerPlugin(ScrollTrigger);

const videos = [
    {
        lang: "English",
        src: "https://res.cloudinary.com/dbpty5rcx/video/upload/c_fill,ar_9:16/g_auto/f_auto,q_auto/v1/English_lesson_z4c7rn.mp4",
    },
    {
        lang: "Russian",
        src: "https://res.cloudinary.com/dbpty5rcx/video/upload/c_fill,ar_9:16/g_auto/f_auto,q_auto/v1/lv_0_20260108232837_xlcxie.mp4",
    },
];

const Footer = () => {
    const { t } = useLanguage();
    const [selectedVideo, setSelectedVideo] = useState(null);

    const containerRef = useRef(null);
    const iRef = useRef(null);
    const heartRef = useRef(null);
    const textRef = useRef(null);
    const videosRef = useRef(null);

    useEffect(() => {
        const ctx = gsap.context(() => {
            const tl = gsap.timeline({
                scrollTrigger: {
                    trigger: containerRef.current,
                    start: "top 50%",
                    toggleActions: "play none none none",
                },
            });

            tl.from(iRef.current, {
                xPercent: -200,
                opacity: 0,
                duration: 1,
                ease: "power3.out",
            });

            tl.from(
                textRef.current,
                {
                    xPercent: 200,
                    opacity: 0,
                    duration: 1,
                    ease: "power3.out",
                },
                "<",
            );

            tl.from(
                heartRef.current,
                {
                    yPercent: 200,
                    opacity: 0,
                    scale: 0,
                    duration: 0.8,
                    ease: "back.out(1.7)",
                },
                "-=0.6",
            );

            tl.to(iRef.current, { x: -40, duration: 0.1 }, "-=0.2");
            tl.to(textRef.current, { x: 40, duration: 0.1 }, "<");

            tl.to(iRef.current, {
                x: 0,
                duration: 0.8,
                ease: "elastic.out(1, 0.3)",
            });

            tl.to(
                textRef.current,
                {
                    x: 0,
                    duration: 0.8,
                    ease: "elastic.out(1, 0.3)",
                },
                "<",
            );

            // Animate videos
            tl.from(
                videosRef.current.children,
                {
                    scale: 0,
                    opacity: 0,
                    duration: 0.6,
                    stagger: 0.2,
                    ease: "back.out(1.7)",
                },
                "-=0.4",
            );
        }, containerRef);

        return () => ctx.revert();
    }, []);

    // Handle modal open/close
    const openVideo = (video) => {
        setSelectedVideo(video);
        document.body.style.overflow = "hidden";
    };

    const closeVideo = () => {
        setSelectedVideo(null);
        document.body.style.overflow = "auto";
    };

    return (
        <>
            <div
                ref={containerRef}
                className="relative h-screen w-full flex flex-col items-center justify-center overflow-hidden uppercase"
            >
                {/* Main Text */}
                <div className="flex flex-wrap items-center justify-center gap-2 md:gap-4 text-4xl md:text-7xl font-bold text-black text-center">
                    <span ref={iRef}>{t.footer.i}</span>
                    <span ref={heartRef}>❤️</span>
                    <span ref={textRef}>ProlingualHub</span>
                </div>

                {/* Video Thumbnails */}
                <div
                    ref={videosRef}
                    className="mt-8 flex gap-4 md:gap-6 items-center justify-center"
                >
                    {videos.map((video, index) => (
                        <div
                            key={index}
                            onClick={() => openVideo(video)}
                            className="group cursor-pointer"
                        >
                            <div className="relative w-[120px] md:w-[160px] aspect-9/16 rounded-lg overflow-hidden bg-gray-200 shadow-lg hover:shadow-2xl transition-all duration-300 hover:scale-105">
                                <video
                                    src={video.src}
                                    preload="metadata"
                                    className="w-full h-full object-cover"
                                />
                                {/* Overlay */}
                                <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-all duration-300 flex items-center justify-center">
                                    <div className="w-12 h-12 rounded-full bg-white/80 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                        <svg
                                            className="w-6 h-6 text-black ml-1"
                                            fill="currentColor"
                                            viewBox="0 0 24 24"
                                        >
                                            <path d="M8 5v14l11-7z" />
                                        </svg>
                                    </div>
                                </div>
                            </div>
                            <p className="text-xs md:text-sm text-gray-600 text-center mt-2 uppercase">
                                {video.lang}
                            </p>
                        </div>
                    ))}
                </div>

                {/* Contact Icons */}
                <div className="absolute bottom-3 left-2 w-full md:w-auto md:left-10 flex gap-6 md:justify-start items-center p-4">
                    {/* Email */}
                    <a
                        href="mailto:speaklanguage@prolingualhub.com"
                        className="text-gray-400 hover:text-black hover:scale-110 transition-all duration-300 transform"
                        aria-label="Email"
                    >
                        <Mail size={24} strokeWidth={1.5} />
                    </a>

                    {/* Phone */}
                    <a
                        href="tel:+447894994298"
                        className="text-gray-400 hover:text-black hover:scale-110 transition-all duration-300 transform"
                        aria-label="Phone"
                    >
                        <Phone size={24} strokeWidth={1.5} />
                    </a>

                    {/* LinkedIn */}
                    <a
                        href="https://linkedin.com/in/irina-statham-238734387"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-gray-400 hover:text-black hover:scale-110 transition-all duration-300 transform"
                        aria-label="LinkedIn"
                    >
                        <Linkedin size={24} strokeWidth={1.5} />
                    </a>
                </div>
            </div>

            {/* Video Modal */}
            {selectedVideo && (
                <div
                    className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-sm animate-fadeIn"
                    onClick={closeVideo}
                >
                    <div
                        className="relative w-[90vw] max-w-[400px] md:max-w-[500px] aspect-9/16 animate-zoomIn"
                        onClick={(e) => e.stopPropagation()}
                    >
                        {/* Close button */}
                        <button
                            onClick={closeVideo}
                            className="absolute -top-12 right-0 text-white hover:text-red-500 transition-colors duration-300 z-10"
                            aria-label="Close video"
                        >
                            <X size={32} strokeWidth={2} />
                        </button>

                        {/* Video player */}
                        <div className="w-full h-full rounded-lg overflow-hidden shadow-2xl">
                            <video
                                src={selectedVideo.src}
                                controls
                                autoPlay
                                playsInline
                                className="w-full h-full object-cover"
                            />
                        </div>

                        {/* Language label */}
                        <p className="absolute -bottom-10 left-0 right-0 text-center text-white text-sm uppercase">
                            {selectedVideo.lang}
                        </p>
                    </div>
                </div>
            )}
        </>
    );
};

export default Footer;
