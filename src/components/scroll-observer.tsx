"use client";

import { useEffect } from "react";

export function ScrollObserver() {
  useEffect(() => {
    let rafId: number | null = null;
    let lastScrollY = 0; // Track the last scroll position
    let isScrollingDown = false;

    const handleScroll = () => {
      if (rafId) return;

      rafId = requestAnimationFrame(() => {
        const currentScrollY = window.scrollY;
        const scrollThreshold = 4 * 16; // 4rem in pixels (assuming 1rem = 16px)

        if (currentScrollY <= scrollThreshold) {
          // Don't apply any scroll direction attribute if within 4rem
          document.body.removeAttribute("data-scroll-direction");
        } else {
          const shouldScrollDown = currentScrollY > lastScrollY;

          if (isScrollingDown !== shouldScrollDown) {
            isScrollingDown = shouldScrollDown;

            if (shouldScrollDown) {
              document.body.setAttribute("data-scroll-direction", "down");
            } else {
              document.body.removeAttribute("data-scroll-direction"); // Remove when scrolling up
            }
          }
        }

        lastScrollY = currentScrollY; // Update the last scroll position
        rafId = null;
      });
    };

    window.addEventListener("scroll", handleScroll);

    // Cleanup function to remove the scroll listener
    return () => {
      window.removeEventListener("scroll", handleScroll);
      if (rafId) cancelAnimationFrame(rafId);
    };
  }, []);

  return null;
}
