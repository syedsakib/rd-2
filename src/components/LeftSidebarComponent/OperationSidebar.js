import React from "react"
import { Link } from "react-router-dom"

const OperationSidebar = () => {
  return (
    <div id="sidebar-menu">
      <ul className="metismenu list-unstyled" id="side-menu">
        <li>
          <Link to="/#" className=" ">
            <span>Operations Dashboard</span>
          </Link>
        </li>

        {/* ACCOUNT */}
        <li className="menu-title">Home Care</li>
        <li>
          <Link to="/operation/homeCare/agencyList" className=" ">
            <i className="bx bx-brightness"></i>
            <span>Agency List</span>
          </Link>
        </li>

        <li>
          <Link to="/operation/homeCare/pendingAgencies" className="">
            <i className="bx bx-lock-open-alt"></i>
            <span>Pending List</span>
          </Link>
        </li>

        <li>
          <Link to="/operation/homeCare/users" className=" ">
            <i className="bx bx-log-out"></i>
            <span>User List</span>
          </Link>
        </li>

        {/* Senior Living */}
        <li className="menu-title">Senior Living</li>
        <li>
          <Link to="/operation/seniorLiving/properties" className=" ">
            <i className="bx bx-brightness"></i>
            <span>Facilities</span>
          </Link>
        </li>

        <li>
          <Link to="/operation/seniorLiving/claims" className="">
            <i className="bx bx-lock-open-alt"></i>
            <span>Claims</span>
          </Link>
        </li>

        <li>
          <Link to="/operation/seniorLiving/reviews" className=" ">
            <i className="bx bx-log-out"></i>
            <span>Reviews</span>
          </Link>
        </li>

        <li>
          <Link to="/operation/seniorLiving/promotions" className=" ">
            <i className="bx bx-log-out"></i>
            <span>Promotions</span>
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

export default OperationSidebar
