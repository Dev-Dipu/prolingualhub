"use client";
import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const BlurRevealText = () => {
    const containerRef = useRef(null);

    useEffect(() => {
        const ctx = gsap.context(() => {
            const sections =
                containerRef.current.querySelectorAll(".text-section");

            sections.forEach((section) => {
                const chars = section.querySelectorAll(".char");

                gsap.fromTo(
                    chars,
                    {
                        filter: "blur(15px)",
                        opacity: 0,
                        y: 50,
                        rotateX: 45,
                        scale: 1.2,
                    },
                    {
                        filter: "blur(0px)",
                        opacity: 1,
                        y: 0,
                        rotateX: 0,
                        scale: 1,
                        duration: 1,
                        stagger: 0.02, // Animate characters one by one
                        ease: "power3.out",
                        scrollTrigger: {
                            trigger: section,
                            start: "top 50%",
                            end: "top 20%",
                            scrub: 1,
                        },
                    }
                );
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
        <div ref={containerRef} className="w-full bg-white py-20">
            {items.map((item, index) => (
                <div
                    key={index}
                    className="text-section h-screen flex items-center justify-center px-4"
                >
                    <h2 className="w-full md:w-2/3 leading-tight text-4xl md:text-7xl font-bold text-black text-center">
                        {item.split("\n").map((line, lineIndex) => (
                            <div key={lineIndex} className="block">
                                {line.split(" ").map((word, wordIndex) => (
                                    <span
                                        key={wordIndex}
                                        className="inline-block whitespace-nowrap mr-4"
                                    >
                                        {word
                                            .split("")
                                            .map((char, charIndex) => (
                                                <span
                                                    key={charIndex}
                                                    className="char inline-block origin-bottom"
                                                >
                                                    {char}
                                                </span>
                                            ))}
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
