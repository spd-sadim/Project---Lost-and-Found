import Announcement from "../components/Announcement/Announcement";
import Banner from "../components/Banner/Banner";
import Hero from "../components/Hero/Hero";
import HowItWorks from "../components/How-it-works/HowItWorks";
import Footer from "../components/footer/Footer";
import NavbarNav from "../components/navbar/NavbarNav";

export default function Home() {
  return (
    <>
    <NavbarNav />
        <Hero />
        <Announcement />
        <HowItWorks />
        <Banner />
        <Footer />
    </>
  )
}
