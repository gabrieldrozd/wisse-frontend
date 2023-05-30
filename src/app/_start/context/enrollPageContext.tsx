import type {ReactNode} from "react";
import {createContext, useContext, useMemo, useState} from "react";
import {TestModel} from "@app.start/models/testModel";

interface Props {
    testMode: {
        value: boolean;
        set: (testMode: boolean) => Promise<void>;
    };
    isEnrollFormValid: {
        value: boolean;
        set: (isFormValid: boolean) => Promise<void>;
    };
}

const Context = createContext<Props>({} as Props);
export const useEnrollPageContext = () => useContext(Context);

interface ContextProps {
    children: ReactNode;
}

export const EnrollPageContext = ({children}: ContextProps) => {
    const [testMode, setTestMode] = useState(false);
    const [isFormValid, setIsFormValid] = useState(false);

    const handleSetTestMode = async (testMode: boolean) => {
        setTestMode(testMode);
    };

    const handleSetIsFormValid = async (isFormValid: boolean) => {
        setIsFormValid(isFormValid);
        console.log(isFormValid);
    };

    const contextObject = useMemo(() => ({
        testMode: {
            value: testMode,
            set: handleSetTestMode,
        },
        isEnrollFormValid: {
            value: isFormValid,
            set: handleSetIsFormValid,
        }
    }), [testMode, isFormValid]);

    return (
        <Context.Provider value={contextObject}>
            {children}
        </Context.Provider>
    );
};
