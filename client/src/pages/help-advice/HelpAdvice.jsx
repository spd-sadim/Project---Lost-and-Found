import HelpAdviceForm from "../../components/Help-advice/HelpAdviceForm";
import Footer from "../../components/footer/Footer";

export default function HelpAdvice() {
  return (
    <section>
      <HelpAdviceForm />
      {/* map */}
      <iframe
        className="mt-5"
        width="100%"
        height="400"
        allowFullScreen=""
        loading="lazy"
        id="gmap_canvas"
        samesite="Strict"
        src="https://maps.google.com/maps?q=kirtipur&t=&z=10&ie=UTF8&iwloc=&output=embed"
      ></iframe>  
      <Footer />
    </section>
  )
}
