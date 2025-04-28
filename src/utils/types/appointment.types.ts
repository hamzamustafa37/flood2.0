export interface IAppointment {
  id: string;
  createdAt: string;
  googleCalendarEventId: string;
  startAt: string;
  endAt: string;
  url: string;
  job: {
    id: string;
    path: string;
  };
  users: Array<any>;
}
