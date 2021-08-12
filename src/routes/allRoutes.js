import React from "react";
import { Redirect } from "react-router-dom";

// Authentication related pages
import Login from "../pages/Authentication/Login";
import Logout from "../pages/Authentication/Logout";
import Register from "../pages/Authentication/Register";
import ForgetPwd from "../pages/Authentication/ForgetPassword";

// Dashboard
import Dashboard from "../pages/Dashboard/index";

//1.1)  Profile
import UserProfile from "../pages/Admin/Profile/user-profile";
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

//2) Sales Dashboard
import SellerCallLogList from "pages/SalesModule/AppMenu/CallLogs/CallLogList";
import PropertyListWrapper from "pages/SalesModule/AppMenu/SeniorLiving/PropertyList/PropertyListWrapper";
import PropertyDetailWrapper from "pages/SalesModule/AppMenu/SeniorLiving/PropertyList/PropertyDetailWrapper";
import ScheduleListWrapper from "pages/SalesModule/AppMenu/ScheduleList/ScheduleList";
import AgencyListWrapper from "pages/SalesModule/AppMenu/AgencyList/AgencyListWrapper";
import SaleList from "pages/SalesModule/AppMenu/MySales/SaleList";
import AddAgencyWrapper from "pages/SalesModule/AppMenu/AddAgency/AddAgencyWrapper";

//3) CW Dashboard
import ArticleList from "pages/ContentWriterModule/Blog/Contents/ArticleList";
import TagList from "pages/ContentWriterModule/Blog/Tags/TagList";
import WriterList from "pages/ContentWriterModule/Writer/WriterList";
import AddWriter from "pages/ContentWriterModule/Writer/AddWriter";
import EditWriter from "pages/ContentWriterModule/Writer/EditWriter";
import CmsList from "pages/ContentWriterModule/CMS/MetaCMS/CmsList";
import EditMetaCms from "pages/ContentWriterModule/CMS/MetaCMS/EditMetaCms";
import InvalidPropertyList from "pages/ContentWriterModule/ScrapeLoader/InvalidProperty/PropertyList";
import ProcessList from "pages/ContentWriterModule/ScrapeLoader/Process/ProcessList";
import ProcessDataList from "pages/ContentWriterModule/ScrapeLoader/Process/ProcessDataList";
import PropertyList from "pages/ContentWriterModule/ScrapeLoader/Property/PropertyList";
import PropertyEditWrapper from "pages/ContentWriterModule/ScrapeLoader/Property/PropertyEditor/PropertyEditWrapper";
import CommentsList from "pages/ContentWriterModule/Blog/Comments/CommentsList";
import CMSPage from "pages/ContentWriterModule/CMS/StructureCMS/CMSPage";
import AddArticle from "pages/ContentWriterModule/Blog/Contents/AddArticle";
import EditArticle from "pages/ContentWriterModule/Blog/Contents/EditArticle";
import NewsPortal from "pages/ContentWriterModule/Blog/Contents/NewsPortal";

