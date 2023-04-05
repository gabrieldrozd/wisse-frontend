import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {useEnrollmentActions} from "@store/slices/enrollment/enrollment/enrollmentActions";
import {EnrollmentSelectors} from "@store/slices/enrollment/enrollment/enrollmentSelectors";

export interface EnrollmentSliceState {
}

const initialState: EnrollmentSliceState = {
};

export const enrollmentSlice = createSlice({
    name: "enrollment",
    initialState,
    reducers: {
    }
});

export const useEnrollmentSlice = () => {
    return {
        actions: useEnrollmentActions(),
        selectors: new EnrollmentSelectors()
    };
};