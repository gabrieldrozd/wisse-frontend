import {createSlice} from "@reduxjs/toolkit";

export interface StudentSliceState {
}

const initialState: StudentSliceState = {};

export const studentSlice = createSlice({
    name: "student",
    initialState,
    reducers: {}
});
