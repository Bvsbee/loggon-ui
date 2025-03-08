export interface UserModel {
  id?: string;

  firstName?: string | null;

  lastName?: string | null;

  email?: string | null;

  passwordHash?: string | null;

  isAdmin?: boolean;

  createdAt?: Date;

  updatedAt?: Date;
}
