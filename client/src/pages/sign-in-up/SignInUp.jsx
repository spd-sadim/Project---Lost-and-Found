
import { Icon } from "@iconify-icon/react"
import { Link } from "react-router-dom"

export default function SignInUp({children}) {
  return (
    <section className="bg-sec vh-100 d-flex align-items-center justify-content-center position-relative">
    <Link to="/" className="border-0 position-absolute" style={{top: "32px", left: "26px", }}><Icon icon="fa-solid:home" className="h1"/></Link>
        {children}
    </section>
  )
}
