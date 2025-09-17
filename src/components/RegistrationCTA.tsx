import { useState, useEffect, useRef } from "react";
import { Calendar, Clock, AlertCircle, CheckCircle } from "lucide-react";

const RegistrationCTA = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [registrationStatus, setRegistrationStatus] = useState<'not-started' | 'open' | 'closed'>('not-started');
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0
  });

  const sectionRef = useRef<HTMLElement>(null);
  const startDate = new Date("2025-09-22T00:00:00").getTime();
  const endDate = new Date("2025-10-06T23:59:59").getTime();

  useEffect(() => {
    const timer = setInterval(() => {
      const now = new Date().getTime();
      
      if (now < startDate) {
        setRegistrationStatus('not-started');
        const difference = startDate - now;
        setTimeLeft({
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
          minutes: Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60)),
          seconds: Math.floor((difference % (1000 * 60)) / 1000)
        });
      } else if (now >= startDate && now <= endDate) {
        setRegistrationStatus('open');
        const difference = endDate - now;
        setTimeLeft({
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
          minutes: Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60)),
          seconds: Math.floor((difference % (1000 * 60)) / 1000)
        });
      } else {
        setRegistrationStatus('closed');
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
      }
    }, 1000);

    return () => clearInterval(timer);
  }, [startDate, endDate]);

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

  const handleRegistration = () => {
    if (registrationStatus === 'open') {
      window.open('https://forms.google.com/your-form-link', '_blank');
    } else if (registrationStatus === 'not-started') {
      alert('Pendaftaran belum dibuka. Silakan tunggu hingga 22 September 2025.');
    } else {
      alert('Pendaftaran telah ditutup. Terima kasih atas minat Anda!');
    }
  };

  const getStatusInfo = () => {
    switch (registrationStatus) {
      case 'not-started':
        return {
          title: 'PENDAFTARAN SEGERA DIBUKA',
          subtitle: 'Bersiaplah! Pendaftaran akan dibuka dalam:',
          buttonText: 'SEGERA HADIR',
          buttonDisabled: true,
          statusIcon: <Clock className="w-5 h-5 text-accent" />,
          statusText: 'Belum Dibuka',
          statusColor: 'text-yellow-400'
        };
      case 'open':
        return {
          title: 'PENDAFTARAN TERBUKA',
          subtitle: 'Daftar sekarang! Pendaftaran akan ditutup dalam:',
          buttonText: 'DAFTAR SEKARANG',
          buttonDisabled: false,
          statusIcon: <CheckCircle className="w-5 h-5 text-green-400" />,
          statusText: 'Dibuka',
          statusColor: 'text-green-400'
        };
      case 'closed':
        return {
          title: 'PENDAFTARAN DITUTUP',
          subtitle: 'Pendaftaran telah berakhir. Nantikan informasi selanjutnya!',
          buttonText: 'PENDAFTARAN TUTUP',
          buttonDisabled: true,
          statusIcon: <AlertCircle className="w-5 h-5 text-red-400" />,
          statusText: 'Ditutup',
          statusColor: 'text-red-400'
        };
    }
  };

  const statusInfo = getStatusInfo();

  const handleLearnMore = () => {
    document.querySelector("#about")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section id="registration" className="w-full relative py-8 sm:py-12 lg:py-16 mb-8 sm:mb-12 lg:mb-16" ref={sectionRef}>
      <div className="w-full absolute top-0 left-0 flex z-20 justify-center">
        <div className="bg-gradient-to-b opacity-0 w-full absolute top-0 left-0 from-secondary to-primary"></div>
      </div>
      
      {/* Main content container - properly centered */}
      <div className="relative z-30 text-white px-4 sm:px-6 lg:px-8 w-full">
        <div className="max-w-4xl mx-auto text-center space-y-4 sm:space-y-6">
          {/* Main Title */}
          <h1 
            className={`title text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl leading-tight transition-all duration-1000 transform ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
            }`}
          >
            {statusInfo.title}
          </h1>
          
          {/* Description */}
          <div 
            className={`max-w-3xl mx-auto transition-all duration-1000 delay-300 transform ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
            }`}
          >
            <p className="text-foreground text-center px-2 sm:px-4 text-sm sm:text-base lg:text-lg leading-relaxed">
              {registrationStatus === 'closed' ? (
                <>
                  Pendaftaran PAA 2025 telah berakhir. Terima kasih kepada semua yang telah mendaftar!
                  <span className="text-accent font-bold"> Nantikan pengumuman hasil seleksi </span>
                  dan informasi kegiatan selanjutnya.
                </>
              ) : (
                <>
                  Jangan lewatkan kesempatan emas ini! {registrationStatus === 'open' ? 'Daftarkan diri Anda sekarang' : 'Bersiaplah untuk mendaftar'} 
                  <span className="text-accent font-bold"> Pembekalan Anggota Aktif 2025</span> dan mulai 
                  perjalanan menuju masa depan yang lebih cerah bersama HMTI.
                </>
              )}
            </p>
          </div>

          {/* Status Info */}
          <div 
            className={`transition-all duration-1000 delay-400 transform ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
            }`}
          >
            <p className="text-xs sm:text-sm text-foreground/80">
              {statusInfo.subtitle}
            </p>
          </div>

          {/* Countdown Timer - Only show when registration is not closed */}
          {registrationStatus !== 'closed' && (
            <div 
              className={`max-w-md mx-auto grid grid-cols-2 sm:grid-cols-4 gap-2 sm:gap-4 transition-all duration-1000 delay-500 transform ${
                isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
              }`}
            >
              {[
                { label: "Hari", value: timeLeft.days },
                { label: "Jam", value: timeLeft.hours },
                { label: "Menit", value: timeLeft.minutes },
                { label: "Detik", value: timeLeft.seconds }
              ].map((time, index) => (
                <div key={index} className="bg-primary/30 backdrop-blur-sm border border-accent/20 rounded-lg sm:rounded-xl p-2 sm:p-4 text-center hover:bg-primary/50 transition-all duration-300 hover:scale-105">
                  <div className="text-lg sm:text-2xl lg:text-3xl font-bold text-accent">{time.value.toString().padStart(2, '0')}</div>
                  <div className="text-xs text-foreground/80">{time.label}</div>
                </div>
              ))}
            </div>
          )}

          {/* Action buttons */}
          <div 
            className={`flex flex-col sm:flex-row gap-3 sm:gap-4 items-center justify-center transition-all duration-1000 delay-700 transform ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
            }`}
          >
            <button 
              onClick={handleRegistration}
              disabled={statusInfo.buttonDisabled}
              className={`group relative w-full sm:w-auto px-6 sm:px-8 lg:px-10 py-3 sm:py-4 shadow-accent shadow-lg rounded-xl text-sm sm:text-base font-bold transition-all duration-300 transform border-2 border-accent overflow-hidden ${
                statusInfo.buttonDisabled 
                  ? 'bg-gray-600 text-gray-300 cursor-not-allowed opacity-60' 
                  : 'bg-gradient-to-r from-accent to-secondary hover:from-secondary hover:to-accent hover:scale-105'
              }`}
            >
              <span className="relative z-10">{statusInfo.buttonText}</span>
              {!statusInfo.buttonDisabled && (
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
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

          {/* Registration Period Info */}
          <div className="pt-4 sm:pt-6">
            <div className="flex items-center justify-center gap-2 mb-2">
              <Calendar className="w-4 h-4 text-accent" />
              <p className="text-xs sm:text-sm text-foreground/80">Periode Pendaftaran:</p>
            </div>
            <p className="text-sm sm:text-base font-bold text-accent">
              22 September - 6 Oktober 2025
            </p>
            {registrationStatus === 'closed' && (
              <p className="text-xs text-red-400 mt-2">
                ⚠️ Pendaftaran telah berakhir
              </p>
            )}
          </div>
          
        </div>
      </div>
    </section>
  );
};

export default RegistrationCTA;