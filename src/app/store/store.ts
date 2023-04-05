import {AnyAction, configureStore, EnhancedStore, Middleware} from "@reduxjs/toolkit";
import {loadStateFromLocalStorage, stateMiddleware} from "@store/persistMiddleware";
import {authSlice} from "@store/slices/users/auth/authSlice";
import {enrollmentSlice} from "@store/slices/enrollment/enrollment/enrollmentSlice";

export interface RootState {
    auth: ReturnType<typeof authSlice.reducer>;
    enrollment: ReturnType<typeof enrollmentSlice.reducer>;
}

const preloadedState: RootState | undefined = loadStateFromLocalStorage();

export const store: EnhancedStore<RootState, AnyAction, Middleware[]> = configureStore({
    reducer: {
        auth: authSlice.reducer,
        enrollment: enrollmentSlice.reducer
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(stateMiddleware),
    preloadedState
});

export declare type ActionDispatch = typeof store.dispatch;