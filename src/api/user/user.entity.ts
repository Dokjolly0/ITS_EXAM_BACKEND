import { UserRoleType } from "../../utils/types/user.type";

export interface User {
  // Unique ID
  id?: string;
  // Base Info
  firstName: string;
  lastName: string;
  username: string;
  role?: UserRoleType; // User role, default is "user"
  // Security Info
  createdAt?: Date | string;
  lastUpdateAt?: Date | string | undefined;
  lastLogin?: Date | string | undefined;
  lastAllowedIp?: string | undefined;
  allowedIps?: string[] | undefined;
}
