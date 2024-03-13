import { Outlet } from "react-router";
import Sidebar from "../../components/Sidebar/Sidebar";

export default function UserDashboard() {
  return (
    <div className="main d-flex">
      <div className="sidebar-container h-100" style={{width: "250px", backgroundColor: "red"}}>
        <Sidebar />
      </div>
      <div className="content-container pt-5 mt-5">
        <Outlet />
      </div>
    </div>
  );
}
