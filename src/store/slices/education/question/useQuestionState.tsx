import {questionSlice} from "@store/slices/education/question/questionSlice";
import type {ActionDispatch, RootState} from "@store/store";
import {useDispatch, useSelector} from "react-redux";

export const useQuestionState = () => {
    const state = useSelector((state: RootState) => state.question);
    const dispatch = useDispatch<ActionDispatch>();
    const actions = questionSlice.actions;

    const questionActions = {};

    const questionSelectors = {};

    return {
        actions: questionActions,
        selectors: questionSelectors
    };
};