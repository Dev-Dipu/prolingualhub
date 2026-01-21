"use client";

import Link from "next/link";
import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Mail, Phone, Linkedin } from "lucide-react";

import { useLanguage } from "@/context/LanguageContext";

gsap.registerPlugin(ScrollTrigger);

const Footer = () => {
    const { t } = useLanguage();

    const containerRef = useRef(null);
    const iRef = useRef(null);
    const heartRef = useRef(null);
    const textRef = useRef(null);

    useEffect(() => {
        const ctx = gsap.context(() => {
            const tl = gsap.timeline({
                scrollTrigger: {
                    trigger: containerRef.current,
                    start: "top 50%",
                    toggleActions: "play none none none",
                },
            });

            tl.from(iRef.current, {
                xPercent: -200,
                opacity: 0,
                duration: 1,
                ease: "power3.out",
            });

            tl.from(
                textRef.current,
                {
                    xPercent: 200,
                    opacity: 0,
                    duration: 1,
                    ease: "power3.out",
                },
                "<",
            );

            tl.from(
                heartRef.current,
                {
                    yPercent: 200,
                    opacity: 0,
                    scale: 0,
                    duration: 0.8,
                    ease: "back.out(1.7)",
                },
                "-=0.6",
            );

            tl.to(iRef.current, { x: -40, duration: 0.1 }, "-=0.2");
            tl.to(textRef.current, { x: 40, duration: 0.1 }, "<");

            tl.to(iRef.current, {
                x: 0,
                duration: 0.8,
                ease: "elastic.out(1, 0.3)",
            });

            tl.to(
                textRef.current,
                {
                    x: 0,
                    duration: 0.8,
                    ease: "elastic.out(1, 0.3)",
                },
                "<",
            );
        }, containerRef);

        return () => ctx.revert();
    }, []);

    return (
        <div
            ref={containerRef}
            className="relative h-screen w-full flex flex-col items-center justify-center overflow-hidden uppercase"
        >
            {/* Main Text */}
            <div className="flex flex-wrap items-center justify-center gap-2 md:gap-4 text-4xl md:text-7xl font-bold text-black text-center">
                <span ref={iRef}>{t.footer.i}</span>
                <span ref={heartRef}>❤️</span>
                <span ref={textRef}>ProlingualHub</span>
            </div>

            {/* Video Link */}
            <Link
                href="/videos"
                className="mt-4 flex items-center justify-center gap-2 text-xs md:text-base font-medium text-gray-500 hover:text-black transition-colors"
            >
                <span className="w-2 h-2 rounded-full animate-blink-red-black block"></span>
                <span>[CLICK TO WATCH] HOW PROLINGUAL HUB WORKS</span>
            </Link>

            {/* Contact Icons */}
            <div className="absolute bottom-6 left-0 w-full md:w-auto md:left-10 flex gap-6 justify-center md:justify-start items-center p-4">
                {/* Email */}
                <a
                    href="mailto:speaklanguage@prolingualhub.com"
                    className="text-gray-400 hover:text-black hover:scale-110 transition-all duration-300 transform"
                    aria-label="Email"
                >
                    <Mail size={24} strokeWidth={1.5} />
                </a>

                {/* Phone */}
                <a
                    href="tel:+447894994298"
                    className="text-gray-400 hover:text-black hover:scale-110 transition-all duration-300 transform"
                    aria-label="Phone"
                >
                    <Phone size={24} strokeWidth={1.5} />
                </a>

                {/* LinkedIn */}
                <a
                    href="https://linkedin.com/in/irina-statham-238734387"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gray-400 hover:text-black hover:scale-110 transition-all duration-300 transform"
                    aria-label="LinkedIn"
                >
                    <Linkedin size={24} strokeWidth={1.5} />
                </a>
            </div>
        </div>
    );
};

export default Footer;
