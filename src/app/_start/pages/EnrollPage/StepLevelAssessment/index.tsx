import {useEnrollPageContext} from "@app.start/context/enrollPageContext";
import {useTestState} from "@store/slices/education/test/useTestState";
import {useTestResultState} from "@store/slices/education/test-result/useTestResultState";
import type {ReactNode} from "react";

import {LevelAssessmentInformation} from "./components/LevelAssessmentInformation";
import {LevelAssessmentTestMode} from "./components/LevelAssessmentTestMode";
import {LevelAssessmentTestResult} from "./components/LevelAssessmentTestResult";
import {useTestApi} from "@api/hooks/useTestApi";
import {useEffect} from "react";
import {isDefined} from "@utils/objectUtils";

export const StepLevelAssessment = () => {
    const testApi = useTestApi();
    const {mutate: prepareLevelAssessmentTest} = testApi.commands.prepareTest;

    const {actions: {clearTest}} = useTestState();
    const {actions: {calculateTestResult}, selectors: {currentTestResult}} = useTestResultState();
    const {testMode, isTestCompleted} = useEnrollPageContext();

    const handleSetTestMode = async () => {
        console.log("handleSetTestMode", currentTestResult(), currentTestResult()?.testExternalId);
        if (currentTestResult() && currentTestResult()?.testExternalId) {
            testMode.set("result").then();
            return;
        }

        await prepareLevelAssessmentTest();
        testMode.set("test").then();
    };

    const handleCompleteTest = (testId: string) => {
        // TODO: useTestResultApi
        calculateTestResult(testId).then(
            () => {
                isTestCompleted.set(true).then();
                testMode.set("result").then();
            },
        ).then(
            () => clearTest(testId)
        );
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