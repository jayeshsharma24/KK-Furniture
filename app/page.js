"use client"
import ImageSlider from "./components/imageslider";
import Gallery from "./components/gallery";
import Mywork from "./components/mywork";
import FAQSection from "./components/faqsection";
import ContactSection from "./components/contact";

export default function Home() {
  return (
   <div>
    <ImageSlider/>
    <Gallery/>
    <Mywork/>
    <FAQSection/>
    <ContactSection/>
    </div>
  );
}
