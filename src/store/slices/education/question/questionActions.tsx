import {useDispatch} from "react-redux";
import {useNavigate} from "react-router-dom";
import {ActionDispatch} from "@store/store";
import {requestAgent} from "@api/requestAgent";
import {useGlobalContext} from "@context/ApplicationContext";
import {PaginatedList, PaginationRequest} from "@models/api/pagination";
import {studentSlice} from "@store/slices/users/student/studentSlice";
import {StudentBase} from "@models/users/student/studentBrowse";
import {StudentDetails} from "@models/users/student/studentDetails";
import {IQuestion} from "@models/education/test-template/question";
import {questionSlice} from "@store/slices/education/question/questionSlice";

export const useQuestionActions = () => {
    const questionRequestAgent = requestAgent.education.question;
    const navigate = useNavigate();
    const {isLoading} = useGlobalContext();
    const dispatch = useDispatch<ActionDispatch>();
    const actions = questionSlice.actions;

    const browseQuestions = async (pageIndex?: number, pageSize?: number, isAscending?: boolean): Promise<PaginatedList<IQuestion>> => {
        isLoading.set(true);
        try {
            const pagination: PaginationRequest = {
                pageIndex: pageIndex ?? 1,
                pageSize: pageSize ?? 10,
                isAscending: isAscending ?? true,
            };
            const envelope = await questionRequestAgent.query.browse(pagination);
            if (envelope.isSuccess) {
                dispatch(actions.setList(envelope.data));
            }
            return envelope.data;
        } finally {
            isLoading.set(false);
        }
    };

    const browseQuestionsByLevel = async (
        languageLevel: string, pageIndex?: number, pageSize?: number, isAscending?: boolean
    ): Promise<PaginatedList<IQuestion>> => {
        isLoading.set(true);
        try {
            const pagination: PaginationRequest = {
                pageIndex: pageIndex ?? 1,
                pageSize: pageSize ?? 10,
                isAscending: isAscending ?? true,
            };
            const envelope = await questionRequestAgent.query.browseByLevel(pagination, languageLevel);
            return envelope.data;
        } finally {
            isLoading.set(false);
        }
    };

    return {
        browseQuestions,
        browseQuestionsByLevel,
    };
};