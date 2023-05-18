import {PaginatedList} from "@models/api/pagination";
import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {IQuestion} from "@models/education/test-template/question";
import {useQuestionActions} from "@store/slices/education/question/questionActions";
import {QuestionSelectors} from "@store/slices/education/question/questionSelectors";

export interface QuestionSliceState {
    list: PaginatedList<IQuestion>;
}

const initialState: QuestionSliceState = {
    list: PaginatedList.default<IQuestion>()
};

export const questionSlice = createSlice({
    name: "question",
    initialState,
    reducers: {
        setList: (state, action: PayloadAction<PaginatedList<IQuestion>>) => {
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