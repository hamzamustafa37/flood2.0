import { imagesPath } from "../constants";

export const sideBarMenu = [
  {
    group: "Dashboard",
    option: [
      {
        title: "Dashboard",
        icon: imagesPath.alertIcon,

        link: "/dashboard",
      },
      {
        title: "Alerts",
        icon: imagesPath.alertIcon,
        link: "/weather",
      },
      {
        title: "Weather",
        icon: imagesPath.cloudRainIcon,
        link: "/dashboard",
      },

      {
        title: "Atmospheric Readings",
        icon: imagesPath.alertIcon,

        link: "/dashboard",
      },
      {
        title: "Exhaust Readings",
        icon: imagesPath.alertIcon,

        link: "/dashboard",
      },
      {
        title: "MC Readings",
        icon: imagesPath.alertIcon,

        link: "/dashboard",
      },
    ],
  },
  {
    group: "Operations & Scheduling",
    option: [
      {
        title: "Appointments",
        icon: imagesPath.alertIcon,

        link: "/profile",
      },
      {
        title: "Schedules",
        icon: imagesPath.alertIcon,

        link: "/security",
      },
      {
        title: "Jobs",
        icon: imagesPath.alertIcon,

        link: "/payment-methods",
      },
      {
        title: "Locations",
        icon: imagesPath.alertIcon,
        link: "/notifications",
      },
      {
        title: "Logs",
        icon: imagesPath.alertIcon,
        link: "/help",
      },
    ],
  },
  {
    group: "Business & Administration",
    option: [
      {
        title: "Companies",
        icon: imagesPath.alertIcon,
        link: "/payment-methods",
      },
      {
        title: "Contracts",
        icon: imagesPath.alertIcon,
        link: "/notifications",
      },
      {
        title: "Pay Models",
        icon: imagesPath.alertIcon,
        link: "/payment-methods",
      },
      {
        title: "Payables",
        icon: imagesPath.alertIcon,
        link: "/notifications",
      },
      {
        title: "Payments",
        icon: imagesPath.alertIcon,
        link: "/notifications",
      },
      {
        title: "Reports",
        icon: imagesPath.alertIcon,
        link: "/payment-methods",
      },
      {
        title: "Roles",
        icon: imagesPath.alertIcon,
        link: "/notifications",
      },
      {
        title: "Users",
        icon: imagesPath.alertIcon,
        link: "/notifications",
      },
    ],
  },
  {
    group: "Inventory & Equipment Management",
    option: [
      {
        title: "Inventory",
        icon: imagesPath.alertIcon,
        link: "/payment-methods",
      },
      {
        title: "Equipment",
        icon: imagesPath.alertIcon,
        link: "/payment-methods",
      },
      {
        title: "Materials",
        icon: imagesPath.alertIcon,
        link: "/payment-methods",
      },
      {
        title: "Packages",
        icon: imagesPath.alertIcon,
        link: "/payment-methods",
      },
      {
        title: "Vehicles",
        icon: imagesPath.alertIcon,
        link: "/payment-methods",
      },
    ],
  },
  {
    group: "Services & Customer Management",
    option: [
      {
        title: "Services",
        icon: imagesPath.alertIcon,
        link: "/payment-methods",
      },
      {
        title: "Campaigns",
        icon: imagesPath.alertIcon,
        link: "/payment-methods",
      },
    ],
  },
];
