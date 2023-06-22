import {createSlice} from "@reduxjs/toolkit";

export interface TestTemplateSliceState {
}

const initialState: TestTemplateSliceState = {
};

export const testTemplateSlice = createSlice({
    name: "test-template",
    initialState,
    reducers: {
        // setList: (state, action: PayloadAction<PaginatedList<IQuestion>>) => {
        //     state.list = action.payload;
        // },
    }
});