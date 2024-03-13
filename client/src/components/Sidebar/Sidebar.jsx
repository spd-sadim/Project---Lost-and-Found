import React from 'react'
import { Link } from 'react-router-dom'

export default function Sidebar() {
  const items = [
    {
      id: 1,
      name: "View Site",
      route: "/",
    },
    {
      id: 2,
      name: "Manage Found Item",
      subLinks : [
        {
          subName: "View Found Item",
          subRoute: "/view-found-item"
        },
        {
          subName: "Add Found Item",
          subRoute: "/add-found-item"
        },
      ]
    },
    {
      id: 3,
      name: "Manage Lost Item",
      subLinks : [
        {
          subName: "View Lost Item",
          subRoute: "/view-lost-item"
        },
        {
          subName: "Add Lost Item",
          subRoute: "/add-lost-item"
        },
      ]
    },
    {
      id: 4,
      name: "Account setting",
      route: "/account-setting",
    },
    {
      id: 5,
      name: "Notification",
      route: "/notification",
    },
  ]
  return (
    <div>
        <div className="sidebar-links">
          <ul className='d-flex flex-column list-unstyled'>
            <Link to="/" className='text-decoration-none'><li className='text-white'>View site</li></Link>
            <Link to="/dashboard/view-item" className='text-decoration-none'><li className='text-white' >Manage Found Item</li></Link>
            <Link to="/" className='text-decoration-none'><li className='text-white' >Manage Lost Item</li></Link>
            <Link to="/dashboard/account-setting" className='text-decoration-none'><li  className='text-white'>Account setting</li></Link>
            <Link to="/dashboard/notification" className='text-decoration-none'><li className='text-white' >Notification</li></Link>
          </ul>
        </div>
    </div>
  )
}
