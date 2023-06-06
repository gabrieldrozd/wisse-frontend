import {useDispatch, useSelector} from "react-redux";
import {ActionDispatch, RootState} from "@store/store";
import {testTemplateSlice} from "@store/slices/education/test-template/testTemplateSlice";
import {requestAgent} from "@api/requestAgent";
import {useAppContext} from "@context/ApplicationContext";
import {ITestTemplatePost} from "@models/education/testTemplate";
import {Notify} from "@services/Notify";

export const useTestTemplateSlice = () => {
    const state = useSelector((state: RootState) => state.testTemplate);
    const dispatch = useDispatch<ActionDispatch>();
    const actions = testTemplateSlice.actions;
    const agent = requestAgent.education.testTemplate;
    const {isLoading} = useAppContext();

    const testTemplateActions = {
        createTestTemplate: async (testTemplatePostModel: ITestTemplatePost) => {
            isLoading.set(true);
            try {
                const envelope = await agent.command.create(testTemplatePostModel);
                if (envelope.isSuccess) {
                    Notify.success("Success", "Successfully created test template!");
                    return true;
                }
            } finally {
                isLoading.set(false);
            }
        }
    };

    const testTemplateSelectors = {};

    return {
        actions: testTemplateActions,
        selectors: testTemplateSelectors
    };
};