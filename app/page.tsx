import Image from "next/image";
import HeroSection from "./components/Hero";
import RandomMoviesSection from "./components/Movies";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <HeroSection />
      <RandomMoviesSection />
    </main>
  );
}
