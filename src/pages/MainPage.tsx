import { useLayoutEffect, useRef, useState } from "react";
import HeroSection from "../components/HeroSection";
import AboutSection from "../components/AboutSection";
import HMTISection from "../components/HMTISection";
import RegistrationCTA from "../components/RegistrationCTA";
import ParallaxBackground from "../components/ParallaxBackground";

const MainPage = () => {
  const [scrollY, setScrollY] = useState(0);
  const getScrollValue = (e: number) => {
    setScrollY((e / divHeight) * 100);
    console.log((e / divHeight) * 100);
  };

  const [divHeight, setDivHeight] = useState(0);
  const divRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    if (divRef.current) {
      setDivHeight(divRef.current.offsetHeight);
    }
  }, []);

  return (
    <div ref={divRef} onScroll={(e) => {getScrollValue(e.currentTarget.scrollTop)}}
      className="w-full text-['Jakarta'] bg-primary max-h-screen overflow-y-auto relative">
      <HeroSection />
      <AboutSection />
      <HMTISection />
      <RegistrationCTA />
      <ParallaxBackground scrollY={scrollY} />
    </div>
  );
};

export default MainPage;