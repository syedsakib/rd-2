import React, { Fragment, useEffect } from "react";
import { Route, Redirect, useHistory, Switch } from "react-router-dom";
import { connect } from "react-redux";

import { getEnv, getURL, checkUrl } from "store/utils/util";
import { updateEnvironment } from "store/Actions/appAction";

import CWRoutes from "routes/DestructuredRoutes/CWRoutes";
import SalesRoutes from "routes/DestructuredRoutes/SalesRoutes";
import AdminRoutes from "routes/DestructuredRoutes/AdminRoutes";
import PartnerRoutes from "routes/DestructuredRoutes/PartnerRoutes";

const Authmiddleware = ({
  component: Component,
  layout: Layout,
  isAuthProtected,
  userState,
  updateEnvironment,
  ...rest
}) => {
  const history = useHistory();
  const { isLoading, loggedInUser: userDetails, isAuthenticated } = userState;

  useEffect(() => {
    if (isAuthenticated && userDetails) {
      let url = window.location.href;
      if (userDetails && url.search(`/updatePassword`) === -1) {
        if (userDetails.isDefaultPasswordChanged === 0) {
          window.location.href = `/updatePassword`;
          return;
        }
        let role = parseInt(userDetails.role);
        if (role === 132 || role === 8) {
          redirectUrl("cw");
        } else if (role === 1323 || role === 11) {
          redirectUrl("sales");
        } else if (role === 145) {
          redirectUrl("partner");
        } else if (role === 1) {
          redirectUrl("admin");
        }
      }
    }
  }, [isAuthenticated, userDetails, window.location.href]);

  useEffect(() => {
    updateEnvironment(getEnv());
  }, []);

  const redirectUrl = (keyword) => {
    let url = window.location.href;
    if (url.search(`/${keyword}`) === -1) {
      history.push(`/${keyword}`);
    }
  };

  console.log({ isLoading, loggedInUser: userDetails, isAuthenticated });
  return (
    <Fragment>
      <Switch>
        <Route
          path="/cw"
          component={CWRoutes}
          name="Content Writer Dashboard"
        />
        <Route
          path="/sales"
          component={SalesRoutes}
          name="Sales Crm Dashboard"
        />
        <Route
          path="/partner"
          component={PartnerRoutes}
          name="Partner Dashboard"
        />
        <Route path="/admin" component={AdminRoutes} name="Admin Dashboard" />
      </Switch>
    </Fragment>
  );
};

const mapStateToProps = (state) => ({
  userState: state.userDetails,
});

const mapDispatchToProps = { updateEnvironment };
export default connect(mapStateToProps, mapDispatchToProps)(Authmiddleware);

// const Authmiddleware = ({
//   component: Component,
//   layout: Layout,
//   isAuthProtected,
//   userState,
//   updateEnvironment,
//   ...rest
// }) => (
//   <Route
//     {...rest}
//     render={(props) => {
//       return (
//         <Layout>
//           <CWRoutes />
//         </Layout>
//       );
//     }}
//   />
// );
