import {requestAgent} from "@api/requestAgent";
import {useAppContext} from "@context/ApplicationContext";
import {authSlice} from "@store/slices/users/auth/authSlice";
import type {ActionDispatch, RootState} from "@store/store";
import {useDispatch, useSelector} from "react-redux";
import {Notify} from "@services/Notify";
import {useNavigate} from "react-router-dom";
import {Role} from "@const/securityTypes";

export const useAuthSlice = () => {
    const state = useSelector((state: RootState) => state.auth);
    const dispatch = useDispatch<ActionDispatch>();
    const actions = authSlice.actions;
    const agent = requestAgent.users.auth;
    const {isLoading} = useAppContext();
    const navigate = useNavigate();

    const authActions = {
        refresh: async () => {
            isLoading.set(true);
            try {
                const envelope = await agent.query.refresh();
                if (envelope.isSuccess) {
                    dispatch(actions.refresh(envelope.data));
                    return true;
                }
                dispatch(actions.logout());
                return false;
            } finally {
                isLoading.set(false);
            }
        },
        login: async (email: string, password: string) => {
            isLoading.set(true);
            try {
                const envelope = await agent.command.login(email, password);
                if (envelope.isSuccess) {
                    dispatch(actions.login(envelope.data));
                    Notify.success("Success", "Successfully logged in!");

                    switch (envelope.data.role) {
                        case "Admin":
                            navigate("/admin");
                            break;
                        case "Teacher":
                            navigate("/teacher");
                            break;
                        case "Student":
                            navigate("/student");
                            break;
                        default:
                            navigate("/");
                            break;
                    }
                }
            } finally {
                isLoading.set(false);
            }
        },
        logout: () => {
            isLoading.set(true);
            dispatch(actions.logout());
            isLoading.set(false);
            navigate("/");
        }
    };

    const authSelectors = {
        token: () => state.token,
        isInRole: (givenRole: Role) => state.accessToken.role === givenRole,
        isAuthenticated: () => state.accessToken !== null,
        accessToken: () => state.accessToken
    };

    return {
        actions: authActions,
        selectors: authSelectors
    };
};