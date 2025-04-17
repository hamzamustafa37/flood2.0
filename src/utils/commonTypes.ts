export interface IUserToBeRegister {
  fullName: string;
  email: string;
  password: string;
  stripeCustomerId: string;
}
export interface IUpdatePassword {
  password: string;
  newPassword: string;
}
export interface IUserResponseData {
  fullName: string;
  email: string;
  password: string;
}

export interface IUserResponseMeta {
  status: number;
  message: string;
  response: string;
}
export interface IUserResponseToBeRegister {
  data: IUserResponseData;
  meta: IUserResponseMeta;
}

export interface IOtpResponseData {
  fullName: string;
  email: string;
  _id: string;
}

export interface IOtpResponseMeta {
  status: number;
  message: string;
  response: string;
}

export interface IEmailOtpVerify {
  data: IOtpResponseData;
  meta: IOtpResponseMeta;
}

export enum RoleType {
  SUPER_ADMIN = "SUPER_ADMIN",
  ADMIN = "ADMIN",
  STAFF = "STAFF",
  PROVIDER = "PROVIDER",
}

export enum ButtonType {
  Button = "button",
  Submit = "submit",
  Reset = "reset",
}

export enum InputType {
  Text = "text",
  Password = "password",
  Email = "email",
  Number = "number",
}

export interface ISelectOption {
  value: string;
  label: string;
}

export enum ButtonVariant {
  Primary = "primary",
  Light = "light",
  Danger = "danger",
  Outline = "outline",
  OutlineSecondary = "outline-secondary",
}
export interface IResendOtpMeta {
  status: number;
  message: string;
  response: string;
}
export interface IResendOtpResponse {
  data: string;
  meta: IResendOtpMeta;
}

export interface User {
  _id: string;
  email: string;
  medicalSpecialty: string;
  countryOfPractice: string;
  professionalHealthCareProvider: boolean;
  agreeToTermsAndDataProtection: boolean;
}

export interface ICard {
  _id?: string;
  token?: string;
  cardNumber?: string;
  cardName?: string;
  country?: string;
  cardType?: string;
  userId?: string;
  isActive?: boolean;
  brand?: string;
  expMonth?: number;
  last4?: string;
  exp_month?: number;
  exp_year?: number;
  isSelected?: boolean;
}

export interface IUser {
  imgUrl: string;
  fullName: string;
  email: string;
  country: string;
  state: string;
  stripeCustomerId?: string;
  authType?: string;
  subscriptionStart?: string;
  subscriptionEnd?: string;
}
export interface ISocialProviderData {
  fullName: string;
  email: string;
  accessToken: string;
  profilePhoto: string;
  sub: string;
}
export interface IUserSignIn {
  email: string;
  password: string;
}

export interface ISignInResponseData {
  accessToken: string;
  refreshToken: string;
  user: IUser;
}

export interface ISignResponseMeta {
  status: number;
  message: string;
  response: string;
}

export interface ISignInResponse {
  data: ISignInResponseData;
  meta: ISignResponseMeta;
}

export interface IResetPasswordResponseData {
  fullName: string;
  email: string;
}

export interface IResetPasswordResponseMeta {
  status: number;
  message: string;
  response: string;
}

export interface IResetPasswordResponse {
  data: ISignInResponseData;
  meta: ISignResponseMeta;
}

interface InvoiceSettings {
  custom_fields: null | any;
  default_payment_method: string;
  footer: null | string;
  rendering_options: null | any;
}
export interface ICustomer {
  id: string;
  object: "customer";
  address: null | string;
  balance: number;
  created: number;
  currency: null | string;
  default_source: null | string;
  delinquent: boolean;
  description: null | string;
  discount: null | string;
  email: string;
  invoice_prefix: string;
  invoice_settings: InvoiceSettings;
  livemode: boolean;
  metadata: Record<string, any>;
  name: null | string;
  next_invoice_sequence: number;
  phone: null | string;
  preferred_locales: string[];
  shipping: null | string;
  tax_exempt: "none" | "exempt" | "reverse";
  test_clock: null | string;
}
export interface ICustomerPayload {
  paymentMethodId?: string;
  // customerId?: string;
}

export interface ICommonResponse {
  meta: { status: number; response: string; message: string };
}

