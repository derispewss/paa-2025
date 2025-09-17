import { useState, useEffect } from "react";

const HeroSection = () => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [typedText, setTypedText] = useState("");
  const fullText = "PEMBEKALAN ANGGOTA AKTIF 2025";
  
  useEffect(() => {
    setIsLoaded(true);
    
    // Typing effect
    let currentIndex = 0;
    const typingTimer = setInterval(() => {
      if (currentIndex < fullText.length) {
        setTypedText(fullText.substring(0, currentIndex + 1));
        currentIndex++;
      } else {
        clearInterval(typingTimer);
      }
    }, 100);
    
    return () => clearInterval(typingTimer);
  }, []);

  const handleLearnMoreClick = () => {
    const aboutSection = document.querySelector("#about");
    if (aboutSection) {
      aboutSection.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section className="min-h-screen w-full relative overflow-hidden">
      {/* bg element */}
      <div className="w-full min-h-screen absolute top-0 left-0 flex z-10 justify-center">
        <div className="bg-gradient-to-b opacity-0 w-full min-h-screen absolute top-0 left-0 from-secondary to-primary"></div>
      </div>

      {/* content element */}
      <div className="absolute z-30 text-white top-0 left-0 flex flex-col items-center justify-center w-full min-h-screen px-4 sm:px-6 lg:px-8 py-20">
        <h1 
          className={`max-w-4xl title text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl text-center leading-tight transition-all duration-1000 transform ${
            isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
          }`}
        >
          {typedText}
          <span className="animate-pulse">|</span>
        </h1>
        
        <p 
          className={`mt-4 sm:mt-6 text-foreground max-w-2xl sm:max-w-4xl lg:max-w-6xl text-center text-sm sm:text-base lg:text-lg px-4 transition-all duration-1000 delay-300 transform ${
            isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
          }`}
        >
          Bergabunglah dengan komunitas mahasiswa Teknik Informatika yang dinamis dan inovatif. 
          Kembangkan potensi diri melalui berbagai kegiatan menarik dan bermanfaat!
        </p>
        
        <div className={`flex flex-col sm:flex-row gap-4 sm:gap-6 mt-6 sm:mt-8 transition-all duration-1000 delay-500 transform ${
          isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
        }`}>
          <button 
            onClick={handleLearnMoreClick}
            className="group px-4 py-3 sm:px-6 sm:py-4 shadow-accent shadow-md rounded-xl text-xs sm:text-sm lg:text-base bg-gradient-to-b from-accent to-secondary hover:from-secondary hover:to-accent transition-all duration-300 transform hover:scale-105 hover:shadow-lg hover:shadow-accent/50 relative overflow-hidden"
          >
            <span className="relative z-10">Pelajari Selengkapnya</span>
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
          </button>
          
          <button 
            onClick={() => document.querySelector("#registration")?.scrollIntoView({ behavior: "smooth" })}
            className="group px-4 py-3 sm:px-6 sm:py-4 border-2 border-accent text-accent rounded-xl text-xs sm:text-sm lg:text-base bg-transparent hover:bg-accent hover:text-primary transition-all duration-300 transform hover:scale-105 relative overflow-hidden"
          >
            <span className="relative z-10">Daftar Sekarang</span>
            <div className="absolute inset-0 bg-accent transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left -z-10"></div>
          </button>
        </div>
        
        {/* Scroll indicator */}
        <div 
          className={`absolute bottom-8 left-1/2 transform -translate-x-1/2 transition-all duration-1000 delay-700 ${
            isLoaded ? 'opacity-100 translate-y-0' : 'opacity-20 translate-y-10'
          }`}
        >
          <div className="animate-bounce">
            <svg className="w-6 h-6 text-accent" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" stroke="currentColor">
              <path d="M19 14l-7 7m0 0l-7-7m7 7V3"></path>
            </svg>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;