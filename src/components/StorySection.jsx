"use client";

import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from "next/image";
import { useLanguage } from "@/context/LanguageContext";

gsap.registerPlugin(ScrollTrigger);

const StorySection = () => {
    const { t } = useLanguage();

    const containerRef = useRef(null);
    const titleRef = useRef(null);
    const imageWrapperRef = useRef(null);
    const arrowRef = useRef(null);

    useEffect(() => {
        const isMobile = window.innerWidth < 768;

        let ctx = gsap.context(() => {
            const titleWords =
                titleRef.current.querySelectorAll(".word");

            gsap.set(titleWords, {
                yPercent: 120,
                opacity: 0,
            });

            const tl = gsap.timeline({
                scrollTrigger: {
                    trigger: containerRef.current,
                    start: "top top",
                    end: "+=600%",
                    pin: true,
                    scrub: 1,
                    anticipatePin: 1,
                },
            });

            // TITLE REVEAL
            tl.to(titleWords, {
                yPercent: 0,
                opacity: 1,
                duration: 0.5,
                stagger: 0.02,
                ease: "power2.out",
            });

            tl.to({}, { duration: 0.2 });

            // MOVE UP VISUALS
            tl.to(
                titleRef.current,
                {
                    yPercent: -150,
                    opacity: 0,
                    duration: 1,
                    ease: "power2.inOut",
                },
                "moveUp"
            );

            tl.to(
                arrowRef.current,
                {
                    xPercent: -25,
                    duration: 1,
                    ease: "power2.inOut",
                },
                "moveUp"
            );

            tl.to(
                [imageWrapperRef.current, arrowRef.current],
                {
                    y: -window.innerHeight * (isMobile ? 0.2 : 0.35),
                    scale: 0.8,
                    duration: 1,
                    ease: "power2.inOut",
                },
                "moveUp"
            );
        }, containerRef);

        return () => ctx.revert();
    }, []);

    const renderTitle = (text) => {
        return text.split(" ").map((word, i) => (
            <span
                key={i}
                className="inline-block overflow-hidden align-bottom mr-2 md:mr-4 pb-2"
            >
                <span className="word inline-block transform-gpu leading-none">
                    {word}
                </span>
            </span>
        ));
    };

    return (
        <>
            {/* ================= PINNED ANIMATION SECTION ================= */}
            <section
                ref={containerRef}
                className="h-screen w-full bg-whitey flex flex-col items-center pt-24 font-[dm_mono] relative"
            >
                {/* TITLE */}
                <div
                    ref={titleRef}
                    className="text-center px-4 z-20 w-full max-w-6xl mx-auto absolute top-24 left-0 right-0"
                >
                    <h2 className="text-4xl md:text-7xl font-bold text-blacky uppercase leading-none tracking-tight flex flex-wrap justify-center">
                        {renderTitle(t.story.title1)}
                    </h2>
                    <h2 className="text-4xl md:text-7xl font-bold text-blacky uppercase leading-none tracking-tight flex flex-wrap justify-center">
                        {renderTitle(t.story.title2)}
                    </h2>
                </div>

                {/* IMAGE + ARROW */}
                <div className="absolute inset-0 flex flex-col items-center justify-center z-10 mt-10 md:mt-56">
                    <div className="relative">
                        {/* IMAGE */}
                        <div
                            ref={imageWrapperRef}
                            className="relative bg-white p-3 pb-12 shadow-[0_10px_30px_rgba(0,0,0,0.1)] -rotate-3 w-64 md:w-80 border border-gray-100 will-change-transform"
                        >
                            <div className="w-full aspect-3/4 bg-gray-200 overflow-hidden relative">
                                <Image
                                    src="/profile.webp"
                                    alt="Irina"
                                    width={622}
                                    height={415}
                                    className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-500"
                                />
                            </div>
                        </div>

                        {/* ARROW */}
                        <div
                            ref={arrowRef}
                            className="absolute top-10 right-4 md:top-20 md:right-[8%] translate-x-8 md:translate-x-32 flex flex-col items-center z-20 will-change-transform"
                        >
                            <span className="font-[family-name:var(--font-supfont)] text-redy text-2xl md:text-4xl -rotate-6 mb-2 translate-x-12">
                                {t.story.meetIrina}
                            </span>

                            {/* SVG ARROW */}
                            <svg
                            className="md:scale-175 scale-125"
                            width="46"
                            height="45"
                            viewBox="0 0 46 45"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <g clipPath="url(#clip0_3512_1141)">
                                <path
                                    fillRule="evenodd"
                                    clipRule="evenodd"
                                    d="M1.85838 29.3863C17.6252 34.5019 30.8532 25.4737 38.7995 13.2124C38.9364 13.0021 39.2302 12.9454 39.455 13.0873C39.6798 13.2291 39.7523 13.5153 39.6154 13.7256C31.4473 26.3308 17.8 35.5155 1.59158 30.2564C1.33892 30.175 1.19364 29.9135 1.26699 29.6725C1.33985 29.4324 1.60463 29.3044 1.85838 29.3863Z"
                                    fill="#DC2626"
                                />
                                <path
                                    fillRule="evenodd"
                                    clipRule="evenodd"
                                    d="M39.0644 13.6988C38.3333 14.0613 37.4215 14.5264 37.3163 14.5762C34.465 15.9254 31.5286 16.7658 28.3431 17.2155C28.0846 17.2523 27.8339 17.0775 27.7837 16.8263C27.7335 16.5752 27.9034 16.3413 28.1619 16.3045C31.251 15.8694 34.0991 15.0551 36.8647 13.746C37.026 13.6698 39.075 12.6232 39.5073 12.4423C39.6842 12.3673 39.8111 12.379 39.8409 12.3845C39.9999 12.4079 40.0959 12.4862 40.1578 12.5595C40.2271 12.6427 40.3079 12.8054 40.2797 13.0313C40.2493 13.2677 40.0611 13.7349 40.0237 13.857C39.4643 15.7007 38.671 17.704 38.3363 19.7151C38.017 21.6329 38.1149 23.5601 39.3154 25.3465C39.4618 25.5639 39.4018 25.8471 39.1829 25.9782C38.9639 26.1094 38.667 26.0384 38.5207 25.8211C37.1789 23.8236 37.0366 21.6722 37.3933 19.529C37.7262 17.5299 38.4979 15.5378 39.0644 13.6988Z"
                                    fill="#DC2626"
                                />
                            </g>
                            <defs>
                                <clipPath id="clip0_3512_1141">
                                    <rect
                                        width="32.918"
                                        height="34.9237"
                                        fill="white"
                                        transform="matrix(-0.435488 0.900195 0.900195 0.435488 14.3359 0)"
                                    />
                                </clipPath>
                            </defs>
                        </svg>
                        </div>
                    </div>
                </div>
            </section>

            {/* ================= NORMAL SCROLLING TEXT ================= */}
            <section className="w-full py-24 flex justify-center px-6 bg-whitey">
                <p className="max-w-3xl text-center uppercase font-bold text-redy text-sm md:text-2xl leading-relaxed tracking-wide">
                    {t.story.content}
                </p>
            </section>
        </>
    );
};

export default StorySection;
