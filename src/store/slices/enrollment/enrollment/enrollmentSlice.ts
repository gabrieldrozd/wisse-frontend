import type {IPaginatedList} from "@models/api/pagination";
import {defaultPaginatedList} from "@models/api/pagination";
import type {EnrollmentBase} from "@models/enrollment/enrollmentBrowse";
import type {EnrollmentDetails} from "@models/enrollment/enrollmentDetails";
import type {IEnrollmentPostFormModel} from "@models/enrollment/IEnrollmentPost";
import type {PayloadAction} from "@reduxjs/toolkit";
import {createSlice} from "@reduxjs/toolkit";

export interface IEnrollmentSliceState {
    enrollmentForm: IEnrollmentPostFormModel;
}

const initialState: IEnrollmentSliceState = {
    enrollmentForm: {} as IEnrollmentPostFormModel
};

export const enrollmentSlice = createSlice({
    name: "enrollment",
    initialState,
    reducers: {
        persistForm: (state, action: PayloadAction<IEnrollmentPostFormModel>) => {
            state.enrollmentForm = action.payload;
        }
    }
});