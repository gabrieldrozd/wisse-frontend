import {PaginatedList} from "@models/api/pagination";
import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {IQuestion} from "@models/education/question";
import {useQuestionActions} from "@store/slices/education/question/questionActions";
import {QuestionSelectors} from "@store/slices/education/question/questionSelectors";
import {useTestTemplateActions} from "@store/slices/education/test-template/testTemplateActions";
import {TestTemplateSelectors} from "@store/slices/education/test-template/testTemplateSelectors";

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

export const useTestTemplateSlice = () => {
    return {
        actions: useTestTemplateActions(),
        selectors: new TestTemplateSelectors()
    };
};