import {AxiosClient} from "@api/AxiosClient";
import {useAuthApiUrls} from "@api/urls/useAuthApiUrls";
import {useApiRequest} from "@api/useApiRequest";
import type {DataEnvelope} from "@models/api/dataEnvelope";
import type {IAccessToken} from "@models/auth/IAccessToken";
import {useAuthState} from "@store/slices/users/auth/useAuthState";
import {useMutation, useQuery, useQueryClient} from "@tanstack/react-query";

const client = AxiosClient.initialize();
const key = "auth";

export const useAuthApi = () => {
    const queryClient = useQueryClient();
    const urls = useAuthApiUrls();
    const authState = useAuthState();
    const apiRequest = useApiRequest();

    const refreshToken = () => {
        return useQuery({
            queryKey: [key, "refreshToken"],
            queryFn: async () => await apiRequest.execute(
                () => client.get<IAccessToken>(urls.refresh()),
                (data) => authState.actions.refresh(data.data),
                () => authState.actions.logout(),
            ),
            select: (data: DataEnvelope<IAccessToken>) => data.data as IAccessToken,
            enabled: false,
        });
    };

    const login = useMutation({
        mutationKey: [key, "login"],
        mutationFn: async (payload: {
            email: string,
            password: string
        }) => await apiRequest.execute(
            () => client.post<IAccessToken>(urls.login(), {
                email: payload.email,
                password: payload.password,
            }),
            (data) => authState.actions.login(data.data),
            () => authState.actions.logout(),
        ),
        onSuccess: async () => await queryClient.invalidateQueries([key, "refreshToken"])
    });

    return {
        queries: {
            refreshToken,
        },
        commands: {
            login,
        }
    };
};
