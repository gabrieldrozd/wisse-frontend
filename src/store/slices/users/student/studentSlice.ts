import {PaginatedList} from "@models/api/pagination";
import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {StudentBase} from "@models/users/student/studentBrowse";
import {StudentDetails} from "@models/users/student/studentDetails";
import {StudentSelectors} from "@store/slices/users/student/studentSelectors";
import {useStudentActions} from "@store/slices/users/student/studentActions";

export interface StudentSliceState {
    list: PaginatedList<StudentBase>;
    details: StudentDetails;
}

const initialState: StudentSliceState = {
    list: PaginatedList.default<StudentBase>(),
    details: {} as StudentDetails
};

export const studentSlice = createSlice({
    name: "student",
    initialState,
    reducers: {
        setList: (state, action: PayloadAction<PaginatedList<StudentBase>>) => {
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