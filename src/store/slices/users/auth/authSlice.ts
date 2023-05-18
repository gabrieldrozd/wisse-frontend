import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {useAuthActions} from "@store/slices/users/auth/authActions";
import {AuthSelectors} from "@store/slices/users/auth/authSelectors";
import {AccessToken} from "@models/auth/accessToken";

export interface AuthSliceState {
    accessToken: AccessToken;
    token: string | null;
}

const initialState: AuthSliceState = {
    accessToken: {} as AccessToken,
    token: localStorage.getItem("token") || null
};

export const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        refresh: (state, action: PayloadAction<AccessToken>) => {
            state.accessToken = action.payload;
            state.token = action.payload.token;
            localStorage.setItem("token", action.payload.token);
        },
        login: (state, action: PayloadAction<AccessToken>) => {
            state.accessToken = action.payload;
            state.token = action.payload.token;
            localStorage.setItem("token", action.payload.token);
        },
        logout: (state) => {
            state.accessToken = {} as AccessToken;
            state.token = null;
            localStorage.removeItem("token");
        }
    }
});

export const useAuthSlice = () => {
    return {
        actions: useAuthActions(),
        selectors: new AuthSelectors()
    };
};