import { useState, useEffect } from "react";
import logoPAA from "../assets/images/logo.png";
import { useLocation } from "react-router-dom";
import { Home, Info, Target, UserPlus, Menu, X, Calendar, Route } from "lucide-react";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();
  const [activeHash, setActiveHash] = useState(location.hash);

  const navItems = [
    { name: "Home", path: "/", icon: Home },
    { name: "Tentang", path: "#about", icon: Info },
    { name: "Bidang", path: "#bidang", icon: Target },
    { name: "Acara", path: "#events", icon: Calendar },
    { name: "Perjalanan", path: "#journey", icon: Route },
    { name: "Daftar Disini", path: "#registration", icon: UserPlus },
  ];

  useEffect(() => {
    const onHashChange = () => setActiveHash(window.location.hash);
    window.addEventListener("hashchange", onHashChange);

    const handleScroll = () => {
      const scrollTop = window.scrollY;
      setScrolled(scrollTop > 50);
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("hashchange", onHashChange);
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const isActive = (path: string) => {
    if (path.startsWith("#")) {
      return activeHash === path;
    }
    if (path === "/") {
      return location.pathname === "/" && !activeHash;
    }
    return location.pathname === path;
  };

  const handleNavClick = (path: string) => {
    if (path.startsWith("#")) {
      const element = document.querySelector(path);
      if (element) {
        element.scrollIntoView({ behavior: "smooth" });
        window.history.pushState(null, "", path);
        setActiveHash(path);
      }
    } else if (path === "/") {
      window.scrollTo({ top: 0, behavior: "smooth" });
      window.history.pushState(null, "", "/");
      setActiveHash("");
    }
    setIsOpen(false);
  };

  return (
    <nav
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 border-b ${
        scrolled
          ? "bg-primary/95 backdrop-blur-lg border-accent/30 shadow-lg shadow-primary/50"
          : "bg-primary/90 backdrop-blur-md border-accent/20"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo/Brand */}
          <div className="flex-shrink-0">
            <button
              onClick={() => handleNavClick("/")}
              className="focus:outline-none group transition-all duration-300 hover:scale-105"
            >
              <img
                src={logoPAA}
                alt="PAA 2025"
                className="h-10 w-auto object-contain bg-transparent drop-shadow-lg group-hover:drop-shadow-xl transition-all duration-300"
              />
            </button>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-1">
              {navItems.map((item) => (
                <button
                  key={item.name}
                  onClick={() => handleNavClick(item.path)}
                  className={`group relative px-3 py-2 rounded-md text-sm font-medium transition-all duration-300 hover:scale-105 ${
                    isActive(item.path)
                      ? "text-accent/100 bg-accent/10"
                      : "text-foreground/70 hover:text-accent hover:bg-accent/10"
                  }`}
                >
                  <span className="flex items-center space-x-2">
                    <item.icon className="w-4 h-4 opacity-70 group-hover:opacity-100 transition-opacity duration-300" />
                    <span>{item.name}</span>
                  </span>
                  {/* Hover effect bg */}
                  <div className="absolute inset-0 bg-accent/5 rounded-md transform scale-0 group-hover:scale-100 transition-transform duration-200 -z-10"></div>
                </button>
              ))}
            </div>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-foreground hover:text-accent inline-flex items-center justify-center p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-accent transition-all duration-300 hover:scale-110 hover:bg-accent/10"
              aria-expanded={isOpen}
            >
              <span className="sr-only">Open main menu</span>
              {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      <div
        className={`md:hidden transition-all duration-300 overflow-hidden ${
          isOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-primary/95 backdrop-blur-lg border-t border-accent/30">
          {navItems.map((item, index) => (
            <button
              key={item.name}
              onClick={() => handleNavClick(item.path)}
              className={`group block px-3 py-2 rounded-md text-base font-medium w-full text-left transition-all duration-300 hover:scale-105 transform ${
                isActive(item.path)
                  ? "text-accent/100 bg-accent/10"
                  : "text-foreground/70 hover:text-accent hover:bg-accent/10"
              }`}
              style={{ animationDelay: `${index * 50}ms` }}
            >
              <span className="flex items-center space-x-3">
                <item.icon className="w-4 h-4 opacity-70 group-hover:opacity-100 transition-opacity duration-300" />
                <span>{item.name}</span>
              </span>
            </button>
          ))}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
