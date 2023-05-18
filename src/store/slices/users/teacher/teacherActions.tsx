import {useGlobalContext} from "@context/ApplicationContext";
import {useDispatch} from "react-redux";
import {ActionDispatch} from "@store/store";
import {requestAgent} from "@api/requestAgent";
import {useNavigate} from "react-router-dom";
import {PaginatedList, PaginationRequest} from "@models/api/pagination";
import {teacherSlice} from "@store/slices/users/teacher/teacherSlice";
import {TeacherBase} from "@models/users/teacher/teacherBrowse";
import {TeacherDetails} from "@models/users/teacher/teacherDetails";

export const useTeacherActions = () => {
    const teacherRequestAgent = requestAgent.users.teacher;
    const navigate = useNavigate();
    const {isLoading} = useGlobalContext();
    const dispatch = useDispatch<ActionDispatch>();
    const actions = teacherSlice.actions;

    const browseTeachers = async (pageIndex: number, pageSize: number, isAscending: boolean): Promise<PaginatedList<TeacherBase>> => {
        isLoading.set(true);
        try {
            const pagination: PaginationRequest = {
                pageIndex: pageIndex,
                pageSize: pageSize,
                isAscending: isAscending,
            };
            const envelope = await teacherRequestAgent.query.browse(pagination);
            if (envelope.isSuccess) {
                dispatch(actions.setList(envelope.data));
            }
            return envelope.data;
        } finally {
            isLoading.set(false);
        }
    };

    const reloadTeachers = async () => {
        await browseTeachers(1, 10, true);
    };

    const teacherDetails = async (id: string): Promise<TeacherDetails> => {
        isLoading.set(true);
        try {
            const envelope = await teacherRequestAgent.query.details(id);
            if (envelope.isSuccess) {
                dispatch(actions.setDetails(envelope.data));
                return envelope.data;
            }
            return {} as TeacherDetails;
        } finally {
            isLoading.set(false);
        }
    };

    return {
        browseTeachers,
        reloadTeachers,
        teacherDetails,
    };
};