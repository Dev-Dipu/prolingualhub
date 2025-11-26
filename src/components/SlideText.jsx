"use client";
import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const SlideText = () => {
    const containerRef = useRef(null);
    const wrapperRef = useRef(null);

    useEffect(() => {
        const ctx = gsap.context(() => {
            const words = wrapperRef.current.querySelectorAll(".word-line");
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

            // -------------------------------------------
            // FIX 1 — closest → farthest movement
            // -------------------------------------------
            const reversedWords = [...words].reverse();

            reversedWords.forEach((word, i) => {
                const targetY = -70 * i; // Reduced gap (70%)

                tl.to(
                    word,
                    {
                        yPercent: targetY,
                        duration: 1,
                        ease: "power2.out",
                    },
                    i * 0.5 // closest goes first
                );
            });

            // -------------------------------------------
            // FIX 2 — Color change top → bottom, left → right
            // -------------------------------------------
            tl.to(
                allChars,
                {
                    color: "#DC2626",
                    stagger: 0.05,
                    duration: 0.2,
                    ease: "none",
                },
                ">-0.5"
            );
        }, containerRef);

        return () => ctx.revert();
    }, []);

    const text = "Book";
    const copies = 5;

    return (
        <div
            ref={containerRef}
            className="h-screen w-full flex items-center justify-center bg-white overflow-hidden"
        >
            <div
                ref={wrapperRef}
                className="relative flex flex-col items-center justify-center"
            >
                {Array.from({ length: copies }).map((_, i) => (
                    <div
                        key={i}
                        className="word-line absolute left-1/2 top-1/2 -translate-y-1/2 flex text-5xl md:text-9xl font-bold text-black leading-none tracking-tight"
                        style={{
                            zIndex: copies - i,
                            transform: "translate(-50%, -50%) scale(0.9)", // reduced spacing
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
