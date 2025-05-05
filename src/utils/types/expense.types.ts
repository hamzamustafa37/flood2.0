import { IService } from "../commonTypes";
import { JobType } from "./jobs.types";
import { IScopeService } from "./scopeService.types";
import { IUser } from "./user.types";

export type IExpense = {
  __typename: "Expense";
  amount: number;
  createdAt: string;
  createdBy: IUser;
  id: string;
  job: JobType;
  name: string;
  offTheTop: boolean;
  offTheTopRoleId: string;
  photo: string;
  scopeService: IScopeService;
  service: IService;
  site: Array<string>;
  updatedAt: string;
  updatedBy: IUser;
};
