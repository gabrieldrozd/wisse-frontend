import {notifications} from "@mantine/notifications";

export class Notify {
    static success = (title?: string, message?: string) => {
        notifications.show({color: "green", title: title, message: message});
    };

    static error = (title?: string, message?: string) => {
        notifications.show({color: "red", title: title, message: message});
    };

    static info = (title?: string, message?: string) => {
        notifications.show({color: "blue", title: title, message: message});
    };

    static warning = (title?: string, message?: string) => {
        notifications.show({color: "yellow", title: title, message: message});
    };

    static default = (title?: string, message?: string) => {
        notifications.show({color: "gray", title: title, message: message, loading: true});
    };

    static loading = (title?: string, message?: string) => {
        notifications.show({
            id: "loading-notification",
            color: "#6366f1",
            title: title,
            message: message,
            loading: true,
            autoClose: false,
            withCloseButton: false,
        });
    };

    static updateLoading = (title?: string, message?: string) => {
        notifications.update({
            id: "loading-notification",
            color: "#6366f1",
            title: title,
            message: message,
            loading: false,
            autoClose: true,
            withCloseButton: true,
        });
    };
}