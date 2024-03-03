import { Route, Routes } from "react-router";
import NavbarNav from "./components/navbar/NavbarNav";
import Home from "./pages/Home";
import Login from "./pages/login/Login";
import SignUp from "./pages/signup/SignUp";
import HelpAdvice from "./pages/help-advice/HelpAdvice";

export default function App() {
  return (
    <>
      <NavbarNav />
      <Routes>
        <Route index path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/sign-up" element={<SignUp />} />
        <Route path="/help-advice" element={<HelpAdvice />} />

      </Routes>
    </>
  );
}
