import React, { useState, useEffect, Fragment } from "react";
import { Redirect, Route, Switch, useHistory } from "react-router-dom";
import { connect } from "react-redux";

import Dashboard from "pages/Dashboard/index";

import PartnerPropertyListWrapper from "pages/PartnerModule/MyProperty/PartnerPropertyListWrapper";
import AddPartnerPropertyWrapper from "pages/PartnerModule/PropertyForm/AddProperty/AddPartnerPropertyWrapper";
import EditPartnerPropertyWrapper from "pages/PartnerModule/PropertyForm/EditProperty/EditPropertyWrapper";
import MyClaimWrapper from "pages/PartnerModule/MyClaims/MyClaimWrapper";
import MyPropertyReviewList from "pages/PartnerModule/PropertyReview/PropertyReviewList";
import Support from "pages/PartnerModule/Support/Contact";
import PartnerPropertyPromotion from "pages/PartnerModule/PropertyPromotion/PropertyPromotionList";
import PartnerAssignLeads from "pages/PartnerModule/AssignLeads/AssignLeads";
import AccountSetting from "pages/PartnerModule/AccountSetting";
import ResetPass from "pages/PartnerModule/reset-password";

// layouts Format
import VerticalLayout from "components/VerticalLayout";
import HorizontalLayout from "components/HorizontalLayout";

const PartnerRoutes = ({ userDetails, appSize, layout }) => {
  function getLayout() {
    let layoutCls = VerticalLayout;
    switch (layout.layoutType) {
      case "horizontal":
        layoutCls = HorizontalLayout;
        break;
      default:
        layoutCls = VerticalLayout;
        break;
    }
    return layoutCls;
  }

  const Layout = getLayout();
  return (
    <div>
      <Layout>
        <Route
          exact
          path="/partner"
          name="PartnerPropertyListWrapper"
          render={(props) => <PartnerPropertyListWrapper {...props} />}
        />
        <Route
          exact
          path="/partner/addProperty"
          name="AddPartnerPropertyWrapper"
          render={(props) => <AddPartnerPropertyWrapper {...props} />}
        />
        <Route
          exact
          path="/partner/edit/:id"
          name="EditPartnerPropertyWrapper"
          render={(props) => <EditPartnerPropertyWrapper {...props} />}
        />
        <Route
          exact
          path="/partner/claims"
          name="MyClaimWrapper"
          render={(props) => <MyClaimWrapper {...props} />}
        />
        <Route
          exact
          path="/partner/reviews"
          name="MyPropertyReviewList"
          render={(props) => <MyPropertyReviewList {...props} />}
        />
        <Route
          exact
          path="/partner/support"
          name="Support"
          render={(props) => <Support {...props} />}
        />
        <Route
          exact
          path="/partner/promotion/:id"
          name="PartnerPropertyPromotion"
          render={(props) => <PartnerPropertyPromotion {...props} />}
        />
        <Route
          exact
          path="/partner/assignLeads"
          name="PartnerAssignLeads"
          render={(props) => <PartnerAssignLeads {...props} />}
        />
        <Route
          exact
          path="/partner/accountSetting"
          name="AccountSetting"
          render={(props) => <AccountSetting {...props} />}
        />
        <Route
          exact
          path="/partner/resetPassword"
          name="ResetPass"
          render={(props) => <ResetPass {...props} />}
        />
        <Route
          exact
          path="/"
          name="Dashboard"
          render={(props) => <Dashboard {...props} />}
        />
      </Layout>
    </div>
  );
};

const mapStateToProps = (state) => ({
  userDetails: state.userDetails.loggedInUser,
  appSize: state.global.appSize,
  notiDetail: state.notification.notiDetail,
  layout: state.Layout,
});

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(PartnerRoutes);
