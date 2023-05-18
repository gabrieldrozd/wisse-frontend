import {AxiosClient} from "@api/AxiosClient";
import {AccessToken} from "@models/auth/accessToken";

const client = AxiosClient.initialize();
const authUrlSegment = "users-module/auth";

export const AuthQueries = {
    refresh() {
        return client.get<AccessToken>(authUrlSegment);
    }
};

export const AuthCommands = {
    login: (email: string, password: string) => {
        return client.post<AccessToken>(authUrlSegment, {email: email, password: password});
    }
};