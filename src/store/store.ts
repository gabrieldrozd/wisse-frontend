import {AnyAction, configureStore, EnhancedStore, Middleware} from "@reduxjs/toolkit";
import {loadStateFromLocalStorage, stateMiddleware} from "@store/persistMiddleware";
import {questionSlice} from "@store/slices/education/question/questionSlice";
import {enrollmentSlice} from "@store/slices/enrollment/enrollment/enrollmentSlice";
import {authSlice} from "@store/slices/users/auth/authSlice";
import {studentSlice} from "@store/slices/users/student/studentSlice";
import {teacherSlice} from "@store/slices/users/teacher/teacherSlice";

export interface RootState {
    question: ReturnType<typeof questionSlice.reducer>;
    enrollment: ReturnType<typeof enrollmentSlice.reducer>;
    auth: ReturnType<typeof authSlice.reducer>;
    student: ReturnType<typeof studentSlice.reducer>;
    teacher: ReturnType<typeof teacherSlice.reducer>;
}

const preloadedState: RootState | undefined = loadStateFromLocalStorage();

export const store: EnhancedStore<RootState, AnyAction, Middleware[]> = configureStore({
    reducer: {
        question: questionSlice.reducer,
        enrollment: enrollmentSlice.reducer,
        auth: authSlice.reducer,
        student: studentSlice.reducer,
        teacher: teacherSlice.reducer
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(stateMiddleware),
    preloadedState
});

export declare type ActionDispatch = typeof store.dispatch;