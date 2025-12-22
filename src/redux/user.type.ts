export type TUser = {
  id: string;
  name: string;
  email: string;
  phone_number: string;
  password: string;
  confirm_password: string;
  area: string;
  city: string;
  role: "USER" | "ADMIN" | "SUPER_ADMIN";
  isVerified: boolean;
  isActive: boolean;
  isDeleted: boolean;
  createdAt: string;
  updatedAt: string;
  deletedAt: string | null;
  profilePhoto: string;
};