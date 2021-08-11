import React from "react"
import { Link } from "react-router-dom"

const SalesSidebar = () => {
  return (
    <div id="sidebar-menu">
      <ul className="metismenu list-unstyled" id="side-menu">
        <li>
          <Link to="/#" className=" ">
            <span>Sales Dashboard</span>
          </Link>
        </li>

        {/* ACCOUNT */}
        <li className="menu-title">Home Care</li>
        <li>
          <Link to="/sales/schedules" className=" ">
            <i className="bx bx-brightness"></i>
            <span>Schedules</span>
          </Link>
        </li>

        <li>
          <Link to="/sales/agencyList" className="">
            <i className="bx bx-lock-open-alt"></i>
            <span>Agency List</span>
          </Link>
        </li>

        <li>
          <Link to="/sales/addAgency" className=" ">
            <i className="bx bx-log-out"></i>
            <span>Add Agency</span>
          </Link>
        </li>
        <li>
          <Link to="/sales/transactions" className=" ">
            <i className="bx bx-log-out"></i>
            <span>My Sales</span>
          </Link>
        </li>
        <li>
          <Link to="/sales/callLogs" className=" ">
            <i className="bx bx-log-out"></i>
            <span>Call Logs</span>
          </Link>
        </li>

        {/* Senior Living */}
        <li className="menu-title">Senior Living</li>
        <li>
          <Link to="/sales/senior-living/list" className=" ">
            <i className="bx bx-brightness"></i>
            <span>Property List</span>
          </Link>
        </li>

        {/* Email */}
        <li className="menu-title">Communication</li>
        <li>
          <Link to="/sales/sendMail" className=" ">
            <i className="bx bx-brightness"></i>
            <span>Send Mail</span>
          </Link>
        </li>

        {/* ACCOUNT */}
        <li className="menu-title">ACCOUNT</li>
        {/* <li>
          <Link to="/admin/account" className=" ">
            <i className="bx bx-brightness"></i>
            <span>My Account</span>
          </Link>
        </li>

        <li>
          <Link to="/admin/resetPassword" className="">
            <i className="bx bx-lock-open-alt"></i>
            <span>Change Password</span>
          </Link>
        </li> */}

        <li>
          <Link to="/#" className=" ">
            <i className="bx bx-log-out"></i>
            <span>Log Out</span>
          </Link>
        </li>
      </ul>
    </div>
  )
}

export default SalesSidebar
