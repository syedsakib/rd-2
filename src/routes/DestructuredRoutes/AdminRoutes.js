import React, { useState, useEffect, Fragment } from "react";
import { Redirect, Route, Switch, useHistory } from "react-router-dom";
import { connect } from "react-redux";

import Dashboard from "pages/Dashboard/index";

//1.1)  Profile
import UserProfile from "pages/Admin/Profile/user-profile";
import ResetPassword from "pages/Admin/Profile/reset-password";

//1.2) User Management
import InternalUserList from "pages/Admin/UserManager/InternalUserList";
import CreateUserForm from "pages/Admin/UserManager/CreateUserForm";
import EditUserForm from "pages/Admin/UserManager/EditUserForm";

//1.3)  Applicants Management
import Applicants from "pages/Admin/Applicants/Applicants";
import ApplicantDetail from "pages/Admin/Applicants/ApplicantDetail";

//1.4) Corporate Management
import CorporateList from "pages/Admin/Corporate/CorporateList/CorporateList";
import CreateCorporateForm from "pages/Admin/Corporate/CorporateForms/AddCorporateForm";
import EditCorporateForm from "pages/Admin/Corporate/EditCorporate/EditCorporateForm";
import CorporateAdminList from "pages/Admin/Corporate/CorporateAdminList/CorporateAdminList";
import CreateCorporateAdminForm from "pages/Admin/Corporate/CorporateAdminForms/CreateCorporateAdminForm";
import EditCorporateAdminForm from "pages/Admin/Corporate/CorporateAdminForms/EditCorporateAdminForm";

//1.4)  Call Center
import OutgoingCallLogsList from "pages/CallCenter/callLogs/OutgoingCallLogsList";
import IncomingCallLogsList from "pages/CallCenter/callLogs/IncomingCallLogsList";

//1.5)  Sales CRM
import AgencyList from "pages/Sales/SubscribedAgencies/AgencyList";
import AgencyRecordList from "pages/Sales/AgencyRecord/AgencyRecordList";
import SalesUserList from "pages/Sales/SaleUser/SalesUserList";
import AgencyDetailWrapper from "pages/Sales/SubscribedAgencies/AgencyDetail/AgencyDetailWrapper";
import AssignHistoryList from "pages/Sales/SubscribedAgencies/AssignHistory/AssignHistoryList";
import AssignedAgencyList from "pages/Sales/SaleUser/AssignedAgencies/AssignedAgencyList";
import SaleUserPerformenceList from "pages/Sales/SaleUser/PerformenceList/SaleUserPerformenceList";
import CallLogList from "pages/Sales/SaleUser/CallLogs/CallLogList";

// layouts Format
import VerticalLayout from "components/VerticalLayout";
import HorizontalLayout from "components/HorizontalLayout";

const AdminRoutes = ({ userDetails, appSize, layout }) => {
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
          path="/admin/account"
          name="UserProfile"
          render={(props) => <UserProfile {...props} />}
        />
        <Route
          exact
          path="/admin/resetPassword"
          name="ResetPassword"
          render={(props) => <ResetPassword {...props} />}
        />
        <Route
          exact
          path="/admin/userManagement"
          name="InternalUserList"
          render={(props) => <InternalUserList {...props} />}
        />
        <Route
          exact
          path="/admin/userManagement/add"
          name="CreateUserForm"
          render={(props) => <CreateUserForm {...props} />}
        />
        <Route
          exact
          path="/admin/userManagement/edit/:id"
          name="EditUserForm"
          render={(props) => <EditUserForm {...props} />}
        />
        <Route
          exact
          path="/admin/applicantManagement"
          name="Applicants"
          render={(props) => <Applicants {...props} />}
        />
        <Route
          exact
          path="/admin/applicantManagement/applicantDetails"
          name="ApplicantDetail"
          render={(props) => <ApplicantDetail {...props} />}
        />
        <Route
          exact
          path="/admin/corporate"
          name="CorporateList"
          render={(props) => <CorporateList {...props} />}
        />
        <Route
          exact
          path="/admin/corporate/add"
          name="CreateCorporateForm"
          render={(props) => <CreateCorporateForm {...props} />}
        />
        <Route
          exact
          path="/admin/corporate/edit/:id"
          name="EditCorporateForm"
          render={(props) => <EditCorporateForm {...props} />}
        />
        <Route
          exact
          path="/admin/corporate/managers/:id"
          name="CorporateAdminList"
          render={(props) => <CorporateAdminList {...props} />}
        />
        <Route
          exact
          path="/admin/corporate/manager/add/:id"
          name="CreateCorporateAdminForm"
          render={(props) => <CreateCorporateAdminForm {...props} />}
        />
        <Route
          exact
          path="/admin/corporate/manager/edit/:id"
          name="EditCorporateAdminForm"
          render={(props) => <EditCorporateAdminForm {...props} />}
        />
        <Route
          exact
          path="/admin/callCenter/callLogs/outgoing"
          name="OutgoingCallLogsList"
          render={(props) => <OutgoingCallLogsList {...props} />}
        />
        <Route
          exact
          path="/admin/callCenter/callLogs/incoming"
          name="IncomingCallLogsList"
          render={(props) => <IncomingCallLogsList {...props} />}
        />
        <Route
          exact
          path="/admin/sales/agencies"
          name="AgencyList"
          render={(props) => <AgencyList {...props} />}
        />
        <Route
          exact
          path="/admin/sales/records"
          name="AgencyRecordList"
          render={(props) => <AgencyRecordList {...props} />}
        />
        <Route
          exact
          path="/admin/sales/users"
          name="SalesUserList"
          render={(props) => <SalesUserList {...props} />}
        />
        <Route
          exact
          path="/admin/sales/agency/viewDetail/:id"
          name="AgencyDetailWrapper"
          render={(props) => <AgencyDetailWrapper {...props} />}
        />
        <Route
          exact
          path="/admin/sales/agency/assignHistory/:id"
          name="AssignHistoryList"
          render={(props) => <AssignHistoryList {...props} />}
        />
        <Route
          exact
          path="/admin/sales/users/agencies/:id"
          name="AssignedAgencyList"
          render={(props) => <AssignedAgencyList {...props} />}
        />
        <Route
          exact
          path="/admin/sales/users/performance/:id"
          name="SaleUserPerformenceList"
          render={(props) => <SaleUserPerformenceList {...props} />}
        />
        <Route
          exact
          path="/admin/sales/users/callLogs/:id"
          name="CallLogList"
          render={(props) => <CallLogList {...props} />}
        />
        <Route
          exact
          path="/admin"
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

export default connect(mapStateToProps, mapDispatchToProps)(AdminRoutes);
