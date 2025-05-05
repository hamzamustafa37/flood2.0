import { invert } from "lodash";

export const apiRoutes = {
  default: {
    name: "/",
  },
  jobs: {
    name: "/",
    read: "jobs",
    readWithUsers: "jobs?withUsers=true",
  },
  company: {
    name: "/",
    read: "companies",
  },
  appointments: {
    name: "/",
    read: "appointments",
  },
  users: {
    name: "/",
    read: "user",
  },
  locations: {
    name: "/",
    read: "locations",
  },
  inventory: {
    name: "/",
    read: "inventories",
  },
  payment: {
    name: "/",
    read: "payment",
  },
};
