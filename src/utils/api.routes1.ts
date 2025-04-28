export const apiRoutes = {
  default: {
    name: "/",
  },

  booking: {
    name: "/booking",
    read: "/",
    create: "/",
    update: "/:id",
    delete: "/:id",
  },

  person: {
    name: "/user",
    profile: "/",
    update: "/",
    updateProfilePicture: "/updateProfilePicture",
    delete: "/",
    updatePassword: "/updatePassword",
  },
  auth: {
    name: "/auth",
    create: "/register",
    otp: "/otp-verification",
    login: "/login",
    loginOtpVerification: "/login-otp-verification",
    resentOtp: "/resent-otp",
    forgotPassword: "/forgot-password",
    resetPassword: "/reset-password",
    me: "/me",
    socialAuth: "/social-auth",
  },
  role: {
    name: "/role",
    create: "/role",
    read: "/",
    update: "/:id",
    delete: "/:id",
  },
  card: {
    name: "/card",
    read: "/",
    create: "/",
    update: "",
    delete: "/:id",
  },
  rebuttal: {
    name: "/rebuttal",
    create: "/",
    read: "/",
    update: "/:id",
    delete: "/:id",
    download: "/download/",
    search: "/search",
  },
  stripe: {
    name: "/stripe",
    get: "",
    create: "/create-checkout-session",
    createCustomer: "/create-customer",
    attachCustomerPaymentMethod: "/attach-customer-payment-method",
    changeDefaultPaymentMethod: "/change-default-payment-method",
    getHistory: "/get-history",
    getPdf: "/get-pdf/",
  },
  doc: {
    name: "/api-doc",
  },
  api: {
    name: "/api",
  },
  docApi: {
    name: "/api-doc",
  },
};
