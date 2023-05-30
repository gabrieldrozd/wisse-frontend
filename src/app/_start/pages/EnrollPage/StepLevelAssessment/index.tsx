import {useTestSlice} from "@store/slices/education/test/testSlice";
import type {ReactNode} from "react";
import {useState} from "react";

import {LevelAssessmentInformation} from "./components/LevelAssessmentInformation";
import {LevelAssessmentTestMode} from "./components/LevelAssessmentTestMode";
import {
    LevelAssessmentTestResult
} from "@app.start/pages/EnrollPage/StepLevelAssessment/components/LevelAssessmentTestResult";

type TestMode = "info" | "test" | "result";

export const StepLevelAssessment = () => {
    const {actions: {prepareLevelAssessmentTest, clearTest, calculateTestResult}} = useTestSlice();
    const [testMode, setTestMode] = useState<TestMode>("info");

    const handleSetTestMode = () => {
        prepareLevelAssessmentTest().then(
            () => setTestMode("test")
        );
    };

    const handleCompleteTest = (testId: string) => {
        calculateTestResult(testId).then(
            () => setTestMode("result"),
        ).then(
            () => clearTest(testId)
        );
    };

    let content: ReactNode;
    switch (testMode) {
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