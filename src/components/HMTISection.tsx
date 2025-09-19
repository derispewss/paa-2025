import BidangCard from "./BidangCard";
import iconInfokom from "../assets/images/Logo Infokom.png";
import iconIptek from "../assets/images/Logo Iptek.png";
import iconLitbang from "../assets/images/Logo Litbang.png";

const HMTISection = () => {
  const bidangData = [
    {
      icon: iconIptek,
      title: "ILMU PENGETAHUAN DAN TEKNOLOGI",
      description: "Bidang IPTEK aktif memfasilitasi kegiatan yang mendorong peningkatan penalaran kritis dan keilmuan di kalangan mahasiswa melalui diskusi, seminar, dan pelatihan tentang teknologi."
    },
    {
      icon: iconLitbang,
      title: "PENELITIAN DAN PENGEMBANGAN",
      description: "Bidang LITBANG berperan dalam penelitian dan pengembangan serta peningkatan kualitas sumber daya manusia di lingkungan teknik informatika."
    },
    {
      icon: iconInfokom,
      title: "INFORMASI DAN KOMUNIKASI",
      description: "Bidang INFOKOM berperan sebagai narahubung dan membangun hubungan baik dengan pihak luar HM-TI, serta bergerak dalam bidang kreatif HM-TI."
    }
  ];

  return (
    <section id="bidang" className="min-h-screen w-full relative overflow-hidden">
      {/* bg element */}
      <div className="w-full min-h-screen absolute top-0 left-0 flex z-0 justify-center">
        <div className="bg-gradient-to-b opacity-0 w-full min-h-screen absolute top-0 left-0 from-secondary to-primary"></div>
      </div>

      {/* content element */}
      <div className="relative z-10 text-white flex flex-col items-center justify-center w-full min-h-screen gap-4 sm:gap-6 md:gap-8 lg:gap-10 px-3 sm:px-4 md:px-6 lg:px-8 py-16 sm:py-20">
        <h1 className="max-w-4xl title text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl text-center leading-tight">
          3 BIDANG HMTI
        </h1>
        <div className="w-full grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-3 sm:gap-4 md:gap-6 lg:gap-8 max-w-7xl">
          {bidangData.map((bidang, index) => (
            <BidangCard
              key={index}
              icon={bidang.icon}
              title={bidang.title}
              description={bidang.description}
              delay={index * 200}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default HMTISection;