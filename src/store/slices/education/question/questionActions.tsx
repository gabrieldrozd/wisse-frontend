import {requestAgent} from "@api/requestAgent";
import {useGlobalContext} from "@context/ApplicationContext";
import type {IPaginatedList, PaginationRequest} from "@models/api/pagination";
import type {IQuestion} from "@models/education/question";
import {questionSlice} from "@store/slices/education/question/questionSlice";
import type {ActionDispatch} from "@store/store";
import {useDispatch} from "react-redux";

export const useQuestionActions = () => {
    const questionRequestAgent = requestAgent.education.question;
    const {isLoading} = useGlobalContext();
    const dispatch = useDispatch<ActionDispatch>();
    const actions = questionSlice.actions;

    const browseQuestions = async (
        pageIndex?: number, pageSize?: number, isAscending?: boolean
    ): Promise<IPaginatedList<IQuestion>> => {
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
    ): Promise<IPaginatedList<IQuestion>> => {
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
        browseQuestionsByLevel
    };
};