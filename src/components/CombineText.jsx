"use client";
import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { TextPlugin } from "gsap/TextPlugin";
import { useLanguage } from "@/context/LanguageContext";

gsap.registerPlugin(ScrollTrigger, TextPlugin);

const CombineText = () => {
    const { t, language } = useLanguage(); // Get language
    const isEn = language === "en";
    const containerRef = useRef(null);
    const wrapperRef = useRef(null);
    const sentenceRef = useRef(null);

    const arrowRef = useRef(null);
    const arrowHeadRef = useRef(null);
    const ctaTextRef = useRef(null);

    const r_count = 8;
    const e_count = 12;

    const middleChars = isEn
        ? [
              ...Array.from({ length: r_count }).map((_, i) => ({
                  char: "r",
                  index: i,
              })),
              ...Array.from({ length: e_count }).map((_, i) => ({
                  char: "e",
                  index: i + r_count,
              })),
          ]
        : [
              ...Array.from({ length: r_count + e_count }).map((_, i) => ({
                  char: "а",
                  index: i,
              })),
          ];

    useEffect(() => {
        const ctx = gsap.context(() => {
            const mm = gsap.matchMedia();

            const duplicates = gsap.utils.toArray(".duplicate-char");

            const setupAnimation = (isMobile) => {
                const tl = gsap.timeline({
                    scrollTrigger: {
                        trigger: containerRef.current,
                        start: "top top",
                        end: "+=400%",
                        scrub: 1.5,
                        pin: true,
                    },
                });

                gsap.set(containerRef.current, { autoAlpha: 1 });

                // --------------------------------
                // STAGE 1 — ENTRY SLIDE
                // --------------------------------
                tl.fromTo(
                    wrapperRef.current,
                    { x: "120vw", opacity: 1 },
                    {
                        x: "0%",
                        duration: 4,
                        ease: "power2.out",
                    }
                );

                // --------------------------------
                // STAGE 2 — TIREEEEEE COLLAPSE
                // --------------------------------
                tl.to(duplicates, {
                    width: 0,
                    opacity: 0,
                    fontSize: 0,
                    margin: 0,
                    padding: 0,
                    letterSpacing: "-10px",
                    duration: 2.5,
                    ease: "power3.inOut",
                    stagger: {
                        amount: 0.5,
                        from: "end",
                    },
                });

                // --------------------------------
                // STAGE 3 — TYPING TEXT ON SCROLL
                // --------------------------------

                const fullText =
                    " " +
                    t.combineText.line1.slice(1).join(" ") +
                    " " +
                    t.combineText.line2.join(" ");

                gsap.to(sentenceRef.current, {
                    text: fullText,
                    duration: 1,
                    ease: "none",
                    scrollTrigger: {
                        trigger: containerRef.current,
                        start: "top top",
                        end: "+=200%",
                        scrub: 1,
                    },
                });

                // --------------------------------
                // STAGE 4 — CTA
                // --------------------------------
                tl.fromTo(
                    ctaTextRef.current,
                    { opacity: 0, scale: 0.8, y: 20 },
                    {
                        opacity: 1,
                        scale: 1,
                        y: 0,
                        duration: 1,
                        ease: "back.out(1.7)",
                    }
                );

                tl.fromTo(
                    arrowRef.current,
                    { strokeDashoffset: 1000 },
                    { strokeDashoffset: 0, duration: 2, ease: "power1.inOut" },
                    "<+=0.2"
                );

                tl.to(
                    arrowHeadRef.current,
                    { opacity: 1, duration: 0.5 },
                    ">-0.5"
                );

                tl.to(containerRef.current, { opacity: 0, duration: 1 }, "+=1");
            };

            mm.add("(min-width: 768px)", () => setupAnimation(false));
            mm.add("(max-width: 767px)", () => setupAnimation(true));
        }, containerRef);

        return () => ctx.revert();
    }, [language, t]);

    return (
        <div
            ref={containerRef}
            className="h-screen w-full flex flex-col items-center justify-center overflow-hidden bg-whitey relative opacity-0"
        >
            {/* WRAPPER WITH FLEX-WRAP (VERY IMPORTANT) */}
            <div
                ref={wrapperRef}
                className="w-4/5 flex flex-wrap items-baseline whitespace-normal gap-x-3 md:gap-x-5 will-change-transform"
            >
                {/* TIRED */}
                <div className="flex flex-row items-baseline font-bold text-black leading-none">
                    {/* PREFIX CHARS */}
                    {isEn ? (
                        <>
                            <span className="text-4xl md:text-9xl">T</span>
                            <span className="text-4xl md:text-9xl">i</span>
                            <span className="text-4xl md:text-9xl">r</span>
                        </>
                    ) : (
                        <>
                            <span className="text-4xl md:text-9xl">У</span>
                            <span className="text-4xl md:text-9xl">с</span>
                            <span className="text-4xl md:text-9xl">т</span>
                        </>
                    )}

                    {middleChars.map((item, i) => {
                        const scale = 1 + i * 1.6;
                        // Hide excess duplicates on mobile
                        // English: Keep first 2 'r's (index 0,1) and first 2 'e's (index 8,9)
                        // Russian: Keep first 3 chars (index 0,1,2)
                        let isHiddenMobile = false;
                        if (isEn) {
                            if (item.char === "r" && item.index >= 2)
                                isHiddenMobile = true;
                            if (item.char === "e" && item.index >= r_count + 2)
                                isHiddenMobile = true;
                        } else {
                            if (i >= 3) isHiddenMobile = true;
                        }

                        return (
                            <span
                                key={`${item.char}-${i}`}
                                className={`duplicate-char origin-bottom-left font-bold inline-block ${
                                    isHiddenMobile
                                        ? "hidden md:inline-block"
                                        : ""
                                }`}
                                style={{
                                    fontSize: `${
                                        window.innerWidth < 768
                                            ? 2 + scale * 0.5
                                            : 10 + scale * 0.5
                                    }em`,
                                    color: "#E63946",
                                    marginLeft: "-2px",
                                }}
                            >
                                {item.char}
                            </span>
                        );
                    })}

                    {/* SUFFIX CHARS */}
                    {isEn ? (
                        <>
                            <span className="text-4xl md:text-9xl">e</span>
                            <span className="text-4xl md:text-9xl mr-4 md:mr-6">
                                d
                            </span>
                        </>
                    ) : (
                        <>
                            <span className="text-4xl md:text-9xl">л</span>
                            <span className="text-4xl md:text-9xl mr-4 md:mr-6">
                                и
                            </span>
                        </>
                    )}
                </div>

                {/* SCROLL-TYPING TEXT (WRAPS AUTOMATICALLY) */}
                <span
                    ref={sentenceRef}
                    className="text-2xl md:text-7xl font-bold text-black inline-block break-normal max-w-full"
                ></span>
            </div>

            {/* CTA SECTION */}
            <div className="absolute bottom-16 right-22 flex flex-col items-end pointer-events-none z-20">
                <div
                    ref={ctaTextRef}
                    className="font-[supfont] text-2xl md:text-4xl text-redy -mb-4 md:-mb-8 mr-20 md:mr-42 origin-bottom-right font-bold"
                >
                    {t.combineText.cta}
                </div>

                <svg
                    width="180"
                    height="120"
                    viewBox="0 0 180 120"
                    className="w-24 h-16 md:w-48 md:h-32 text-redy translate-x-4"
                    style={{ overflow: "visible" }}
                >
                    <path
                        ref={arrowRef}
                        d="M 20 10 C 60 10, 150 10, 150 50 C 150 80, 100 80, 100 50 C 100 20, 160 80, 160 110"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeDasharray="1000"
                        strokeDashoffset="1000"
                    />
                    <path
                        ref={arrowHeadRef}
                        d="M 145 100 L 160 110 L 170 95"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        style={{ opacity: 0 }}
                    />
                </svg>
            </div>
        </div>
    );
};

export default CombineText;
