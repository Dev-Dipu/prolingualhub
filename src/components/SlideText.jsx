"use client";
import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useLanguage } from "@/context/LanguageContext";

gsap.registerPlugin(ScrollTrigger);

const SlideText = () => {
    const containerRef = useRef(null);
    const wrapperRef = useRef(null);

    useEffect(() => {
        const ctx = gsap.context(() => {
            const words = [
                ...wrapperRef.current.querySelectorAll(".word-line"),
            ];
            const allChars = wrapperRef.current.querySelectorAll(".char");

            const tl = gsap.timeline({
                scrollTrigger: {
                    trigger: containerRef.current,
                    start: "top top",
                    end: "+=300%",
                    scrub: 1,
                    pin: true,
                },
            });

            // -----------------------------------------
            // 1. Stack moves upward (closest → farthest)
            // -----------------------------------------
            const reversed = [...words].reverse(); // closest first

            reversed.forEach((word, i) => {
                tl.to(
                    word,
                    {
                        y: -95 * i, // Upward stacking style like Multitask
                        duration: 1,
                        ease: "power2.out",
                        opacity: 1,
                    },
                    i * 0.3
                );
            });

            // -----------------------------------------
            // 2. Highlight animation (RED instead of green)
            // -----------------------------------------
            tl.to(
                allChars,
                {
                    color: "#DC2626",
                    stagger: 0.04,
                    duration: 0.3,
                    ease: "none",
                },
                ">-0.3"
            );

            // -----------------------------------------
            // 3. Smooth exit (fade + move up)
            // -----------------------------------------
            tl.to(
                words,
                {
                    y: "-=200",
                    opacity: 0,
                    duration: 1,
                    stagger: 0.1,
                    ease: "power1.out",
                },
                ">-0.2"
            );
        }, containerRef);

        return () => ctx.revert();
    }, []);

    const { t } = useLanguage();
    const text = t.slideText.word;
    const copies = 5; // number of clones

    return (
        <div
            ref={containerRef}
            className="h-screen w-full flex items-center justify-center overflow-hidden"
        >
            <div
                ref={wrapperRef}
                className="relative flex flex-col items-center justify-center"
            >
                {Array.from({ length: copies }).map((_, i) => (
                    <div
                        key={i}
                        className="word-line absolute left-1/2 top-1/2 flex text-5xl md:text-9xl font-bold leading-none tracking-tight opacity-40"
                        style={{
                            zIndex: copies - i,
                            transform: "translate(-50%, -50%) scale(0.92)", // tight stack
                        }}
                    >
                        {text.split("").map((char, index) => (
                            <span key={index} className="char inline-block">
                                {char}
                            </span>
                        ))}
                    </div>
                ))}
            </div>
        </div>
    );
};

export default SlideText;
