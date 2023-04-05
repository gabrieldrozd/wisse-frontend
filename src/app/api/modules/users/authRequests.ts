import {AccessToken} from "@models/auth/accessToken";
import {AxiosClient} from "@api/AxiosClient";

const client = AxiosClient.initialize();
const authUrlSegment = "users-module/auth";

export const AuthQueries = {};

export const AuthCommands = {
    login: (email: string, password: string) => {
        return client.post<AccessToken>(authUrlSegment, {email: email, password: password});
    }
};