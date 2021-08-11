import React from "react"
import { Link } from "react-router-dom"

const ContentWriterSidebar = () => {
  return (
    <div id="sidebar-menu">
      <ul className="metismenu list-unstyled" id="side-menu">
        <li>
          <Link to="/dashboard" className=" ">
            <span>CW Dashboard</span>
          </Link>
        </li>

        <li className="menu-title">{"Menu"}</li>

        {/* Blog */}
        <li>
          <Link to="/#" className="has-arrow ">
            <i className="bx bxs-dashboard"></i>
            <span>Blog</span>
          </Link>

          <ul className="sub-menu" aria-expanded="false">
            <li>
              <Link to="/cw/blog" className=" ">
                <i className="bx bx-brightness"></i>
                <span>Active List</span>
              </Link>
            </li>

            <li>
              <Link to="/cw/blog/create" className="">
                <i className="bx bx-lock-open-alt"></i>
                <span>Add New</span>
              </Link>
            </li>

            <li>
              <Link to="/cw/blog/comments" className=" ">
                <i className="bx bx-log-out"></i>
                <span>Comments</span>
              </Link>
            </li>
            <li>
              <Link to="/cw/blog/news" className=" ">
                <i className="bx bx-log-out"></i>
                <span>Manage News</span>
              </Link>
            </li>
            <li>
              <Link to="/cw/blog/tags" className=" ">
                <i className="bx bx-log-out"></i>
                <span>Manage Tags</span>
              </Link>
            </li>
          </ul>
        </li>

        {/* Writer */}
        <li>
          <Link to="/#" className="has-arrow">
            <i className="bx bxs-phone-call"></i>
            <span>Writer</span>
          </Link>
          <ul className="sub-menu" aria-expanded="false">
            <li>
              <Link to="/cw/writer" className=" ">
                <i className="bx bx-brightness"></i>
                <span>View List</span>
              </Link>
            </li>
            <li>
              <Link to="/cw/writer/create" className=" ">
                <i className="bx bx-brightness"></i>
                <span>Add New</span>
              </Link>
            </li>
          </ul>
        </li>

        {/* CMS */}
        <li>
          <Link to="/#" className="has-arrow">
            <i className="bx bxs-phone-call"></i>
            <span>CMS</span>
          </Link>
          <ul className="sub-menu" aria-expanded="false">
            <li>
              <Link to="/cw/cms/meta" className=" ">
                <i className="bx bx-brightness"></i>
                <span>Meta CMS</span>
              </Link>
            </li>
            <li>
              <Link to="/cw/cms/structure" className=" ">
                <i className="bx bx-brightness"></i>
                <span>Structure CMS</span>
              </Link>
            </li>
          </ul>
        </li>

        {/* Data Source */}
        <li className="menu-title">Data Source</li>
        <li>
          <Link to="/cw/scrape" className=" ">
            <i className="bx bx-brightness"></i>
            <span>Property List</span>
          </Link>
        </li>
        <li>
          <Link to="/cw/scrape/invalid-list" className=" ">
            <i className="bx bx-brightness"></i>
            <span>Invalid Property List</span>
          </Link>
        </li>
        <li>
          <Link to="/cw/scrape/process" className=" ">
            <i className="bx bx-brightness"></i>
            <span>Process List</span>
          </Link>
        </li>

        {/* Template */}
        <li className="menu-title">Template</li>
        <li>
          <Link to="/cw/templates/email" className=" ">
            <i className="bx bx-brightness"></i>
            <span>Email</span>
          </Link>
        </li>

        <li className="menu-title">{"Account"}</li>

        <li>
          <Link to="/#" className=" ">
            <i className="bx bx-log-out"></i>
            <span>{"Log Out"}</span>
          </Link>
        </li>
      </ul>
    </div>
  )
}

export default ContentWriterSidebar
