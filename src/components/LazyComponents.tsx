import { Suspense, lazy } from "react";
import ComponentSkeleton from "./ComponentSkeleton";

// Lazy load components
const HeroSection = lazy(() => import("./HeroSection"));
const AboutSection = lazy(() => import("./AboutSection"));
const HMTISection = lazy(() => import("./HMTISection"));
const EventsSection = lazy(() => import("./EventsSection"));
const JourneySection = lazy(() => import("./JourneySection"));
const RegistrationCTA = lazy(() => import("./RegistrationCTA"));
const Footer = lazy(() => import("./Footer"));

// Wrapper components with Suspense
export const LazyHeroSection = () => (
  <Suspense fallback={<ComponentSkeleton type="hero" />}>
    <HeroSection />
  </Suspense>
);

export const LazyAboutSection = () => (
  <Suspense fallback={<ComponentSkeleton type="default" />}>
    <AboutSection />
  </Suspense>
);

export const LazyHMTISection = () => (
  <Suspense fallback={<ComponentSkeleton type="card" />}>
    <HMTISection />
  </Suspense>
);

export const LazyEventsSection = () => (
  <Suspense fallback={<ComponentSkeleton type="card" />}>
    <EventsSection />
  </Suspense>
);

export const LazyJourneySection = () => (
  <Suspense fallback={<ComponentSkeleton type="default" />}>
    <JourneySection />
  </Suspense>
);

export const LazyRegistrationCTA = () => (
  <Suspense fallback={<ComponentSkeleton type="default" />}>
    <RegistrationCTA />
  </Suspense>
);

export const LazyFooter = () => (
  <Suspense fallback={<ComponentSkeleton type="footer" />}>
    <Footer />
  </Suspense>
);