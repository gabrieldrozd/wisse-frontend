import {useGlobalContext} from "@core/context/ApplicationContext";
import {useDispatch} from "react-redux";
import {ActionDispatch} from "@store/store";
import {authSlice} from "@store/slices/users/auth/authSlice";
import {useNavigate} from "react-router-dom";
import {requestAgent} from "@api/requestAgent";
import {Notify} from "@core/services/Notify";

export const useAuthActions = () => {
    const authRequestAgent = requestAgent.users.auth;
    const navigate = useNavigate();
    const {isLoading} = useGlobalContext();
    const dispatch = useDispatch<ActionDispatch>();
    const actions = authSlice.actions;

    const login = async (email: string, password: string) => {
        isLoading.set(true);
        try {
            const envelope = await authRequestAgent.command.login(email, password);
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
    };

    const logout = () => {
        isLoading.set(true);
        dispatch(actions.logout());
        isLoading.set(false);
        navigate("/");
    };

    return {
        login,
        logout
    };
};