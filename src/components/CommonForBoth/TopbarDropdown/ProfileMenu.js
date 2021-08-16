import React, { useState, useEffect } from "react";
import {
  Dropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
} from "reactstrap";

// Redux
import { connect } from "react-redux";
import { withRouter, Link } from "react-router-dom";

const ProfileMenu = ({ userDetails }) => {
  // Declare a new state variable, which we'll call "menu"
  const [menu, setMenu] = useState(false);

  const [username, setusername] = useState("User");

  const [profilePic, setProfilePic] = useState(
    "https://cdn-boomershub.s3.amazonaws.com/web/defaultUser.jpg"
  );

  useEffect(() => {
    if (userDetails) {
      setusername(userDetails.roleName);
      if (userDetails.image) {
        setProfilePic(userDetails.image);
      }
    }
  }, [userDetails]);

  return (
    <React.Fragment>
      <Dropdown
        isOpen={menu}
        toggle={() => setMenu(!menu)}
        className="d-inline-block"
      >
        <DropdownToggle
          className="btn header-item "
          id="page-header-user-dropdown"
          tag="button"
        >
          <img
            className="rounded-circle header-profile-user"
            src={profilePic}
            alt="User"
          />
          <span className="d-none d-xl-inline-block ms-2 me-1">{username}</span>
          <i className="mdi mdi-chevron-down d-none d-xl-inline-block" />
        </DropdownToggle>
        <DropdownMenu className="dropdown-menu-end">
          <DropdownItem tag="a" href="/admin/account">
            <i className="bx bx-user font-size-16 align-middle me-1" />
            {"Profile"}
          </DropdownItem>

          <div className="dropdown-divider" />
          <Link to="/logout" className="dropdown-item">
            <i className="bx bx-power-off font-size-16 align-middle me-1 text-danger" />
            <span>{"Logout"}</span>
          </Link>
        </DropdownMenu>
      </Dropdown>
    </React.Fragment>
  );
};

const mapStateToProps = (state) => ({
  userDetails: state.userDetails.loggedInUser,
});

export default withRouter(connect(mapStateToProps, {})(ProfileMenu));
