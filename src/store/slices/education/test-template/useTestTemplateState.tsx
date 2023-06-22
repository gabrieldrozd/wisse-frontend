import {useAppContext} from "@context/ApplicationContext";
import {testTemplateSlice} from "@store/slices/education/test-template/testTemplateSlice";
import type {ActionDispatch, RootState} from "@store/store";
import {useDispatch, useSelector} from "react-redux";

export const useTestTemplateState = () => {
    const state = useSelector((state: RootState) => state.testTemplate);
    const dispatch = useDispatch<ActionDispatch>();
    const actions = testTemplateSlice.actions;
    const {setLoading} = useAppContext();

    const testTemplateActions = {};

    const testTemplateSelectors = {};

    return {
        actions: testTemplateActions,
        selectors: testTemplateSelectors
    };
};