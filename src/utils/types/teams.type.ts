export interface ITeamMember {
  id: string;
  staffId: string;
  name: string;
  email: string;
  mobileNumber: string;
  zipCodes: string[];
  available: boolean;
  isDisable: boolean;
  plumbing: boolean;
  waterDamage: boolean;
  priority: number;
}

export interface ITeamResponse {
  teams: ITeamMember[];
  totalPages: number;
  currentPage: number;
}
