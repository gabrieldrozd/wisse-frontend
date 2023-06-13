import type {Role} from "@const/securityTypes";
import {useAppContext} from "@context/ApplicationContext";
import type {IAccessToken} from "@models/auth/IAccessToken";
import {Notify} from "@services/Notify";
import {authSlice} from "@store/slices/users/auth/authSlice";
import type {ActionDispatch, RootState} from "@store/store";
import {useDispatch, useSelector} from "react-redux";
import {useNavigate} from "react-router-dom";

export const useAuthState = () => {
    const state = useSelector((state: RootState) => state.auth);
    const dispatch = useDispatch<ActionDispatch>();
    const actions = authSlice.actions;
    const {setLoading} = useAppContext();
    const navigate = useNavigate();

    const authActions = {
        refresh: (accessToken: IAccessToken) => {
            dispatch(actions.refresh(accessToken));
            return true;
        },
        login: (accessToken: IAccessToken) => {
            dispatch(actions.login(accessToken));
            Notify.success("Success", "Successfully logged in!");

            switch (accessToken.role) {
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
        },
        logout: () => {
            setLoading(true);
            dispatch(actions.logout());
            setLoading(false);
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