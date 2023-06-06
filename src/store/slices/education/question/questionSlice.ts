import type {IPaginatedList} from "@models/api/pagination";
import {defaultPaginatedList} from "@models/api/pagination";
import type {IQuestion} from "@models/education/question";
import type {PayloadAction} from "@reduxjs/toolkit";
import {createSlice} from "@reduxjs/toolkit";

export interface QuestionSliceState {
    list: IPaginatedList<IQuestion>;
}

const initialState: QuestionSliceState = {
    list: defaultPaginatedList(),
};

export const questionSlice = createSlice({
    name: "question",
    initialState,
    reducers: {
        setList: (state, action: PayloadAction<IPaginatedList<IQuestion>>) => {
            state.list = action.payload;
        },
    }
});