import { IEfile } from "./efiles.type";
import { IExpense } from "./expense.types";
import { IPaymentItem } from "./payment.types";
import { IScopeService } from "./scopeService.types";
import { IUser } from "./user.types";
import { IWeather } from "./weather.types";

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
export interface Floor {
  photo: string;
  label: string;
}
export interface Floors {
  [key: string]: Floor;
}

export interface JobType {
  id: string;
  agent: null | any;
  adjuster?: null | any;
  afterhours: boolean;
  amountBilled: number;
  amountOwed: number;
  amountDeducted: number;
  amountDeductedReason?: string | null;
  amountPaid?: number | null;
  // appointment?: Appointment | null;
  // appointments?: Array<Appointment | null> | null;
  // atmospherics?: Array<Atmospheric | null> | null;
  // attributionToken?: Token | null;
  appointment?: any | null;
  appointments?: Array<any | null> | null;
  atmospherics?: Array<any | null> | null;
  attributionToken?: any | null;
  billingType: string;
  campaign: null | string;
  category?: number | null;
  cause: null | string;
  claimNumber?: string | null;
  claimStatus?: any | null;
  company?: Company | null;
  cosigner: null | any;
  createdAt: string;
  createdBy?: any;
  curbshot: string;
  customer: Manager;
  dateOfLoss: null | string;
  earmark?: Record<string, any> | null;
  efileCount?: string | null;
  efiles?: Array<IEfile | null> | null;
  expenses?: Array<IExpense | null> | null;
  // feed?: Array<Feed | null> | null;
  feed?: Array<any | null> | null;

  floors: Floors;
  insurance: null | any;
  // invoices?: Array<IInvoice | null> | null;
  invoices?: Array<any | null> | null;

  isCommercial: boolean;
  isFranchise: boolean;
  isInsured?: boolean | null;
  isInvoiced?: boolean | null;
  isSearchable: boolean;
  lastNotifiedAt?: string | null;
  leadTech: null | any;
  location: Location;
  lostReason?: string | null;
  manager: Manager;
  matterportModelId: null | string;
  moistureMap: null | any;
  notionId: string;
  payModel: null | any;
  payType: null | string;
  payables?: Array<any | null> | null;
  paymentDueDate: null | string;
  payments?: Array<IPaymentItem | null> | null;
  phone: string;
  photos?: Array<File | null> | null;
  picture?: string | null;
  // points?: Array<Point | null> | null;
  points?: Array<any | null> | null;

  policyNumber?: string | null;
  pricingAdjustments?: Array<string | null> | null;
  primaryServiceType: string;
  priority: number;
  propertyAge?: number | null;
  progressPercent: number;
  // ratings?: Array<Rating | null> | null;
  ratings?: Array<any | null> | null;

  // readings?: Array<Reading | null> | null;
  readings?: Array<any | null> | null;

  referral: null | any;
  refusalReason?: string | null;
  serviceStillNeeded?: string | null;
  serviceTypes: string[];
  services?: Array<IScopeService | null> | null;
  sites?: Array<string | null> | null;
  sources?: Record<string, any> | null;
  status: string;
  success: null | boolean;
  tags?: Array<string | null> | null;
  techUserIds?: Array<string | null> | null;
  title: string;
  transferral?: Location | null;
  updatedAt: string;
  updatedBy?: any;
  userIds: string[];
  users?: Array<IUser | null> | null;
  weather?: Array<IWeather | null> | null;
  weatherIds: string[];
}
