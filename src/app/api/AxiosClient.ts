import axios, {AxiosError, AxiosResponse} from "axios";
import {DataEnvelope, Envelope} from "@models/api/dataEnvelope";
import {PaginatedList, PaginationRequest} from "@models/api/pagination";
import {Notify} from "@core/services/Notify";
import {ApplicationRouter} from "@core/routing/ApplicationRouter";

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
    });

axiosClient.interceptors.response.use(
    async (response: AxiosResponse<Envelope> | AxiosResponse<DataEnvelope<any>>) => {
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

    get<T>(url: string) {
        return axiosClient.get<DataEnvelope<T>>(`${url}`).then(getDataEnvelope);
    }

    details<T>(url: string, id: string) {
        return axiosClient.get<DataEnvelope<T>>(`${url}/${id}`).then(getDataEnvelope);
    }

    async browse<T>(url: string, pagination: PaginationRequest) {
        return await axiosClient.put<DataEnvelope<PaginatedList<T>>>(url, pagination).then(getDataEnvelope);
    }

    post<T>(url: string, body: {}) {
        console.log("post", url, body);
        return axiosClient.post<DataEnvelope<T>>(url, body).then(getDataEnvelope);
    }
}

const errorNotification = (envelope: Envelope) => {
    if (envelope.hasErrors) {
        envelope.errors.forEach((error) => {
            Notify.error(error.code, error.message);
        });
    }
};

