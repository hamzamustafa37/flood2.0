export interface Address {
  placeId: string;
  full: string;
  lat: number;
  lng: number;
  street: string;
  city: string;
  state: string;
  country: string;
  zip: string;
}

export interface BillingAddress {
  full: string;
  placeId: string;
  lat: number;
  lng: number;
  state: string;
  zip: string;
  street: string;
}

export interface Role {
  id: string;
  path: string;
}

export interface Manager {
  id: string;
  createdAt: string;
  firstName: string;
  lastName: null | string;
  role: Role;
  phone: null | string;
  photo: string;
  email: string;
  notionId: string;
  referralId: null | string;
  roleId: string;
  isOnboarded: boolean;
  name: string;
  timestamp: string;
  locationId: string;
  locationIds: string[];
  lastActiveAt: string;
}

interface Company {
  id: string;
  path: string;
}

export interface Location {
  id: string;
  companyId: string;
  type: string;
  email: string;
  phone: string;
  address: {
    full: string;
    placeId: string;
    lat: number;
    lng: number;
    state: string;
    zip: string;
    street: string;
  };
  billingAddress: BillingAddress;
  ownerId: string;
  createdAt: string;
  payModel: null | any;
  role: null | any;
  photo: string;
  company: Company;
  name: string;
  updatedAt: string;
}

export interface Floors {
  [key: string]: {};
}

export interface JobType {
  id: string;
  agent: null | any;
  success: null | boolean;
  cause: null | string;
  payType: null | string;
  campaign: null | string;
  serviceTypes: string[];
  manager: Manager;
  leadTech: null | any;
  insurance: null | any;
  status: string;
  location: Location;
  payModel: null | any;
  address: Address;
  dateOfLoss: null | string;
  amountBilled: number;
  amountOwed: number;
  afterhours: boolean;
  referral: null | any;
  cosigner: null | any;
  phone: string;
  title: string;
  customer: Manager;
  isFranchise: boolean;
  isSearchable: boolean;
  isCommercial: boolean;
  amountDeducted: number;
  createdAt: string;
  userIds: string[];
  moistureMap: null | any;
  matterportModelId: null | string;
  floors: Floors;
  primaryServiceType: string;
  priority: number;
  paymentDueDate: null | string;
  progressPercent: number;
  notionId: string;
  billingType: string;
  curbshot: string;
  weatherIds: string[];
  updatedAt: string;
}
