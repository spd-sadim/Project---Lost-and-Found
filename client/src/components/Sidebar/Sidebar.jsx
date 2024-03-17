import React, { useState } from "react";
import { Link } from "react-router-dom";

export default function Sidebar() {
  const [activeDropdown, setActiveDropdown] = useState(null);

  //fn that set activeDropdown value as id
  const handleDropDown = (id) => {
    console.log(id);
    console.log(activeDropdown);
    setActiveDropdown(activeDropdown === id ? null : id);
  };

  const items = [
    {
      id: 2,
      name: "Manage Found Item",
      subLinks: [
        {
          id: 1,
          subName: "View Found Item",
          subRoute: "/view-item?v=found",
        },
        {
          id: 2,
          subName: "Add Found Item",
          subRoute: "/add-found-item",
        },
      ],
    },
    {
      id: 3,
      name: "Manage Lost Item",
      subLinks: [
        {
          id: 1,
          subName: "View Lost Item",
          subRoute: "/view-item?v=lost",
        },
        {
          id: 2,
          subName: "Add Lost Item",
          subRoute: "/add-lost-item",
        },
      ],
    },
    {
      id: 4,
      name: "Account Setting",
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
    <aside className="sidebar-container vh-100 position-sticky border">
      <div className="sidebar-links px-3">
        <ul className="d-flex flex-column gap-1 list-unstyled">
          <Link to="/" className="text-decoration-none">
            <li>View site</li>
          </Link>
          {items.map((item) => (
            <li
              key={item.id}
              className={
                activeDropdown === item.id ? "text-dark" : "text-black"
              }
              onClick={() => {
                handleDropDown(item.id);
              }}
            >
              {item.name}

              <ul className={activeDropdown === item.id ? "d-block" : "d-none"}>
                {item.subLinks.map((subLink) => (
                  <Link
                    to={`/dashboard${subLink.subRoute}`}
                    className="text-decoration-none"
                    key={subLink.id}
                  >
                    <li>{subLink.subName}</li>
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
