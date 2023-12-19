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
const Employee = React.lazy(() => import("./Forms/Master/Employee"));
const Branch = React.lazy(() => import("./Forms/Master/Branch"));
const City = React.lazy(() => import("./Forms/Master/City"));
const Role = React.lazy(() => import("./Forms/Master/Role"));
const CrimeType = React.lazy(() => import("./Forms/Master/CrimeType"));

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
    path: "/forms/masters/employee",
    exact: true,
    name: "customer",
    component: Employee,
  },
  {
    path: "/forms/masters/branch",
    exact: true,
    name: "branch",
    component: Branch,
  },
  {
    path: "/forms/masters/city",
    exact: true,
    name: "city",
    component: City,
  },
  {
    path: "/forms/masters/role",
    exact: true,
    name: "role",
    component: Role,
  },
  {
    path: "/forms/masters/crimetype",
    exact: true,
    name: "crimetype",
    component: CrimeType,
  },
];

export default routes;
