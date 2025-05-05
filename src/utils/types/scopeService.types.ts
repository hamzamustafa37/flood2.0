import { ICoordinates, IService } from "../commonTypes";
import { IExpense } from "./expense.types";
import { IUser } from "./user.types";

export type IScopeService = {
  __typename?: "ScopeService";
  amount?: number | null;
  coordinates?: ICoordinates | null;
  createdAt?: string | null;
  createdBy?: IUser | null;
  expenses?: Array<IExpense | null> | null;
  id?: string | null;
  level?: string | null;
  notes?: string | null;
  price?: number | null;
  quantity?: number | null;
  service?: IService | null;
  total?: number | null;
  updatedAt?: string | null;
  updatedBy?: IUser | null;
};
