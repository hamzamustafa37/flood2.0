interface ICompany {
  id: string;
  name: string;
  email: string;
  createdAt: Timestamp;
  updatedAt: Timestamp;
  address: Address;
  phone: string;
  type: string | null;
  locations: Array<Location>;
  brandColors: BrandColors;
  website: string;
  photo: string;
  insurancePaymentDueDays: string;
  selfPayDueDays: string;
  slug: string;
}

interface Timestamp {
  _seconds: number;
  _nanoseconds: number;
}

interface Address {
  full: string;
  placeId: string;
  lat: number;
  lng: number;
  city?: string;
  state: string;
  zip: string;
  street: string;
}

interface Location {
  photo: string;
  address: Address;
  ownerId: string;
  updatedAt: Timestamp;
  phone: string;
  companyId: string;
  company: FirestoreReference;
  payModel: string | null;
  email: string;
  role: string | null;
  billingAddress: Address;
  name: string;
  createdAt: Timestamp;
  type: string;
  id: string;
}

interface FirestoreReference {
  _firestore: {
    projectId: string;
  };
  _path: {
    segments: Array<string>;
  };
  _converter: Record<string, unknown>;
}

interface BrandColors {
  primary: string;
  secondary: string;
  tertiary: string;
}
