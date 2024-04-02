import { Route, Routes } from "react-router";
import NavbarNav from "./components/navbar/NavbarNav";
import Home from "./pages/Home";
import HelpAdvice from "./pages/help-advice/HelpAdvice";
import ReportItem from "./pages/report-item/ReportItem";
import UserDashboard from "./pages/dashboard/UserDashboard";
import ViewItem from "./components/ViewItem";
import DetailedView from "./components/DetailedView";
import AddItem from "./components/AddItem";
import SignInUp from "./pages/sign-in-up/SignInUp";
import Login from "./components/login/Login";
import SignUp from "./components/signup/SignUp";

export default function App() {
  return (
    <>
      {/* <NavbarNav /> */}
      <Routes>
        <Route index path="/" element={<Home />} />
        <Route path="/login" element={<SignInUp><Login /> </SignInUp>} />
        <Route path="/sign-up" element={<SignInUp><SignUp /> </SignInUp>} />
        <Route path="/help-advice" element={<HelpAdvice />} />
        <Route path="/report-item" element={<ReportItem />} />
        <Route path="/dashboard" element={<UserDashboard />}>
          <Route path="/dashboard/view-item" element={<ViewItem />} />
          <Route path="/dashboard/view-item/:id" element={<DetailedView />} />
          <Route path="/dashboard/add-item" element={<AddItem />} />
        </Route>
      </Routes>
    </>
  );
}
