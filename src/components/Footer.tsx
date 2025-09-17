import { useState, useEffect, useRef } from "react";
import { Mail, Phone, MapPin, Instagram, Facebook, Twitter, Youtube, ExternalLink, Heart } from "lucide-react";

const Footer = () => {
  const [isVisible, setIsVisible] = useState(false);
  const footerRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      {
        threshold: 0.2,
      }
    );

    if (footerRef.current) {
      observer.observe(footerRef.current);
    }

    return () => {
      if (footerRef.current) {
        observer.unobserve(footerRef.current);
      }
    };
  }, []);

  const socialLinks = [
    {
      name: "Instagram",
      icon: Instagram,
      url: "https://instagram.com/hmti_udinus",
      color: "hover:text-pink-400"
    },
    {
      name: "Facebook",
      icon: Facebook,
      url: "https://facebook.com/hmti.udinus",
      color: "hover:text-blue-400"
    },
    {
      name: "Twitter",
      icon: Twitter,
      url: "https://twitter.com/hmti_udinus",
      color: "hover:text-sky-400"
    },
    {
      name: "YouTube",
      icon: Youtube,
      url: "https://youtube.com/hmtiudinus",
      color: "hover:text-red-400"
    }
  ];

  const quickLinks = [
    { name: "Beranda", href: "#hero" },
    { name: "Tentang PAA", href: "#about" },
    { name: "Bidang HMTI", href: "#bidang" },
    { name: "Acara Tahunan", href: "#events" },
    { name: "Perjalanan PAA", href: "#journey" },
    { name: "Pendaftaran", href: "#registration" }
  ];

  const contactInfo = [
    {
      icon: MapPin,
      title: "Alamat",
      content: "Gedung H Lt.4, Universitas Dian Nuswantoro\nJl. Nakula I No.5-11, Semarang"
    },
    {
      icon: Phone,
      title: "Telepon",
      content: "+62 24 3569 196"
    },
    {
      icon: Mail,
      title: "Email",
      content: "hmti@dinus.ac.id"
    }
  ];

  return (
    <footer ref={footerRef} className="w-full relative bg-gradient-to-b from-primary to-secondary border-t border-accent/20 overflow-hidden mt-8 sm:mt-12 lg:mt-16">
      {/* Background decoration */}
      <div className="w-full absolute top-0 left-0 flex z-20 justify-center">
        <div className="bg-gradient-to-b opacity-0 w-full absolute top-0 left-0 from-secondary to-primary"></div>
      </div>

      <div className="relative z-30 text-white px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto py-12 sm:py-16 lg:py-20">
        {/* Main Footer Content */}
        <div 
          className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8 lg:gap-12 mb-8 sm:mb-12 transition-all duration-1000 transform ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
          }`}
        >
          {/* HMTI Info */}
          <div className="lg:col-span-2">
            <div className="flex items-center space-x-3 mb-4 sm:mb-6">
              <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-br from-accent to-secondary rounded-lg sm:rounded-xl flex items-center justify-center flex-shrink-0">
                <span className="text-primary font-bold text-sm sm:text-lg title">H</span>
              </div>
              <div className="min-w-0">
                <h3 className="text-lg sm:text-xl font-bold text-white title">HMTI UDINUS</h3>
                <p className="text-foreground/70 text-xs sm:text-sm">Himpunan Mahasiswa Teknik Informatika</p>
              </div>
            </div>
            
            <p className="text-foreground/80 mb-4 sm:mb-6 leading-relaxed text-sm sm:text-base max-w-lg">
              Organisasi mahasiswa yang berkomitmen mengembangkan potensi akademik dan non-akademik 
              mahasiswa Teknik Informatika Universitas Dian Nuswantoro.
            </p>

            {/* Social Media */}
            <div className="flex flex-wrap gap-2 sm:gap-3">
              {socialLinks.map((social) => {
                const IconComponent = social.icon;
                return (
                  <a
                    key={social.name}
                    href={social.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`group flex items-center justify-center w-9 h-9 sm:w-10 sm:h-10 bg-primary/50 border border-accent/20 rounded-lg hover:border-accent/60 hover:bg-primary/80 transition-all duration-300 hover:scale-110 ${social.color}`}
                    title={social.name}
                  >
                    <IconComponent className="w-4 h-4 sm:w-5 sm:h-5 text-foreground/70 group-hover:text-current transition-colors duration-300" />
                  </a>
                );
              })}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-base sm:text-lg font-bold text-white mb-3 sm:mb-4 title">Link Cepat</h4>
            <ul className="space-y-2 sm:space-y-3">
              {quickLinks.map((link) => (
                <li key={link.name}>
                  <a
                    href={link.href}
                    onClick={(e) => {
                      e.preventDefault();
                      document.querySelector(link.href)?.scrollIntoView({ behavior: "smooth" });
                    }}
                    className="group flex items-center text-foreground/70 hover:text-accent transition-colors duration-300 text-xs sm:text-sm"
                  >
                    <span className="group-hover:translate-x-1 transition-transform duration-300">
                      {link.name}
                    </span>
                    <ExternalLink className="w-2.5 h-2.5 sm:w-3 sm:h-3 ml-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="text-base sm:text-lg font-bold text-white mb-3 sm:mb-4 title">Kontak</h4>
            <div className="space-y-3 sm:space-y-4">
              {contactInfo.map((contact) => {
                const IconComponent = contact.icon;
                return (
                  <div key={contact.title} className="flex items-start space-x-2 sm:space-x-3">
                    <div className="flex-shrink-0 w-7 h-7 sm:w-8 sm:h-8 bg-accent/20 rounded-lg flex items-center justify-center mt-0.5">
                      <IconComponent className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-accent" />
                    </div>
                    <div className="min-w-0 flex-1">
                      <p className="text-xs sm:text-sm font-semibold text-foreground/90 mb-1">{contact.title}</p>
                      <p className="text-xs text-foreground/70 leading-relaxed whitespace-pre-line">
                        {contact.content}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Divider */}
        <div 
          className={`border-t border-accent/20 pt-4 sm:pt-6 lg:pt-8 transition-all duration-1000 delay-300 transform ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
          }`}
        >
          {/* Bottom Footer */}
          <div className="flex flex-col lg:flex-row justify-between items-center space-y-3 lg:space-y-0">
            <div className="flex flex-col sm:flex-row items-center space-y-1 sm:space-y-0 sm:space-x-4 text-center lg:text-left">
              <p className="text-foreground/70 text-xs sm:text-sm">
                © 2025 HMTI UDINUS. All rights reserved.
              </p>
              <div className="hidden sm:block w-1 h-1 bg-foreground/30 rounded-full"></div>
              <p className="text-foreground/70 text-xs sm:text-sm">
                PAA 2025 - Pembekalan Anggota Aktif
              </p>
            </div>

            <div className="flex items-center space-x-2 text-foreground/70 text-xs sm:text-sm">
              <span>Made with</span>
              <Heart className="w-3 h-3 sm:w-4 sm:h-4 text-red-400 animate-pulse" />
              <span>by HMTI Dev Team</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;