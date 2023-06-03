import {AxiosClient} from "@api/AxiosClient";
import {IAccessToken} from "@models/auth/IAccessToken";

const client = AxiosClient.initialize();
const authUrlSegment = "users-module/auth";

export const AuthQueries = {
    refresh() {
        return client.get<IAccessToken>(authUrlSegment);
    }
};

export const AuthCommands = {
    login: (email: string, password: string) => {
        return client.post<IAccessToken>(authUrlSegment, {email: email, password: password});
    }
};