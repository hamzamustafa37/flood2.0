export interface IGoogleUserData {
  token: string;
  uid: string;
  phone: string | null;
  email: string;
  name: string;
}

export interface GoogleLoginUser {
  uid: string;
  email: string;
  name: string;
}

export interface IGoogleLoginResponse {
  data: {
    message: string;
    user: GoogleLoginUser;
  };
  status: number;
  statusText: string;
  headers: Record<string, string>;
  config: {
    method: string;
    maxBodyLength: number;
    url: string;
    headers: {
      Authorization: string;
      Accept?: string;
    };
  };
  request: any;
}
