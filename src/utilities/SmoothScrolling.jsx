"use client";
import { ReactLenis } from "lenis/react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useEffect, useRef } from "react";

gsap.registerPlugin(ScrollTrigger);

function SmoothScrolling({ children }) {
  const lenisRef = useRef(null);

  useEffect(() => {
    window.history.scrollRestoration = "manual";
    window.scrollTo(0, 0);

    function update(time) {
      lenisRef.current?.lenis?.raf(time * 1000);
      ScrollTrigger.update();
    }

    gsap.ticker.add(update);

    return () => {
      gsap.ticker.remove(update);
    };
  }, []);

  return (
    <ReactLenis
      root
      ref={lenisRef}
      autoRaf={false}
      options={{
        lerp: 0.12,          // smoothness (0.1 - 0.15 sweet spot)
        wheelMultiplier: 1.6, // same scroll pe zyada move
        touchMultiplier: 1.8, // mobile smooth
        smoothWheel: true,
        smoothTouch: true,
      }}
    >
      {children}
    </ReactLenis>
  );
}

export default SmoothScrolling;
