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
import ViewUser from "./components/dashboard/ViewUser";
import DetailedUsers from "./components/dashboard/DetailedUsers";
import Inquiry from "./components/dashboard/Inquiry";
import EditPost from "./components/dashboard/EditPost";
import InquiryDetails from "./components/dashboard/InquiryDetails";
import Item from "./pages/Item";
import ChangePassword from "./components/dashboard/ChangePassword";


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
        <Route path="/view/:id" element={<Item><DetailedView /></Item>} />
        {/* user dashboard */}
        <Route element={<PrivateRoute allowedRoles={"user"}/>}>
        <Route path="/user" element={<Dashboard />}>
          <Route path="/user/found" element={<ViewItem type='found'/>} />
          <Route path="/user/found/:id" element={<DetailedView />} />
          <Route path="/user/found/edit/:id" element={<EditPost addInputField={foundInputField}/>}  title="Found" />
          <Route path="/user/lost/edit/:id" element={<EditPost addInputField={lostInputField}  title="Lost" />} />
          <Route path="/user/profile" element={<Profile />} />
          <Route path="/user/found/create" element={<AddItem addInputField={foundInputField} endpoint={'/api/found/create'} title="Found" />} />
          <Route path="/user/lost" element={<ViewItem type='lost'/>} />
          <Route path="/user/lost/:id" element={<DetailedView />} />
          <Route path="/user/lost/create" element={<AddItem addInputField={lostInputField} endpoint={'/api/lost/create'} title="Lost" />}  />
        </Route>
        </Route>
        {/* admin dashboard */}
        <Route element={<PrivateRoute allowedRoles={"admin"} />}>
        <Route path="/admin" element={<Dashboard />} > 
          <Route path="/admin/profile" element={<Profile />} />
          <Route path="/admin/found/edit/:id" element={<EditPost addInputField={foundInputField}/>}  title="Found" />
          <Route path="/admin/lost/edit/:id" element={<EditPost addInputField={lostInputField}/>}  title="Found" />
          <Route path="/admin/found" element={<ViewItem type='found'/>} />
          <Route path="/admin/users" element={<ViewUser />} />
          <Route path="/admin/change-password" element={<ChangePassword />} />
          <Route path="/admin/users/:id" element={<DetailedUsers />} />
          <Route path="/admin/found/:id" element={<DetailedView />} />
          <Route path="/admin/found/create" element={<AddItem addInputField={foundInputField} endpoint={'/api/found/create'} title="Found" />} />
          <Route path="/admin/lost" element={<ViewItem type='lost'/>} />
          <Route path="/admin/lost/:id" element={<DetailedView />} />
          <Route path="/admin/lost/create" element={<AddItem addInputField={lostInputField} endpoint={'/api/lost/create'} title="Lost" />}  />
          <Route path="/admin/inquiry" element={<Inquiry />} />
          <Route path="/admin/inquiry/:id" element={<InquiryDetails />} />
        </Route>
        </Route>
        {/* 404 not found */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  );
}
