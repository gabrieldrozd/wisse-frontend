import {useAppContext} from "@context/ApplicationContext";
import type {DataEnvelope} from "@models/api/dataEnvelope";

interface ExecuteOptions<T> {
    withLoading: boolean;
    requestFn: () => Promise<DataEnvelope<T>>;
    onSuccess?: (data: DataEnvelope<T>) => void;
    onFailure?: (data: DataEnvelope<T>) => void;
}

export const useApiRequest = () => {
    const appContext = useAppContext();

    const executeWithLoading = async <T, >(
        requestFn: () => Promise<DataEnvelope<T>>,
        onSuccess?: (data: DataEnvelope<T>) => void,
        onFailure?: (data: DataEnvelope<T>) => void,
    ): Promise<DataEnvelope<T>> => {
        appContext.setLoading(true);
        try {
            const response: DataEnvelope<T> = await requestFn();
            appContext.setLoading(false);
            if (response.isSuccess && onSuccess) {
                onSuccess(response);
            } else if (!response.isSuccess && onFailure) {
                onFailure(response);
            }
            return response;
        } catch (err) {
            appContext.setLoading(false);
            console.log(err);
            throw err;
        } finally {
            appContext.setLoading(false);
        }
    };

    const executeWithoutLoading = async <T, >(
        requestFn: () => Promise<DataEnvelope<T>>,
        onSuccess?: (data: DataEnvelope<T>) => void,
        onFailure?: (data: DataEnvelope<T>) => void,
    ): Promise<DataEnvelope<T>> => {
        try {
            const response: DataEnvelope<T> = await requestFn();
            if (response.isSuccess && onSuccess) {
                onSuccess(response);
            } else if (!response.isSuccess && onFailure) {
                onFailure(response);
            }
            return response;
        } catch (err) {
            console.log(err);
            throw err;
        }
    };

    const execute = async <T, >(
        {withLoading, requestFn, onSuccess, onFailure}: ExecuteOptions<T>
    ): Promise<DataEnvelope<T>> => {
        if (withLoading) {
            return await executeWithLoading<T>(requestFn, onSuccess, onFailure);
        } else {
            return await executeWithoutLoading<T>(requestFn, onSuccess, onFailure);
        }
    };

    return {
        execute
    };
};
