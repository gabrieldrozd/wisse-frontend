import {useEnrollPageContext} from "@app.start/context/enrollPageContext";
import {useTestState} from "@store/slices/education/test/useTestState";
import {useTestResultState} from "@store/slices/education/test-result/useTestResultState";
import type {ReactNode} from "react";

import {LevelAssessmentInformation} from "./components/LevelAssessmentInformation";
import {LevelAssessmentTestMode} from "./components/LevelAssessmentTestMode";
import {LevelAssessmentTestResult} from "./components/LevelAssessmentTestResult";

export const StepLevelAssessment = () => {
    const {actions: {prepareLevelAssessmentTest, clearTest,}} = useTestState();
    const {actions: {calculateTestResult}} = useTestResultState();
    const {testMode, isTestCompleted} = useEnrollPageContext();

    const handleSetTestMode = () => {
        prepareLevelAssessmentTest().then(
            () => testMode.set("test")
        );
    };

    const handleCompleteTest = (testId: string) => {
        calculateTestResult(testId).then(
            () => {
                testMode.set("result").then();
                isTestCompleted.set(true).then();
            },
        ).then(
            () => clearTest(testId)
        );
    };

    console.log(testMode.value);

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

    return (
        <>
            {content}
        </>
    );
};