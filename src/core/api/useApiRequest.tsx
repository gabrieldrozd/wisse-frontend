import {useAppContext} from "@context/ApplicationContext";
import type {DataEnvelope} from "@models/api/dataEnvelope";

export const useApiRequest = () => {
    const appContext = useAppContext();

    const execute = async <T, >(
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
            throw err;
        } finally {
            appContext.setLoading(false);
        }
    };

    return {execute};
};
