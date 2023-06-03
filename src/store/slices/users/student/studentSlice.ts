import type {IPaginatedList} from "@models/api/pagination";
import {defaultPaginatedList} from "@models/api/pagination";
import type {StudentBase} from "@models/users/student/studentBrowse";
import type {StudentDetails} from "@models/users/student/studentDetails";
import type {PayloadAction} from "@reduxjs/toolkit";
import {createSlice} from "@reduxjs/toolkit";
import {useStudentActions} from "@store/slices/users/student/studentActions";
import {StudentSelectors} from "@store/slices/users/student/studentSelectors";

export interface StudentSliceState {
    list: IPaginatedList<StudentBase>;
    details: StudentDetails;
}

const initialState: StudentSliceState = {
    list: defaultPaginatedList(),
    details: {} as StudentDetails
};

export const studentSlice = createSlice({
    name: "student",
    initialState,
    reducers: {
        setList: (state, action: PayloadAction<IPaginatedList<StudentBase>>) => {
            state.list = action.payload;
        },
        setDetails: (state, action: PayloadAction<StudentDetails>) => {
            state.details = action.payload;
        },
    }
});

export const useStudentSlice = () => {
    return {
        actions: useStudentActions(),
        selectors: new StudentSelectors()
    };
};