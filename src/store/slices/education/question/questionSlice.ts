import type {IPaginatedList} from "@models/api/pagination";
import {defaultPaginatedList} from "@models/api/pagination";
import type {IQuestion} from "@models/education/question";
import type {PayloadAction} from "@reduxjs/toolkit";
import {createSlice} from "@reduxjs/toolkit";
import {useQuestionActions} from "@store/slices/education/question/questionActions";
import {QuestionSelectors} from "@store/slices/education/question/questionSelectors";

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

export const useQuestionSlice = () => {
    return {
        actions: useQuestionActions(),
        selectors: new QuestionSelectors()
    };
};