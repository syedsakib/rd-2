import PropTypes from "prop-types"
import React from "react"
import { connect } from "react-redux"
import { withRouter } from "react-router-dom"

//i18n
import { withTranslation } from "react-i18next"
import SidebarContent from "./SidebarContent"

import { Link } from "react-router-dom"

import logo from "../../assets/images/logo.svg"
import logoLightPng from "../../assets/images/logo-light.png"
import logoLightSvg from "../../assets/images/logo-light.svg"
import logoDark from "../../assets/images/logo-dark.png"

//import logoShort from "../../assets/images/logos/logo_short_black_and_white_transparent.png"
import logoShort from "../../assets/images/logos/logo_full_light.png"
import logoFull from "../../assets/images/logos/logo_full_with_slogan.png"
import logoFullLight from "../../assets/images/logos/logo_full_with_slogan.svg"

const Sidebar = props => {
  return (
    <React.Fragment>
      <div className="vertical-menu">
        <div className="navbar-brand-box">
          <Link to="/" className="logo logo-dark">
            <span className="logo-sm">
              <img src={logoShort} alt="" height="22" />
            </span>
            <span className="logo-lg">
              <img
                src={logoFull}
                alt=""
                height="17"
                style={{ height: "19px", width: "87px", objectFit: "cover" }}
              />
            </span>
          </Link>

          <Link to="/" className="logo logo-light">
            <span className="logo-sm">
              <img src={logoShort} alt="" height="22" />
            </span>
            <span className="logo-lg">
              <img
                src={logoFull}
                alt=""
                height="19"
                style={{
                  // height: "19px",
                  width: "87px",
                  objectFit: "cover",
                  //background: "#fff",
                  //margin: "5px",
                }}
              />
            </span>
          </Link>
        </div>
        <div data-simplebar className="h-100">
          {props.type !== "condensed" ? <SidebarContent /> : <SidebarContent />}
        </div>
        <div className="sidebar-background"></div>
      </div>
    </React.Fragment>
  )
}

Sidebar.propTypes = {
  type: PropTypes.string,
}

const mapStatetoProps = state => {
  return {
    layout: state.Layout,
  }
}
export default connect(
  mapStatetoProps,
  {}
)(withRouter(withTranslation()(Sidebar)))
