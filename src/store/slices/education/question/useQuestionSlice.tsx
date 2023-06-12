import {useAppContext} from "@context/ApplicationContext";
import {questionSlice} from "@store/slices/education/question/questionSlice";
import type {ActionDispatch, RootState} from "@store/store";
import {useDispatch, useSelector} from "react-redux";

export const useQuestionSlice = () => {
    const state = useSelector((state: RootState) => state.question);
    const dispatch = useDispatch<ActionDispatch>();
    const actions = questionSlice.actions;
    const {setLoading} = useAppContext();

    const questionActions = {};

    const questionSelectors = {};

    return {
        actions: questionActions,
        selectors: questionSelectors
    };
};