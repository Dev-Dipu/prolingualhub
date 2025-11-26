"use client"
import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const CombineText = () => {
    const containerRef = useRef(null);
    const textRef = useRef(null);

    useEffect(() => {
        const ctx = gsap.context(() => {
            const tl = gsap.timeline({
                scrollTrigger: {
                    trigger: containerRef.current,
                    start: "top top",
                    end: "+=200%",
                    scrub: 1.5,
                    pin: true,
                },
            });

            const words = textRef.current.querySelectorAll(".word");

            // Initial scattered states
            // "tired"
            tl.from(
                words[0],
                {
                    xPercent: -150,
                    yPercent: -150,
                    rotation: -15,
                    filter: "blur(7.5px)",
                    opacity: 0.8,
                },
                0
            );

            // "of paying" - Center (Anchor, stays clean)
            // We don't animate this one, or very subtly, to keep it as the "clean center"

            // "but"
            tl.from(
                words[2],
                {
                    xPercent: 150,
                    yPercent: -100,
                    rotation: 10,
                    filter: "blur(7.5px)",
                    opacity: 0.8,
                },
                0
            );

            // "still"
            tl.from(
                words[3],
                {
                    xPercent: 200,
                    yPercent: 50,
                    rotation: 5,
                    filter: "blur(7.5px)",
                    opacity: 0.8,
                },
                0
            );

            // "cannot"
            tl.from(
                words[4],
                {
                    xPercent: -150,
                    yPercent: 150,
                    rotation: -10,
                    filter: "blur(7.5px)",
                    opacity: 0.8,
                },
                0
            );

            // "speak"
            tl.from(
                words[5],
                {
                    yPercent: 200,
                    rotation: -5,
                    filter: "blur(7.5px)",
                    opacity: 0.8,
                },
                0
            );

            // "english"
            tl.from(
                words[6],
                {
                    xPercent: 150,
                    yPercent: 150,
                    rotation: 15,
                    filter: "blur(7.5px)",
                    opacity: 0.8,
                },
                0
            );
        }, containerRef);

        return () => ctx.revert();
    }, []);

    return (
        <div
            ref={containerRef}
            className="h-screen w-full flex items-center justify-center overflow-hidden"
        >
            <div
                ref={textRef}
                className="flex flex-col items-center justify-center text-5xl md:text-7xl font-bold text-black leading-tight text-center"
            >
                <div className="flex flex-wrap justify-center gap-x-4 gap-y-2 leading-tight">
                    <span className="word inline-block">tired</span>
                    <span className="word inline-block">of paying</span>
                    <span className="word inline-block">but</span>
                    <span className="word inline-block">still</span>
                </div>
                <div className="flex flex-wrap justify-center gap-x-4 gap-y-2 leading-none">
                    <span className="word inline-block">cannot</span>
                    <span className="word inline-block">speak</span>
                    <span className="word inline-block">english</span>
                </div>
            </div>
        </div>
    );
};

export default CombineText;
