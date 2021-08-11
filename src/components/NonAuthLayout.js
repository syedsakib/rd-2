import React from "react"

import { withRouter } from "react-router-dom"

const NonAuthLayout = props => {
  return <React.Fragment>{props.children}</React.Fragment>
}

export default withRouter(NonAuthLayout)
