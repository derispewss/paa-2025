import sparks from "../assets/images/Untitled design (9) 3.png";
import CloudLeft from "../assets/images/Hero - Cloud Left.png";
import CloudRight from "../assets/images/Hero - Cloud Right.png";
import PlanetBehind from "../assets/images/Hero - Planet Behind.png";
import Planet1 from "../assets/images/Planet 1.png";
import Planet2 from "../assets/images/Planet 2.png";
import Planet3 from "../assets/images/Planet 3.png";
import Planet4 from "../assets/images/Planet 4.png";
import iconInfokom from "../assets/images/Icon INFOKOM.png";
import iconIptek from "../assets/images/Icon IPTEK.png";
import iconLitbang from "../assets/images/Icon LITBANG.png";

import { useLayoutEffect, useRef, useState } from "react";

const MainPage = () => {
  const [scrollY, setScrollY] = useState(0);
  const getScrollValue = (e: number) => {
    setScrollY((e / divHeight) * 100);
    console.log((e / divHeight) * 100);
  };

  const [divHeight, setDivHeight] = useState(0);
  const divRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    if (divRef.current) {
      setDivHeight(divRef.current.offsetHeight);
    }
  }, []);

  return (
    <div
      ref={divRef}
      onScroll={(e) => {
        getScrollValue(e.currentTarget.scrollTop);
      }}
      className="w-full text-['Jakarta'] bg-primary max-h-screen overflow-y-auto relative"
    >
      <section className="h-screen w-full relative overflow-hidden">
        {/* bg element */}
        <div className="w-full h-screen absolute top-0 left-0 flex z-10 justify-center">
          <div className="bg-gradient-to-b opacity-0 w-full h-screen absolute top-0 left-0 from-secondary to-primary"></div>
        </div>

        {/* content element */}
        <div className="absolute z-30 text-white top-0 left-0 flex flex-col items-center justify-center w-full h-screen">
          <h1 className="max-w-4xl title text-5xl text-center">
            PEMBEKELAN MAHASISWA AKTIF 2025
          </h1>
          <p className="mt-4 text-foreground max-w-7xl text-center">
            Lorem ipsum dolor, sit amet consectetur adipisicing elit. A hic
            minus mollitia illum dolorem delectus eos cum libero, illo
            perferendis!
          </p>
          <button className="px-6 py-4 shadow-accent shadow-md rounded-xl text-sm mt-4 bg-gradient-to-b from-accent to-secondary">
            baca selengkapnya disini
          </button>
        </div>
      </section>
      <section className="h-screen w-full relative">
        <div className="w-full h-screen absolute top-0 left-0 flex z-20 justify-center">
          <div className="bg-gradient-to-b opacity-0 w-full h-screen absolute top-0 left-0 from-secondary to-primary"></div>
        </div>
        <div className="absolute z-10 text-white top-0 left-0 flex flex-col items-center justify-center w-full h-screen">
          <h1 className="max-w-4xl title text-5xl text-center">APA ITU PAA</h1>
          <p className="mt-4 text-foreground max-w-7xl text-center p-4 bg-primary border-4 shadow-sm rounded-e-[30px] rounded-s-[30px] border-accent">
            PAA (Pembekalan Anggota Aktif) adalah kegiatan bagi mahasiswa
            Universitas Dian Nuswantoro, khususnya mahasiswa Teknik Informatika,
            di mana mereka dapat bergabung dengan Himpunan Mahasiswa Teknik
            Informatika melalui berbagai tahapan bermakna, bermanfaat, dan
            menyenangkan. Dengan bergabung, Anda akan memperoleh banyak manfaat
            seperti pengembangan Softskill dan Hardskill yang akan terus diasah
            hingga mencapai potensi maksimal. Pada tahun 2024, PAA mengusung
            tema "Empowering Tomorrow New Minds, New Generation".
          </p>
        </div>
      </section>
      <section className="h-screen w-full relative overflow-hidden">
        {/* bg element */}
        <div className="w-full h-screen absolute top-0 left-0 flex z-10 justify-center">
          <div className="bg-gradient-to-b opacity-0 w-full h-screen absolute top-0 left-0 from-secondary to-primary"></div>
        </div>

        {/* content element */}
        <div className="absolute z-30 text-white top-0 left-0 flex flex-col items-center justify-center w-full h-screen gap-10">
          <h1 className="max-w-4xl title text-5xl text-center">
            3 BIDANG HMTI
          </h1>
          <div className="w-full grid grid-cols-3 gap-4 px-40">
            <div className="w-full text-center gap-8 flex items-center flex-col p-10 bg-primary/10 backdrop-blur-sm bg-blend-color border-t-4 shadow-sm">
              <img src={iconIptek} alt="" className="w-24" />
              <h1 className="title">ILMU PENGETAHUAN DAN TEKNOLOGI</h1>
              <p className="text-justify">
                Bidang IPTEK aktif memfasilitasi kegiatan yang mendorong
                peningkatan penalaran kritis dan keilmuan di kalangan mahasiswa
                melalui diskusi, seminar, dan pelatihan tentang teknologi.
              </p>
            </div>
            <div className="w-full text-center gap-8 flex items-center flex-col p-10 bg-primary/10 backdrop-blur-sm bg-blend-color border-t-4 shadow-sm">
              <img src={iconLitbang} alt="" className="w-24" />
              <h1 className="title">PENELITIAN DAN PENGEMBANGAN</h1>
              <p className="text-justify">
                Bidang LITBANG berperan dalam penelitian dan pengembangan serta
                peningkatan kualitas sumber daya manusia di lingkungan teknik
                informatika.
              </p>
            </div>
            <div className="w-full text-center gap-8 flex items-center flex-col p-10 bg-primary/10 backdrop-blur-sm bg-blend-color border-t-4 shadow-sm">
              <img src={iconInfokom} alt="" className="w-24" />
              <h1 className="title">INFORMASI DAN KOMUNIKASI</h1>
              <p className="text-justify">
                Bidang INFOKOM berperan sebagai narahubung dan membangun
                hubungan baik dengan pihak luar HM-TI, serta bergerak dalam
                bidang kreatif HM-TI.
              </p>
            </div>
          </div>
        </div>
      </section>
      <img
        src={sparks}
        alt=""
        className="w-full fixed top-0 left-0 opacity-50"
      />
      <div className="bg-gradient-to-b w-full h-screen fixed top-0 from-70% left-0 from-secondary/0 to-primary"></div>
      <div
        style={{ transform: `translateY(${scrollY * 1}%)` }}
        className="w-full fixed bottom-0 z-30 left-0 flex justify-center object"
      >
        <img src={PlanetBehind} alt="" className={"w-1/2"} />
      </div>
      <img
        style={{ transform: `translateX(${scrollY * -1}%)` }}
        src={CloudLeft}
        alt=""
        className={"w-1/3 fixed bottom-0 z-30 left-0"}
      />
      <img
        style={{ transform: `translateX(${scrollY * 1}%)` }}
        src={CloudRight}
        alt=""
        className={"w-1/3 fixed bottom-0 z-30 right-0"}
      />
      {/* planet parallax */}
      <img
        src={Planet1}
        className="w-40 fixed top-40 left-40"
        alt=""
        style={{ transform: `translateY(${scrollY * -1}%)` }}
      />
      <img
        src={Planet2}
        className="w-40 fixed bottom-40 right-80"
        alt=""
        style={{ transform: `translateY(${scrollY * -1}%)` }}
      />
      <img
        src={Planet3}
        className="w-24 fixed bottom-40 left-80"
        alt=""
        style={{ transform: `translateY(${scrollY * -1}%)` }}
      />
      <img
        src={Planet4}
        className="w-24 fixed top-40 right-40"
        alt=""
        style={{ transform: `translateY(${scrollY * -1}%)` }}
      />
      {/* planet parallax 2nd screen */}
      <img
        src={Planet1}
        className="w-40 fixed top-full left-40"
        alt=""
        style={{ transform: `translateY(${scrollY * -1}%)` }}
      />
      <img
        src={Planet4}
        className="w-24 fixed top-full right-40"
        alt=""
        style={{ transform: `translateY(${scrollY * -1}%)` }}
      />
    </div>
  );
};

export default MainPage;
