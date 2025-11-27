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
                const words = section.querySelectorAll(".word");

                gsap.fromTo(
                    words,
                    {
                        filter: "blur(20px)",
                        opacity: 0,
                        y: 100,
                    },
                    {
                        filter: "blur(0px)",
                        opacity: 1,
                        y: 0,
                        duration: 1,
                        stagger: 0.1,
                        ease: "power3.inout",
                        scrollTrigger: {
                            trigger: section,
                            start: "top 10%",
                            end: "top 80%",
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
        <div ref={containerRef} className="w-full py-20">
            {items.map((item, index) => (
                <div
                    key={index}
                    className="text-section h-screen flex items-center justify-center px-4"
                >
                    <h2 className="md:w-1/2 leading-tight text-5xl md:text-7xl font-bold text-black text-center">
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
