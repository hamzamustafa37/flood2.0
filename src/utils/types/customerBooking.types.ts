export interface PlumbingIssue {
  plumbingIssue: string;
}
export interface ICustomerBooking {
  id: string;
  squareFootage: string;
  schedule: {
    slot: {
      start: Timestamp;
      end: Timestamp;
    };
    date: Timestamp;
  };
  service: string;
  levels: Level[];
  bookingStatus: "pending" | "approved" | "declined" | string;
  createdAt: Timestamp;
  emergency: string;
  causeOfDamage: CauseOfDamage;
  visibleWaterDamage: string;
  empId: string;
  customerDetails: CustomerDetails;
  zipCode: string | null;
  plumbingIssue: PlumbingIssue | null;
}

export interface Timestamp {
  seconds: number;
  nanoseconds: number;
}

export interface Level {
  name: string;
  percentage: string;
}

export interface CauseOfDamage {
  fileURLs: string[];
  other: string;
  causeOfDamage: string;
}

export interface CustomerDetails {
  name: string;
  phone: string;
  email: string;
  address: string;
  city: string;
  state: string;
  zipCode: string | null;
}

export interface INonScheduledBooking
  extends Omit<ICustomerBooking, "schedule" | "empId"> {
  schedule?: ICustomerBooking["schedule"];
  empId?: string;
  status: "success";
}
