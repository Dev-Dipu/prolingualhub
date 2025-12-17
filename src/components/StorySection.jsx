"use client";
import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const StorySection = () => {
    const containerRef = useRef(null);
    const titleRef = useRef(null);
    const imageWrapperRef = useRef(null);
    const arrowRef = useRef(null);
    const textRef = useRef(null);
    const textContainerRef = useRef(null);

    useEffect(() => {
    let ctx = gsap.context(() => {
      // --- SETUP ---
      const titleWords = titleRef.current.querySelectorAll(".word");
      gsap.set(titleWords, { yPercent: 120, opacity: 0 }); // Hidden initially

      // Split text into words and wrap each in a span
      const textContent = textRef.current.textContent;
      textRef.current.innerHTML = textContent
        .split(" ")
        .map((word) => `<span class="word-item md:text-xl">${word} </span>`)
        .join("");

      const words = textRef.current.querySelectorAll(".word-item");

      // Text setup: Start way below viewport, fully visible container
      gsap.set(textRef.current, {
        y: window.innerHeight * 0.6, // Start much lower
        opacity: 1,
      });

      gsap.set(words, {
        color: "#9CA3AF", // Gray-400
      });

      // MAIN TIMELINE
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top top",
          end: "+=600%", // Extended for smooth line-by-line reveal
          pin: true,
          scrub: 1,
          anticipatePin: 1,
        },
      });

      // --- STEP 0: TITLE REVEAL (Fast, as we pin) ---
      tl.to(titleWords, {
        yPercent: 0,
        opacity: 1,
        duration: 0.5,
        stagger: 0.02,
        ease: "power2.out",
      });

      // Hold title for a brief moment
      tl.to({}, { duration: 0.2 });

      // --- STEP 1: MOVE VISUALS UP (Clear space for text) ---
      // Move Title OUT (Up)
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

      // Move Image & Arrow UP and Shrink slightly
      tl.to(
        [imageWrapperRef.current, arrowRef.current],
        {
          y: -window.innerHeight * 0.2,
          scale: 0.8,
          rotation: 0,
          duration: 1,
          ease: "power2.inOut",
        },
        "moveUp"
      );

      // --- STEP 2: TEXT SLOWLY RISES + TURNS RED + FADES ---
      // All happening simultaneously for smooth continuous motion
      tl.to(
        textRef.current,
        {
          y: "40px", // Move all the way up
          duration: 4, // Long duration for smooth scroll
          ease: "linear",
        },
        "textReveal"
      );

      // --- STEP 3: TURN RED (Word by word as text rises) ---
      tl.to(
        words,
        {
          color: "#DC2626", // Turn Red
          duration: 8, // Shorter so red completes before fade
          stagger: 0.025, // Word by word
          ease: "none",
        },
        "textReveal" // Start at same time as text rises
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
        <div
            ref={containerRef}
            className="h-screen w-full bg-whitey flex flex-col items-center pt-24 font-[dm_mono] overflow-hidden relative"
        >
            {/* Title Wrapper */}
            <div
                ref={titleRef}
                className="text-center px-4 z-20 w-full max-w-6xl mx-auto absolute top-24 left-0 right-0"
            >
                <h2 className="text-4xl md:text-7xl font-bold text-blacky uppercase leading-none tracking-tight flex flex-wrap justify-center">
                    {renderTitle("The Story Behind")}
                </h2>
                <h2 className="text-4xl md:text-7xl font-bold text-blacky uppercase leading-none tracking-tight flex flex-wrap justify-center">
                    {renderTitle("Prolingual Hub")}
                </h2>
            </div>

            {/* Central Content (Images) */}
            <div className="absolute inset-0 flex flex-col items-center justify-center z-10 pointer-events-none mt-10 md:mt-20">
                <div className="relative">
                    {/* Polaroid Image */}
                    <div
                        ref={imageWrapperRef}
                        className="relative bg-white p-3 pb-12 shadow-[0_10px_30px_rgba(0,0,0,0.1)] -rotate-3 w-64 md:w-80 border border-gray-100 will-change-transform"
                    >
                        <div className="w-full aspect-3/4 bg-gray-200 overflow-hidden relative grayscale opacity-90">
                            <img
                                src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=688&auto=format&fit=crop"
                                alt="Irina"
                                className="w-full h-full object-cover"
                            />
                        </div>
                    </div>

                    {/* Arrow Element */}
                    <div
                        ref={arrowRef}
                        className="absolute top-10 right-4 md:top-20 md:right-1/4 translate-x-8 md:translate-x-32 flex flex-col items-center z-20 will-change-transform"
                    >
                        <span className="font-[family-name:var(--font-supfont)] text-redy text-2xl md:text-4xl -rotate-12 mb-2 translate-x-4">
                            meet irina
                        </span>
                        <svg
                            width="80"
                            height="80"
                            viewBox="0 0 100 100"
                            className="text-redy w-12 h-12 md:w-20 md:h-20 -rotate-12"
                        >
                            <path
                                d="M90,10 C90,10 30,30 20,90"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="2.5"
                                strokeLinecap="round"
                            />
                            <path
                                d="M10,80 L20,90 L35,80"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="2.5"
                                strokeLinecap="round"
                            />
                        </svg>
                    </div>
                </div>
            </div>

            {/* Content Text Container - Positioned below the initial image position */}
            {/* We position this relatively low so it scrolls up INTO view */}
            <div
                ref={textContainerRef}
                className="absolute bottom-0 left-0 w-full h-1/2 flex items-center justify-center px-6 pointer-events-none pb-20"
            >
                <div ref={textRef} className="max-w-3xl text-center">
                    <p className="text-lg md:text-3xl font-bold leading-relaxed uppercase tracking-wide">
                        IRINA MOVED TO THE UK OVER 26 YEARS AGO WITH NO ENGLISH.
                        SHE KNOWS FIRST-HAND HOW CONFUSING, FRUSTRATING, AND
                        OVERWHELMING IT CAN FEEL TO COMMUNICATE IN A NEW
                        LANGUAGE. THAT EXPERIENCE SHAPED THE WAY SHE TEACHES
                        TODAY — PRACTICAL, SUPPORTIVE, AND FOCUSED ON WHAT
                        ACTUALLY HELPS PEOPLE FEEL CONFIDENT AND UNDERSTOOD.
                        TODAY, AS THE FOUNDER OF PROLINGUAL HUB LTD, IRINA HELPS
                        NON-NATIVE PROFESSIONALS BUILD REAL-WORLD ENGLISH SKILLS
                        THROUGH A HUMAN, SENSORY-LED APPROACH THAT MAKES
                        LEARNING FEEL NATURAL AND ACHIEVABLE.
                    </p>
                </div>
            </div>
        </div>
    );
};

export default StorySection;
