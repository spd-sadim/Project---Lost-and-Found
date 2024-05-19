import { Icon } from "@iconify-icon/react";
import { useState } from "react";
import { Outlet } from "react-router";
import Sidebar from "../../components/Sidebar/Sidebar";

export default function Dashboard({ type }) {
  const [isCollapse, setIsCollapse] = useState(false);
  return (
    <div className="wrapper d-flex" style={{ backgroundColor: "#fafafa" }}>
      <Sidebar isCollapse={isCollapse} userType={type} />
      <main className="w-100">
        <nav className="bg-white">
          <div className="container d-flex align-items-center justify-content-between">
            <Icon
              icon="jam:menu"
              style={{ fontSize: "3.4rem" }}
              onClick={() => {
                setIsCollapse(!isCollapse);
              }}
            />
            <div className="user p-2">
            <Icon icon="guidance:user-1" style={{fontSize: "2.5rem"}} />
            </div>
          </div>
        </nav>
        <div className="container content-container">
          <Outlet />
        </div>
      </main>
    </div>
  );
}
