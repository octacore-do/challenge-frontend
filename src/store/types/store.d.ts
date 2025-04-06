import { UserTypeEnum } from "~/enums/UserTypeEnum";

export interface UserInfo {
  id?: number;
  avatar_url?: string;
  full_name: string;
  email: string;
  is_active: boolean;
  is_superuser: boolean;
  user_type: UserTypeEnum;
  password: string;
  hashed_password?: string;
  image_url?: string;
}

export interface Username {
  id?: number;
  username: string;
  firstName?: string;
  lastName?: string;
  password: string;
}

export interface Jobs {
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
