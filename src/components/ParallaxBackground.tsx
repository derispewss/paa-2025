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
  return (
    <>
      {/* Sparks Background */}
      <img
        src={sparks}
        alt=""
        className="w-full h-screen fixed top-0 left-0 opacity-50 object-cover"
      />
      
      {/* Gradient Overlay */}
      <div className="bg-gradient-to-b w-full h-screen fixed top-0 from-70% left-0 from-secondary/0 to-primary"></div>
      
      {/* Main Planet Behind */}
      <div
        style={{ transform: `translateY(${scrollY * 1}%)` }}
        className="w-full fixed bottom-0 z-30 left-0 flex justify-center"
      >
        <img src={PlanetBehind} alt="" className="w-1/2 sm:w-2/5 lg:w-1/3 h-auto" />
      </div>
      
      {/* Clouds */}
      <img
        style={{ transform: `translateX(${scrollY * -1}%)` }}
        src={CloudLeft}
        alt=""
        className="w-1/2 sm:w-2/5 lg:w-1/3 fixed bottom-0 z-30 left-0 h-auto"
      />
      <img
        style={{ transform: `translateX(${scrollY * 1}%)` }}
        src={CloudRight}
        alt=""
        className="w-1/2 sm:w-2/5 lg:w-1/3 fixed bottom-0 z-30 right-0 h-auto"
      />
      
      {/* Planet parallax - First screen */}
      <img
        src={Planet1}
        className="w-20 sm:w-24 lg:w-32 xl:w-40 fixed top-20 sm:top-32 lg:top-40 left-10 sm:left-20 lg:left-40 h-auto"
        alt=""
        style={{ transform: `translateY(${scrollY * -1}%)` }}
      />
      <img
        src={Planet2}
        className="w-20 sm:w-24 lg:w-32 xl:w-40 fixed bottom-20 sm:bottom-32 lg:bottom-40 right-20 sm:right-40 lg:right-80 h-auto"
        alt=""
        style={{ transform: `translateY(${scrollY * -1}%)` }}
      />
      <img
        src={Planet3}
        className="w-12 sm:w-16 lg:w-20 xl:w-24 fixed bottom-20 sm:bottom-32 lg:bottom-40 left-20 sm:left-40 lg:left-80 h-auto"
        alt=""
        style={{ transform: `translateY(${scrollY * -1}%)` }}
      />
      <img
        src={Planet4}
        className="w-12 sm:w-16 lg:w-20 xl:w-24 fixed top-20 sm:top-32 lg:top-40 right-10 sm:right-20 lg:right-40 h-auto"
        alt=""
        style={{ transform: `translateY(${scrollY * -1}%)` }}
      />
      
      {/* Planet parallax - Second screen */}
      <img
        src={Planet1}
        className="w-20 sm:w-24 lg:w-32 xl:w-40 fixed top-full left-10 sm:left-20 lg:left-40 h-auto"
        alt=""
        style={{ transform: `translateY(${scrollY * -1}%)` }}
      />
      <img
        src={Planet4}
        className="w-12 sm:w-16 lg:w-20 xl:w-24 fixed top-full right-10 sm:right-20 lg:right-40 h-auto"
        alt=""
        style={{ transform: `translateY(${scrollY * -1}%)` }}
      />
    </>
  );
};

export default ParallaxBackground;