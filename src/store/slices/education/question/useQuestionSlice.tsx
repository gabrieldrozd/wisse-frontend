import {requestAgent} from "@api/requestAgent";
import {useAppContext} from "@context/ApplicationContext";
import type {IPaginatedList, IPaginationRequest} from "@models/api/pagination";
import type {IQuestion} from "@models/education/question";
import {questionSlice} from "@store/slices/education/question/questionSlice";
import type {ActionDispatch, RootState} from "@store/store";
import {useDispatch, useSelector} from "react-redux";

export const useQuestionSlice = () => {
    const state = useSelector((state: RootState) => state.question);
    const dispatch = useDispatch<ActionDispatch>();
    const actions = questionSlice.actions;
    const agent = requestAgent.education.question;
    const {isLoading} = useAppContext();

    const questionActions = {
        browseQuestions: async (
            pageIndex?: number, pageSize?: number, isAscending?: boolean
        ): Promise<IPaginatedList<IQuestion>> => {
            isLoading.set(true);
            try {
                const pagination: IPaginationRequest = {
                    pageIndex: pageIndex ?? 1,
                    pageSize: pageSize ?? 10,
                    isAscending: isAscending ?? true,
                };
                const envelope = await agent.query.browse(pagination);
                if (envelope.isSuccess) {
                    dispatch(actions.setList(envelope.data));
                }
                return envelope.data;
            } finally {
                isLoading.set(false);
            }
        },
        browseQuestionsByLevel: async (
            languageLevel: string, pageIndex?: number, pageSize?: number, isAscending?: boolean
        ): Promise<IPaginatedList<IQuestion>> => {
            isLoading.set(true);
            try {
                const pagination: IPaginationRequest = {
                    pageIndex: pageIndex ?? 1,
                    pageSize: pageSize ?? 10,
                    isAscending: isAscending ?? true,
                };
                const envelope = await agent.query.browseByLevel(pagination, languageLevel);
                return envelope.data;
            } finally {
                isLoading.set(false);
            }
        }
    };

    const questionSelectors = {
        questionList: () => state.list,
    };

    return {
        actions: questionActions,
        selectors: questionSelectors
    };
};