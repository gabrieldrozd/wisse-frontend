import {useAppContext} from "@context/ApplicationContext";
import type {ActionDispatch, RootState} from "@store/store";
import {useDispatch, useSelector} from "react-redux";

export const useStudentState = () => {
    const state = useSelector((state: RootState) => state.student);
    const dispatch = useDispatch<ActionDispatch>();
    const {setLoading} = useAppContext();

    const studentActions = {};

    const studentSelectors = {};

    return {
        actions: studentActions,
        selectors: studentSelectors
    };
};