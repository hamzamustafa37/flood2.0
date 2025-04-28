import { IUser } from "../types";
import { IAppointment } from "./appointment.types";
import { JobType } from "./jobs.types";

export interface IGetAllJobsResponse {
  data: JobType[];
  success: boolean;
}

export interface IGetAllCompanies {
  data: ICompany[];
  success: boolean;
}

export interface IGetAllAppointments {
  data: IAppointment[];
  success: boolean;
}

export interface IGetAllUsers {
  data: { users: IUser[] };
  success: boolean;
}
