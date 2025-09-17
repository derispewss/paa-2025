import { useState, useEffect, useRef } from "react";

const RegistrationCTA = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0
  });
  const [showSuccess, setShowSuccess] = useState(false);
  const [isRegistering, setIsRegistering] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  // Countdown timer
  useEffect(() => {
    const targetDate = new Date("2025-09-30T23:59:59").getTime();
    
    const timer = setInterval(() => {
      const now = new Date().getTime();
      const difference = targetDate - now;
      
      if (difference > 0) {
        setTimeLeft({
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
          minutes: Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60)),
          seconds: Math.floor((difference % (1000 * 60)) / 1000)
        });
      }
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  // Intersection observer for animations
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

  const handleRegistration = async () => {
    setIsRegistering(true);
    
    // Simulate registration process
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    setIsRegistering(false);
    setShowSuccess(true);
    
    // Hide success message after 3 seconds
    setTimeout(() => {
      setShowSuccess(false);
    }, 3000);
  };

  const handleLearnMore = () => {
    document.querySelector("#about")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section id="registration" className="w-full relative py-20" ref={sectionRef}>
      <div className="w-full absolute top-0 left-0 flex z-20 justify-center">
        <div className="bg-gradient-to-b opacity-0 w-full absolute top-0 left-0 from-secondary to-primary"></div>
      </div>
      <div className="absolute z-10 text-white top-0 left-0 flex flex-col items-center justify-center w-full px-4 sm:px-6 lg:px-8 py-20">
        <h1 
          className={`max-w-4xl title text-2xl sm:text-3xl md:text-4xl lg:text-5xl text-center leading-tight transition-all duration-1000 transform ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
          }`}
        >
          SIAP BERGABUNG?
        </h1>
        
        <div 
          className={`max-w-2xl sm:max-w-4xl lg:max-w-5xl mx-auto transition-all duration-1000 delay-300 transform ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
          }`}
        >
          <p className="mt-4 sm:mt-6 text-foreground text-center p-4 sm:p-6 text-sm sm:text-base lg:text-lg leading-relaxed">
            Jangan lewatkan kesempatan emas ini! Daftarkan diri Anda sekarang untuk mengikuti 
            <span className="text-accent font-bold"> Pembekalan Anggota Aktif 2025</span> dan mulai 
            perjalanan menuju masa depan yang lebih cerah bersama HMTI.
          </p>
        </div>

        {/* Countdown Timer */}
        <div 
          className={`mt-8 grid grid-cols-2 md:grid-cols-4 gap-4 transition-all duration-1000 delay-500 transform ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
          }`}
        >
          {[
            { label: "Hari", value: timeLeft.days },
            { label: "Jam", value: timeLeft.hours },
            { label: "Menit", value: timeLeft.minutes },
            { label: "Detik", value: timeLeft.seconds }
          ].map((time, index) => (
            <div key={index} className="bg-primary/30 backdrop-blur-sm border border-accent/20 rounded-xl p-4 text-center hover:bg-primary/50 transition-all duration-300 hover:scale-105">
              <div className="text-2xl sm:text-3xl font-bold text-accent">{time.value.toString().padStart(2, '0')}</div>
              <div className="text-xs sm:text-sm text-foreground/80">{time.label}</div>
            </div>
          ))}
        </div>

        {/* Action buttons */}
        <div 
          className={`mt-6 sm:mt-10 flex flex-col sm:flex-row gap-4 sm:gap-6 items-center transition-all duration-1000 delay-700 transform ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
          }`}
        >
          <button 
            onClick={handleRegistration}
            disabled={isRegistering}
            className="group relative w-full sm:w-auto px-6 sm:px-8 lg:px-12 py-3 sm:py-4 shadow-accent shadow-lg rounded-xl text-sm sm:text-base lg:text-lg font-bold bg-gradient-to-r from-accent to-secondary hover:from-secondary hover:to-accent transition-all duration-300 transform hover:scale-105 border-2 border-accent disabled:opacity-50 disabled:cursor-not-allowed overflow-hidden"
          >
            {isRegistering ? (
              <div className="flex items-center justify-center">
                <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                Mendaftar...
              </div>
            ) : (
              <>
                <span className="relative z-10">DAFTAR SEKARANG</span>
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
              </>
            )}
          </button>
          
          <button 
            onClick={handleLearnMore}
            className="group w-full sm:w-auto px-6 sm:px-8 py-3 sm:py-4 shadow-md rounded-xl text-xs sm:text-sm bg-transparent border-2 border-foreground text-foreground hover:bg-foreground hover:text-primary transition-all duration-300 relative overflow-hidden"
          >
            <span className="relative z-10">Pelajari Lebih Lanjut</span>
            <div className="absolute inset-0 bg-foreground transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></div>
          </button>
        </div>

        {/* Success notification */}
        {showSuccess && (
          <div className="fixed top-20 left-1/2 transform -translate-x-1/2 bg-accent text-primary px-6 py-3 rounded-lg shadow-lg z-50 animate-bounce">
            <div className="flex items-center">
              <svg className="w-5 h-5 mr-2" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" stroke="currentColor">
                <path d="M5 13l4 4L19 7"></path>
              </svg>
              Pendaftaran berhasil! Tim kami akan menghubungi Anda segera.
            </div>
          </div>
        )}

        <div className="mt-6 sm:mt-8 text-center">
          <p className="text-xs sm:text-sm text-foreground/80 mb-2">📅 Pendaftaran dibuka hingga:</p>
          <p className="text-lg sm:text-xl font-bold text-accent">30 September 2025</p>
        </div>
      </div>
    </section>
  );
};

export default RegistrationCTA;