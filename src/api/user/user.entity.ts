export interface User {
  // Unique ID
  id?: string;
  // Base Info
  firstName: string;
  lastName: string;
  role?: string;
  // Security Info
  createdAt?: Date | string;
  lastUpdateAt?: Date | string | undefined;
  lastLogin?: Date | string | undefined;
  lastAllowedIp?: string | undefined;
  allowedIps?: string[] | undefined;

  isTournamentParticipant?: boolean;
}
