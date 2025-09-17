import { useState, useEffect, useRef } from "react";
import { Calendar, Clock, MapPin, Users } from "lucide-react";

const EventsSection = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [activeEvent, setActiveEvent] = useState(0);
  const [imageLoading, setImageLoading] = useState<Record<number, boolean>>({});
  const [imageError, setImageError] = useState<Record<number, boolean>>({});
  const sectionRef = useRef<HTMLElement>(null);

  const events = [
    {
      id: 1,
      title: "SEMNASTI 2025",
      date: "15 Maret 2025",
      time: "08:00 - 16:00",
      location: "MG Setos",
      participants: "500+",
      description: "Seminar Nasional Teknik Informatika yang menghadirkan pembicara terkemuka dari industri IT dan akademisi untuk membahas tren teknologi terdepan.",
      image: "/src/assets/images/semnasti.jpg",
      status: "upcoming",
      category: "Annual Event",
      isAnnual: true
    },
    {
      id: 2,
      title: "ITC 2025",
      date: "4-5 April 2025",
      time: "08:00 - 17:00",
      location: "Gedung Teknik Informatika",
      participants: "800+",
      description: "Information Technology Competition tingkat nasional dengan berbagai kategori lomba seperti programming, web design, dan mobile app development.",
      image: "/src/assets/images/itc.jpg",
      status: "upcoming",
      category: "Annual Event",
      isAnnual: true
    },
    {
      id: 3,
      title: "HI-TECHNOLOGY 2025",
      date: "20-22 Mei 2025",
      time: "09:00 - 18:00",
      location: "Campus Technology Park",
      participants: "1000+",
      description: "Hi-Tech Innovation Festival yang menampilkan karya-karya terbaru mahasiswa dan industri dalam bidang teknologi informasi dan digital.",
      image: "/src/assets/images/hi-tech.jpg",
      status: "upcoming",
      category: "Annual Event",
      isAnnual: true
    },
    {
      id: 4,
      title: "KONEK-TI 2025",
      date: "4-5 Oktober 2025",
      time: "10:00 - 17:00",
      location: "Exhibition Hall HMTI",
      participants: "700+",
      description: "Technology Exhibition & Showcase proyek-proyek inovatif dari mahasiswa, startup, dan perusahaan teknologi terdepan.",
      image: "/src/assets/images/techno-expo.jpg",
      status: "upcoming",
      category: "Annual Event",
      isAnnual: true
    }
  ];

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          
          // Start preloading images when section becomes visible
          events.forEach((event, index) => {
            if (event.image && index <= 1) { // Preload first 2 images
              const img = new Image();
              img.src = event.image;
              img.onload = () => handleImageLoad(event.id);
              img.onerror = () => handleImageError(event.id);
            }
          });
        }
      },
      {
        threshold: 0.3,
        rootMargin: '50px 0px', // Start loading 50px before element comes into view
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

  // Auto-slide events
  useEffect(() => {
    const timer = setInterval(() => {
      setActiveEvent((prev) => (prev + 1) % events.length);
    }, 4000);

    return () => clearInterval(timer);
  }, [events.length]);

  // Preload next image for smoother transitions
  useEffect(() => {
    const nextEventIndex = (activeEvent + 1) % events.length;
    const nextEvent = events[nextEventIndex];
    
    if (nextEvent.image && !imageError[nextEvent.id] && !imageLoading[nextEvent.id]) {
      const img = new Image();
      img.src = nextEvent.image;
      img.onload = () => handleImageLoad(nextEvent.id);
      img.onerror = () => handleImageError(nextEvent.id);
    }
  }, [activeEvent, events, imageError, imageLoading]);

  // Handle image loading states
  const handleImageLoad = (eventId: number) => {
    setImageLoading(prev => ({ ...prev, [eventId]: false }));
    setImageError(prev => ({ ...prev, [eventId]: false }));
  };

  const handleImageError = (eventId: number) => {
    setImageLoading(prev => ({ ...prev, [eventId]: false }));
    setImageError(prev => ({ ...prev, [eventId]: true }));
  };

  const handleImageLoadStart = (eventId: number) => {
    setImageLoading(prev => ({ ...prev, [eventId]: true }));
    setImageError(prev => ({ ...prev, [eventId]: false }));
  };

  return (
    <section id="events" className="w-full relative py-12 sm:py-16 lg:py-20" ref={sectionRef}>
      <div className="w-full absolute top-0 left-0 flex z-20 justify-center">
        <div className="bg-gradient-to-b opacity-0 w-full absolute top-0 left-0 from-secondary to-primary"></div>
      </div>
      
      <div className="relative z-30 text-white px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <h1 
          className={`title text-2xl sm:text-3xl md:text-4xl lg:text-5xl text-center leading-tight mb-4 sm:mb-6 lg:mb-8 transition-all duration-1000 transform ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
          }`}
        >
          ACARA TAHUNAN HMTI
        </h1>

        <p 
          className={`max-w-3xl mx-auto text-center text-foreground text-sm sm:text-base lg:text-lg mb-8 sm:mb-12 lg:mb-16 transition-all duration-1000 delay-300 transform ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
          }`}
        >
          Empat event unggulan HMTI yang diselenggarakan setiap tahun untuk memajukan teknologi informasi dan mengembangkan potensi mahasiswa
        </p>

        {/* Featured Event */}
        <div 
          className={`w-full mb-8 sm:mb-12 lg:mb-16 transition-all duration-1000 delay-500 transform ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
          }`}
        >
          <div className="bg-primary/20 backdrop-blur-sm border border-accent/20 rounded-xl lg:rounded-2xl p-4 sm:p-6 lg:p-8 hover:bg-primary/30 transition-all duration-300 hover:shadow-lg hover:shadow-accent/20">
            <div className="grid lg:grid-cols-2 gap-6 lg:gap-8 items-center">
              <div className="order-2 lg:order-1">
                <div className="flex flex-wrap items-center gap-2 mb-4">
                  <span className="bg-accent text-primary px-2 sm:px-3 py-1 rounded-full text-xs sm:text-sm font-bold">
                    FEATURED
                  </span>
                  {events[activeEvent].isAnnual && (
                    <span className="bg-secondary text-accent px-2 sm:px-3 py-1 rounded-full text-xs sm:text-sm font-bold">
                      ANNUAL EVENT
                    </span>
                  )}
                  <span className="text-accent text-xs sm:text-sm">
                    {events[activeEvent].status === 'upcoming' ? 'Akan Datang' : 'Selesai'}
                  </span>
                </div>
                
                <h3 className="text-lg sm:text-xl lg:text-2xl xl:text-3xl font-bold mb-3 sm:mb-4 title">
                  {events[activeEvent].title}
                </h3>
                
                <p className="text-foreground/90 mb-4 sm:mb-6 leading-relaxed text-sm sm:text-base">
                  {events[activeEvent].description}
                </p>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 sm:gap-3 text-xs sm:text-sm">
                  <div className="flex items-center space-x-2 sm:space-x-3">
                    <Calendar className="w-3 h-3 sm:w-4 sm:h-4 text-accent flex-shrink-0" />
                    <span className="truncate">{events[activeEvent].date}</span>
                  </div>
                  
                  <div className="flex items-center space-x-2 sm:space-x-3">
                    <Clock className="w-3 h-3 sm:w-4 sm:h-4 text-accent flex-shrink-0" />
                    <span className="truncate">{events[activeEvent].time}</span>
                  </div>
                  
                  <div className="flex items-center space-x-2 sm:space-x-3">
                    <MapPin className="w-3 h-3 sm:w-4 sm:h-4 text-accent flex-shrink-0" />
                    <span className="truncate">{events[activeEvent].location}</span>
                  </div>
                  
                  <div className="flex items-center space-x-2 sm:space-x-3">
                    <Users className="w-3 h-3 sm:w-4 sm:h-4 text-accent flex-shrink-0" />
                    <span className="truncate">{events[activeEvent].participants} Peserta</span>
                  </div>
                </div>
              </div>
              
              <div className="relative order-1 lg:order-2">
                <div className="relative w-full aspect-video sm:aspect-[4/3] lg:aspect-video bg-gradient-to-br from-accent/20 to-secondary/20 rounded-lg lg:rounded-xl overflow-hidden group">
                  {/* Future image placeholder - ready for real images */}
                  <div className="absolute inset-0 bg-gradient-to-br from-accent/10 to-secondary/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  
                  {events[activeEvent].image && !imageError[events[activeEvent].id] ? (
                    <>
                      {/* Loading spinner */}
                      {imageLoading[events[activeEvent].id] && (
                        <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-accent/20 to-secondary/20 z-10">
                          <div className="flex flex-col items-center space-y-2">
                            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-accent"></div>
                            <p className="text-accent text-sm">Loading...</p>
                          </div>
                        </div>
                      )}
                      
                      <img 
                        src={events[activeEvent].image}
                        alt={`${events[activeEvent].title} - Event Image`}
                        className={`w-full h-full object-cover transition-all duration-500 group-hover:scale-105 ${
                          imageLoading[events[activeEvent].id] ? 'opacity-0' : 'opacity-100'
                        }`}
                        loading="lazy"
                        decoding="async"
                        onLoadStart={() => handleImageLoadStart(events[activeEvent].id)}
                        onLoad={() => handleImageLoad(events[activeEvent].id)}
                        onError={() => handleImageError(events[activeEvent].id)}
                      />
                    </>
                  ) : (
                    /* Placeholder content - shown when no image or image fails to load */
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="text-center px-4">
                        <Calendar className="w-12 h-12 sm:w-16 sm:h-16 lg:w-20 lg:h-20 text-accent mx-auto mb-3 sm:mb-4 transition-all duration-300 group-hover:scale-110 group-hover:rotate-12" />
                        <p className="text-accent font-bold text-sm sm:text-base lg:text-lg">
                          {imageError[events[activeEvent].id] ? 'Image Failed' : 'Event Image'}
                        </p>
                        <p className="text-xs sm:text-sm text-foreground/70">
                          {imageError[events[activeEvent].id] ? 'Loading placeholder' : 'Coming Soon'}
                        </p>
                      </div>
                    </div>
                  )}
                  
                  {/* Image overlay for better text readability when image is present */}
                  {events[activeEvent].image && !imageError[events[activeEvent].id] && !imageLoading[events[activeEvent].id] && (
                    <div className="absolute inset-0 bg-gradient-to-t from-primary/60 via-transparent to-transparent" />
                  )}
                  
                  {/* Event title overlay for images */}
                  {events[activeEvent].image && !imageError[events[activeEvent].id] && !imageLoading[events[activeEvent].id] && (
                    <div className="absolute bottom-4 left-4 right-4 sm:bottom-6 sm:left-6 sm:right-6">
                      <div className="bg-primary/80 backdrop-blur-sm rounded-lg p-3 sm:p-4">
                        <h4 className="text-white font-bold text-sm sm:text-base lg:text-lg">
                          {events[activeEvent].title}
                        </h4>
                        <p className="text-white/80 text-xs sm:text-sm mt-1">
                          {events[activeEvent].date}
                        </p>
                      </div>
                    </div>
                  )}
                </div>
                
                {/* Event navigation dots */}
                <div className="flex justify-center items-center gap-3 sm:gap-2 mt-4 sm:mt-4 px-4">
                  {events.map((_, index) => (
                    <button
                      key={index}
                      aria-label={`Pilih event ${events[index].title}`}
                      tabIndex={0}
                      onClick={() => setActiveEvent(index)}
                      className={`relative rounded-full transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-accent/50 focus:ring-offset-1 focus:ring-offset-primary/20 touch-manipulation min-h-[44px] min-w-[44px] sm:min-h-[32px] sm:min-w-[32px] flex items-center justify-center ${
                        index === activeEvent 
                          ? 'active-dot' 
                          : 'inactive-dot hover:bg-foreground/50 active:bg-foreground/60'
                      }`}
                    >
                      <div 
                        className={`rounded-full transition-all duration-300 ${
                          index === activeEvent 
                            ? 'bg-accent h-3 w-6 sm:h-2 sm:w-8 md:h-3 md:w-8' 
                            : 'bg-foreground/30 h-3 w-3 sm:h-2 sm:w-2 md:h-3 md:w-3'
                        }`}
                      />
                      <span className="sr-only">
                        {index === activeEvent ? 'Event aktif' : 'Pilih event'} {events[index].title}
                      </span>
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default EventsSection;