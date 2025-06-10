"use client"
import ImageSlider from "./components/imageslider";
import Mywork from "./components/mywork";
import FAQSection from "./components/faqsection";
import ContactSection from "./components/contact";
import Products from "./components/Products";

export default function Home() {
  return (
   <div>
    <ImageSlider/>
    <Products/>
    <Mywork/>
    <FAQSection/>
    <ContactSection/>
    </div>
  );
}
