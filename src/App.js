import React, { useEffect } from "react"

import { Switch, BrowserRouter as Router } from "react-router-dom"
import { connect } from "react-redux"

// Import Routes all
import { userRoutes, authRoutes } from "./routes/allRoutes"

// Import all middleware
import Authmiddleware from "./routes/middleware/Authmiddleware"

// layouts Format
import VerticalLayout from "./components/VerticalLayout/"
import HorizontalLayout from "./components/HorizontalLayout/"
import NonAuthLayout from "./components/NonAuthLayout"

// Import scss
import "./assets/scss/theme.scss"
import { useDispatch, useSelector } from "react-redux"
import { authenticateUser } from "./store/Actions/authAction"

const App = ({ layout, authenticateUser }) => {
  function getLayout() {
    let layoutCls = VerticalLayout
    switch (layout.layoutType) {
      case "horizontal":
        layoutCls = HorizontalLayout
        break
      default:
        layoutCls = VerticalLayout
        break
    }
    return layoutCls
  }

  const initApp = () => {
    try {
      authenticateUser()
      console.log("authenticateUser")
    } catch (e) {
      console.log(e)
    }
  }

  useEffect(() => {
    initApp()
  }, [])

  const Layout = getLayout()
  return (
    <React.Fragment>
      <Router>
        <Switch>
          {authRoutes.map((route, idx) => (
            <Authmiddleware
              path={route.path}
              layout={NonAuthLayout}
              component={route.component}
              key={idx}
              isAuthProtected={false}
              exact
            />
          ))}

          {userRoutes.map((route, idx) => (
            <Authmiddleware
              path={route.path}
              layout={Layout}
              component={route.component}
              key={idx}
              isAuthProtected={true}
              exact
            />
          ))}
        </Switch>
      </Router>
    </React.Fragment>
  )
}

const mapStateToProps = state => {
  return {
    layout: state.Layout,
  }
}

const mapDispatchToProps = {
  authenticateUser,
}

export default connect(mapStateToProps, mapDispatchToProps)(App)
