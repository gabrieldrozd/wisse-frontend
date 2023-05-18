import {Permission, Role} from "@const/securityTypes";

export interface AccessToken {
    token: string;
    expires: number;
    userId: string;
    firstName: string;
    lastName: string;
    email: string;
    role: Role;
    permissions: Permission[];
}