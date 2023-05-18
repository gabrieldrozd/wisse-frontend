import {PaginatedList} from "@models/api/pagination";
import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {TeacherBase} from "@models/users/teacher/teacherBrowse";
import {TeacherDetails} from "@models/users/teacher/teacherDetails";
import {TeacherSelectors} from "@store/slices/users/teacher/teacherSelectors";
import {useTeacherActions} from "@store/slices/users/teacher/teacherActions";

export interface TeacherSliceState {
    list: PaginatedList<TeacherBase>;
    details: TeacherDetails;
}

const initialState: TeacherSliceState = {
    list: PaginatedList.default<TeacherBase>(),
    details: {} as TeacherDetails
};

export const teacherSlice = createSlice({
    name: "teacher",
    initialState,
    reducers: {
        setList: (state, action: PayloadAction<PaginatedList<TeacherBase>>) => {
            state.list = action.payload;
        },
        setDetails: (state, action: PayloadAction<TeacherDetails>) => {
            state.details = action.payload;
        },
    }
});

export const useTeacherSlice = () => {
    return {
        actions: useTeacherActions(),
        selectors: new TeacherSelectors()
    };
};