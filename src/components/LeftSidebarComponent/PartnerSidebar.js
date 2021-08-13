import React from "react";
import { Link } from "react-router-dom";

const PartnerSidebar = () => {
  return (
    <div id="sidebar-menu">
      <ul className="metismenu list-unstyled" id="side-menu">
        <li>
          <Link to="/dashboard" className=" ">
            <span>Partner Dashboard</span>
          </Link>
        </li>

        <li className="menu-title">{"Menu"}</li>

        {/* Blog */}
        <li>
          <Link to="/#" className="has-arrow ">
            <i className="bx bxs-dashboard"></i>
            <span>My Business</span>
          </Link>

          <ul className="sub-menu" aria-expanded="false">
            <li>
              <Link to="/partner" className=" ">
                <i className="bx bx-brightness"></i>
                <span>Property List</span>
              </Link>
            </li>

            <li>
              <Link to="/partner/addProperty" className="">
                <i className="bx bx-lock-open-alt"></i>
                <span>Add New Property</span>
              </Link>
            </li>
          </ul>
        </li>

        {/* Data Source */}
        <li className="menu-title">Data Source</li>
        <li>
          <Link to="/partner/claims" className=" ">
            <i className="bx bx-brightness"></i>
            <span>My Claims</span>
          </Link>
        </li>
        <li>
          <Link to="/partner/reviews" className=" ">
            <i className="bx bx-brightness"></i>
            <span>Reviews</span>
          </Link>
        </li>

        <li className="menu-title">{"Support"}</li>
        <li>
          <Link to="/partner/support" className=" ">
            <i className="bx bx-brightness"></i>
            <span>Take Support</span>
          </Link>
        </li>

        <li className="menu-title">{"Account"}</li>
        <li>
          <Link to="/partner/accountSetting" className=" ">
            <i className="bx bx-brightness"></i>
            <span>Account Setting</span>
          </Link>
        </li>
        <li>
          <Link to="/#" className=" ">
            <i className="bx bx-log-out"></i>
            <span>{"Log Out"}</span>
          </Link>
        </li>
      </ul>
    </div>
  );
};

export default PartnerSidebar;
