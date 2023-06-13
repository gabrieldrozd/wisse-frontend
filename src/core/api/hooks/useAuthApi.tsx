import {AxiosClient} from "@api/AxiosClient";
import {useAppContext} from "@context/ApplicationContext";
import type {DataEnvelope} from "@models/api/dataEnvelope";
import type {IAccessToken} from "@models/auth/IAccessToken";
import {useAuthState} from "@store/slices/users/auth/useAuthState";
import {useMutation, useQuery, useQueryClient} from "@tanstack/react-query";

const client = AxiosClient.initialize();
const authUrlSegment = "users-module/auth";
const key = "auth";

export const useAuthApi = () => {
    const appContext = useAppContext();
    const queryClient = useQueryClient();
    const authState = useAuthState();

    const refreshToken = () => {
        return useQuery({
            queryKey: [key, "refreshToken"],
            queryFn: async () => {
                appContext.setLoading(true);
                const accessToken = await client.get<IAccessToken>(authUrlSegment);
                authState.actions.refresh(accessToken.data);
                appContext.setLoading(false);
                return accessToken;
            },
            select: (data: DataEnvelope<IAccessToken>) => data.data as IAccessToken,
            enabled: false,
        });
    };

    const login = useMutation({
        mutationKey: [key, "login"],
        mutationFn: async (credentials: { email: string, password: string }) => {
            appContext.setLoading(true);
            const accessToken = await client.post<IAccessToken>(authUrlSegment, {
                email: credentials.email,
                password: credentials.password,
            });
            authState.actions.login(accessToken.data);
            appContext.setLoading(false);
            return accessToken;
        },
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
