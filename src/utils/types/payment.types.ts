import { ICampaign } from "./campaign.type";
import { IUser } from "./user.types";

export type PayModel = {
  __typename: "PayModel";
  amount: number;
  createdAt: string;
  createdBy: IUser;
  defaultPayoutRoleId: string;
  id: string;
  name: string;
  payouts: Record<string, any>;
  testExpenses: Record<string, any>;
  updatedAt: string;
  updatedBy: IUser;
};

export interface Location {
  id: string;
}

export interface Customer {
  id: string;
}

export interface UpdatedBy {
  id: string;
}

export interface Insurance {
  id: string;
}

export interface Adjuster {
  id: string;
}

export interface Company {
  id: string;
}

export interface Job {
  id: string;
  agent: IUser;
  amountDeducted: number;
  payModel: PayModel;
  cosigner: IUser;
  title: string;
  isFranchise: boolean;
  leadTech: IUser;
  createdAt: string;
  matterportModelId: string;
  payType: string;
  serviceTypes: string[];
  isSearchable: boolean;
  moistureMap: string;
  afterhours: boolean;
  amountBilled: number;
  address: Address;
  manager: IUser;
  dateOfLoss: string;
  referral: IUser;
  phone: string;
  createdBy: IUser;
  success: IUser;
  campaign: ICampaign;
  location: Location;
  customer: Customer;
  notionId: string;
  lastNotifiedAt: string;
  weatherIds: string[];
  updatedBy: UpdatedBy;
  insurance: Insurance;
  adjuster: Adjuster;
  userIds: string[];
  techUserIds: string[];
  status: string;
  billingType: string;
  amountPaid: number;
  amountOwed: number;
  updatedAt: string;
  companyId: Company;
  progressPercent: number;
  company: Company;
  expenses: any[];
}

export interface IPaymentItem {
  id: string;
  amount: string;
  job: Job;
  user: IUser;
  frequency: any;
  location: Location;
  payModel: PayModel;
  method: string;
  type: string;
  transactionId: string | null;
  chargeId: string;
  createdAt: string;
  payablesResolved: boolean;
  updatedAt: string;
}
