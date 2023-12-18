import React from "react";
import $ from "jquery";

window.jQuery = $;
window.$ = $;
global.jQuery = $;

const DashboardDefault = React.lazy(() => import("./Demo/Dashboard/Default"));
const Notification = React.lazy(() => import("./Forms/Dashboard/Notification"));
const ComplainOEnquiry = React.lazy(() =>
  import("./Forms/Feedback/ComplainOEnquiry")
);
const Report = React.lazy(() => import("./Forms/Report/Report"));
const Users = React.lazy(() => import("./Forms/Admin/Users"));
const LayoutSetup = React.lazy(() => import("./Forms/Admin/LayoutSetup"));
const ReportSetup = React.lazy(() => import("./Forms/Admin/ReportSetup"));
const About = React.lazy(() => import("./Forms/System/About"));
const PasswordReset = React.lazy(() => import("./Forms/Admin/PasswordReset"));
const UsersGroup = React.lazy(() => import("./Forms/Admin/UserGroup"));

//Masters
const Customer = React.lazy(() => import("./Forms/Master/Customer"));

const routes = [
  {
    path: "/forms/home/dashboard",
    exact: true,
    name: "Default",
    component: DashboardDefault,
  },
  {
    path: "/forms/home/notification",
    exact: true,
    name: "Notification",
    component: Notification,
  },
  {
    path: "/forms/feedback/complainoEnquiry",
    exact: true,
    name: "complainoEnquiry",
    component: ComplainOEnquiry,
  },
  {
    path: "/forms/report/report",
    exact: true,
    name: "Report",
    component: Report,
  },
  {
    path: "/forms/admin/users",
    exact: true,
    name: "Users",
    component: Users,
  },
  {
    path: "/forms/admin/layout-setup",
    exact: true,
    name: "LayoutSetup",
    component: LayoutSetup,
  },
  {
    path: "/forms/admin/report-setup",
    exact: true,
    name: "ReportSetup",
    component: ReportSetup,
  },
  {
    path: "/forms/system/about",
    exact: true,
    name: "About",
    component: About,
  },
  {
    path: "/forms/system/password-reset",
    exact: true,
    name: "password-reset",
    component: PasswordReset,
  },
  {
    path: "/forms/admin/users-group",
    exact: true,
    name: "users-group",
    component: UsersGroup,
  },
  {
    path: "/forms/masters/customer",
    exact: true,
    name: "customer",
    component: Customer,
  },
];

export default routes;
