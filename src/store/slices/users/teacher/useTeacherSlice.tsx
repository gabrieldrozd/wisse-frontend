import {useAppContext} from "@context/ApplicationContext";
import {teacherSlice} from "@store/slices/users/teacher/teacherSlice";
import type {ActionDispatch, RootState} from "@store/store";
import {useDispatch, useSelector} from "react-redux";

export const useTeacherSlice = () => {
    const state = useSelector((state: RootState) => state.teacher);
    const dispatch = useDispatch<ActionDispatch>();
    const actions = teacherSlice.actions;
    const {setLoading} = useAppContext();

    const teacherActions = {
    };

    const teacherSelectors = {
    };

    return {
        actions: teacherActions,
        selectors: teacherSelectors
    };
};