import { Icon } from "@iconify-icon/react";
import { useContext, useState } from "react";
import { Outlet, useNavigate } from "react-router";
import Sidebar from "../../components/Sidebar/Sidebar";
import { Dropdown } from "react-bootstrap";
import { AuthContext } from "../../context/AuthContext";
import axios from "axios";

export default function Dashboard() {
  const [isCollapse, setIsCollapse] = useState(false);
  const {user, dispatch} = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      const response = await axios.get('/api/auth/signout');
      dispatch({ type: "logout" });
      localStorage.removeItem("user");
      navigate('/login');
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="wrapper d-flex" style={{ backgroundColor: "#fafafa" }}>
      <Sidebar isCollapse={isCollapse}  />
      <main className="w-100">
        <nav className="bg-white sticky-top" style={{boxShadow: "0 0 2rem 0 rgba(41, 48, 66, .1)"}}>
          <div className="container d-flex align-items-center justify-content-between">
            <Icon
              icon="jam:menu"
              style={{ fontSize: "3.4rem" }}
              onClick={() => {
                setIsCollapse(!isCollapse);
              }}
            />
            <div className="user p-2">
            <Dropdown>
      <Dropdown.Toggle split variant="white" id="dropdown-basic" className="d-flex align-items-center justify-content-center">
           <Icon icon="guidance:user-1" style={{fontSize: "2.5rem"}} /> <span className="px-2">{user.user_firstname + " " + user.user_lastname} </span>  
      </Dropdown.Toggle>

      <Dropdown.Menu>
        <Dropdown.Item href={`/${user.role}/profile`}>My Profile</Dropdown.Item>
        <Dropdown.Item  href={`/${user.role}/change-password`}>Change password</Dropdown.Item>
        <Dropdown.Item onClick={handleLogout} className="text-danger">Log out</Dropdown.Item>
      </Dropdown.Menu>
    </Dropdown>
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
