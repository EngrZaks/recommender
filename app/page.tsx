import Image from "next/image";
import HeroSection from "./components/Hero";
import RandomMoviesSection from "./components/Movies";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between py-16 -mt-1">
      <HeroSection />
      <RandomMoviesSection />
    </main>
  );
}
