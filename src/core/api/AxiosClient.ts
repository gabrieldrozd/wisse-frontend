import axios, {AxiosError, AxiosResponse} from "axios";
import {Notify} from "@services/Notify";
import {ApplicationRouter} from "@routing/ApplicationRouter";

import {DataEnvelope, Envelope} from "@models/api/dataEnvelope";
import {PaginatedList, PaginationRequest} from "@models/api/pagination";

const sleep = (delay: number) => {
    return new Promise((resolve) => {
        setTimeout(resolve, delay);
    });
};

const getEnvelope = (response: AxiosResponse<Envelope>): Envelope => response.data;
const getDataEnvelope = <T>(response: AxiosResponse<DataEnvelope<T>>): DataEnvelope<T> => {
    console.log("getDataEnvelope", response);
    return response.data;
};

const apiURL = "http://localhost:5000";
const axiosClient = axios.create({
    baseURL: apiURL
});

axiosClient.defaults.headers.common["Content-Type"] = "application/json";
axiosClient.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem("token");
        if (token) config.headers.Authorization = `Bearer ${token}`;
        return config;
    }
);

axiosClient.interceptors.response.use(
    async (response: AxiosResponse<Envelope> | AxiosResponse<DataEnvelope<any>>) => {
        await sleep(500);
        return response;
    },
    (error: AxiosError<Envelope>) => {
        const envelope = error.response?.data;

        if (envelope) {
            switch (envelope.statusCode) {
                case 400:
                    errorNotification(envelope);
                    break;
                case 401:
                    errorNotification(envelope);
                    ApplicationRouter.navigate("/").then();
                    break;
                case 403:
                    errorNotification(envelope);
                    break;
                case 404:
                    errorNotification(envelope);
                    break;
                case 500:
                    errorNotification(envelope);
                    break;
            }
        }

        return Promise.reject(error);
    }
);

export class AxiosClient {
    private constructor() {
        axiosClient.defaults.baseURL = `${apiURL}`;
    }

    static initialize(): AxiosClient {
        return new AxiosClient();
    }

    async get<T>(url: string) {
        return await axiosClient.get<DataEnvelope<T>>(`${url}`).then(getDataEnvelope);
    }

    async details<T>(url: string, id: string) {
        return await axiosClient.get<DataEnvelope<T>>(`${url}/${id}`).then(getDataEnvelope);
    }

    async browse<T>(url: string, pagination: PaginationRequest) {
        return await axiosClient.put<DataEnvelope<PaginatedList<T>>>(url, pagination).then(getDataEnvelope);
    }

    async post<T>(url: string, body: {}) {
        console.log(`post ${url}`, url, body);
        return await axiosClient.post<DataEnvelope<T>>(url, body).then(getDataEnvelope);
    }

    async put<T>(url: string, body: {}) {
        console.log(`put ${url}`, url, body);
        return await axiosClient.put<DataEnvelope<T>>(url, body).then(getDataEnvelope);
    }
}

const errorNotification = (envelope: Envelope) => {
    if (envelope.hasErrors) {
        envelope.errors.forEach((error) => {
            Notify.error(error.code, error.message);
        });
    }
};

