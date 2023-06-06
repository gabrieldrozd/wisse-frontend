import type {RootState} from "@store/store";
import {useSelector} from "react-redux";

export class TestSelectors {
    private testState = useSelector((state: RootState) => state.test);

    public currentTest = () => {
        return this.testState.currentTest;
    };
}