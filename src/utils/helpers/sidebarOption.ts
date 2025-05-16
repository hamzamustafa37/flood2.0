import { imagesPath } from "../constants";

export const sideBarMenu = [
  {
    group: "Dashboard",
    option: [
      {
        title: "Dashboard",
        icon: imagesPath.home,
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
        icon: imagesPath.atmosphere,
        link: "/atmospheric-readings",
        active: true,
      },
      {
        title: "Exhaust Readings",
        icon: imagesPath.exhaustloader,
        link: "/exhaust-readings",
        active: true,
      },
      {
        title: "MC Readings",
        icon: imagesPath.framer,
        link: "/dashboard",
      },
    ],
  },
  {
    group: "Operations & Scheduling",
    option: [
      {
        title: "Appointments",
        icon: imagesPath.appointment,
        link: "/weekly-appointment",
        active: true,
        tag: "New",
      },
      {
        title: "Schedules",
        icon: imagesPath.calender,
        link: "/security",
      },
      {
        title: "Jobs",
        icon: imagesPath.briefcase,
        link: "/jobs",
        active: true,
      },
      {
        title: "Locations",
        icon: imagesPath.location,
        link: "/location-management",
        active: true,
        tag: "New",
      },
      {
        title: "Logs",
        icon: imagesPath.disc,
        link: "/dots",
      },
    ],
  },
  {
    group: "Business & Administration",
    option: [
      {
        title: "Companies",
        icon: imagesPath.archive,
        link: "/companies",
        active: true,
      },
      {
        title: "Contracts",
        icon: imagesPath.folder,
        link: "/contracts",
        active: true,
      },
      {
        title: "Pay Models",
        icon: imagesPath.alertIcon,
        link: "/pay-models",
        active: true,
      },
      {
        title: "Payables",
        icon: imagesPath.send,
        link: "/payables",
        active: true,
      },
      {
        title: "Payments",
        icon: imagesPath.dollar,
        link: "/notifications",
      },
      {
        title: "Reports",
        icon: imagesPath.bookOpen,
        link: "/payment-methods",
      },
      {
        title: "Roles",
        icon: imagesPath.userCheck,
        link: "/notifications",
      },
      {
        title: "Users",
        icon: imagesPath.users,
        link: "/notifications",
      },
    ],
  },
  {
    group: "Inventory & Equipment Management",
    option: [
      {
        title: "Inventory",
        icon: imagesPath.textFile,
        link: "/Inventory-modules",
        active: true,
      },
      {
        title: "Equipment",
        icon: imagesPath.alertIcon,
        link: "/payment-methods",
      },
      {
        title: "Materials",
        icon: imagesPath.material,
        link: "/material-management",
        active: true,
      },
      {
        title: "Packages",
        icon: imagesPath.box,
        link: "/payment-methods",
      },
      {
        title: "Vehicles",
        icon: imagesPath.truck,
        link: "/payment-methods",
      },
    ],
  },
  {
    group: "Extras",
    option: [
      {
        title: "Causes",
        icon: imagesPath.octagon,
        link: "/causes",
        active: true,
      },
      {
        title: "Dots",
        icon: imagesPath.octagon,
        link: "/dots",
        active: true,
      },
      {
        title: "Collections",
        icon: imagesPath.octagon,
        link: "/collections",
        active: true,
      },
    ],
  },
  {
    group: "Services & Customer Management",
    option: [
      {
        title: "Services",
        icon: imagesPath.award,
        link: "/payment-methods",
        active: false,
      },
      {
        title: "Campaigns",
        icon: imagesPath.octagon,
        link: "/campaigns",
        active: true,
      },
      {
        title: "Equipment",
        icon: imagesPath.home,
        link: "/equipment",
        active: true,
      },
    ],
  },
];

export const contractorSideBarMenu = [
  {
    group: "Dashboard",
    option: [
      {
        title: "Dashboard",
        icon: imagesPath.home,
        link: "/contractor-dashboard",
        active: true,
      },
      {
        title: "Services",
        icon: imagesPath.briefcase,
        link: "/contractor/dashboard",
        active: true,
      },
      {
        title: "Teams",
        icon: imagesPath.alertIcon,
        link: "/contractor-teams",
        active: true,
      },

      {
        title: "Schedules",
        icon: imagesPath.atmosphere,
        link: "/contractor-schedule",
        active: true,
        tag: "New",
      },
      {
        title: "Settings",
        icon: imagesPath.exhaustloader,
        link: "/contractor/exhaust-readings",
        active: true,
      },
    ],
  },
];
