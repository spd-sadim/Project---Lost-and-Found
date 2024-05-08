import { Icon } from "@iconify-icon/react";
import { useState } from "react";
import { Outlet } from "react-router";
import Sidebar from "../../components/Sidebar/Sidebar";

export default function Dashboard({type}) {
  const [isCollapse, setIsCollapse] = useState(false);
  return (
    <div className="wrapper d-flex"  style={{backgroundColor: "#fafafa"}}>
      <Sidebar isCollapse={isCollapse} userType={type} />
      <main className="container content-container">
        <Icon
          icon="jam:menu"
          style={{ fontSize: "3.4rem" }}
          onClick={() => {
            setIsCollapse(!isCollapse);
          }}
        />

        <Outlet />
      </main>
    </div>
  );
}
