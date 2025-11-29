"use client";
import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import { useLanguage } from "@/context/LanguageContext";

gsap.registerPlugin(ScrollTrigger);

const CombineText = () => {
    const { t } = useLanguage();
    const containerRef = useRef(null);
    const textRef = useRef(null);

    useEffect(() => {
        const ctx = gsap.context(() => {
            const mm = gsap.matchMedia();
            const words = textRef.current.querySelectorAll(".word");

            mm.add("(min-width: 768px)", () => {
                // Desktop Animation
                const tl = gsap.timeline({
                    scrollTrigger: {
                        trigger: containerRef.current,
                        start: "top top",
                        end: "+=200%",
                        scrub: 1.5,
                        pin: true,
                    },
                });

                // Initial scattered states (Desktop)
                tl.from(
                    words[0],
                    {
                        xPercent: -150,
                        yPercent: -150,
                        // rotation: -15,
                        filter: "blur(7.5px)",
                        opacity: 0.8,
                    },
                    0
                );
                tl.from(
                    words[2],
                    {
                        xPercent: 150,
                        yPercent: -100,
                        // rotation: 10,
                        filter: "blur(7.5px)",
                        opacity: 0.8,
                    },
                    0
                );
                tl.from(
                    words[3],
                    {
                        xPercent: 200,
                        yPercent: 50,
                        // rotation: 5,
                        filter: "blur(7.5px)",
                        opacity: 0.8,
                    },
                    0
                );
                tl.from(
                    words[4],
                    {
                        xPercent: -150,
                        yPercent: 150,
                        // rotation: -10,
                        filter: "blur(7.5px)",
                        opacity: 0.8,
                    },
                    0
                );
                tl.from(
                    words[5],
                    {
                        yPercent: 200,
                        // rotation: -5,
                        filter: "blur(7.5px)",
                        opacity: 0.8,
                    },
                    0
                );
                tl.from(
                    words[6],
                    {
                        xPercent: 150,
                        yPercent: 150,
                        // rotation: 15,
                        filter: "blur(7.5px)",
                        opacity: 0.8,
                    },
                    0
                );
            });

            mm.add("(max-width: 767px)", () => {
                // Mobile Animation (Reduced movement)
                const tl = gsap.timeline({
                    scrollTrigger: {
                        trigger: containerRef.current,
                        start: "top top",
                        end: "+=200%",
                        scrub: 1.5,
                        pin: true,
                    },
                });

                // Initial scattered states (Mobile - 50% movement)
                tl.from(
                    words[0],
                    {
                        xPercent: -75,
                        yPercent: -75,
                        // rotation: -15,
                        filter: "blur(7.5px)",
                        opacity: 0.8,
                    },
                    0
                );
                tl.from(
                    words[2],
                    {
                        xPercent: 75,
                        yPercent: -50,
                        // rotation: 10,
                        filter: "blur(7.5px)",
                        opacity: 0.8,
                    },
                    0
                );
                tl.from(
                    words[3],
                    {
                        xPercent: 100,
                        yPercent: 25,
                        // rotation: 5,
                        filter: "blur(7.5px)",
                        opacity: 0.8,
                    },
                    0
                );
                tl.from(
                    words[4],
                    {
                        xPercent: -75,
                        yPercent: 75,
                        // rotation: -10,
                        filter: "blur(7.5px)",
                        opacity: 0.8,
                    },
                    0
                );
                tl.from(
                    words[5],
                    {
                        yPercent: 100,
                        // rotation: -5,
                        filter: "blur(7.5px)",
                        opacity: 0.8,
                    },
                    0
                );
                tl.from(
                    words[6],
                    {
                        xPercent: 75,
                        yPercent: 75,
                        // rotation: 15,
                        filter: "blur(7.5px)",
                        opacity: 0.8,
                    },
                    0
                );
            });
        }, containerRef);

        return () => ctx.revert();
    }, []);

    return (
        <div
            ref={containerRef}
            className="h-screen w-full flex items-center justify-center overflow-hidden uppercase"
        >
            <div
                ref={textRef}
                className="flex flex-col items-center justify-center text-5xl md:text-7xl font-bold text-black leading-tight text-center"
            >
                <div className="flex flex-wrap justify-center gap-x-2 md:gap-x-4 gap-y-2 leading-tight">
                    {t.combineText.line1.map((word, index) => (
                        <span
                            key={`line1-${index}`}
                            className="word inline-block"
                        >
                            {word}
                        </span>
                    ))}
                </div>
                <div className="flex flex-wrap justify-center gap-x-2 md:gap-x-4 gap-y-2 leading-none">
                    {t.combineText.line2.map((word, index) => (
                        <span
                            key={`line2-${index}`}
                            className="word inline-block"
                        >
                            {word}
                        </span>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default CombineText;
