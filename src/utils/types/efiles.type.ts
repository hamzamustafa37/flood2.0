import { JobType } from "./jobs.types";
import { IUser } from "./user.types";

export type IEfile = {
  __typename?: "Efile";
  createdAt?: string | null;
  createdBy?: IUser | null;
  id?: string | null;
  job?: JobType | null;
  name?: string | null;
  // signatures?: Array<ISignature | null> | null;
  signatures?: Array<any | null> | null;

  signerIds?: Array<string | null> | null;
  status?: string | null;
  tags?: Array<string | null> | null;
  // template?: Template | null;
  template?: any | null;

  templateId?: string | null;
  type?: string | null;
  updatedAt?: string | null;
  updatedBy?: IUser | null;
  url?: string | null;
};
