import type {RootState} from "@store/store";
import {useSelector} from "react-redux";

export class TestResultSelectors {
    private testResultState = useSelector((state: RootState) => state.testResult);

    public currentTestResult = () => {
        return this.testResultState.currentTestResult;
    }
}