import { Hero } from "@/components/Hero";
import { Experience } from "@/components/Experience";
import { Portfolio } from "@/components/Portfolio";
import { Photography } from "@/components/Photography";
import Playlist from "@/components/Playlist";
import Sailing from "@/components/Sailing";
import { About } from "@/components/About";
import { Contact } from "@/components/Contact";

export default function Home() {
  return (
    <>
      <Hero />
      <Experience />
      <Portfolio />
      <Photography />
      <Playlist />
      <Sailing />
      <About />
      <Contact />
    </>
  );
}
