export default {
  items: [
    {
      id: "group-home",
      title: "Home",
      type: "group",
      icon: "feather icon-home",
      DocumentName: "Home",
      children: [
        {
          id: "dashboard",
          title: "Dashboard",
          type: "item",
          icon: "feather icon-home",
          url: "/forms/home/dashboard",
          DocumentName: "Dashboard",
        },
        {
          id: "notification",
          title: "Notifications",
          type: "item",
          icon: "feather icon-bell",
          url: "/forms/home/notification",
          DocumentName: "Notification",
        },
      ],
    },
    {
      id: "group-masters",
      title: "Masters",
      type: "group",
      icon: "icon-navigation",
      DocumentName: "Masters",
      children: [
        {
          id: 1000,
          title: "Main Masters",
          type: "collapse",
          icon: "feather icon-grid",
          DocumentName: "Main Masters",
          children: [
            {
              id: 1001,
              title: "Customer Master",
              type: "item",
              url: "/forms/masters/customer",
              DocumentName: "Customer Master",
            },       
          ],
        },
      ],
    },
    {
      id: "group-transactions",
      title: "Transactions",
      type: "group",
      icon: "icon-navigation",
      DocumentName: "Transactions",
      children: [      
        {
          id: 1300,
          title: "Feedback Managment",
          type: "collapse",
          icon: "feather icon-command",
          DocumentName: "Feed Back",
          children: [
            {
              id: 1301,
              title: "Complain Or Inquiry",
              type: "item",
              url: "/forms/feedback/complainoEnquiry",
              DocumentName: "complainoEnquiry",
            },           
          ],
        },
      ],
    },

    {
      id: "group-admin",
      title: "Administration",
      type: "group",
      icon: "feather icon-settings",
      DocumentName: "Dashboard",
      children: [
        {
          id: 9000,
          title: "Administration",
          type: "collapse",
          icon: "feather icon-settings",
          DocumentName: "Administration",
          children: [
            {
              id: 9001,
              title: "Users",
              type: "item",
              url: "/forms/admin/users",
              DocumentName: "User",
            },
            {
              id: 9002,
              title: "Users Group",
              type: "item",
              url: "/forms/admin/users-group",
              DocumentName: "User",
            },
            {
              id: 9007,
              title: "Layout Setup",
              type: "item",
              url: "/forms/admin/layout-setup",
              DocumentName: "Layout Setup",
            },
            {
              id: 9008,
              title: "Report Setup",
              type: "item",
              url: "/forms/admin/report-setup",
              DocumentName: "Report Setup",
            },
            {
              id: 9999,
              title: "About",
              type: "item",
              url: "/forms/system/about",
              DocumentName: "About",
            },
          ],
        },
      ],
    },
  ],
};