export interface IRebuttal {
  _id: string;
  userId: string;
  reprimandDocumentUrl: string | null;
  employeeDocumentUrl: string | null;
  responseTone: string;
  country: string;
  details: string;
  receivedReprimand: boolean;
  generatedResponse: string;
}

interface Address {
  city: string | null;
  country: string | null;
  line1: string | null;
  line2: string | null;
  postal_code: string;
  state: string | null;
}

interface Checks {
  address_line1_check: string | null;
  address_postal_code_check: string;
  cvc_check: string;
}

interface Networks {
  available: string[];
  preferred: string | null;
}

interface ThreeDSecureUsage {
  supported: boolean;
}

interface BillingDetails {
  address: Address;
  email: string | null;
  name: string | null;
  phone: string | null;
}

export interface IBillingHistory {
  _id?: string;
  userId: string;
  rebuttalId: string;
  rebuttalTitle: string;
  amount: string;
  createdOn: Date;
}

export interface IPaymentCard {
  _id: string;
  brand: string;
  checks: Checks;
  country: string;
  display_brand: string;
  exp_month: number;
  exp_year: number;
  fingerprint: string;
  funding: string;
  generated_from: string | null;
  last4: string;
  networks: Networks;
  three_d_secure_usage: ThreeDSecureUsage;
  wallet: string | null;
  isSelected: boolean;
}
export interface PaymentMethod {
  id: string;
  object: string;
  allow_redisplay: string;
  billing_details: BillingDetails;
  card: IPaymentCard;
  created: number;
  customer: string;
  livemode: boolean;
  metadata: Record<string, unknown>;
  radar_options: Record<string, unknown>;
  type: string;
  isSelected: boolean;
}

export interface UpdateCards {
  paymentMethod: PaymentMethod;
  cardID: string;
}

export interface IPagination {
  page: number;
  limit: number;
  total: number;
}

export interface IRebuttalData {
  results: IRebuttal[];
  pagination: IPagination;
}
export interface IResponse extends ICommonResponse {
  data: IRebuttalData;
}
export interface IRebuttalPayload {
  name?: string;
  city?: string;
  state?: string;
  jobTitle?: string;
  industry?: string;
  jobClassification?: string;
  ethnicBackground?: string;

  employeeDocumentUrl: File;
  employeeDocumentPath: string;
  reprimandDocumentPath: string;
  reprimandDocumentUrl: File;
  tone: string;
  details?: string;

  recentComplishment?: string;
  anyPreviousIncident?: string;
  anyEvidence?: string;
  priorDiscussions?: string;
  desiredOutcomes?: string;
  moreDetailsRebuttal?: string;
  supportingFile?: File;

  everReprimanded?: string;
  typeOfRebuttal?: string;
  receivedReprimand?: number;
  paymentMethod?: string;
}

export interface IRebuttalResponse extends ICommonResponse {
  data: IRebuttal;
}
export interface IUpdatePasswordResponse extends ICommonResponse {
  data: IUser;
}
export interface IUserResponse extends ICommonResponse {
  data: IUser;
}
export interface ICardResponse extends ICommonResponse {
  data: ICard;
}
export interface ICardsResponse extends ICommonResponse {
  data: ICard[];
}
export interface IUpdatePaymentMethodsResponse extends ICommonResponse {
  data: PaymentMethod;
}
export interface IPaymentMethodsResponse extends ICommonResponse {
  data: PaymentMethod[];
}
export interface ICustomerResponse extends ICommonResponse {
  data: ICustomer;
}
export interface IBillingHistoryResponse extends ICommonResponse {
  data: IBillingHistory[];
}

export interface IStepHeader {
  label: string;
  heading: string;
}
export interface IBooking {
  issues: string[];
  zipCode: string;
  affectedAreas: string[];
  affectedSize: string;
  urgency: string;
  additionalInfo: string;
  causes: string[];
  uploadedImage: File | null;
  name: string;
  phone: string;
  address: string;
  city: string;
  state: string;
}

export interface IAffectedArea {
  siteType: string;
  roomType: string;
  damagePart: string;
  materials: string[];
  images: File[];
}
export interface IJob {
  site: string[];
  floor: string[];
  roomType: string[];
  affectedAreas: Array<IAffectedArea>;
}
