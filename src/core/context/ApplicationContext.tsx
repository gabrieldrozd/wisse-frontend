import {createContext, ReactNode, useContext, useMemo, useState} from "react";

export declare interface GlobalContextProps {
    isLoading: {
        value: boolean;
        set: (loading: boolean) => void;
    };
}

const GlobalContext = createContext<GlobalContextProps>({} as GlobalContextProps);
export const useGlobalContext = () => useContext(GlobalContext);

export declare interface ApplicationContextProps {
    children: ReactNode;
}

export const ApplicationContext = ({children}: ApplicationContextProps) => {
    const [isLoading, setIsLoading] = useState(false);

    const contextObject = useMemo(() => ({
        isLoading: {
            value: isLoading,
            set: setIsLoading,
        }
    }), [isLoading]);

    return (
        <GlobalContext.Provider value={contextObject}>
            {children}
        </GlobalContext.Provider>
    );
};