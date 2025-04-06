export interface EmailLoginResponse {
  success: string;
  message: string;
}

interface LoginData {
  token: string;
  name: string;
}

export interface AuthLoginResponse {
  success: string;
  data: LoginData;
  message: string;
}
