import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {useEnrollmentActions} from "@store/slices/enrollment/enrollment/enrollmentActions";
import {EnrollmentSelectors} from "@store/slices/enrollment/enrollment/enrollmentSelectors";
import {EnrollmentBase} from "@models/enrollment/enrollmentBrowse";
import {PaginatedList} from "@models/api/pagination";
import {EnrollmentDetails} from "@models/enrollment/enrollmentDetails";

export interface EnrollmentSliceState {
    list: PaginatedList<EnrollmentBase>;
    details: EnrollmentDetails;
}

const initialState: EnrollmentSliceState = {
    list: PaginatedList.default<EnrollmentBase>(),
    details: {} as EnrollmentDetails
};

export const enrollmentSlice = createSlice({
    name: "enrollment",
    initialState,
    reducers: {
        setList: (state, action: PayloadAction<PaginatedList<EnrollmentBase>>) => {
            state.list = action.payload;
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

export const useEnrollmentSlice = () => {
    return {
        actions: useEnrollmentActions(),
        selectors: new EnrollmentSelectors()
    };
};