import type {IPaginatedList} from "@models/api/pagination";
import {defaultPaginatedList} from "@models/api/pagination";
import type {EnrollmentBase} from "@models/enrollment/enrollmentBrowse";
import type {EnrollmentDetails} from "@models/enrollment/enrollmentDetails";
import type {IEnrollmentPostFormModel} from "@models/enrollment/IEnrollmentPost";
import type {PayloadAction} from "@reduxjs/toolkit";
import {createSlice} from "@reduxjs/toolkit";

export interface IEnrollmentSliceState {
    enrollmentForm: IEnrollmentPostFormModel;
    list: IPaginatedList<EnrollmentBase>;
    approvedList: IPaginatedList<EnrollmentBase>;
    rejectedList: IPaginatedList<EnrollmentBase>;
    details: EnrollmentDetails;
}

const initialState: IEnrollmentSliceState = {
    enrollmentForm: {} as IEnrollmentPostFormModel,
    list: defaultPaginatedList(),
    approvedList: defaultPaginatedList(),
    rejectedList: defaultPaginatedList(),
    details: {} as EnrollmentDetails
};

export const enrollmentSlice = createSlice({
    name: "enrollment",
    initialState,
    reducers: {
        persistForm: (state, action: PayloadAction<IEnrollmentPostFormModel>) => {
            state.enrollmentForm = action.payload;
        },
        setList: (state, action: PayloadAction<IPaginatedList<EnrollmentBase>>) => {
            state.list = action.payload;
        },
        setApprovedList: (state, action: PayloadAction<IPaginatedList<EnrollmentBase>>) => {
            state.approvedList = action.payload;
        },
        setRejectedList: (state, action: PayloadAction<IPaginatedList<EnrollmentBase>>) => {
            state.rejectedList = action.payload;
        },
        setDetails: (state, action: PayloadAction<EnrollmentDetails>) => {
            state.details = action.payload;
        },
        approve: (state, action: PayloadAction<string>) => {
            const enrollment = state.list.list.find(x => x.externalId === action.payload);
            if (enrollment) {
                enrollment.status = "Approved";
                // TODO: Set also the decision date with correct format
            }
        },
        reject: (state, action: PayloadAction<string>) => {
            const enrollment = state.list.list.find(x => x.externalId === action.payload);
            if (enrollment) {
                enrollment.status = "Rejected";
                // TODO: Set also the decision date with correct format
            }
        }
    }
});