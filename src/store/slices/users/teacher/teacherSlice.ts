import type {IPaginatedList} from "@models/api/pagination";
import {defaultPaginatedList} from "@models/api/pagination";
import type {TeacherBase} from "@models/users/teacher/teacherBrowse";
import type {TeacherDetails} from "@models/users/teacher/teacherDetails";
import type {PayloadAction} from "@reduxjs/toolkit";
import {createSlice} from "@reduxjs/toolkit";

export interface TeacherSliceState {
    list: IPaginatedList<TeacherBase>;
    details: TeacherDetails;
}

const initialState: TeacherSliceState = {
    list: defaultPaginatedList(),
    details: {} as TeacherDetails
};

export const teacherSlice = createSlice({
    name: "teacher",
    initialState,
    reducers: {
        setList: (state, action: PayloadAction<IPaginatedList<TeacherBase>>) => {
            state.list = action.payload;
        },
        setDetails: (state, action: PayloadAction<TeacherDetails>) => {
            state.details = action.payload;
        },
    }
});