import { UserTypeEnum } from "~/enums/UserTypeEnum";

export interface Job {
  id?: number;
  title: string;
  salary?: string;
  description?: string;
  expire_at?: Date | string | null;
}

export interface Username {
  id?: number;
  username?: string;
  firstName?: string;
  email: string;
  lastName?: string;
  password?: string;
  otp?: string;
}
