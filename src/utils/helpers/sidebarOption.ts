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
      },
      {
        title: "Exhaust Readings",
        icon: imagesPath.exhaustloader,
        link: "/dashboard",
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
        link: "/profile",
      },
      {
        title: "Schedules",
        icon: imagesPath.calender,
        link: "/security",
      },
      {
        title: "Jobs",
        icon: imagesPath.briefcase,
        link: "/affected-site",
      },
      {
        title: "Locations",
        icon: imagesPath.location,
        link: "/notifications",
      },
      {
        title: "Logs",
        icon: imagesPath.disc,
        link: "/help",
      },
    ],
  },
  {
    group: "Business & Administration",
    option: [
      {
        title: "Companies",
        icon: imagesPath.archive,
        link: "/payment-methods",
      },
      {
        title: "Contracts",
        icon: imagesPath.folder,
        link: "/notifications",
      },
      {
        title: "Pay Models",
        icon: imagesPath.alertIcon,
        link: "/payment-methods",
      },
      {
        title: "Payables",
        icon: imagesPath.send,
        link: "/notifications",
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
        link: "/payment-methods",
      },
      {
        title: "Equipment",
        icon: imagesPath.alertIcon,
        link: "/payment-methods",
      },
      {
        title: "Materials",
        icon: imagesPath.material,
        link: "/payment-methods",
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
    group: "Services & Customer Management",
    option: [
      {
        title: "Services",
        icon: imagesPath.award,
        link: "/payment-methods",
      },
      {
        title: "Campaigns",
        icon: imagesPath.octagon,
        link: "/payment-methods",
      },
    ],
  },
];
