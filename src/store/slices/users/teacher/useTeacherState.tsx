import {useAppContext} from "@context/ApplicationContext";
import type {ActionDispatch, RootState} from "@store/store";
import {useDispatch, useSelector} from "react-redux";

export const useTeacherState = () => {
    const state = useSelector((state: RootState) => state.teacher);
    const dispatch = useDispatch<ActionDispatch>();
    const {setLoading} = useAppContext();

    const teacherActions = {};

    const teacherSelectors = {};

    return {
        actions: teacherActions,
        selectors: teacherSelectors
    };
};