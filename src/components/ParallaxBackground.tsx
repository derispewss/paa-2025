import { useMemo, useState, useEffect } from "react";
import sparks from "../assets/images/sparks.png";
import CloudLeft from "../assets/images/Hero - Cloud Left.png";
import CloudRight from "../assets/images/Hero - Cloud Right.png";
import PlanetBehind from "../assets/images/Hero - Planet Behind.png";
import Planet1 from "../assets/images/Planet 1.png";
import Planet2 from "../assets/images/Planet 2.png";
import Planet3 from "../assets/images/Planet 3.png";
import Planet4 from "../assets/images/Planet 4.png";

interface ParallaxBackgroundProps {
  scrollY: number;
}

const ParallaxBackground = ({ scrollY }: ParallaxBackgroundProps) => {
  const [isMobile, setIsMobile] = useState(false);
  const [reducedMotion, setReducedMotion] = useState(false);
  const [imagesLoaded, setImagesLoaded] = useState(false);

  // Preload critical images
  useEffect(() => {
    if (!reducedMotion) {
      const criticalImages = [PlanetBehind, CloudLeft, CloudRight];
      const imagePromises = criticalImages.map(src => {
        return new Promise((resolve, reject) => {
          const img = new Image();
          img.onload = resolve;
          img.onerror = reject;
          img.src = src;
        });
      });

      Promise.all(imagePromises)
        .then(() => setImagesLoaded(true))
        .catch(() => setImagesLoaded(true)); // Still show even if some images fail
    } else {
      setImagesLoaded(true);
    }
  }, [reducedMotion]);

  // Detect mobile and motion preferences
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    const checkMotionPreference = () => {
      setReducedMotion(window.matchMedia('(prefers-reduced-motion: reduce)').matches);
    };

    checkMobile();
    checkMotionPreference();
    
    window.addEventListener('resize', checkMobile);
    const motionQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    motionQuery.addEventListener('change', checkMotionPreference);

    return () => {
      window.removeEventListener('resize', checkMobile);
      motionQuery.removeEventListener('change', checkMotionPreference);
    };
  }, []);

  // Optimized transforms with enhanced cloud behavior
  const transforms = useMemo(() => {
    if (reducedMotion) {
      return {
        planetBehind: 'translate3d(0, 0, 0)',
        cloudLeft: 'translate3d(0, 0, 0)',
        cloudRight: 'translate3d(0, 0, 0)',
        planetsVertical: 'translate3d(0, 0, 0)',
        cloudOpacity: 1,
        planetOpacity: 1,
      };
    }

    const multiplier = isMobile ? 0.5 : 1;
    
    // Enhanced cloud behavior based on scroll position
    let cloudLeftX, cloudRightX, cloudOpacity;
    
    if (scrollY < 20) {
      // Initial position - clouds are at the edges
      cloudLeftX = scrollY * -0.8 * multiplier;
      cloudRightX = scrollY * 0.8 * multiplier;
      cloudOpacity = 1;
    } else if (scrollY < 50) {
      // Approaching about section - clouds move back towards center with smooth easing
      const returnProgress = (scrollY - 20) / 30; // 0 to 1
      const easedProgress = 1 - Math.pow(1 - returnProgress, 3); // Cubic ease-out
      const baseMovement = 20 * -0.8 * multiplier; // Movement from first phase
      const returnMovement = baseMovement * (1 - easedProgress * 0.7); // Return 70% back
      
      cloudLeftX = returnMovement;
      cloudRightX = -returnMovement;
      cloudOpacity = 1 - (easedProgress * 0.2); // Slight fade with easing
    } else {
      // About section and beyond - clouds fade out and move off-screen
      const exitProgress = Math.min((scrollY - 50) / 25, 1); // 0 to 1, faster exit
      const easedExit = Math.pow(exitProgress, 2); // Quadratic ease-in
      cloudLeftX = -100 * multiplier - (easedExit * 80); // Move further left
      cloudRightX = 100 * multiplier + (easedExit * 80); // Move further right
      cloudOpacity = Math.max(0.8 - (easedExit * 0.8), 0); // Fade out completely
    }

    return {
      planetBehind: `translate3d(0, ${scrollY * 0.6 * multiplier}px, 0)`,
      cloudLeft: `translate3d(${cloudLeftX}px, 0, 0)`,
      cloudRight: `translate3d(${cloudRightX}px, 0, 0)`,
      planetsVertical: `translate3d(0, ${scrollY * -0.4 * multiplier}px, 0)`,
      cloudOpacity: cloudOpacity,
      planetOpacity: scrollY > 80 ? Math.max(0.3, 1 - (scrollY - 80) / 40) : 1, // Planet fades after 80% scroll
    };
  }, [scrollY, isMobile, reducedMotion]);

  return (
    <>
      {/* Optimized Sparks Background */}
      <div 
        className="w-full h-screen fixed top-0 left-0 opacity-50 bg-cover bg-center bg-no-repeat will-change-transform"
        style={{ 
          backgroundImage: `url(${sparks})`,
          transform: 'translate3d(0, 0, 0)', // Force hardware acceleration
        }}
      />
      
      {/* Gradient Overlay */}
      <div className="bg-gradient-to-b w-full h-screen fixed top-0 from-70% left-0 from-secondary/0 to-primary will-change-auto"></div>
      
      {/* Only render parallax elements when images are loaded and motion is allowed */}
      {imagesLoaded && (
        <>
          {/* Main Planet Behind - Enhanced with dynamic opacity */}
          <div
            style={{ 
              transform: transforms.planetBehind,
              backfaceVisibility: 'hidden',
              opacity: transforms.planetOpacity,
            }}
            className="w-full fixed bottom-0 z-30 left-0 flex justify-center will-change-transform transform-gpu cloud-transition"
          >
            <img 
              src={PlanetBehind} 
              alt="" 
              className="w-1/2 sm:w-2/5 lg:w-1/3 h-auto"
              loading="lazy"
              decoding="async"
            />
          </div>
          
          {/* Clouds - Enhanced with dynamic behavior */}
          <img
            style={{ 
              transform: transforms.cloudLeft,
              backfaceVisibility: 'hidden',
              perspective: '1000px',
              opacity: transforms.cloudOpacity,
            }}
            src={CloudLeft}
            alt=""
            className="w-1/2 sm:w-2/5 lg:w-1/3 fixed bottom-0 z-30 left-0 h-auto will-change-transform transform-gpu cloud-transition"
            loading="lazy"
            decoding="async"
          />
          <img
            style={{ 
              transform: transforms.cloudRight,
              backfaceVisibility: 'hidden',
              perspective: '1000px',
              opacity: transforms.cloudOpacity,
            }}
            src={CloudRight}
            alt=""
            className="w-1/2 sm:w-2/5 lg:w-1/3 fixed bottom-0 z-30 right-0 h-auto will-change-transform transform-gpu cloud-transition"
            loading="lazy"
            decoding="async"
          />
          
          {/* Optimized Floating Planets - Reduced count for performance */}
          {!isMobile && ( // Hide decorative planets on mobile for better performance
            <div 
              style={{ transform: transforms.planetsVertical }}
              className="fixed inset-0 pointer-events-none will-change-transform"
            >
              {/* Top Left Planet */}
              <img
                src={Planet1}
                className="w-16 sm:w-20 lg:w-28 xl:w-32 absolute top-20 sm:top-32 lg:top-40 left-10 sm:left-20 lg:left-40 h-auto opacity-80"
                alt=""
                loading="lazy"
                decoding="async"
              />
              
              {/* Top Right Planet */}
              <img
                src={Planet4}
                className="w-10 sm:w-12 lg:w-16 xl:w-20 absolute top-20 sm:top-32 lg:top-40 right-10 sm:right-20 lg:right-40 h-auto opacity-70"
                alt=""
                loading="lazy"
                decoding="async"
              />
              
              {/* Bottom Right Planet */}
              <img
                src={Planet2}
                className="w-16 sm:w-20 lg:w-28 xl:w-32 absolute bottom-20 sm:bottom-32 lg:bottom-40 right-20 sm:right-40 lg:right-80 h-auto opacity-60"
                alt=""
                loading="lazy"
                decoding="async"
              />
              
              {/* Bottom Left Small Planet */}
              <img
                src={Planet3}
                className="w-10 sm:w-12 lg:w-16 xl:w-20 absolute bottom-20 sm:bottom-32 lg:bottom-40 left-20 sm:left-40 lg:left-80 h-auto opacity-70"
                alt=""
                loading="lazy"
                decoding="async"
              />
            </div>
          )}
        </>
      )}
    </>
  );
};

export default ParallaxBackground;