const userRoutes = [
  { path: "/dashboard", component: Dashboard },

  //ADMIN MODULE ROUTES:
  //--------------------
  { path: "/admin/account", component: UserProfile },
  { path: "/admin/resetPassword", component: ResetPassword },
  { path: "/admin/userManagement", component: InternalUserList },
  { path: "/admin/userManagement/add", component: CreateUserForm },
  {
    path: "/admin/userManagement/edit/:id",
    component: EditUserForm,
  },
  { path: "/admin/applicantManagement", component: Applicants },
  {
    path: "/admin/applicantManagement/applicantDetails",
    component: ApplicantDetail,
  },
  { path: "/admin/corporate", component: CorporateList },
  { path: "/admin/corporate/add", component: CreateCorporateForm },
  { path: "/admin/corporate/edit/:id", component: EditCorporateForm },
  { path: "/admin/corporate/managers/:id", component: CorporateAdminList },
  {
    path: "/admin/corporate/manager/add/:id",
    component: CreateCorporateAdminForm,
  },
  {
    path: "/admin/corporate/manager/edit/:id",
    component: EditCorporateAdminForm,
  },
  {
    path: "/admin/callCenter/callLogs/outgoing",
    component: OutgoingCallLogsList,
  },
  {
    path: "/admin/callCenter/callLogs/incoming",
    component: IncomingCallLogsList,
  },
  { path: "/admin/sales/agencies", component: AgencyList },
  { path: "/admin/sales/records", component: AgencyRecordList },
  { path: "/admin/sales/users", component: SalesUserList },
  {
    path: "/admin/sales/agency/viewDetail/:id",
    component: AgencyDetailWrapper,
  },
  {
    path: "/admin/sales/agency/assignHistory/:id",
    component: AssignHistoryList,
  },
  {
    path: "/admin/sales/users/agencies/:id",
    component: AssignedAgencyList,
  },
  {
    path: "/admin/sales/users/performance/:id",
    component: SaleUserPerformenceList,
  },
  {
    path: "/admin/sales/users/callLogs/:id",
    component: CallLogList,
  },

  //SALES MODULE ROUTES:
  //--------------------
  {
    path: "/sales/callLogs",
    component: SellerCallLogList,
  },
  {
    path: "/sales/senior-living/list",
    component: PropertyListWrapper,
  },
  {
    path: "/sales/senior-living/detail/:id",
    component: PropertyDetailWrapper,
  },
  {
    path: "/sales/schedules",
    component: ScheduleListWrapper,
  },
  {
    path: "/sales/agencyList",
    component: AgencyListWrapper,
  },
  {
    path: "/sales/transactions",
    component: SaleList,
  },
  {
    path: "/sales/addAgency",
    component: AddAgencyWrapper,
  },

  //CW MODULE ROUTES:
  //--------------------
  {
    path: "/cw/blog",
    component: ArticleList,
  },
  {
    path: "/cw/blog/create",
    component: AddArticle,
  },
  {
    path: "/cw/blog/tags",
    component: TagList,
  },
  {
    path: "/cw/writer",
    component: WriterList,
  },
  {
    path: "/cw/writer/create",
    component: AddWriter,
  },
  {
    path: "/cw/writer/edit/:id",
    component: EditWriter,
  },
  {
    path: "/cw/cms/meta",
    component: CmsList,
  },
  {
    path: "/cw/cms/meta/edit/:id",
    component: EditMetaCms,
  },
  {
    path: "/cw/cms/structure",
    component: CMSPage,
  },
  {
    path: "/cw/scrape/invalid-list",
    component: InvalidPropertyList,
  },
  {
    path: "/cw/scrape/process",
    component: ProcessList,
  },
  {
    path: "/cw/scrape/process/dataList/:id",
    component: ProcessDataList,
  },
  {
    path: "/cw/scrape",
    component: PropertyList,
  },
  {
    path: "/CW/scrape/property/edit/:ID",
    component: PropertyEditWrapper,
  },
  {
    path: "/cw/blog/comments",
    component: CommentsList,
  },
  {
    path: "/cw/blog/edit/:id",
    component: EditArticle,
  },
  {
    path: "/cw/blog/news",
    component: NewsPortal,
  },

  //====================================================
  // this route should be at the end of all other routes
  { path: "/", exact: true, component: () => <Redirect to="/dashboard" /> },
];

const authRoutes = [
  { path: "/logout", component: Logout },
  { path: "/login", component: Login },
  { path: "/forgot-password", component: ForgetPwd },
  { path: "/register", component: Register },
];

export { userRoutes, authRoutes };

//2) Operations Dashboard
// import HomeCareAgencyList from "pages/Operation/HomeCare/AgencyList/HomeCareAgencyList"
// import HomeCareUserList from "pages/Operation/HomeCare/UserList/HomeCareUserList"
// import PropertyReviewList from "pages/Operation/SeniorLiving/PropertyReviews/PropertyReviewList"

// // OPERATIONS
// {
//   path: "/operation/homeCare/agencyList",
//   component: HomeCareAgencyList,
// },
// {
//   path: "/operation/homeCare/users",
//   component: HomeCareUserList,
// },
// {
//   path: "/operation/seniorLiving/reviews",
//   component: PropertyReviewList,
// },
