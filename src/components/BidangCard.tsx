import { useState } from "react";

interface BidangCardProps {
  icon: string;
  title: string;
  description: string;
  delay?: number;
}

const BidangCard = ({ icon, title, description, delay = 0 }: BidangCardProps) => {
  const [isHovered, setIsHovered] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);

  const toggleExpanded = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <div 
      className={`w-full text-center gap-4 sm:gap-6 lg:gap-8 flex items-center flex-col p-4 sm:p-6 lg:p-10 bg-primary/10 backdrop-blur-sm bg-blend-color border-t-4 shadow-sm rounded-lg transition-all duration-500 transform hover:scale-105 hover:shadow-xl hover:shadow-accent/20 cursor-pointer group animate-fade-in-up`}
      style={{ animationDelay: `${delay}ms` }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={toggleExpanded}
    >
      <div className="relative">
        <img 
          src={icon} 
          alt={title} 
          className={`w-16 sm:w-20 lg:w-24 h-auto transition-all duration-500 transform ${
            isHovered ? 'scale-110 rotate-6' : 'scale-100 rotate-0'
          } ${imageLoaded ? 'opacity-100' : 'opacity-0'}`}
          onLoad={() => setImageLoaded(true)}
        />
        
        {/* Glow effect */}
        <div className={`absolute inset-0 bg-accent/20 rounded-full blur-xl transition-opacity duration-500 ${
          isHovered ? 'opacity-100' : 'opacity-0'
        }`} />
      </div>
      
      <h1 className={`title text-sm sm:text-base lg:text-lg xl:text-xl leading-tight transition-colors duration-300 ${
        isHovered ? 'text-accent' : 'text-white'
      }`}>
        {title}
      </h1>
      
      <div className={`overflow-hidden transition-all duration-500 ${
        isExpanded ? 'max-h-96 opacity-100' : 'max-h-20 opacity-80'
      }`}>
        <p className="text-xs sm:text-sm lg:text-base text-justify leading-relaxed">
          {description}
        </p>
        
        {!isExpanded && (
          <div className="absolute bottom-0 left-0 right-0 h-8 bg-gradient-to-t from-primary/10 to-transparent pointer-events-none" />
        )}
      </div>
      
      {/* Expand/Collapse indicator */}
      <div className={`transition-all duration-300 transform ${
        isExpanded ? 'rotate-180' : 'rotate-0'
      } opacity-60 group-hover:opacity-100`}>
        <svg className="w-4 h-4 text-accent" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" stroke="currentColor">
          <path d="M19 9l-7 7-7-7"></path>
        </svg>
      </div>
      
      {/* Interactive background effect */}
      <div className={`absolute inset-0 bg-gradient-to-br from-accent/5 to-secondary/5 rounded-lg transition-opacity duration-300 -z-10 ${
        isHovered ? 'opacity-100' : 'opacity-0'
      }`} />
    </div>
  );
};

export default BidangCard;