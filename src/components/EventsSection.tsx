import { useState, useEffect, useRef } from "react";
import { Calendar, MapPin } from "lucide-react";
import hitech from "../assets/images/hitech.jpg";
import semnasti from "../assets/images/semnasti.jpg";
import wp from "../assets/images/welcoming-party.webp";

const EventsSection = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [activeEvent, setActiveEvent] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const [imageLoading, setImageLoading] = useState<Record<number, boolean>>({});
  const [imageError, setImageError] = useState<Record<number, boolean>>({});
  const sectionRef = useRef<HTMLElement>(null);

  const events = [
    {
      id: 1,
      prev: {
        title: "Welcoming Party 2024",
        description: "Acara makrab bersama anggota aktif HMTI dan calon anggota baru untuk mempererat tali silaturahmi serta memperkenalkan berbagai kegiatan HMTI.",
        date: "17 Nov 2024",
      },
      next: { 
        title: "KONEK-TI 2025",
        description: "Acara makrab seluruh mahasiswa Teknik Informatika Universitas Dian Nuswantoro Semarang yang bertujuan untuk mempererat tali silaturahmi antar mahasiswa baru dan anggota aktif HMTI melalui berbagai kegiatan menarik dan edukatif.",
        date: "4-5 Oktober 2025",
      },
      location: "Theresiana",
      image: wp,
      status: "upcoming",
      category: "Annual Event",
      isAnnual: true, 
    },
    {
      id: 2,
      prev: {
        title: "SEMNASTI 2024",
        description: "Perkembangan teknologi digital membawa berbagai manfaat bagi masyarakat. Namun, banyak pihak di Indonesia belum memiliki pemahaman yang mendalam dan keterampilan teknis untuk merancang, mengembangkan, dan mengimplementasikan sistem keamanan siber yang efektif. Keterbatasan sumber daya manusia yang ahli di bidang ini menjadi hambatan utama dalam memaksimalkan pertahanan negara terhadap serangan siber yang semakin meningkat.",
        date: "30 November 2024",
        location: "MG. Setos",
      },
      next: {
        title: "SEMNASTI 2025",
        description: "SEMNASTI 2025 mengusung tema Smart Living with AI: Real Tech for Real Life, membahas penerapan AI di Smart Home, Smart Healthcare, dan Autonomous Systems",
        date: "29 November 2025",
        location: "MG. Setos",
      },
      image: semnasti,
      status: "upcoming",
      category: "Annual Event",
      isAnnual: true,
    },
    {
      id: 3,
      prev: {
        title: "ITC 2025",
        description: "IT Competition merupakan singkatan dari Information Technology Competition. Acara tersebut merupakan salah satu acara tahunan dari 58 event DINUS FESTIVAL yang diselenggarakan oleh Himpunan Mahasiswa Teknik Informatika Universitas Dian Nuswantoro Semarang yang terdiri dari 2 lomba yaitu Web Design dan Web Development. Tujuan dari lomba tersebut diantaranya menambah pengetahuan siswa, dan mahasiswa di bidang IT serta untuk mempersiapkan strategi menghadapi kemajuan teknologi saat ini, dan dimasa yang akan datang.",
        date: "23 Januari 2025",
        location: "-",
      },
      next: {
        title: "ITC 2026",
        description:"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
        date: "5 Februari 2026",
        location: "-",
      },
      image: "/src/assets/images/itc.jpg",
      status: "upcoming",
      category: "Annual Event",
      isAnnual: true,
    },
    {
      id: 4,
      prev: {
        title: "HI-Technology 2025",
        description: "HITECH adalah kegiatan yang diselenggarakan oleh Himpunan Mahasiswa Teknik Informatika sebagai wadah bagi mahasiswa untuk memamerkan proyek mereka serta berbagi inovasi di bidang teknologi. Acara ini juga menghadirkan sesi Open Talk dengan dua pembicara yang akan membahas topik menarik seputar teknologi dan pengembangan karier. Diselenggarakan selama dua hari, yaitu pada 14-15 Mei, HITECH bertujuan untuk menginspirasi, memperluas wawasan, dan membangun koneksi antar mahasiswa.",
        date: "14 - 15 Mei 2025",
        location: "-",
      },
      next: {
        title: "HI-Technology 2026",
        date: "13 - 14 Mei 2026",
        description: "HI-Technology 2026 bertema Shaping Innovation for the Next Generation, mendorong siswa dan mahasiswa menciptakan solusi teknologi dengan dampak nyata.",
        location: "-",
      },
      image: hitech,
      status: "upcoming",
      category: "Annual Event",
      isAnnual: true,
    }
  ];

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          events.forEach((event, index) => {
            if (event.image && index <= 1) {
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
        rootMargin: "50px 0px",
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

  useEffect(() => {
    if (isHovered) return;
    const timer = setInterval(() => {
      setActiveEvent((prev) => (prev + 1) % events.length);
    }, 4000);
    return () => clearInterval(timer);
  }, [events.length, isHovered]);

  useEffect(() => {
    const nextEventIndex = (activeEvent + 1) % events.length;
    const nextEvent = events[nextEventIndex];

    if (
      nextEvent.image &&
      !imageError[nextEvent.id] &&
      !imageLoading[nextEvent.id]
    ) {
      const img = new Image();
      img.src = nextEvent.image;
      img.onload = () => handleImageLoad(nextEvent.id);
      img.onerror = () => handleImageError(nextEvent.id);
    }
  }, [activeEvent, events, imageError, imageLoading]);

  const handleImageLoad = (eventId: number) => {
    setImageLoading((prev) => ({ ...prev, [eventId]: false }));
    setImageError((prev) => ({ ...prev, [eventId]: false }));
  };

  const handleImageError = (eventId: number) => {
    setImageLoading((prev) => ({ ...prev, [eventId]: false }));
    setImageError((prev) => ({ ...prev, [eventId]: true }));
  };

  const handleImageLoadStart = (eventId: number) => {
    setImageLoading((prev) => ({ ...prev, [eventId]: true }));
    setImageError((prev) => ({ ...prev, [eventId]: false }));
  };
  return (
    <section
      id="events"
      className="w-full relative py-12 sm:py-16 lg:py-20"
      ref={sectionRef}
    >
      <div className="w-full absolute top-0 left-0 flex z-20 justify-center">
        <div className="bg-gradient-to-b opacity-0 w-full absolute top-0 left-0 from-secondary to-primary"></div>
      </div>

      <div className="relative z-30 text-white px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <h1
          className={`title text-2xl sm:text-3xl md:text-4xl lg:text-5xl text-center leading-tight mb-4 sm:mb-6 lg:mb-8 transition-all duration-1000 transform ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
          }`}
        >
          ACARA TAHUNAN HMTI
        </h1>

        <p
          className={`max-w-3xl mx-auto text-center text-foreground text-sm sm:text-base lg:text-lg mb-8 sm:mb-12 lg:mb-16 transition-all duration-1000 delay-300 transform ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
          }`}
        >
          Empat event unggulan HMTI yang diselenggarakan setiap tahun untuk
          memajukan teknologi informasi dan mengembangkan potensi mahasiswa
        </p>

        {/* Featured Event */}
        <div
          className={`w-full mb-8 sm:mb-12 lg:mb-16 transition-all duration-1000 delay-500 transform ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
          }`}
        >
          <div
            className="bg-primary/20 backdrop-blur-sm border border-accent/20 rounded-xl lg:rounded-2xl p-4 sm:p-6 lg:p-8 hover:bg-primary/30 transition-all duration-300 hover:shadow-lg hover:shadow-accent/20"
            onMouseEnter={() => setIsHovered(true)} // ⬅️ hover mulai
            onMouseLeave={() => setIsHovered(false)} // ⬅️ hover selesai
          >
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
                  <span className="bg-accent text-primary px-2 sm:px-3 py-1 rounded-full text-xs sm:text-sm font-bold">
                    {events[activeEvent].status === "upcoming"
                      ? "COMING SOON"
                      : "DONE"}
                  </span>
                </div>
                <h3 className="text-lg sm:text-xl lg:text-2xl xl:text-3xl font-bold mb-3 sm:mb-4 title">
                  {events[activeEvent].next.title}
                </h3>
                <p className="text-foreground/90 mb-4 sm:mb-6 leading-relaxed text-sm sm:text-base">
                  {events[activeEvent].next.description || "Deskripsi acara akan segera hadir."}
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 sm:gap-3 text-xs sm:text-sm">
                  <div className="flex items-center space-x-2 sm:space-x-3">
                    <Calendar className="w-3 h-3 sm:w-4 sm:h-4 text-accent flex-shrink-0" />
                    <span className="truncate">{events[activeEvent].next.date}</span>
                  </div>
                  <div className="flex items-center space-x-2 sm:space-x-3">
                    <MapPin className="w-3 h-3 sm:w-4 sm:h-4 text-accent flex-shrink-0" />
                    <span className="truncate">
                      {events[activeEvent].next.location || "Lokasi akan diumumkan"}
                    </span>
                  </div>
                </div>
              </div>

              <div className="relative order-1 lg:order-2">
                {/* Floating decorative shapes */}
                <div className="absolute -top-6 left-1/2 transform -translate-x-1/2 z-10">
                  <div className="w-3 h-3 bg-accent/40 rounded-full animate-pulse"></div>
                </div>
                <div className="absolute -top-3 left-1/3 transform -translate-x-1/2 z-10">
                  <div className="w-2 h-2 bg-secondary/40 rounded-full animate-pulse delay-300"></div>
                </div>
                <div className="absolute -top-8 right-1/3 transform translate-x-1/2 z-10">
                  <div className="w-2 h-2 bg-accent/30 rounded-full animate-pulse delay-700"></div>
                </div>

                <div className="relative w-full aspect-video sm:aspect-[4/3] lg:aspect-video bg-gradient-to-br from-accent/20 to-secondary/20 rounded-lg lg:rounded-xl overflow-hidden group">
                  {/* Animated background overlay */}
                  <div className="absolute inset-0 bg-gradient-to-br from-accent/10 to-secondary/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                  {/* Dynamic status indicator */}
                  <div className="absolute top-4 right-4 z-10">
                    <div
                      className={`w-3 h-3 sm:w-4 sm:h-4 rounded-full shadow-lg animate-pulse ${
                        events[activeEvent].status === "upcoming"
                          ? "bg-green-400 shadow-green-400/50"
                          : "bg-blue-400 shadow-blue-400/50"
                      }`}
                    >
                      <div
                        className={`absolute inset-0 rounded-full animate-ping ${
                          events[activeEvent].status === "upcoming"
                            ? "bg-green-400"
                            : "bg-blue-400"
                        }`}
                      ></div>
                    </div>
                  </div>

                  {events[activeEvent].image &&
                  !imageError[events[activeEvent].id] ? (
                    <>
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
                        alt={`${events[activeEvent].prev.title} - Event Image`}
                        className={`w-full h-full object-cover transition-all duration-500 group-hover:scale-105 ${
                          imageLoading[events[activeEvent].id]
                            ? "opacity-0"
                            : "opacity-100"
                        }`}
                        loading="lazy"
                        decoding="async"
                        onLoadStart={() =>
                          handleImageLoadStart(events[activeEvent].id)
                        }
                        onLoad={() => handleImageLoad(events[activeEvent].id)}
                        onError={() => handleImageError(events[activeEvent].id)}
                      />

                      {/* Interactive overlay with event details */}
                      <div className="absolute inset-0 bg-gradient-to-t from-primary/90 via-primary/20 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500 flex items-end">
                        <div className="p-4 sm:p-6 w-full">
                          <div className="flex items-center gap-2 mb-2">
                            <div className="w-2 h-2 bg-accent rounded-full animate-pulse"></div>
                            <span className="text-accent text-xs sm:text-sm font-semibold uppercase tracking-wider">
                              Live Preview
                            </span>
                          </div>
                          <h4 className="text-white font-bold text-sm sm:text-base lg:text-lg mb-1">
                            {events[activeEvent].prev.title}
                          </h4>
                          <p className="text-white/90 text-xs sm:text-sm mb-2">
                            {events[activeEvent].prev.date}
                          </p>
                          <p className="text-white/80 text-xs sm:text-sm line-clamp-2">
                            {events[activeEvent].prev.description.substring(0, 120)}
                            ...
                          </p>
                        </div>
                      </div>
                    </>
                  ) : (
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="text-center px-4">
                        <Calendar className="w-12 h-12 sm:w-16 sm:h-16 lg:w-20 lg:h-20 text-accent mx-auto mb-3 sm:mb-4 transition-all duration-300 group-hover:scale-110 group-hover:rotate-12" />
                        <p className="text-accent font-bold text-sm sm:text-base lg:text-lg">
                          {imageError[events[activeEvent].id]
                            ? "Image Failed"
                            : "Event Image"}
                        </p>
                        <p className="text-xs sm:text-sm text-foreground/70">
                          {imageError[events[activeEvent].id]
                            ? "Loading placeholder"
                            : "Coming Soon"}
                        </p>

                        {/* Fallback event info overlay */}
                        <div className="mt-4 bg-primary/60 backdrop-blur-sm rounded-lg p-3 opacity-0 group-hover:opacity-100 transition-all duration-500">
                          <p className="text-white font-semibold text-xs sm:text-sm">
                            {events[activeEvent].prev.title}
                          </p>
                          <p className="text-white/80 text-xs">
                            {events[activeEvent].prev.date}
                          </p>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Remove the old overlay that was duplicated */}
                </div>

                
                <div className="flex justify-center items-center gap-3 sm:gap-2 mt-4 sm:mt-4 px-4">
                  {events.map((_, index) => (
                    <button
                      key={index}
                      aria-label={`Pilih event ${events[index].next.title}`}
                      tabIndex={0}
                      onClick={() => setActiveEvent(index)}
                      className={`relative rounded-full transition-all duration-300 focus:outline-none touch-manipulation min-h-[44px] min-w-[44px] sm:min-h-[32px] sm:min-w-[32px] flex items-center justify-center ${
                        index === activeEvent
                          ? "active-dot"
                          : "inactive-dot hover:bg-foreground/50 active:bg-foreground/60"
                      }`}
                    >
                      <div
                        className={`rounded-full transition-all duration-300 ${
                          index === activeEvent
                            ? "bg-accent h-3 w-6 sm:h-2 sm:w-8 md:h-3 md:w-8"
                            : "bg-foreground/30 h-3 w-3 sm:h-2 sm:w-2 md:h-3 md:w-3"
                        }`}
                      />
                      <span className="sr-only">
                        {index === activeEvent ? "Event aktif" : "Pilih event"}{" "}
                        {events[index].next.title}
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
