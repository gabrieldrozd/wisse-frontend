import {useDispatch} from "react-redux";
import {useNavigate} from "react-router-dom";
import {ActionDispatch} from "@store/store";
import {requestAgent} from "@api/requestAgent";
import {useGlobalContext} from "@context/ApplicationContext";
import {Notify} from "@services/Notify";
import {ITestTemplatePost} from "@models/education/testTemplate";
import {testTemplateSlice} from "@store/slices/education/test-template/testTemplateSlice";

export const useTestTemplateActions = () => {
    const testTemplateRequestAgent = requestAgent.education.testTemplate;
    const navigate = useNavigate();
    const {isLoading} = useGlobalContext();
    const dispatch = useDispatch<ActionDispatch>();
    const actions = testTemplateSlice.actions;

    const createTestTemplate = async (testTemplatePostModel: ITestTemplatePost) => {
        isLoading.set(true);
        try {
            const envelope = await testTemplateRequestAgent.command.create(testTemplatePostModel);
            if (envelope.isSuccess) {
                Notify.success("Success", "Successfully created test template!");
                return true;
            }
        } finally {
            isLoading.set(false);
        }
    };

    return {
        createTestTemplate,
    };
};