import { useState, useEffect, useRef } from "react";
import { CheckCircle, Circle, ArrowRight, Users, BookOpen, Award, Heart } from "lucide-react";

const JourneySection = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [activeStep, setActiveStep] = useState(0);
  const sectionRef = useRef<HTMLElement>(null);

  const journeySteps = [
    {
      id: 1,
      title: "Pendaftaran & Pemberkasan",
      subtitle: "Registration & Documentation",
      date: "22 Sep - 6 Okt 2025",
      description: "Daftarkan diri melalui formulir online dan lengkapi dokumen persyaratan untuk memulai perjalanan PAA 2025.",
      icon: Users,
      status: "active",
      activities: [
        "Pengisian formulir pendaftaran online",
        "Upload dokumen persyaratan lengkap",
        "Verifikasi data oleh panitia PAA",
        "Konfirmasi kelulusan seleksi berkas"
      ]
    },
    {
      id: 2,
      title: "Pembekalan Anggota Aktif",
      subtitle: "Active Member Briefing",
      date: "10 Okt 2025",
      description: "Pembekalan intensif untuk calon anggota aktif HMTI dengan materi organisasi, kepemimpinan, dan komitmen.",
      icon: BookOpen,
      status: "upcoming",
      activities: [
        "Sejarah dan visi misi HMTI",
        "Struktur organisasi dan tata kelola",
        "Hak dan kewajiban anggota aktif",
        "Komitmen dan dedikasi organisasi"
      ]
    },
    {
      id: 3,
      title: "Wawancara Peserta",
      subtitle: "Participant Interview",
      date: "11 Okt 2025",
      description: "Sesi wawancara personal untuk menilai motivasi, komitmen, dan kesesuaian calon anggota dengan nilai-nilai HMTI.",
      icon: Award,
      status: "upcoming",
      activities: [
        "Wawancara dengan pengurus HMTI",
        "Penilaian motivasi dan komitmen",
        "Diskusi visi personal dan organisasi",
        "Evaluasi kesesuaian nilai-nilai"
      ]
    },
    {
      id: 4,
      title: "Pengumuman",
      subtitle: "Final Announcement",
      date: "20 Okt 2025",
      description: "Pengumuman resmi hasil seleksi dan pelantikan anggota baru HMTI periode 2025-2026.",
      icon: Heart,
      status: "upcoming",
      activities: [
        "Pengumuman hasil seleksi final",
        "Pelantikan anggota baru HMTI",
        "Penyerahan atribut dan sertifikat",
        "Selamat datang di keluarga HMTI!"
      ]
    }
  ];

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

  // Auto-progress through steps
  useEffect(() => {
    if (isVisible) {
      const timer = setInterval(() => {
        setActiveStep((prev) => (prev + 1) % journeySteps.length);
      }, 5000);
      return () => clearInterval(timer);
    }
  }, [isVisible, journeySteps.length]);

  const handleStepClick = (index: number) => {
    setActiveStep(index);
  };

  return (
    <section id="journey" className="w-full relative py-12 sm:py-16 lg:py-20" ref={sectionRef}>
      <div className="w-full absolute top-0 left-0 flex z-20 justify-center">
        <div className="bg-gradient-to-b opacity-0 w-full absolute top-0 left-0 from-secondary to-primary"></div>
      </div>
      
      <div className="relative z-30 text-white px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <h1 
          className={`title text-2xl sm:text-3xl md:text-4xl lg:text-5xl text-center leading-tight mb-4 sm:mb-6 lg:mb-8 transition-all duration-1000 transform ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
          }`}
        >
          PERJALANAN PAA 2025
        </h1>

        <p 
          className={`max-w-3xl mx-auto text-center text-foreground text-sm sm:text-base lg:text-lg mb-8 sm:mb-12 lg:mb-16 transition-all duration-1000 delay-300 transform ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
          }`}
        >
          Jalani perjalanan transformasi diri bersama HMTI melalui 4 tahap yang dirancang khusus untuk mengembangkan potensi mahasiswa Teknik Informatika
        </p>

        {/* Journey Timeline */}
        <div 
          className={`w-full mb-8 sm:mb-12 lg:mb-16 transition-all duration-1000 delay-500 transform ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
          }`}
        >
          {/* Mobile Timeline */}
          <div className="lg:hidden space-y-4 sm:space-y-6">
            {journeySteps.map((step, index) => {
              const IconComponent = step.icon;
              const isActive = index === activeStep;
              const isPassed = index < activeStep;
              
              return (
                <div
                  key={step.id}
                  className={`relative cursor-pointer transition-all duration-300 ${
                    isActive ? 'scale-102' : 'hover:scale-[1.01]'
                  }`}
                  onClick={() => handleStepClick(index)}
                >
                  <div className={`bg-primary/20 backdrop-blur-sm border rounded-lg sm:rounded-xl p-4 sm:p-6 transition-all duration-300 ${
                    isActive 
                      ? 'border-accent bg-primary/30 shadow-lg shadow-accent/20' 
                      : 'border-accent/20 hover:border-accent/40'
                  }`}>
                    <div className="flex items-start space-x-3 sm:space-x-4">
                      <div className={`flex-shrink-0 w-10 h-10 sm:w-12 sm:h-12 rounded-full flex items-center justify-center transition-all duration-300 ${
                        isActive 
                          ? 'bg-accent text-primary' 
                          : isPassed 
                            ? 'bg-accent/80 text-primary' 
                            : 'bg-primary/50 border border-accent/30'
                      }`}>
                        {isPassed ? (
                          <CheckCircle className="w-4 h-4 sm:w-5 sm:h-5" />
                        ) : (
                          <IconComponent className="w-4 h-4 sm:w-5 sm:h-5" />
                        )}
                      </div>
                      
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between mb-1 sm:mb-2">
                          <h3 className={`font-bold text-sm sm:text-base transition-colors duration-300 truncate ${
                            isActive ? 'text-accent' : 'text-white'
                          }`}>
                            {step.title}
                          </h3>
                          <span className="text-xs text-foreground/60 bg-primary/30 px-2 py-1 rounded-full ml-2 flex-shrink-0">
                            {step.date}
                          </span>
                        </div>
                        
                        <p className="text-xs sm:text-sm text-accent/80 mb-2">{step.subtitle}</p>
                        <p className="text-xs sm:text-sm text-foreground/80 mb-3 sm:mb-4 leading-relaxed">{step.description}</p>
                        
                        {isActive && (
                          <div className="space-y-2 animate-fade-in-up">
                            <p className="text-xs font-semibold text-accent">Kegiatan:</p>
                            <ul className="space-y-1">
                              {step.activities.map((activity, actIndex) => (
                                <li key={actIndex} className="text-xs text-foreground/70 flex items-start space-x-2">
                                  <Circle className="w-1.5 h-1.5 sm:w-2 sm:h-2 fill-current text-accent mt-1 flex-shrink-0" />
                                  <span className="leading-tight">{activity}</span>
                                </li>
                              ))}
                            </ul>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                  
                  {index < journeySteps.length - 1 && (
                    <div className="flex justify-center py-2 sm:py-3">
                      <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5 text-accent/50 rotate-90" />
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          {/* Desktop Timeline */}
          <div className="hidden lg:block">
            <div className="relative">
              {/* Timeline Line */}
              <div className="absolute top-16 xl:top-20 left-0 right-0 h-0.5 xl:h-1 bg-gradient-to-r from-accent/20 via-accent to-accent/20 rounded-full"></div>
              
              {/* Timeline Steps */}
              <div className="grid grid-cols-2 xl:grid-cols-4 gap-4 xl:gap-6">
                {journeySteps.map((step, index) => {
                  const IconComponent = step.icon;
                  const isActive = index === activeStep;
                  const isPassed = index < activeStep;
                  
                  return (
                    <div
                      key={step.id}
                      className={`relative cursor-pointer transition-all duration-300 ${
                        isActive ? 'scale-105' : 'hover:scale-102'
                      } ${index >= 2 && 'xl:mt-0 mt-8'}`}
                    >
                      {/* Timeline Dot */}
                      <div className={`relative w-12 h-12 xl:w-16 xl:h-16 mx-auto mb-4 xl:mb-6 rounded-full flex items-center justify-center transition-all duration-300 ${
                        isActive 
                          ? 'bg-accent text-primary shadow-lg shadow-accent/50 scale-110' 
                          : isPassed 
                            ? 'bg-accent/80 text-primary' 
                            : 'bg-primary/50 border-2 xl:border-4 border-accent/30 hover:border-accent/50'
                      }`}>
                        {isPassed ? (
                          <CheckCircle className="w-6 h-6 xl:w-8 xl:h-8" />
                        ) : (
                          <IconComponent className="w-6 h-6 xl:w-8 xl:h-8" />
                        )}
                        
                        {/* Pulse animation for active step */}
                        {isActive && (
                          <div className="absolute inset-0 rounded-full bg-accent animate-ping opacity-20"></div>
                        )}
                      </div>
                      
                      {/* Step Content */}
                      <div className={`bg-primary/20 backdrop-blur-sm border rounded-lg xl:rounded-xl p-4 xl:p-6 transition-all duration-300 ${
                        isActive 
                          ? 'border-accent bg-primary/30 shadow-lg shadow-accent/20' 
                          : 'border-accent/20 hover:border-accent/40'
                      }`}>
                        <div className="text-center mb-3 xl:mb-4">
                          <h3 className={`font-bold text-sm xl:text-base mb-1 transition-colors duration-300 ${
                            isActive ? 'text-accent' : 'text-white'
                          }`}>
                            {step.title}
                          </h3>
                          <p className="text-xs xl:text-sm text-accent/80">{step.subtitle}</p>
                          <span className="inline-block text-xs text-foreground/60 bg-primary/30 px-2 py-1 rounded-full mt-2">
                            {step.date}
                          </span>
                        </div>
                        
                        <p className="text-xs xl:text-sm text-foreground/80 mb-3 xl:mb-4 text-center leading-relaxed">
                          {step.description}
                        </p>
                        
                        {isActive && (
                          <div className="space-y-2 animate-fade-in-up">
                            <p className="text-xs font-semibold text-accent text-center">Kegiatan:</p>
                            <ul className="space-y-1">
                              {step.activities.map((activity, actIndex) => (
                                <li key={actIndex} className="text-xs text-foreground/70 flex items-start space-x-2">
                                  <Circle className="w-1.5 h-1.5 fill-current text-accent mt-1 flex-shrink-0" />
                                  <span className="leading-tight">{activity}</span>
                                </li>
                              ))}
                            </ul>
                          </div>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>

        {/* Call to Action */}
        <div 
          className={`text-center transition-all duration-1000 delay-700 transform ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
          }`}
        >
          <p className="text-sm sm:text-base lg:text-lg text-foreground mb-4 sm:mb-6">
            Siap memulai perjalanan transformasi bersama HMTI?
          </p>
          
          <button 
            onClick={() => document.querySelector("#registration")?.scrollIntoView({ behavior: "smooth" })}
            className="group px-6 sm:px-8 py-3 sm:py-4 bg-gradient-to-r from-accent to-secondary hover:from-secondary hover:to-accent rounded-lg sm:rounded-xl font-bold text-sm sm:text-base transition-all duration-300 transform hover:scale-105 hover:shadow-lg hover:shadow-accent/50 relative overflow-hidden"
          >
            <span className="relative z-10">Mulai Perjalanan Saya</span>
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
          </button>
        </div>
      </div>
    </section>
  );
};

export default JourneySection;