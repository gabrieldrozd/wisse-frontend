import {authSlice} from "@store/slices/users/auth/authSlice";

export const _authPersistActions = [
    authSlice.actions.refresh,
    authSlice.actions.login,
    authSlice.actions.logout,
];