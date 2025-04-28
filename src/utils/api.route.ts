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
};
