import { useState, useEffect, useRef } from "react";

const AboutSection = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [isReading, setIsReading] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      {
        threshold: 0.3,
      }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, []);

  const handleReadMore = () => {
    setIsReading(!isReading);
  };

  return (
    <section id="about" className="min-h-screen w-full relative" ref={sectionRef}>
      <div className="w-full min-h-screen absolute top-0 left-0 flex z-20 justify-center">
        <div className="bg-gradient-to-b opacity-0 w-full min-h-screen absolute top-0 left-0 from-secondary to-primary"></div>
      </div>
      <div className="absolute z-10 text-white top-0 left-0 flex flex-col items-center justify-center w-full min-h-screen px-4 sm:px-6 lg:px-8 py-20">
        <h1 
          className={`max-w-4xl title text-2xl sm:text-3xl md:text-4xl lg:text-5xl text-center leading-tight mb-6 sm:mb-8 transition-all duration-1000 transform ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
          }`}
        >
          APA ITU PAA
        </h1>
        
        <div 
          className={`max-w-2xl sm:max-w-4xl lg:max-w-6xl mx-auto transition-all duration-1000 delay-300 transform ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
          }`}
        >
          <div className="group relative">
            <div className={`text-foreground text-center p-4 sm:p-6 lg:p-8 bg-primary/80 border-2 sm:border-4 shadow-sm rounded-2xl sm:rounded-3xl border-accent text-xs sm:text-sm lg:text-base xl:text-lg leading-relaxed cursor-pointer transition-all duration-300 hover:bg-primary/90 hover:shadow-lg hover:shadow-accent/20 ${
              isReading ? 'bg-primary/95' : ''
            }`}>
              <p className="mb-4">
                <span className="text-accent font-bold text-lg">PAA</span> (Pembekalan Anggota Aktif) adalah kegiatan bagi mahasiswa
                Universitas Dian Nuswantoro, khususnya mahasiswa Teknik Informatika,
                di mana mereka dapat bergabung dengan Himpunan Mahasiswa Teknik
                Informatika melalui berbagai tahapan bermakna, bermanfaat, dan
                menyenangkan.
              </p>
              
              <div className={`overflow-hidden transition-all duration-500 ${
                isReading ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
              }`}>
                <div className="pt-4 border-t border-accent/30">
                  <p className="mb-3">
                    <span className="text-accent font-semibold">🎯 Manfaat bergabung:</span>
                  </p>
                  <ul className="text-left space-y-2 list-none pl-4">
                    <li className="flex items-start">
                      <span className="text-accent mr-2">•</span>
                      Pengembangan <span className="text-accent font-semibold">Soft Skills</span> dan <span className="text-accent font-semibold">Hard Skills</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-accent mr-2">•</span>
                      Networking dengan sesama mahasiswa TI
                    </li>
                    <li className="flex items-start">
                      <span className="text-accent mr-2">•</span>
                      Pelatihan teknologi terkini
                    </li>
                    <li className="flex items-start">
                      <span className="text-accent mr-2">•</span>
                      Pengalaman organisasi yang berharga
                    </li>
                  </ul>
                </div>
              </div>
              
              <div className="mt-4 pt-4 border-t border-accent/30">
                <p className="text-accent font-bold">
                  Tema 2025: <span className="text-white">"Empowering Tomorrow New Minds, New Generation"</span>
                </p>
              </div>
            </div>
            
            {/* Interactive read more button */}
            <button
              onClick={handleReadMore}
              className={`absolute -bottom-4 left-1/2 transform -translate-x-1/2 bg-accent text-primary px-6 py-2 rounded-full text-sm font-semibold transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-accent/50 ${
                isReading ? 'bg-secondary' : 'bg-accent'
              }`}
            >
              {isReading ? 'Sembunyikan Detail' : 'Baca Selengkapnya'}
              <span className={`ml-2 transition-transform duration-300 ${isReading ? 'rotate-180' : ''}`}>
                ▼
              </span>
            </button>
            
            {/* Hover glow effect */}
            <div className="absolute inset-0 bg-accent/5 rounded-2xl sm:rounded-3xl transition-opacity duration-300 opacity-0 group-hover:opacity-100 -z-10" />
          </div>
        </div>
        
        {/* Statistics cards */}
        <div 
          className={`mt-16 grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6 max-w-4xl transition-all duration-1000 delay-500 transform ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
          }`}
        >
          {[
            { label: "Anggota Aktif", value: "150+", icon: "👥" },
            { label: "Kegiatan per Tahun", value: "25+", icon: "🎯" },
            { label: "Alumni Sukses", value: "500+", icon: "🎓" }
          ].map((stat, index) => (
            <div 
              key={index}
              className="bg-primary/30 backdrop-blur-sm border border-accent/20 rounded-xl p-4 text-center hover:bg-primary/50 transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-accent/10"
            >
              <div className="text-2xl mb-2">{stat.icon}</div>
              <div className="text-xl sm:text-2xl font-bold text-accent">{stat.value}</div>
              <div className="text-xs sm:text-sm text-foreground/80">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default AboutSection;