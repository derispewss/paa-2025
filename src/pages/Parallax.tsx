// ParallaxLanding.tsx
import React from "react";
import { ParallaxProvider, Parallax } from "react-scroll-parallax";

export default function ParallaxLanding() {
  return (
    // <ParallaxProvider>
      <div className="relative min-h-screen bg-gradient-to-b from-sky-50 to-white">
        {/* Hero Section */}
        <section className="relative h-screen flex items-center justify-center overflow-hidden">
          {/* Background Layer */}
          <Parallax speed={-20} className="absolute inset-0 -z-10">
            <div className="h-full w-full bg-[url('https://images.unsplash.com/photo-1503264116251-35a269479413?q=80&w=1600&auto=format&fit=crop')] bg-cover bg-center" />
          </Parallax>

          {/* Mid Layer */}
          <Parallax speed={-10} className="absolute inset-0 -z-5 flex items-end justify-center">
            <img
              src="https://images.unsplash.com/photo-1501785888041-af3ef285b470?q=80&w=1600&auto=format&fit=crop"
              alt="mountains"
              className="w-full max-h-[55vh] object-cover"
            />
          </Parallax>

          {/* Foreground Text */}
          <div className="relative z-10 text-center px-6 md:px-0">
            <h1 className="text-4xl md:text-6xl font-extrabold text-slate-900 drop-shadow-lg">
              Stunning Parallax Landing
            </h1>
            <p className="mt-4 max-w-2xl mx-auto text-slate-700">
              Smooth parallax powered by <code>react-scroll-parallax</code>.
            </p>
            <div className="mt-8 flex justify-center gap-4">
              <a
                href="#features"
                className="inline-block rounded-2xl px-6 py-3 bg-sky-600 text-white font-semibold shadow-lg hover:bg-sky-700 transition"
              >
                Explore
              </a>
              <a
                href="#gallery"
                className="inline-block rounded-2xl px-6 py-3 border border-slate-200 text-slate-800 font-semibold bg-white/70 backdrop-blur-sm"
              >
                Gallery
              </a>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section id="features" className="relative py-24">
          <div className="container mx-auto px-6 md:px-12">
            <h2 className="text-3xl font-bold text-slate-900 text-center">
              Features
            </h2>
            <p className="mt-3 text-center text-slate-600 max-w-2xl mx-auto">
              Built with <code>react-scroll-parallax</code> — smooth, optimized, and super easy to use.
            </p>

            <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-8">
              <Parallax speed={5}>
                <div className="p-6 rounded-2xl bg-white shadow-md">
                  <h3 className="font-semibold text-lg">Smooth</h3>
                  <p className="mt-2 text-sm text-slate-600">
                    Optimized scroll performance out of the box.
                  </p>
                </div>
              </Parallax>
              <Parallax speed={10}>
                <div className="p-6 rounded-2xl bg-white shadow-md">
                  <h3 className="font-semibold text-lg">Responsive</h3>
                  <p className="mt-2 text-sm text-slate-600">
                    Works on mobile and desktop effortlessly.
                  </p>
                </div>
              </Parallax>
              <Parallax speed={15}>
                <div className="p-6 rounded-2xl bg-white shadow-md">
                  <h3 className="font-semibold text-lg">Easy</h3>
                  <p className="mt-2 text-sm text-slate-600">
                    Just wrap with &lt;Parallax /&gt; and set speed!
                  </p>
                </div>
              </Parallax>
            </div>
          </div>
        </section>

        {/* Gallery Section */}
        <section id="gallery" className="relative py-20 bg-slate-50">
          <div className="container mx-auto px-6 md:px-12">
            <h2 className="text-3xl font-bold text-slate-900 text-center">
              Gallery
            </h2>
            <p className="mt-3 text-center text-slate-600 max-w-2xl mx-auto">
              Example cards that float in at different speeds.
            </p>

            <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-8">
              {[1, 2, 3].map((i) => (
                <Parallax key={i} speed={i * 5}>
                  <article className="rounded-xl overflow-hidden shadow-lg bg-white">
                    <img
                      src={`https://picsum.photos/800/600?random=${i}`}
                      alt={`Gallery ${i}`}
                      className="h-56 md:h-64 w-full object-cover"
                    />
                    <div className="p-6">
                      <h3 className="font-semibold">Card title {i}</h3>
                      <p className="mt-2 text-sm text-slate-600">
                        Floating card effect using parallax speed {i * 5}.
                      </p>
                    </div>
                  </article>
                </Parallax>
              ))}
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className="py-8 bg-white">
          <div className="container mx-auto px-6 md:px-12 text-center text-sm text-slate-500">
            © {new Date().getFullYear()} Parallax demo. Built with React + Tailwind.
          </div>
        </footer>
      </div>
    // </ParallaxProvider>
  );
}
