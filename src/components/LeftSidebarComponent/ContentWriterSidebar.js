import React from "react";
import { Link } from "react-router-dom";

const ContentWriterSidebar = () => {
  return (
    <div id="sidebar-menu">
      <ul className="metismenu list-unstyled" id="side-menu">
        <li>
          <Link to="/cw" className="">
            <span>CW Dashboard</span>
          </Link>
        </li>

        <li className="menu-title">{"Menu"}</li>

        {/* Blog */}
        <li>
          <Link to="/#" className="has-arrow ">
            <i className="bx bxs-detail"></i>
            <span>Blog</span>
          </Link>

          <ul className="sub-menu" aria-expanded="false">
            <li>
              <Link to="/cw/blog" className="">
                <i className="bx bxs-message-alt-check"></i>
                <span>Active List</span>
              </Link>
            </li>

            <li>
              <Link to="/cw/blog/create" className="">
                <i className="bx bx-add-to-queue"></i>
                <span>Add New</span>
              </Link>
            </li>

            <li>
              <Link to="/cw/blog/comments" className="">
                <i className="bx bx-comment-add"></i>
                <span>Comments</span>
              </Link>
            </li>
            <li>
              <Link to="/cw/blog/news" className="">
                <i className="bx bx-news"></i>
                <span>Manage News</span>
              </Link>
            </li>
            <li>
              <Link to="/cw/blog/tags" className="">
                <i className="bx bx-purchase-tag-alt"></i>
                <span>Manage Tags</span>
              </Link>
            </li>
          </ul>
        </li>

        {/* Writer */}
        <li>
          <Link to="/#" className="has-arrow">
            <i className="bx bxs-user-detail"></i>
            <span>Writer</span>
          </Link>
          <ul className="sub-menu" aria-expanded="false">
            <li>
              <Link to="/cw/writer" className="">
                <i className="bx bx-list-ul"></i>
                <span>View List</span>
              </Link>
            </li>
            <li>
              <Link to="/cw/writer/create" className="">
                <i className="bx bx-add-to-queue"></i>
                <span>Add New</span>
              </Link>
            </li>
          </ul>
        </li>

        {/* CMS */}
        <li>
          <Link to="/#" className="has-arrow">
            <i className="bx bx-file"></i>
            <span>CMS</span>
          </Link>
          <ul className="sub-menu" aria-expanded="false">
            <li>
              <Link to="/cw/cms/meta" className="">
                <i className="bx bxs-tag"></i>
                <span>Meta CMS</span>
              </Link>
            </li>
            <li>
              <Link to="/cw/cms/structure" className="">
                <i className="bx bxs-tag-x"></i>
                <span>Structure CMS</span>
              </Link>
            </li>
          </ul>
        </li>

        {/* Data Source */}
        <li className="menu-title">Data Source</li>
        <li>
          <Link to="/cw/scrape" className="">
            <i className="bx bx-list-ol"></i>
            <span>Property List</span>
          </Link>
        </li>
        <li>
          <Link to="/cw/scrape/invalid-list" className="">
            <i className="bx bx-error-alt"></i>
            <span>Invalid Property List</span>
          </Link>
        </li>
        <li>
          <Link to="/cw/scrape/process" className="">
            <i className="bx bx-list-check"></i>
            <span>Process List</span>
          </Link>
        </li>

        {/* Template */}
        <li className="menu-title">Template</li>
        <li>
          <Link to="/cw/templates/email" className="">
            <i className="bx bx-mail-send"></i>
            <span>Email</span>
          </Link>
        </li>

        <li className="menu-title">{"Account"}</li>

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

export default ContentWriterSidebar;
