import { Address, FirestoreReference, Timestamp } from "./user.types";

export interface ICompanyLocation {
  id: string;
  companyId: string;
  type: "corporate" | string;
  email: string;
  phone: string;
  address: Address;
  billingAddress: Address;
  ownerId: string;
  createdAt: Timestamp;
  updatedAt: Timestamp;
  payModel: string | null;
  role: string | null;
  photo: string;
  company: FirestoreReference;
  name: string;
}
