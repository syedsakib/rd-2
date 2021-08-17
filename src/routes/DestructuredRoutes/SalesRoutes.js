import React, { useState, useEffect, Fragment } from "react";
import { Redirect, Route, Switch, useHistory } from "react-router-dom";
import { connect } from "react-redux";

import Dashboard from "pages/Dashboard/index";

import SellerCallLogList from "pages/SalesModule/AppMenu/CallLogs/CallLogList";
import PropertyListWrapper from "pages/SalesModule/AppMenu/SeniorLiving/PropertyList/PropertyListWrapper";
import PropertyDetailWrapper from "pages/SalesModule/AppMenu/SeniorLiving/PropertyList/PropertyDetailWrapper";
import ScheduleListWrapper from "pages/SalesModule/AppMenu/ScheduleList/ScheduleList";
import AgencyListWrapper from "pages/SalesModule/AppMenu/AgencyList/AgencyListWrapper";
import SaleList from "pages/SalesModule/AppMenu/MySales/SaleList";
import AddAgencyWrapper from "pages/SalesModule/AppMenu/AddAgency/AddAgencyWrapper";
import SendMail from "pages/SalesModule/SwndMail/SendMail";

// layouts Format
import VerticalLayout from "components/VerticalLayout";
import HorizontalLayout from "components/HorizontalLayout";

const SalesRoutes = ({ userDetails, appSize, layout }) => {
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
          path="/sales"
          name="ScheduleListWrapper"
          render={(props) => <ScheduleListWrapper {...props} />}
        />
        <Route
          exact
          path="/sales/callLogs"
          name="SellerCallLogList"
          render={(props) => <SellerCallLogList {...props} />}
        />
        <Route
          exact
          path="/sales/senior-living/list"
          name="PropertyListWrapper"
          render={(props) => <PropertyListWrapper {...props} />}
        />
        <Route
          exact
          path="/sales/senior-living/detail/:id"
          name="PropertyDetailWrapper"
          render={(props) => <PropertyDetailWrapper {...props} />}
        />
        <Route
          exact
          path="/sales/schedules"
          name="ScheduleListWrapper"
          render={(props) => <ScheduleListWrapper {...props} />}
        />
        <Route
          exact
          path="/sales/agencyList"
          name="AgencyListWrapper"
          render={(props) => <AgencyListWrapper {...props} />}
        />
        <Route
          exact
          path="/sales/transactions"
          name="SaleList"
          render={(props) => <SaleList {...props} />}
        />
        <Route
          exact
          path="/sales/addAgency"
          name="AddAgencyWrapper"
          render={(props) => <AddAgencyWrapper {...props} />}
        />
        <Route
          exact
          path="/sales/sendMail"
          name="SendMail"
          render={(props) => <SendMail {...props} />}
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

export default connect(mapStateToProps, mapDispatchToProps)(SalesRoutes);
