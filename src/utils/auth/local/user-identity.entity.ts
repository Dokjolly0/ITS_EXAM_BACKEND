import { User } from "../../../api/user/user.entity";

export interface UserIdentity {
  id: string;
  provider: "local";
  credentials: {
    username: string;
    hashedPassword: string;
  };
  user: User;

  // Token
  isActive: boolean;
  emailConfirmationSentAt?: Date;
  confirmationToken?: string | undefined;
  resetPasswordToken?: string | undefined | null;
  resetPasswordExpires?: Date | string | undefined | null;
}
