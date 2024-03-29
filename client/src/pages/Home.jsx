import Announcement from "../components/Announcement/Announcement";
import Hero from "../components/Hero/Hero";
import HowItWorks from "../components/How-it-works/HowItWorks";
import NavbarNav from "../components/navbar/NavbarNav";

export default function Home() {
  return (
    <>
    <NavbarNav />
        <Hero />
        <Announcement />
        <HowItWorks />
    </>
  )
}
