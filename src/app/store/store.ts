import {AnyAction, configureStore, EnhancedStore, Middleware} from "@reduxjs/toolkit";
import {loadStateFromLocalStorage, stateMiddleware} from "@store/persistMiddleware";
import {authSlice} from "@store/slices/users/auth/authSlice";
import {enrollmentSlice} from "@store/slices/enrollment/enrollment/enrollmentSlice";
import {studentSlice} from "@store/slices/users/student/studentSlice";
import {teacherSlice} from "@store/slices/users/teacher/teacherSlice";

export interface RootState {
    auth: ReturnType<typeof authSlice.reducer>;
    enrollment: ReturnType<typeof enrollmentSlice.reducer>;
    student: ReturnType<typeof studentSlice.reducer>;
    teacher: ReturnType<typeof teacherSlice.reducer>;
}

const preloadedState: RootState | undefined = loadStateFromLocalStorage();

export const store: EnhancedStore<RootState, AnyAction, Middleware[]> = configureStore({
    reducer: {
        auth: authSlice.reducer,
        enrollment: enrollmentSlice.reducer,
        student: studentSlice.reducer,
        teacher: teacherSlice.reducer
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(stateMiddleware),
    preloadedState
});

export declare type ActionDispatch = typeof store.dispatch;