import type {Permission, Role} from "@const/securityTypes";

export interface IAccessToken {
    token: string;
    expires: number;
    userId: string;
    firstName: string;
    lastName: string;
    email: string;
    role: Role;
    permissions: Permission[];
}