import type {ReactNode} from "react";
import {createContext, useContext, useMemo, useState} from "react";

type TestMode = "info" | "test" | "result";

interface Props {
    isEnrollFormValid: {
        value: boolean;
        set: (isFormValid: boolean) => Promise<void>;
    };
    testMode: {
        value: TestMode;
        set: (testMode: TestMode) => Promise<void>;
    };
    isTestCompleted: {
        value: boolean;
        set: (isTestCompleted: boolean) => Promise<void>;
    };
}

const Context = createContext<Props>({} as Props);
export const useEnrollPageContext = () => useContext(Context);

interface ContextProps {
    children: ReactNode;
}

export const EnrollPageContext = ({children}: ContextProps) => {
    const [isFormValid, setIsFormValid] = useState(false);
    const [testMode, setTestMode] = useState<TestMode>("info");
    const [isTestCompleted, setIsTestCompleted] = useState(false);

    const handleSetIsFormValid = async (isFormValid: boolean) => {
        setIsFormValid(isFormValid);
    };

    const handleSetTestMode = async (testMode: TestMode) => {
        setTestMode(testMode);
    };

    const handleSetIsTestCompleted = async (isTestCompleted: boolean) => {
        setIsTestCompleted(isTestCompleted);
    };

    const contextObject = useMemo(() => ({
        testMode: {
            value: testMode,
            set: handleSetTestMode,
        },
        isEnrollFormValid: {
            value: isFormValid,
            set: handleSetIsFormValid,
        },
        isTestCompleted: {
            value: isTestCompleted,
            set: handleSetIsTestCompleted,
        }
    }), [testMode, isFormValid]);

    return (
        <Context.Provider value={contextObject}>
            {children}
        </Context.Provider>
    );
};
