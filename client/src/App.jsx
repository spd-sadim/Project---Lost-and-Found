import { Route, Routes } from "react-router";
import NavbarNav from "./components/navbar/NavbarNav";
import Home from "./pages/Home";
import HelpAdvice from "./pages/help-advice/HelpAdvice";
import ReportItem from "./pages/report-item/ReportItem";
import ViewItem from "./components/ViewItem";
import DetailedView from "./components/DetailedView";
import AddItem from "./components/AddItem";
import SignInUp from "./pages/sign-in-up/SignInUp";
import Login from "./components/login/Login";
import SignUp from "./components/signup/SignUp";
import PrivateRoute from "./components/privateRoute/PrivateRoute";
import Dashboard from "./pages/dashboard/Dashboard";
import UnAuthorized from "./components/UnAuthorized";
import NotFound from "./NotFound";
import ViewPost from "./pages/view-post/ViewPost";
import { foundInputField, lostInputField } from "./utils/utils";
import Profile from "./components/dashboard/Profile";


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
        <Route path="/unauthorized" element={<UnAuthorized />} />
        <Route path="/view-post" element={<ViewPost />} />
        {/* user dashboard */}
        <Route element={<PrivateRoute allowedRoles={"user"}/>}>
        <Route path="/user" element={<Dashboard />}>
          <Route path="/user/found" element={<ViewItem type='found'/>} />
          <Route path="/user/found/:id" element={<DetailedView />} />
          <Route path="/user/profile" element={<Profile />} />
          <Route path="/user/found/create" element={<AddItem addInputField={foundInputField} endpoint={'/api/found/create'} title="Found" />} />
          <Route path="/user/lost" element={<ViewItem type='lost'/>} />
          <Route path="/user/lost/:id" element={<DetailedView />} />
          <Route path="/user/lost/create" element={<AddItem addInputField={lostInputField} endpoint={'/api/lost/create'} title="Lost" />}  />
        </Route>
        {/* admin dashboard */}
        <Route element={<PrivateRoute allowedRoles={"admin"} />}>
        <Route path="/admin" element={<Dashboard />} />
        </Route>
        </Route>
        {/* 404 not found */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  );
}
