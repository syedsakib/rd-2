import React from "react";
import { Link } from "react-router-dom";

const AdminSidebar = () => {
  return (
    <div id="sidebar-menu">
      <ul className="metismenu list-unstyled" id="side-menu">
        <li>
          <Link to="/dashboard" className="">
            {/* <i className="bx bx-calendar"></i> */}
            <span>{"Admin Dashboard"}</span>
          </Link>
        </li>

        <li className="menu-title">{"Apps"}</li>

        <li>
          <Link to="/#" className="has-arrow ">
            <i className="bx bxs-dashboard"></i>
            <span>{"Dashboards"}</span>
          </Link>

          <ul className="sub-menu" aria-expanded="false">
            <li>
              <Link to="/#">{"Central Advisor"}</Link>
            </li>
            <li>
              <Link to="/sales">{"Sales"}</Link>
            </li>
            <li>
              <Link to="/#">{"Operation"}</Link>
            </li>
            <li>
              <Link to="/cw">{"Content Writer"}</Link>
            </li>
          </ul>
        </li>

        <li>
          <Link to="/#" className="has-arrow ">
            <i className="bx bxs-phone-call"></i>
            <span>{"Call Center"}</span>
          </Link>
          <ul className="sub-menu" aria-expanded="false">
            <li>
              <Link to="/admin/callCenter/callLogs/outgoing">
                {"Outgoing Logs"}
              </Link>
            </li>
            <li>
              <Link to="/admin/callCenter/callLogs/incoming">
                {"Incoming Logs"}
              </Link>
            </li>
          </ul>
        </li>

        <li>
          <Link to="/#" className="has-arrow ">
            <i className="bx bx-aperture"></i>
            <span>{"Sales CRM"}</span>
          </Link>
          <ul className="sub-menu" aria-expanded="false">
            <li>
              <Link to="/admin/sales/agencies">{"Agency List"}</Link>
            </li>
            <li>
              <Link to="/admin/sales/records">{"Record List"}</Link>
            </li>
            <li>
              <Link to="/admin/sales/users">{"Sale Persons"}</Link>
            </li>
          </ul>
        </li>

        <li className="menu-title">{"Management"}</li>
        <li>
          <Link to="/admin/applicantManagement" className="">
            <i className="bx bx-message-dots"></i>
            <span>{"Applicants"}</span>
          </Link>
        </li>

        <li>
          <Link to="/admin/corporate" className="">
            <i className="bx bx-user-circle"></i>
            <span>{"Corporate"}</span>
          </Link>
        </li>

        <li>
          <Link to="/admin/userManagement" className="">
            <i className="bx bx-user-plus"></i>
            <span>{"User Management"}</span>
          </Link>
        </li>

        <li className="menu-title">{"Account"}</li>
        <li>
          <Link to="/admin/account" className="">
            <i className="bx bx-brightness"></i>
            <span>{"My Account"}</span>
          </Link>
        </li>

        <li>
          <Link to="/admin/resetPassword" className="">
            <i className="bx bx-lock-open-alt"></i>
            <span>{"Change Password"}</span>
          </Link>
        </li>

        <li>
          <Link to="/#" className="">
            <i className="bx bx-log-out"></i>
            <span>{"Log Out"}</span>
          </Link>
        </li>
      </ul>
    </div>
  );
};

export default AdminSidebar;
