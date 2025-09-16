// OrbitEntrance.tsx
import { useEffect, useRef } from "react";
import { animate } from "animejs";
import planet1 from "../assets/images/Untitled design (5) 3.png";

export default function OrbitEntrance() {
  const planetRef = useRef<HTMLImageElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const planet = planetRef.current;
    const container = containerRef.current;
    if (!planet || !container) return;

    // Start with small scale & rotated orbit
    planet.style.transform = "translateY(-50%) scale(0.3)";
    container.style.transformOrigin = "50% 50%";
    container.style.transform = "rotate(0deg)";

    // Animate container rotation (planet orbits in)
    animate(container, {
      rotate: "1turn", // one full orbit
      duration: 3000, // 3s entrance
      easing: "easeOutCubic",
    });

    // Animate planet scale (grows as it orbits)
    animate(planet, {
      scale: [0.3, 1],
      duration: 1500,
      delay: 500,
      easing: "easeOutBack",
    });
  }, []);

  return (
    <div className="flex items-center justify-center h-screen bg-black">
      <div className="relative w-3/5 aspect-square">
        {/* Center (sun) */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-yellow-400" />

        {/* Rotating container */}
        <div
          ref={containerRef}
          className="absolute top-0 left-0 w-full h-full"
        >
          {/* Planet placed at right edge */}
          <img
            ref={planetRef}
            src={planet1}
            alt="Planet"
            className="absolute top-1/2 right-0 w-24 h-24 -translate-y-1/2"
            draggable={false}
          />
        </div>
      </div>
    </div>
  );
}
