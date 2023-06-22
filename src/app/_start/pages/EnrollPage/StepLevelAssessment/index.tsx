import {useTestApi} from "@api/hooks/useTestApi";
import {useTestResultApi} from "@api/hooks/useTestResultApi";
import {useEnrollPageContext} from "@app.start/context/enrollPageContext";
import {useTestState} from "@store/slices/education/test/useTestState";
import {useTestResultState} from "@store/slices/education/test-result/useTestResultState";
import {isDefined} from "@utils/objectUtils";
import type {ReactNode} from "react";

import {LevelAssessmentInformation} from "./components/LevelAssessmentInformation";
import {LevelAssessmentTestMode} from "./components/LevelAssessmentTestMode";
import {LevelAssessmentTestResult} from "./components/LevelAssessmentTestResult";

export const StepLevelAssessment = () => {
    const testApi = useTestApi();
    const prepareLevelTest = testApi.commands.prepareLevelTest;

    const testResultApi = useTestResultApi();
    const calculateTestResult = testResultApi.commands.calculateTestResult;

    const {actions: {clearTest}} = useTestState();
    const {selectors: {currentTestResult}} = useTestResultState();
    const {testMode, isTestCompleted} = useEnrollPageContext();

    const handleSetTestMode = async () => {
        prepareLevelTest.mutate(undefined, {
            onSuccess: () => testMode.set("test").then()
        });
    };

    const handleCompleteTest = (testId: string) => {
        calculateTestResult.mutate({testId}, {
            onSuccess: () => {
                isTestCompleted.set(true).then();
                testMode.set("result").then();
            }
        });

        clearTest(testId);
    };

    let content: ReactNode;
    switch (testMode.value) {
        case "info":
            content = <LevelAssessmentInformation setTestMode={handleSetTestMode} />;
            break;
        case "test":
            content = <LevelAssessmentTestMode setCompleteTest={handleCompleteTest} />;
            break;
        case "result":
            content = <LevelAssessmentTestResult />;
            break;
    }

    if (currentTestResult() && isDefined(currentTestResult()?.testExternalId)) {
        testMode.set("result").then();
        content = <LevelAssessmentTestResult />;
    }

    return (
        <>
            {content}
        </>
    );
};