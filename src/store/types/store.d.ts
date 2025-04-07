import { UserTypeEnum } from "~/enums/UserTypeEnum";

export interface Job {
  id?: number;
  title: string;
  salary: string;
  expire_at: string;
  description: string;
  category_id?: string;
  type_id?: string;
  location_id?: string;
  pipeline_id?: string;
  company_id?: string;
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
