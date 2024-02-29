import { Route, Routes } from "react-router";
import NavbarNav from "./components/navbar/NavbarNav";
import Home from "./pages/Home";

export default function App() {
  return (
    <>
      <NavbarNav />
      <Routes>
        <Route index path="/" element={<Home />} />
      </Routes>
    </>
  );
}
