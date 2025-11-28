"use client";
import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const BlurRevealText = () => {
    const containerRef = useRef(null);

    useEffect(() => {
    const ctx = gsap.context(() => {
        const sections = containerRef.current.querySelectorAll(".text-section");

        sections.forEach((section) => {
            const words = section.querySelectorAll(".word");

            const tl = gsap.timeline({
                scrollTrigger: {
                    trigger: section,
                    start: "top top",
                    end: "+=200%",
                    scrub: true,
                    pin: true,
                },
            });

            // SUPER-SMOOTH REVEAL (NO HARD BLUR)
            tl.fromTo(
                words,
                {
                    opacity: 0,
                    scale: 0.85,
                    y: 40,
                    rotationX: 25,     // adds soft 3D reveal
                    transformOrigin: "top center",
                },
                {
                    opacity: 1,
                    scale: 1,
                    y: 0,
                    rotationX: 0,
                    stagger: { amount: 0.6, ease: "power3.out" },
                    ease: "power3.out",
                    duration: 1,
                }
            );

            // HOLD CLEAN STATE
            tl.to(words, { opacity: 1, duration: 0.3 });

            // SMOOTH EXIT (PREMIUM LOOK)
            tl.to(words, {
                opacity: 0,
                scale: 1.15,
                y: -40,
                rotationX: -15,
                stagger: { amount: 0.6, ease: "power2.in" },
                ease: "power2.in",
                duration: 1,
            });
        });
    }, containerRef);

    return () => ctx.revert();
}, []);



    const items = [
        "book : workshop based on 6 senses",
        "book individual sessions based on 6 senses",
        "contact us",
    ];

    return (
        <div ref={containerRef} className="w-full py-20">
            {items.map((item, index) => (
                <div
                    key={index}
                    className="text-section h-screen flex items-center justify-center px-4"
                >
                    <h2 className="w-full md:w-1/2 leading-none text-4xl md:text-7xl font-bold text-black text-center">
                        {item.split("\n").map((line, lineIndex) => (
                            <div key={lineIndex} className="block">
                                {line.split(" ").map((word, wordIndex) => (
                                    <span
                                        key={wordIndex}
                                        className="inline-block overflow-hidden align-bottom mr-4 pb-2"
                                    >
                                        <span className="word inline-block transform-gpu">
                                            {word}
                                        </span>
                                    </span>
                                ))}
                            </div>
                        ))}
                    </h2>
                </div>
            ))}
        </div>
    );
};

export default BlurRevealText;
