export interface FirestoreReference {
  _firestore: {
    projectId: string;
  };
  _path: {
    segments: Array<string>;
  };
  _converter: Record<string, unknown>;
}

export interface Timestamp {
  _seconds: number;
  _nanoseconds: number;
}

export interface Address {
  zip?: string;
  country?: string;
  lng?: number;
  city?: string;
  street?: string;
  placeId?: string;
  state?: string;
  lat?: number;
  full?: string;
}

export interface IUser {
  id: string;
  lastName: string | null;
  silent: boolean;
  address: Address | null;
  ftmsId: number;
  type?: string;
  tags: Array<string>;
  firstName: string | null;
  phone: string | null;
  location: FirestoreReference;
  isSearchable: boolean;
  email: string;
  createdAt: Timestamp;
  notionId: string;
  payModel?: FirestoreReference;
  lastNotifiedAt?: Timestamp;
  jobCount: number;
  updatedAt: Timestamp;
  photo: string | null;
  status?: "ACTIVE" | "INACTIVE";
  role?: FirestoreReference;
  roleId?: string;
  locationIds?: Array<string>;
  company: string;
}
