import {requestAgent} from "@api/requestAgent";
import {useAppContext} from "@context/ApplicationContext";
import type {IPaginatedList, IPaginationRequest} from "@models/api/pagination";
import type {TeacherBase} from "@models/users/teacher/teacherBrowse";
import type {TeacherDetails} from "@models/users/teacher/teacherDetails";
import {teacherSlice} from "@store/slices/users/teacher/teacherSlice";
import type {ActionDispatch, RootState} from "@store/store";
import {useDispatch, useSelector} from "react-redux";

export const useTeacherSlice = () => {
    const state = useSelector((state: RootState) => state.teacher);
    const dispatch = useDispatch<ActionDispatch>();
    const actions = teacherSlice.actions;
    const agent = requestAgent.users.teacher;
    const {setLoading} = useAppContext();

    const teacherActions = {
        browseTeachers: async (
            pageIndex: number, pageSize: number, isAscending: boolean
        ): Promise<IPaginatedList<TeacherBase>> => {
            setLoading(true);
            try {
                const pagination: IPaginationRequest = {
                    pageIndex: pageIndex,
                    pageSize: pageSize,
                    isAscending: isAscending,
                };
                const envelope = await agent.query.browse(pagination);
                if (envelope.isSuccess) {
                    dispatch(actions.setList(envelope.data));
                }
                return envelope.data;
            } finally {
                setLoading(false);
            }
        },
        reloadTeachers: async () => {
            await teacherActions.browseTeachers(1, 10, true);
        },
        teacherDetails: async (id: string): Promise<TeacherDetails> => {
            setLoading(true);
            try {
                const envelope = await agent.query.details(id);
                if (envelope.isSuccess) {
                    dispatch(actions.setDetails(envelope.data));
                    return envelope.data;
                }
                return {} as TeacherDetails;
            } finally {
                setLoading(false);
            }
        }
    };

    const teacherSelectors = {
        teachersList: () => state.list,
        teacherDetails: () => state.details
    };

    return {
        actions: teacherActions,
        selectors: teacherSelectors
    };
};