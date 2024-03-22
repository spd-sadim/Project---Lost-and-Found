import { Icon } from "@iconify-icon/react";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./sidebar.css";

export default function Sidebar({ isCollapse }) {
  const [activeDropdown, setActiveDropdown] = useState(null);

  //fn that set activeDropdown value as id
  const handleDropDown = (id) => {
    console.log(id);
    console.log(activeDropdown);
    setActiveDropdown(activeDropdown === id ? null : id);
  };

  const handleSubLinkClick = (e) => {
    e.stopPropagation();
  };
  const items = [
    {
      id: 2,
      name: "Manage Found Item",
      icon: <Icon icon="ph:list-magnifying-glass-duotone" />,
      subLinks: [
        {
          id: 1,
          subName: "Add Found Item",
          subRoute: "/add-item",
        },
        {
          id: 2,
          subName: "View Found Item",
          subRoute: "/view-item?v=found",
        },
      ],
    },
    {
      id: 3,
      name: "Manage Lost Item",
      icon: <Icon icon="streamline:lost-and-found" />,
      subLinks: [
        {
          id: 1,
          subName: "Add Lost Item",
          subRoute: "/add-item",
        },
        {
          id: 2,
          subName: "View Lost Item",
          subRoute: "/view-item?v=lost",
        },
      ],
    },
    {
      id: 4,
      name: "Account Setting",
      // icon : <Icon icon="mdi:account-tie" />,
      icon: <Icon icon="mdi:account" />,
      subLinks: [
        {
          id: 1,
          subName: "User Profile",
          subRoute: "/user",
        },
        {
          id: 2,
          subName: "Change Password",
          subRoute: "/change-password",
        },
      ],
    },
    {
      id: 5,
      name: "Notification",
      icon: <Icon icon="clarity:notification-solid" />,
      subLinks: [
        {
          id: 1,
          subName: "Lost Notification",
          subRoute: "/lost/notification",
        },
        {
          id: 2,
          subName: "Found Notification",
          subRoute: "/found/notification",
        },
      ],
    },
  ];
  return (
    <aside
      className={`sidebar-container vh-100 position-sticky ${
        isCollapse ? "collapsed" : ""
      }`}
    >
      <div className="sidebar-links px-3">
        <ul className="d-flex flex-column gap-1 list-unstyled">
          <Link to="/" className="text-decoration-none text-color px-2 py-1">
            <li>View site</li>
          </Link>
          {items.map((item) => (
            <li
              key={item.id}
              className={`  px-2 py-1 ${
                activeDropdown === item.id ? "text-white" : "text-color"
              } `}
              onClick={() => {
                handleDropDown(item.id);
              }}
            >
              <span className="d-flex justify-content-between align-items-center">
                <span>
                  {item.icon} {item.name}
                </span>
                <Icon
                  icon="ep:arrow-down-bold"
                  style={{
                    transform: `rotate(${
                      activeDropdown === item.id ? "-180deg" : "0"
                    })`,
                    transition: "all .2s ease-in",
                  }}
                />
              </span>

              <ul
                className={`list-unstyled px-3 ${
                  activeDropdown === item.id ? "d-block" : "d-none"
                } `}
              >
                {item.subLinks.map((subLink) => (
                  <Link
                    to={`/dashboard${subLink.subRoute}`}
                    className="text-decoration-none text-color"
                    key={subLink.id}
                    onClick={handleSubLinkClick}
                  >
                    <li className="my-2"> {subLink.subName}</li>
                  </Link>
                ))}
              </ul>
            </li>
          ))}
        </ul>
      </div>
    </aside>
  );
}
