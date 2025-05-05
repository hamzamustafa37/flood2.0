import { PayModel } from "./payment.types";
import { IUser } from "./user.types";

export type ICampaign = {
  __typename: "Campaign";
  createdAt: string;
  createdBy: IUser;
  gtm: string;
  id: string;
  jobTypes: Array<string>;
  location: Location;
  name: string;
  payModel: PayModel;
  phone: string;
  token: string;
  updatedAt: string;
  updatedBy: IUser;
};
