import { useLayoutEffect, useRef, useState, useCallback } from "react";
import { 
  LazyHeroSection,
  LazyAboutSection,
  LazyHMTISection,
  LazyEventsSection,
  LazyJourneySection,
  LazyRegistrationCTA,
  LazyFooter
} from "../components/LazyComponents";
import ParallaxBackground from "../components/ParallaxBackground";
import ErrorBoundary from "../components/ErrorBoundary";

const MainPage = () => {
  const [scrollY, setScrollY] = useState(0);
  const [divHeight, setDivHeight] = useState(0);
  const divRef = useRef<HTMLDivElement>(null);
  const ticking = useRef(false);

  // Optimized scroll handler with immediate updates for parallax
  const getScrollValue = useCallback((scrollTop: number) => {
    if (!ticking.current) {
      // Use immediate update for smoother parallax
      const newScrollY = divHeight > 0 ? (scrollTop / divHeight) * 100 : 0;
      setScrollY(newScrollY);
      
      // Still use RAF for performance, but don't block immediate updates
      requestAnimationFrame(() => {
        ticking.current = false;
      });
      ticking.current = true;
    } else {
      // For rapid scrolling, still update immediately
      const newScrollY = divHeight > 0 ? (scrollTop / divHeight) * 100 : 0;
      setScrollY(newScrollY);
    }
  }, [divHeight]);

  // Throttled scroll event handler
  const handleScroll = useCallback((e: React.UIEvent<HTMLDivElement>) => {
    getScrollValue(e.currentTarget.scrollTop);
  }, [getScrollValue]);

  useLayoutEffect(() => {
    if (divRef.current) {
      setDivHeight(divRef.current.offsetHeight);
    }
  }, []);

  return (
    <ErrorBoundary>
      <div 
        ref={divRef} 
        onScroll={handleScroll}
        className="w-full text-['Jakarta'] bg-primary max-h-screen overflow-y-auto relative"
      >
        <LazyHeroSection />
        <LazyAboutSection />
        <LazyHMTISection />
        <LazyEventsSection />
        <LazyJourneySection />
        <LazyRegistrationCTA />
        <LazyFooter />
        <ParallaxBackground scrollY={scrollY} />
      </div>
    </ErrorBoundary>
  );
};

export default MainPage;