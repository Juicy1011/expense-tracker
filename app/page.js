import { Button } from "@/components/ui/button";
import Image from "next/image";
import Header from "./_components/Header";
import Hero from "./_components/Hero";
import Testimonials from "./_components/Testimonials";
import Footer from "./_components/Footer";

export default function Home() {
  return (
    <div>
      <Header/>
      <Hero/>
      <Testimonials />
      <Footer />
      </div>
  );
}
